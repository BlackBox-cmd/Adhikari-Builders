# LUXURY REAL ESTATE- Los Santos Rental Division (GTA V RP Website)

![LUXURY REAL ESTATE Logo Placeholder](https://i.postimg.cc/pd1xfFCM/Luxury-Real-Estate-Logo.jpg )

Welcome to the official website for GENESIS REAL ESTATE, Los Santos Rental Division. This is an in-character Grand Theft Auto V Roleplay (GTA V RP) business focused on providing secure, legal, and RP-friendly housing within the city of Los Santos.

Our website is designed to emulate the immersive user interface experience of FiveM NUI or in-game laptop interfaces, ensuring a professional and integrated feel for all players.

## Developer Note

This repository contains the source code for the GENESIS REAL ESTATE website. Please note that I am the developer of this website and not the owner or operator of the "GENESIS REAL ESTATE" business. "GENESIS REAL ESTATE" is a fictional, in-character entity within the Grand Theft Auto V Roleplay (GTA V RP) universe. The website serves as a demonstration and functional portal for this RP business.

## Features

*   **Immersive UI/UX**: Dark theme with gold accents, minimalist design, cards, panels, and subtle animations, inspired by FiveM / GTA NUI aesthetics.
*   **Dynamic Property Blocks**: Browse available housing blocks with key details. Click on a block to view a detailed list of individual properties within a popup modal, including renter status, interior type, income, and storage.
*   **Dynamic Data Management**: All property blocks and tenant details are loaded from `js/data.js`. Data is automatically generated from `renters.csv` via a Node.js script, making it easy to manage large property portfolios.
*   **Property Booking System**: In-game players can book empty properties directly through the website. Booking requests are sent to Discord webhook for server admins to process. Features include client-side validation, rate limiting, honeypot protection, and address verification.
*   **Day/Night Mode Toggle**: Switch between a dark (default) and a light theme with a convenient toggle in the navigation bar. Your preference is saved locally.
*   **Meet Our Team**: A dedicated section showcasing our professional real estate experts with their roles and contact information.
*   **Rules & Information**: Clear guidelines for tenants to ensure a smooth and RP-compliant housing experience.
*   **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.
*   **Cloudflare Worker API**: Backend API for booking submissions with security validation, rate limiting, and Discord webhook integration.

## Getting Started

To view the GENESIS REAL ESTATE website locally:

1.  **Clone the repository** (if applicable, otherwise download the files).
2.  Navigate to the project directory.
3.  Open the `index.html` file in your preferred web browser.

## Customization

### Property Listings & Data Management
Property block and tenant data is managed via a centralized CSV file to simplify updates.

#### Update Process
1.  **Edit `renters.csv`**: Update tenant information, statuses, and property types in this CSV file.
    - **CSV Columns**: `Status,Address,Interior,Renter CID,Renter Name,Phone,Income,Cost`
    - **Status Values**: `Paid`, `Overdue`, `Evictable`, `Empty`
    - **Income/Cost Format**: Use `$` prefix with commas for thousands (e.g., `$1,500`)
    - **Empty Units**: Use `N/A` for Renter CID, Renter Name, and Phone
2.  **Run the Update Script**: Execute `node update-stats.js` to automatically parse the CSV, calculate total income/storage, and update `js/data.js`.
    - The script dynamically detects new property blocks from the CSV and adds them to the website
    - Blocks no longer present in the CSV are automatically removed
    - Console output shows any new blocks detected or blocks removed
3.  **Verify `js/data.js`**: Contains the `propertyBlocks` array which powers the UI. Each block includes calculated fields (`occupiedProperties`, `income`, `cost`, `storage`) and a `properties` array detailing individual units.
4.  **Rebuild the Site**: Run `npm run build` to regenerate the `dist/` folder with updated data.
5.  **Deploy (Optional)**: Run `npm run deploy` to deploy the updated site to Cloudflare Pages.

### Team Members
Team member information is located in the `teamMembers` array within `js/data.js`. You can update names, roles, phone numbers, and profile images here.

### Discord Invite Link
To change the "Join Discord" button link, open `index.html` and update the `href` attribute of the `<a>` tag with the class `discord-button`.

### Theme Colors
The primary Gold and Black theme (and the light mode alternatives) are defined using CSS variables in `css/style.css`. You can easily adjust `--accent-color`, `--accent-hover`, and other variables in the `:root` and `.light-mode` sections to fine-tune the color scheme.

## Deployment

This project uses Cloudflare Pages via Wrangler for deployment, with automated build scripts defined in `package.json`.

1.  Ensure you have Node.js installed.
2.  Install dependencies: `npm install`
3.  Deploy to Cloudflare: `npm run deploy` (this will automatically build the `dist` folder and deploy it using Wrangler).

## Booking System Setup

The booking system allows in-game players to request property rentals through the website. Submissions are sent to a Discord webhook for server admins to process.

### Prerequisites

1. **Discord Webhook**: Create a webhook in your Discord server:
   - Open your Discord server → Server Settings → Integrations → Webhooks
   - Click "New Webhook" or "Create Webhook"
   - Set a name (e.g., "Property Bookings")
   - Select the channel where bookings should be posted
   - Copy the Webhook URL (keep this secret!)

2. **Cloudflare KV Namespace** (for rate limiting):
   - Create a KV namespace: `npx wrangler kv:namespace create "RATE_LIMIT"`
   - For preview environment: `npx wrangler kv:namespace create "RATE_LIMIT" --preview`
   - Update `wrangler.jsonc` with the returned namespace IDs

### Local Development Setup

1. **Configure Environment Variables**:
   - Open `.dev.vars` in the project root
   - Add your Discord webhook URL:
     ```
     DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN
     ```

2. **Update KV Namespace IDs**:
   - Open `wrangler.jsonc`
   - Replace `<your-kv-namespace-id>` with your KV namespace ID
   - Replace `<your-preview-kv-namespace-id>` with your preview KV namespace ID

3. **Run Local Development Server**:
   ```bash
   npx wrangler dev
   ```
   - The site will be available at `http://localhost:8787`
   - Test the booking form by filling out all fields and submitting
   - Check your Discord channel for the booking notification

### Production Deployment

1. **Set Production Secrets**:
   ```bash
   npx wrangler secret put DISCORD_WEBHOOK_URL
   ```
   - Paste your Discord webhook URL when prompted
   - This stores the webhook securely (not in your code/repo)

2. **Deploy**:
   ```bash
   npm run deploy
   ```

### Testing Checklist

Test the booking system thoroughly before going live:

- [ ] **Valid booking**: Fill all fields correctly → Success message appears
- [ ] **Empty fields**: Submit without required fields → Validation errors shown
- [ ] **Invalid CID**: Enter letters in CID field → Error message
- [ ] **Invalid phone**: Use wrong format → Error message (must be 123-4567)
- [ ] **Past date**: Select yesterday's date → Error message
- [ ] **Rate limiting**: Submit 6 bookings quickly → 6th should be blocked (429 error)
- [ ] **Discord**: Verify booking appears in Discord with correct formatting
- [ ] **Mobile**: Test form on mobile device (responsive layout)
- [ ] **Accessibility**: Tab through form, press Escape to close
- [ ] **Theme**: Test in both dark and light modes

### Updating Property Addresses

When you add or remove properties in `js/data.js`, you must also update the valid addresses list in the Worker:

1. Open `src/worker.js`
2. Update the `VALID_ADDRESSES` Set at the top of the file
3. Rebuild and redeploy: `npm run deploy`

### Security Features

The booking system includes multiple security layers:

- **Server-side validation**: All inputs are validated on the Worker (never trust client)
- **Rate limiting**: 5 requests per IP per hour (prevents spam)
- **Honeypot field**: Hidden field catches bots
- **Address verification**: Only valid property addresses are accepted
- **Mention protection**: Discord @everyone and @here mentions are blocked
- **XSS prevention**: Uses `textContent` instead of `innerHTML` for dynamic values

### Troubleshooting

**"Booking request failed" error:**
- Check that `DISCORD_WEBHOOK_URL` secret is set correctly
- Verify webhook URL is valid in your Discord server
- Check browser console for specific error codes

**Rate limit not working:**
- Verify KV namespace IDs are correct in `wrangler.jsonc`
- Check Wrangler dashboard for KV namespace status

**Invalid property address error:**
- Ensure the address exists in the `VALID_ADDRESSES` Set in `src/worker.js`
- Property addresses must match exactly (case-sensitive)

## Technologies Used

*   **HTML5 & CSS3**: Structure, styling, and responsiveness.
*   **JavaScript (ES6+)**: Dynamic UI, modal functionality, and data processing.
*   **Node.js**: Backend scripting (`update-stats.js`) to parse CSV data into JSON.
*   **Cloudflare Wrangler**: CLI for automated static site deployment.

## Contact & Support

For in-game inquiries, please visit our office in Los Santos. For Discord support and community engagement, please use the "Join Discord" button on our website.

---
© LUXURY REAL ESTATE — Mr_Freak_cmd
