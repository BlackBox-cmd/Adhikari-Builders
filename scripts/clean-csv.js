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
    // Check if input file exists
    if (!fs.existsSync(inputPath)) {
        console.error(`✗ Input file not found: ${inputPath}`);
        process.exit(1);
    }

    const rawContent = fs.readFileSync(inputPath, 'utf8');
    
    // Check if file is empty
    if (!rawContent || rawContent.trim().length === 0) {
        console.error('✗ Input file is empty');
        process.exit(1);
    }

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
    
    // Check if we have data after cleaning
    if (cleanedLines.length === 0) {
        console.error('✗ No data found after cleaning');
        process.exit(1);
    }

    // Verify first line looks like a header
    if (!cleanedLines[0].includes('Status') && !cleanedLines[0].includes('Address')) {
        console.error('✗ First line does not appear to be a valid header:', cleanedLines[0]);
        process.exit(1);
    }

    // Write the cleaned CSV
    const cleanedContent = cleanedLines.join('\n');
    fs.writeFileSync(outputPath, cleanedContent, 'utf8');
    
    console.log(`✓ Successfully cleaned CSV export`);
    console.log(`  Input: ${inputPath}`);
    console.log(`  Output: ${outputPath}`);
    console.log(`  Lines: ${cleanedLines.length}`);
    console.log(`  First line: ${cleanedLines[0].substring(0, 80)}...`);
    
} catch (error) {
    console.error('✗ Error cleaning CSV:', error.message);
    process.exit(1);
}
