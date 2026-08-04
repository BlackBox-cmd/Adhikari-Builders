const fs = require('fs');
const path = require('path');

const csvFilePath = path.join(__dirname, 'renters.csv');
const dataJsPath = path.join(__dirname, 'js', 'data.js');

// Mapping from CSV address prefixes to property names in data.js
const prefixMap = {
    'Forum Drive 2': 'Forum Dr. Apt. Complex B',
    'Niland Avenue': 'Niland Avenue',
    'Steele Way': 'Steele Way',
    'Nikola Avenue': 'Nikola Avenue',
    'Eclipse Boulevard': 'Eclipse Boulevard',
    'Forum Drive 3': 'Forum Dr. Apt. Complex C',
    'Brouge Avenue': 'Brouge Avenue'
};

// Mapping from property names to their image URLs
const imageMap = {
    'Clinton Ave': 'assets/Blocks/Clinton-Ave.png',
    'Forum Dr. Apt. Complex B': 'assets/Blocks/Forum-Dr-Apt-Complex-B.png',
    'Niland Avenue': 'assets/Blocks/Niland-Avenue.png',
    'Steele Way': 'assets/Blocks/Steele-Way.png',
    'Nikola Avenue': 'assets/Blocks/Nikola-Avenue.png',
    'Eclipse Boulevard': 'assets/Blocks/Eclipse-Boulevard.png',
    'Forum Dr. Apt. Complex C': 'assets/Blocks/Forum-Dr-Apt-Complex-C.png',
    'Brouge Avenue': 'assets/Blocks/Brouge-Avenue.png'
};

// Complete Block ID mapping for all properties
const blockIdMap = {
    'Clinton Ave': 186, // Alias for Clinton Avenue Apartment Complex
    'Clinton Avenue Apartment Complex': 186,
    'Forum Dr. Apt. Complex A': 1,
    'Forum Dr. Apt. Complex B': 2,
    'Forum Dr. Apt. Complex C': 3,
    'Forum Dr. Apt. Complex D': 4,
    'Forum Dr. Apt. Complex E': 5,
    'Forum Dr. Apt. Complex F': 6,
    'Forum Dr. Apt. Complex G': 7,
    'Forum Dr. Apt. Complex H': 8,
    'Forum Dr. Apt. Complex I': 9,
    'Forum Dr. Apt. Complex J': 10,
    'Forum Dr. Apt. Complex K': 11,
    'Forum Dr. Apt. Complex L': 12,
    'Forum Drive': 13,
    'Grove Street': 14,
    'Covenant Avenue': 15,
    'Brouge Avenue': 16,
    'Roy Lowenstein Boulevard': 17,
    'Roy Lowenstein Boulevard Apt. Complex A': 18,
    'Roy Lowenstein Boulevard Apt. Complex B': 19,
    'Roy Lowenstein Boulevard Apt. Complex C': 20,
    'Jamestown Street': 21,
    'Jamestown St. Apt. Complex A': 22,
    'Jamestown St. Apt. Complex B': 23,
    'Jamestown St. Apt. Complex C': 24,
    'Jamestown St. Apt. Complex D': 25,
    'Jamestown St. Apt. Complex E': 26,
    'Jamestown St. Apt. Complex F': 27,
    'Jamestown St. Apt. Complex G': 28,
    'Jamestown St. Apt. Complex H': 29,
    'Jamestown St. Apt. Complex I': 30,
    'Amarillo Vista': 31,
    'Fudge Lane': 32,
    'West Mirror Drive': 33,
    'East Mirror Drive': 34,
    'Mirror Park Boulevard': 35,
    'Mirror Place': 36,
    'Nikola Avenue': 37,
    'Bridge Street': 38,
    'Nikola Place': 39,
    'Melanoma Street': 40,
    'Magellan Avenue': 41,
    'Invention Court': 42,
    'Palomino Avenue': 43,
    'Palomino Avenue Apt. Complex A': 44,
    'Palomino Avenue Apt. Complex B': 45,
    'Palomino Avenue Apt. Complex C': 46,
    'Imagination Court': 47,
    'Vespucci Boulevard': 48,
    'Vespucci Boulevard Apt. Complex A': 49,
    'Vespucci Boulevard Apt. Complex B': 50,
    'South Rockford Drive': 51,
    'Del Perro Freeway': 52,
    'North Rockford Drive': 53,
    'Ace Jones Drive': 54,
    'Americano Way': 55,
    'Sam Austin Drive': 56,
    'Hangman Avenue': 57,
    'North Sheldon Drive': 58,
    'Hillcrest Avenue': 59,
    'Normandy Drive': 60,
    'Mad Wayne Thunder Drive': 61,
    'Cockingend Drive': 62,
    'South Mo Milton Drive': 63,
    'Greenwich Place': 64,
    'Greenwich Way': 65,
    'Steele Way': 66,
    'Caesars Place': 67,
    'Kimble Hill Drive': 68,
    'Whispymound Drive': 69,
    'Wild Oats Drive': 70,
    'North Conker Avenue': 71,
    'Lake Vinewood Estates': 72,
    'Cox Way': 73,
    'Milton Road': 74,
    'Picture Perfect Drive': 75,
    'Didion Drive': 76,
    'Eclipse Boulevard': 77,
    'Portola Drive': 78,
    'Marlowe Drive': 79,
    'Bay City Avenue Apt. Complex A': 80,
    'Bay City Avenue Apt. Complex B': 81,
    'Bay City Avenue': 82,
    'Bay City Avenue Apt. Complex C': 83,
    'Bay City Avenue Apt. Complex D': 84,
    'Bay City Avenue Apt. Complex E': 85,
    'Cougar Avenue': 86,
    'Alta Street Apt. Complex A': 87,
    'Alta Street Apt. Complex B': 88,
    'Alta Street Apt. Complex C': 89,
    'Alta Street Apt. Complex D': 90,
    'Alta Street Apt. Complex E': 91,
    'Alta Street Apt. Complex F': 92,
    'Alta Street Apt. Complex G': 93,
    'Alta Street Apt. Complex H': 94,
    'Alta Street Apt. Complex I': 95,
    'Alta Street Apt. Complex J': 96,
    'Alta Place Apt. Complex A': 97,
    'Alta Place Apt. Complex B': 98,
    'Alta Place Apt. Complex C': 99,
    'Power Street Apt. Complex A': 100,
    'Power Street Apt. Complex B': 101,
    'Power Street Apt. Complex C': 102,
    'Power Street Apt. Complex D': 103,
    'Power Street Apt. Complex E': 104,
    'Laguna Place Apt. Complex A': 105,
    'Laguna Place Apt. Complex B': 106,
    'Laguna Place Apt. Complex C': 107,
    'Laguna Place Apt. Complex D': 108,
    'Laguna Place Apt. Complex E': 109,
    'Spanish Avenue Apt. Complex A': 110,
    'Spanish Avenue Apt. Complex B': 111,
    'Spanish Avenue Apt. Complex C': 112,
    'Spanish Avenue Apt. Complex D': 113,
    'Spanish Avenue Apt. Complex E': 114,
    'Spanish Avenue Apt. Complex F': 115,
    'Spanish Avenue Apt. Complex G': 116,
    'Spanish Avenue Apt. Complex H': 117,
    'Spanish Avenue Apt. Complex I': 118,
    'Spanish Avenue Apt. Complex J': 119,
    'Spanish Avenue Apt. Complex K': 120,
    'Spanish Avenue Apt. Complex L': 121,
    'Spanish Avenue Apt. Complex M': 122,
    'Spanish Avenue Apt. Complex N': 123,
    'Spanish Avenue Apt. Complex O': 124,
    'Spanish Avenue Apt. Complex P': 125,
    'Hawick Avenue Apt. Complex A': 126,
    'Hawick Avenue Apt. Complex B': 127,
    'San-Vitus Boulevard Apt. Complex A': 128,
    'San-Vitus Boulevard Apt. Complex B': 129,
    'San-Vitus Boulevard Apt. Complex C': 130,
    'North Anchor Avenue Apt. Complex A': 131,
    'North Anchor Avenue Apt. Complex B': 132,
    'Las Lagunas Boulevard Apt. Complex A': 133,
    'Las Lagunas Boulevard Apt. Complex B': 134,
    'Las Lagunas Boulevard Apt. Complex C': 135,
    'Las Lagunas Boulevard Apt. Complex D': 136,
    'Las Lagunas Boulevard Apt. Complex E': 137,
    'Occupation Avenue Apt. Complex A': 138,
    'Occupation Avenue Apt. Complex B': 139,
    'Occupation Avenue Apt. Complex C': 140,
    'Occupation Avenue Apt. Complex D': 141,
    'Occupation Avenue Apt. Complex E': 142,
    'Occupation Avenue Apt. Complex F': 143,
    'Ineseno Road': 144,
    'Barbareno Road': 145,
    'Banham Canyon Drive': 146,
    'Buen Vino Road': 147,
    'Los Santos Freeway': 148,
    'Baytree Canyon Road': 149,
    'Senora Road': 150,
    'Route 68 Apartment Complex A': 151,
    'Route 68 Apartment Complex B': 152,
    'Route 68': 153,
    'Senora Way': 154,
    'Smoke Tree Road': 155,
    'Joshua Road': 156,
    'Calafia Road': 157,
    'Marina Drive': 158,
    'Algonquin Boulveard': 159,
    'Lesbos Lane': 160,
    'Mountain View Drive': 161,
    'Cholla Springs Avenue': 162,
    'Niland Avenue': 163,
    'East Joshua Drive': 164,
    'Catfish View': 165,
    'North Calafia Way': 166,
    'Chilliad Mountain State Wilderness': 167,
    'Paleto Boulevard': 168,
    'Procopio Drive': 169,
    'Procopio Promenade': 170,
    'Cascabel Avenue Apartment Complex A': 171,
    'Great Ocean Highway': 172,
    'Grapeseed Main Street': 173,
    'Joad Lane': 174,
    'Panoroma Drive': 175,
    'Sandy Trailer': 176,
    'El Rubio\'s': 177,
    'Perico Docs': 178,
    'Cougar Avenue Apt. Complex A': 179,
    'Cougar Avenue Apt. Complex B': 180,
    'Banham Canyon': 181,
    'Vespucci Beach': 182,
    'Cayo Perico Airport': 183,
    'Alien Avenue': 184,
    'Del Perro Boulevard': 185,
    'Clinton Avenue Apartment Complex': 186,
    'Little Seoul': 187,
    'Lake Vinewood Drive': 188,
    'Tug Street': 189,
    'Cortes Street': 190,
    'Vitus Street': 191,
    'Route 68 Approach': 192,
    'Eastbourne Way': 193,
    'gantry Lane': 194
};

const storageMap = {
    "Janitor Apartment": 3000,
    "Trevor's Beach House": 9000,
    "Trevor's Trailer": 2250,
    "Michael's Mansion": 15000,
    "Motel": 1500,
    "Mid-End Apartment (House)": 7500,
    "Low-End Apartment": 3750,
    "High-End Apartment": 15000,
    "Franklin's House": 6000,
    "Lester's House": 5250,
    "Mid-End Apartment": 7500 
};

// Helper to extract prefix from address
function getAddressPrefix(address) {
    if (!address) return '';
    if (address.includes('/')) {
        return address.split('/')[0].trim();
    }
    // Remove trailing house numbers like "1", "10", "12B", "12a"
    return address.replace(/\s+\d+[a-zA-Z]?$/, '').trim();
}

function parseCurrency(str) {
    if (!str) return 0;
    return parseInt(str.replace(/[\$,]/g, ''), 10) || 0;
}

// Simple CSV parser - works with properly formatted CSV files
function parseCSVLine(line) {
    const cols = [];
    let current = '';
    let insideQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];

        if (char === '"') {
            if (insideQuotes && nextChar === '"') {
                // Escaped quote (double quote)
                current += '"';
                i++;
            } else {
                // Toggle quote state
                insideQuotes = !insideQuotes;
            }
        } else if (char === ',' && !insideQuotes) {
            // Field separator (only outside quotes)
            cols.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    // Add the last field
    cols.push(current.trim());
    
    // Remove quotes from individual fields if they're quoted
    return cols.map(col => {
        if (col.startsWith('"') && col.endsWith('"')) {
            return col.slice(1, -1);
        }
        return col;
    });
}

function processCSV() {
    const csvContent = fs.readFileSync(csvFilePath, 'utf8');
    const lines = csvContent.trim().split('\n');
    
    // Skip header
    const dataLines = lines.slice(1);

    // Dynamically discover any new prefixes from the CSV and add to prefixMap
    dataLines.forEach(line => {
        const cols = parseCSVLine(line);
        if (cols.length < 2) return;
        const address = cols[1].trim();
        if (address) {
            // Check if the address already matches an existing prefix
            let matchesExisting = false;
            for (const existingPrefix of Object.keys(prefixMap)) {
                if (address.startsWith(existingPrefix)) {
                    matchesExisting = true;
                    break;
                }
            }
            if (!matchesExisting) {
                const prefix = getAddressPrefix(address);
                if (prefix && !prefixMap[prefix]) {
                    prefixMap[prefix] = prefix;
                    console.log(`Detected new address prefix in CSV: "${prefix}"`);
                }
            }
        }
    });

    const stats = {};
    for (const key of Object.values(prefixMap)) {
        stats[key] = { occupied: 0, total: 0, income: 0, cost: 0, storage: 0, properties: [] };
    }

    dataLines.forEach(line => {
        const cols = parseCSVLine(line);
        if (cols.length < 8) return;

        const status = cols[0].trim();
        const address = cols[1].trim();
        const interior = cols[2].trim();
        const renterName = cols[4].trim();
        const phone = cols[5].trim();
        
        // Extract money values using regex to handle commas inside numbers (e.g., $1,500)
        const moneyMatches = line.match(/\$[\d,]+/g);
        let income = 0;
        let cost = 0;
        if (moneyMatches && moneyMatches.length >= 2) {
            income = parseCurrency(moneyMatches[0]);
            cost = parseCurrency(moneyMatches[1]);
        }

        // Find matching prefix
        let matchedName = null;
        for (const [prefix, name] of Object.entries(prefixMap)) {
            if (address.startsWith(prefix)) {
                matchedName = name;
                break;
            }
        }

        if (matchedName) {
            stats[matchedName].total += 1;
            if (status !== 'Empty') {
                stats[matchedName].occupied += 1;
            }
            stats[matchedName].income += income;
            stats[matchedName].cost += cost;
            stats[matchedName].storage += (storageMap[interior] || 0);
            
            stats[matchedName].properties.push({
                status,
                address,
                interior,
                renterName,
                phone,
                income,
                cost,
                storage: storageMap[interior] || 0
            });
        }
    });

    return stats;
}

function updateDataJs(stats) {
    let content = fs.readFileSync(dataJsPath, 'utf8');

    // Extract propertyBlocks array using regex
    const regex = /const propertyBlocks = (\[[\s\S]*?\]);/;
    const match = content.match(regex);
    if (!match) {
        console.error("Could not find propertyBlocks in data.js");
        return;
    }

    let blocks;
    // Safely evaluate the array
    eval(`blocks = ${match[1]}`);

    // Update stats and filter out missing blocks
    const filteredBlocks = [];
    blocks.forEach(block => {
        const stat = stats[block.name];
        if (stat && stat.total > 0) {
            block.occupiedProperties = `${stat.occupied}/${stat.total}`;
            block.income = stat.income;
            block.cost = stat.cost;
            block.storage = stat.storage;
            block.image = imageMap[block.name] || block.image; // Update image if available in imageMap
            block.id = blockIdMap[block.name] || block.id; // Update ID from blockIdMap
            block.properties = stat.properties;
            filteredBlocks.push(block);
        } else {
            console.log(`Removing block "${block.name}" because it is missing in renters.csv.`);
        }
    });

    const existingBlockNames = new Set(filteredBlocks.map(b => b.name));

    // Check for any new blocks in stats
    for (const [name, stat] of Object.entries(stats)) {
        if (stat.total > 0 && !existingBlockNames.has(name)) {
            const blockId = blockIdMap[name] || Math.max(...Object.values(blockIdMap)) + 1;
            const newBlock = {
                id: blockId,
                name: name,
                occupiedProperties: `${stat.occupied}/${stat.total}`,
                income: stat.income,
                cost: stat.cost,
                image: imageMap[name] || "assets/Blocks/Adhikari-Builders.png", // Use property-specific image or default asset
                storage: stat.storage,
                properties: stat.properties
            };
            filteredBlocks.push(newBlock);
            console.log(`Automatically added new block to website: "${name}" (Block #${blockId})`);
        }
    }

    // Format back to string
    let newBlocksString = JSON.stringify(filteredBlocks, null, 4);
    // Remove quotes from keys
    newBlocksString = newBlocksString.replace(/"([^"]+)":/g, '$1:');

    // Replace in file
    content = content.replace(regex, `const propertyBlocks = ${newBlocksString};`);
    fs.writeFileSync(dataJsPath, content, 'utf8');
    console.log("Successfully updated data.js with new statistics.");
}

try {
    const stats = processCSV();
    updateDataJs(stats);
} catch (e) {
    console.error("Error updating stats:", e);
}
