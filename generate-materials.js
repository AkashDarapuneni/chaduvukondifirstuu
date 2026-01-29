const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, 'assets');
const OUTPUT_FILE = path.join(__dirname, 'js', 'materials-data.js');

const categories = [
    { dir: 'ppts', type: 'ppt' },
    { dir: 'pdfs', type: 'pdf' },
    { dir: 'notes', type: 'note' }
];

let materials = [];
let idCounter = 1;

categories.forEach(cat => {
    const catDir = path.join(ASSETS_DIR, cat.dir);
    
    if (fs.existsSync(catDir)) {
        const files = fs.readdirSync(catDir);
        
        files.forEach(file => {
            // Ignore hidden files
            if (file.startsWith('.')) return;
            
            // Simple title formatting: remove extension, replace underscores/hyphens with spaces
            const title = file.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
            
            materials.push({
                id: idCounter++,
                title: title,
                type: cat.type,
                description: `File: ${file}`, // Generic description for auto-generated items
                filename: file
            });
        });
    }
});

const content = `// Auto-generated file. Do not edit manually.
window.MATERIALS_DATA = ${JSON.stringify(materials, null, 4)};
`;

fs.writeFileSync(OUTPUT_FILE, content);
console.log(`Successfully generated ${materials.length} items to ${OUTPUT_FILE}`);
