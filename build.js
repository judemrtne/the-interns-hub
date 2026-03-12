const fs = require('fs');
const path = require('path');

const SRC = '.';
const DIST = 'dist';

// Clean and recreate dist
if (fs.existsSync(DIST)) {
  fs.rmSync(DIST, { recursive: true });
}
fs.mkdirSync(DIST, { recursive: true });

// Files to copy
const filesToCopy = [
  'index.html', 'dashboard.html', 'interns.html', 'messages.html',
  'announcements.html', 'admin.html', 'chat.html',
  'config.js', 'style.css', 'sw.js', 'manifest.json',
  'favicon.ico', 'og-image.png', 'apple-touch-icon.png',
  'icon-16.png', 'icon-32.png', 'icon-72.png', 'icon-96.png',
  'icon-128.png', 'icon-144.png', 'icon-152.png', 'icon-180.png',
  'icon-192.png', 'icon-384.png', 'icon-512.png',
];

filesToCopy.forEach(file => {
  const src = path.join(SRC, file);
  const dest = path.join(DIST, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`✓ Copied ${file}`);
  }
});

console.log('\n✅ Build complete → /dist');
