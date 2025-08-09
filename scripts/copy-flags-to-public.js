#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script to copy SVG flag files to the public directory of the consuming project
 * This ensures the flags are accessible when the package is installed
 */

function copyFlagsToPublic() {
  try {
    // Get the package directory (where this script is located)
    const packageDir = path.resolve(__dirname, '..');
    const flagsSourceDir = path.join(packageDir, 'flags');
    
    // Try to find the consuming project's public directory
    const possiblePublicDirs = [
      path.resolve(process.cwd(), 'public'),
      path.resolve(process.cwd(), 'static'),
      path.resolve(process.cwd(), 'assets'),
      path.resolve(process.cwd(), 'src/assets'),
      path.resolve(process.cwd(), 'src/public')
    ];

    let targetDir = null;
    for (const dir of possiblePublicDirs) {
      if (fs.existsSync(dir)) {
        targetDir = dir;
        break;
      }
    }

    // If no public directory found, create one
    if (!targetDir) {
      targetDir = path.resolve(process.cwd(), 'public');
      fs.mkdirSync(targetDir, { recursive: true });
      console.log(`✅ Created public directory at: ${targetDir}`);
    }

    // Create flags subdirectory in the public directory
    const flagsTargetDir = path.join(targetDir, 'flags');
    if (!fs.existsSync(flagsTargetDir)) {
      fs.mkdirSync(flagsTargetDir, { recursive: true });
      console.log(`✅ Created flags directory at: ${flagsTargetDir}`);
    }

    // Copy all SVG files
    if (!fs.existsSync(flagsSourceDir)) {
      console.error('❌ Source flags directory not found:', flagsSourceDir);
      process.exit(1);
    }

    const files = fs.readdirSync(flagsSourceDir);
    const svgFiles = files.filter(file => file.endsWith('.svg'));

    let copiedCount = 0;
    for (const file of svgFiles) {
      const sourcePath = path.join(flagsSourceDir, file);
      const targetPath = path.join(flagsTargetDir, file);
      
      fs.copyFileSync(sourcePath, targetPath);
      copiedCount++;
    }

    console.log(`✅ Successfully copied ${copiedCount} flag files to: ${flagsTargetDir}`);
    console.log('📝 The flags are now accessible at: /flags/{country-code}.svg');
    console.log('💡 Make sure your web server serves static files from the public directory');

  } catch (error) {
    console.error('❌ Error copying flag files:', error.message);
    process.exit(1);
  }
}

// Run the script
copyFlagsToPublic();
