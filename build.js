#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Cross-platform build script for GENESIS REAL ESTATE
const distDir = path.join(__dirname, 'dist');

// Remove dist directory if it exists
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
  console.log('✓ Cleaned dist directory');
}

// Create dist directory
fs.mkdirSync(distDir, { recursive: true });
console.log('✓ Created dist directory');

// Function to copy files recursively
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const files = fs.readdirSync(src);
  files.forEach(file => {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    
    if (fs.statSync(srcFile).isDirectory()) {
      copyDir(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  });
}

// Copy files
fs.copyFileSync(path.join(__dirname, 'index.html'), path.join(distDir, 'index.html'));
console.log('✓ Copied index.html');

copyDir(path.join(__dirname, 'css'), path.join(distDir, 'css'));
console.log('✓ Copied css/');

copyDir(path.join(__dirname, 'js'), path.join(distDir, 'js'));
console.log('✓ Copied js/');

copyDir(path.join(__dirname, 'assets'), path.join(distDir, 'assets'));
console.log('✓ Copied assets/');

console.log('\n✅ Build complete! dist/ directory is ready for deployment.');
