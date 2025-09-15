#!/usr/bin/env node

// Development helper script
// Run with: node scripts/dev-setup.js

const fs = require('fs');
const path = require('path');

console.log('🎅 Jolly AF Development Setup');
console.log('============================');

// Check if node_modules exists
if (!fs.existsSync('node_modules')) {
  console.log('❌ node_modules not found. Run: pnpm install');
  process.exit(1);
}

// Check if .env.local exists
if (!fs.existsSync('.env.local')) {
  console.log('📝 Creating .env.local from example...');
  fs.writeFileSync('.env.local', '# Add your environment variables here\n');
}

console.log('✅ Setup complete!');
console.log('🚀 Run: pnpm dev');
console.log('🌐 Open: http://localhost:3000');
console.log('');
console.log('📋 Next steps:');
console.log('1. Update colors in tailwind.config.ts');
console.log('2. Customize content in app/page.tsx');
console.log('3. Add your GHL calendar embed');
console.log('4. Deploy to Vercel');
