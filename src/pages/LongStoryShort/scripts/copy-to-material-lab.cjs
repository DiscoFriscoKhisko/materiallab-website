#!/usr/bin/env node

/**
 * Long Story Short → Material Lab Component Copy System
 * 
 * This script copies approved components from LSS experimental system
 * to the production Material Lab design system.
 */

const fs = require('fs');
const path = require('path');

// Paths
const LSS_PATH = '/Users/damini/materiallab-website/src/pages/LongStoryShort';
const MATERIAL_LAB_PATH = '/Users/damini/materiallab-website/src/components/ML';
const TOKENS_PATH = '/Users/damini/materiallab-website/src/styles/tokens.css';

// Component mapping: LSS → Material Lab
const COMPONENT_MAPPINGS = {
  // Atoms
  'atomic/atoms/TypographyPlayground.tsx': 'Typography/TypographyPlayground.tsx',
  'atomic/atoms/GradientShowcase.tsx': 'Gradients/GradientShowcase.tsx',
  'atomic/atoms/DesignTokensDisplay.tsx': 'Tokens/DesignTokensDisplay.tsx',
  
  // Molecules
  'atomic/molecules/TypeTester.tsx': 'TypeTester/TypeTester.tsx',
  'atomic/molecules/ModeShowcase.tsx': 'ModeShowcase/ModeShowcase.tsx',
  
  // Organisms
  'atomic/organisms/ColorSystemShowcase.tsx': 'ColorSystem/ColorSystemShowcase.tsx',
  'atomic/organisms/LivePreview.tsx': 'Preview/LivePreview.tsx',
  'atomic/organisms/MoodBoardSection.tsx': 'MoodBoard/MoodBoardSection.tsx'
};

// Token mappings: LSS experimental → Material Lab production
const TOKEN_MAPPINGS = {
  '--lss-space-': '--ml-space-',
  '--lss-text-': '--ml-text-',
  '--lss-radius-': '--ml-radius-',
  '--lss-shadow-': '--ml-shadow-',
  '--lss-duration-': '--ml-duration-',
  '--lss-ease-': '--ml-ease-',
  '--lss-glass-': '--ml-glass-',
  '--lss-button-': '--ml-button-',
  '--lss-card-': '--ml-card-',
  '--lss-input-': '--ml-input-',
  '--lss-modal-': '--ml-modal-'
};

/**
 * Copies a component from LSS to Material Lab
 */
function copyComponent(lssComponent, mlComponent) {
  const sourcePath = path.join(LSS_PATH, lssComponent);
  const destDir = path.dirname(path.join(MATERIAL_LAB_PATH, mlComponent));
  const destPath = path.join(MATERIAL_LAB_PATH, mlComponent);
  
  console.log(`📋 Copying: ${lssComponent} → ${mlComponent}`);
  
  try {
    // Check if source exists
    if (!fs.existsSync(sourcePath)) {
      console.log(`❌ Source not found: ${sourcePath}`);
      return false;
    }
    
    // Create destination directory
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
      console.log(`📁 Created directory: ${destDir}`);
    }
    
    // Read and transform content
    let content = fs.readFileSync(sourcePath, 'utf8');
    
    // Transform imports (LSS → ML paths)
    content = content.replace(/from '\.\.\/\.\.\/\.\.\/components\/ML'/g, "from '../'");
    content = content.replace(/from '\.\.\/atomic'/g, "from '../'");
    
    // Transform CSS classes (lss- → ml-)
    content = content.replace(/lss-/g, 'ml-');
    
    // Transform CSS custom properties
    Object.entries(TOKEN_MAPPINGS).forEach(([lssToken, mlToken]) => {
      const regex = new RegExp(lssToken.replace(/-/g, '\\-'), 'g');
      content = content.replace(regex, mlToken);
    });
    
    // Write to destination
    fs.writeFileSync(destPath, content);
    console.log(`✅ Copied successfully`);
    return true;
    
  } catch (error) {
    console.log(`❌ Error copying ${lssComponent}: ${error.message}`);
    return false;
  }
}

/**
 * Copies experimental tokens to production tokens
 */
function copyTokens() {
  const sourcePath = path.join(LSS_PATH, 'tokens/experimental-tokens.css');
  
  console.log(`📋 Copying experimental tokens to production...`);
  
  try {
    if (!fs.existsSync(sourcePath)) {
      console.log(`❌ Experimental tokens not found: ${sourcePath}`);
      return false;
    }
    
    let content = fs.readFileSync(sourcePath, 'utf8');
    let productionTokens = fs.readFileSync(TOKENS_PATH, 'utf8');
    
    // Transform LSS tokens to ML tokens
    Object.entries(TOKEN_MAPPINGS).forEach(([lssToken, mlToken]) => {
      const regex = new RegExp(lssToken.replace(/-/g, '\\-'), 'g');
      content = content.replace(regex, mlToken);
    });
    
    // Remove experimental comments and add production comments
    content = content.replace(/Long Story Short - Experimental Design Tokens/g, 'Material Lab - Production Design Tokens (From LSS)');
    content = content.replace(/EXPERIMENTAL/g, 'PRODUCTION');
    
    // Append to production tokens (before the closing)
    const insertionPoint = productionTokens.lastIndexOf('}');
    const newTokens = productionTokens.substring(0, insertionPoint) + 
                      '\\n\\n  /* === TOKENS PROMOTED FROM LSS === */\\n' +
                      content.replace(':root {', '').replace(/}\\s*$/, '') + '\\n' +
                      productionTokens.substring(insertionPoint);
    
    // Create backup
    fs.writeFileSync(TOKENS_PATH + '.backup', productionTokens);
    fs.writeFileSync(TOKENS_PATH, newTokens);
    
    console.log(`✅ Tokens copied successfully`);
    console.log(`💾 Backup created: ${TOKENS_PATH}.backup`);
    return true;
    
  } catch (error) {
    console.log(`❌ Error copying tokens: ${error.message}`);
    return false;
  }
}

/**
 * Main execution
 */
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
🚀 LSS → Material Lab Copy System

Usage:
  node copy-to-material-lab.js <component>  Copy specific component
  node copy-to-material-lab.js tokens       Copy experimental tokens
  node copy-to-material-lab.js all          Copy all approved components
  node copy-to-material-lab.js list         List available components

Available components:
${Object.keys(COMPONENT_MAPPINGS).map(comp => `  - ${comp}`).join('\\n')}
    `);
    return;
  }
  
  const command = args[0].toLowerCase();
  
  switch (command) {
    case 'list':
      console.log('📋 Available LSS Components:');
      Object.entries(COMPONENT_MAPPINGS).forEach(([lss, ml]) => {
        console.log(`  ${lss} → ${ml}`);
      });
      break;
      
    case 'tokens':
      copyTokens();
      break;
      
    case 'all':
      console.log('🚀 Copying all approved components...');
      let success = 0, failed = 0;
      
      Object.entries(COMPONENT_MAPPINGS).forEach(([lss, ml]) => {
        if (copyComponent(lss, ml)) {
          success++;
        } else {
          failed++;
        }
      });
      
      console.log(`\\n📊 Copy Summary: ${success} successful, ${failed} failed`);
      
      if (copyTokens()) {
        console.log('📊 Tokens copied successfully');
      }
      break;
      
    default:
      // Try to copy specific component
      if (COMPONENT_MAPPINGS[command]) {
        copyComponent(command, COMPONENT_MAPPINGS[command]);
      } else {
        console.log(`❌ Unknown component: ${command}`);
        console.log('Use "list" to see available components');
      }
      break;
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { copyComponent, copyTokens, COMPONENT_MAPPINGS, TOKEN_MAPPINGS };