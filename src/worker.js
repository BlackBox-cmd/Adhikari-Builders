/**
 * Cloudflare Worker for Luxury Real Estate Booking API
 * Handles POST /api/booking requests and forwards to Discord webhook
 */

// Valid property addresses from data.js
const VALID_ADDRESSES = new Set([
    'Niland Avenue 1',
    'Niland Avenue 2',
    'Niland Avenue 3',
    'Niland Avenue 4',
    'Niland Avenue 5',
    'Niland Avenue 6',
    'Niland Avenue 7',
    'Niland Avenue 8',
    'Steele Way 1',
    'Steele Way 2',
    'Steele Way 3',
    'Steele Way 4',
    'Steele Way 5',
    'Steele Way 6'
]);

// Rate limit: 5 requests per IP per hour
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_TTL = 3600; // 1 hour

// Simple in-memory rate limiting fallback (for development only)
// Note: This resets on each Worker restart
let inMemoryRateLimits = new Map();

/**
 * Main Worker export
 */
export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        // Handle booking API
        if (url.pathname === '/api/booking' && request.method === 'POST') {
            return handleBooking(request, env);
        }

        // Pass through to static assets
        return env.ASSETS.fetch(request);
    }
};

/**
 * Handle booking form submission
 */
async function handleBooking(request, env) {
    // Check rate limit first (only if KV is available)
    if (env.RATE_LIMIT) {
        try {
            const ip = request.headers.get('cf-connecting-ip') || 'unknown';
            const isAllowed = await checkRateLimit(ip, env.RATE_LIMIT);

            if (!isAllowed) {
                return new Response(JSON.stringify({ error: 'Too many requests. Please try again later.' }), {
                    status: 429,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
        } catch (error) {
            console.warn('Rate limiting failed, continuing without it:', error);
            // Continue without rate limiting if KV is not available
        }
    }

    // Check Content-Type
    const contentType = request.headers.get('Content-Type') || '';
    if (!contentType.includes('application/json')) {
        return new Response(JSON.stringify({ error: 'Content-Type must be application/json' }), {
            status: 415,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // Check body size (max 10KB)
    const contentLength = parseInt(request.headers.get('Content-Length') || '0');
    if (contentLength > 10240) {
        return new Response(JSON.stringify({ error: 'Request body too large' }), {
            status: 413,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // Parse and validate request body
    let body;
    try {
        body = await request.json();
    } catch (e) {
        return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // Honeypot check
    if (body.website && body.website.trim() !== '') {
        console.warn('Honeypot field filled - rejecting request');
        return new Response(JSON.stringify({ error: 'Invalid submission' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // Validate required fields
    const { name, cid, phone, address, date } = body;
    const errors = [];

    if (!name || typeof name !== 'string') {
        errors.push('Name is required');
    } else if (name.length < 2 || name.length > 50) {
        errors.push('Name must be 2-50 characters');
    } else if (!/^[a-zA-Z\s\-']+$/.test(name)) {
        errors.push('Name contains invalid characters');
    }

    if (!cid || typeof cid !== 'string') {
        errors.push('CID is required');
    } else if (!/^\d{1,5}$/.test(cid)) {
        errors.push('CID must be 1-5 digits');
    } else {
        const cidNum = parseInt(cid, 10);
        if (cidNum < 1 || cidNum > 10000) {
            errors.push('CID must be between 1 and 10000');
        }
    }

    if (!phone || typeof phone !== 'string') {
        errors.push('Phone is required');
    } else if (!/^\d{3}-\d{4}$/.test(phone)) {
        errors.push('Phone must be in format 123-4567');
    }

    if (!address || typeof address !== 'string') {
        errors.push('Property address is required');
    } else if (!VALID_ADDRESSES.has(address)) {
        errors.push('Invalid property address');
    }

    if (!date || typeof date !== 'string') {
        errors.push('Date is required');
    } else {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (isNaN(selectedDate.getTime())) {
            errors.push('Invalid date format');
        } else if (selectedDate < today) {
            errors.push('Date cannot be in the past');
        }
    }

    if (errors.length > 0) {
        return new Response(JSON.stringify({ error: errors.join('. ') }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // Sanitize inputs for Discord (prevent @mentions and markdown injection)
    const sanitizedName = sanitizeForDiscord(name);
    const sanitizedCid = cid; // Already validated as digits only
    const sanitizedPhone = phone; // Already validated as digits and hyphen
    const sanitizedAddress = address; // Validated against whitelist

    // Send to Discord
    try {
        await sendToDiscord(env.DISCORD_WEBHOOK_URL, {
            name: sanitizedName,
            cid: sanitizedCid,
            phone: sanitizedPhone,
            address: sanitizedAddress,
            date: date
        });

        return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Discord webhook error:', error);
        return new Response(JSON.stringify({ error: 'Failed to submit booking request. Please try again.' }), {
            status: 502,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

/**
 * Check rate limit using KV
 */
async function checkRateLimit(ip, rateLimitKV) {
    const key = `ratelimit:${ip}`;

    try {
        const current = await rateLimitKV.get(key);
        const count = current ? parseInt(current) : 0;

        if (count >= RATE_LIMIT_MAX) {
            return false;
        }

        await rateLimitKV.put(key, (count + 1).toString(), { expirationTtl: RATE_LIMIT_TTL });
        return true;
    } catch (error) {
        console.error('Rate limit KV error:', error);
        // Allow request if KV fails (fail open)
        return true;
    }
}

/**
 * Sanitize text for Discord (prevent @mentions and limit length)
 */
function sanitizeForDiscord(text) {
    return text
        .slice(0, 200)
        .replace(/@(everyone|here)/gi, '@​$1') // Zero-width space breaks mentions
        .replace(/<@&?\d+>/g, '') // Remove role/user mentions
        .replace(/[<>]/g, ''); // Remove angle brackets
}

/**
 * Send booking to Discord webhook
 */
async function sendToDiscord(webhookUrl, data) {
    const timestamp = new Date().toISOString();

    const payload = {
        embeds: [{
            title: '🏠 New Property Booking Request',
            color: 13882410, // Gold #d4af6a
            fields: [
                { name: 'Name', value: data.name, inline: true },
                { name: 'CID', value: data.cid, inline: true },
                { name: 'Phone', value: data.phone, inline: true },
                { name: 'Property Address', value: data.address, inline: false },
                { name: 'Requested Move-in Date', value: data.date, inline: true },
                { name: 'Submitted', value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: true }
            ],
            timestamp: timestamp
        }],
        allowed_mentions: { parse: [] }
    };

    const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error(`Discord webhook failed: ${response.status}`);
    }

    return response;
}
