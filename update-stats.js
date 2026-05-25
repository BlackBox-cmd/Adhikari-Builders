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

function processCSV() {
    const csvContent = fs.readFileSync(csvFilePath, 'utf8');
    const lines = csvContent.trim().split('\n');
    
    // Skip header
    const dataLines = lines.slice(1);

    // Dynamically discover any new prefixes from the CSV and add to prefixMap
    dataLines.forEach(line => {
        const cols = line.split(',');
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
        const cols = line.split(',');
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
            block.properties = stat.properties;
            filteredBlocks.push(block);
        } else {
            console.log(`Removing block "${block.name}" because it is missing in renters.csv.`);
        }
    });

    const existingBlockNames = new Set(filteredBlocks.map(b => b.name));

    // Find the highest ID to assign new unique IDs
    let maxId = 0;
    filteredBlocks.forEach(b => {
        if (b.id && b.id > maxId) {
            maxId = b.id;
        }
    });

    // Check for any new blocks in stats
    for (const [name, stat] of Object.entries(stats)) {
        if (stat.total > 0 && !existingBlockNames.has(name)) {
            maxId += 1;
            const newBlock = {
                id: maxId,
                name: name,
                occupiedProperties: `${stat.occupied}/${stat.total}`,
                income: stat.income,
                cost: stat.cost,
                image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80", // Premium building placeholder
                storage: stat.storage,
                properties: stat.properties
            };
            filteredBlocks.push(newBlock);
            console.log(`Automatically added new block to website: "${name}" (Block #${maxId})`);
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
