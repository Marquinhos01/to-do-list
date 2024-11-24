const fs = require('fs');
const path = require('path');

function generateTree(dir, prefix = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const isLast = i === entries.length - 1;
    const pointer = isLast ? '└── ' : '├── ';
    console.log(`${prefix}${pointer}${entry.name}`);

    if (entry.isDirectory()) {
      const newPrefix = prefix + (isLast ? '    ' : '│   ');
      generateTree(path.join(dir, entry.name), newPrefix);
    }
  }
}

// Genera el árbol desde la carpeta actual
generateTree('./');
