const fs = require('fs');
const path = require('path');

/**
 * Clean up malformed CSV export from Google Sheets where each row is wrapped in quotes
 * Input: renters_raw.csv (each row wrapped in quotes as literal characters)
 * Output: renters.csv (proper CSV format)
 * 
 * Example:
 *   Input:  "Status,Address,Interior,..."
 *   Output: Status,Address,Interior,...
 */

const inputPath = path.join(__dirname, '..', 'renters_raw.csv');
const outputPath = path.join(__dirname, '..', 'renters.csv');

try {
    const rawContent = fs.readFileSync(inputPath, 'utf8');
    // Split by newlines but preserve the ability to handle different line endings
    const lines = rawContent.split(/\r?\n/);
    
    // Remove outer quotes from each line (they are literal quote characters)
    const cleanedLines = lines
        .map(line => {
            line = line.trim(); // Remove any whitespace including \r
            // Check if line starts and ends with literal quote character (")
            if (line.startsWith('"') && line.endsWith('"')) {
                // Remove the first and last character (the quotes)
                line = line.slice(1, -1);
            }
            return line;
        })
        .filter(line => line.length > 0); // Remove empty lines
    
    // Write the cleaned CSV
    const cleanedContent = cleanedLines.join('\n');
    fs.writeFileSync(outputPath, cleanedContent, 'utf8');
    
    console.log(`✓ Successfully cleaned CSV export`);
    console.log(`  Input: ${inputPath}`);
    console.log(`  Output: ${outputPath}`);
    console.log(`  Lines: ${cleanedLines.length}`);
    console.log(`  First line: ${cleanedLines[0]}`);
    
} catch (error) {
    console.error('✗ Error cleaning CSV:', error.message);
    process.exit(1);
}
