const fs = require('fs');
const path = require('path');

/**
 * Generate country list from SVG files
 */
function generateCountryList() {
  const flagsDir = path.join(__dirname, '../flags');
  const outputFile = path.join(__dirname, '../src/country-list.ts');
  
  try {
    // Read all SVG files
    const files = fs.readdirSync(flagsDir);
    const svgFiles = files.filter(file => file.endsWith('.svg'));
    
    // Extract country codes
    const countryCodes = svgFiles.map(file => file.replace('.svg', ''));
    
    // Sort alphabetically
    countryCodes.sort();
    
    // Generate TypeScript file
    const content = `// Auto-generated file - do not edit manually
// Generated on: ${new Date().toISOString()}

export const AVAILABLE_COUNTRIES = ${JSON.stringify(countryCodes, null, 2)} as const;

export type AvailableCountryCode = typeof AVAILABLE_COUNTRIES[number];

export const isAvailableCountry = (code: string): code is AvailableCountryCode => {
  return AVAILABLE_COUNTRIES.includes(code as AvailableCountryCode);
};
`;
    
    fs.writeFileSync(outputFile, content);
    
    console.log(`✅ Generated country list with ${countryCodes.length} countries`);
    console.log(`📁 Output: ${outputFile}`);
    
    // Log some statistics
    console.log('\n📊 Statistics:');
    console.log(`- Total countries: ${countryCodes.length}`);
    console.log(`- First country: ${countryCodes[0]}`);
    console.log(`- Last country: ${countryCodes[countryCodes.length - 1]}`);
    
  } catch (error) {
    console.error('❌ Error generating country list:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  generateCountryList();
}

module.exports = { generateCountryList };
