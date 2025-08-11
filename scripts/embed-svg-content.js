#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script to embed all SVG flag content into a JavaScript object
 * This eliminates the need for HTTP requests and makes flags load instantly
 */

function embedSvgContent() {
  try {
    const flagsDir = path.join(__dirname, '../flags');
    const outputFile = path.join(__dirname, '../src/embedded-flags.ts');
    
    if (!fs.existsSync(flagsDir)) {
      console.error('❌ Flags directory not found:', flagsDir);
      process.exit(1);
    }

    const files = fs.readdirSync(flagsDir);
    const svgFiles = files.filter(file => file.endsWith('.svg')).sort();

    console.log(`📁 Found ${svgFiles.length} SVG files`);

    // Create the embedded flags object
    let embeddedContent = `// Auto-generated file - do not edit manually
// This file contains all SVG flag content embedded for instant access

export const EMBEDDED_FLAGS: Record<string, string> = {
`;

    let processedCount = 0;
    for (const file of svgFiles) {
      const countryCode = file.replace('.svg', '');
      const filePath = path.join(flagsDir, file);
      const svgContent = fs.readFileSync(filePath, 'utf8');
      
      // Escape the SVG content for JavaScript
      const escapedContent = svgContent
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t');

      embeddedContent += `  '${countryCode}': '${escapedContent}',\n`;
      processedCount++;
    }

    embeddedContent += `};

// Type for available country codes
export type EmbeddedCountryCode = keyof typeof EMBEDDED_FLAGS;

// Helper function to get flag content
export const getEmbeddedFlag = (countryCode: string): string | null => {
  const normalizedCode = countryCode.toLowerCase();
  return EMBEDDED_FLAGS[normalizedCode] || null;
};

// Get all available country codes
export const getEmbeddedCountryCodes = (): string[] => {
  return Object.keys(EMBEDDED_FLAGS);
};

// Check if a country code is available
export const isEmbeddedCountryAvailable = (countryCode: string): boolean => {
  const normalizedCode = countryCode.toLowerCase();
  return normalizedCode in EMBEDDED_FLAGS;
};
`;

    // Write the embedded content
    fs.writeFileSync(outputFile, embeddedContent, 'utf8');

    console.log(`✅ Successfully embedded ${processedCount} flag files`);
    console.log(`📁 Output: ${outputFile}`);
    console.log(`📊 File size: ${(fs.statSync(outputFile).size / 1024).toFixed(2)} KB`);

  } catch (error) {
    console.error('❌ Error embedding SVG content:', error.message);
    process.exit(1);
  }
}

// Run the script
embedSvgContent();
