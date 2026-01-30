# Chaduvukondi Firstuu - Exam Prep Site

An exam preparation website that automatically syncs with GitHub and Netlify.

## 🚀 How It Works

This site automatically updates when you push changes to GitHub:

### Adding New Materials

1. **Add files to the appropriate folder:**
   - PPT files → `assets/ppts/`
   - PDF files → `assets/pdfs/`
   - Notes (txt files) → `assets/notes/`

2. **File naming convention:**
   - Use underscores or hyphens to separate words
   - Example: `biology_fundamentals.ppt` will display as "biology fundamentals"
   - Example: `chemistry-organic.pdf` will display as "chemistry organic"

3. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add new study materials"
   git push
   ```

4. **Automatic deployment:**
   - Netlify detects the push
   - Runs `npm run build` to scan your files
   - Generates `js/materials-data.js` automatically
   - Deploys the updated site

### Removing Materials

1. Delete the file from the appropriate folder
2. Push to GitHub
3. The file will automatically be removed from the site

### How the File Display Works

- The display name comes from the filename
- Underscores (_) and hyphens (-) are converted to spaces
- The file extension determines the category (PPT/PDF/Note)
- Example: `math_unit1.ppt` → displays as "math unit1" in Presentations

## 📁 Project Structure

```
exam-site/
├── assets/
│   ├── pdfs/        # PDF documents
│   ├── ppts/        # PowerPoint presentations
│   ├── notes/       # Text notes
│   └── images/      # Site images and GIFs
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   └── materials-data.js  # Auto-generated
├── generate-materials.js   # Build script
├── index.html
├── package.json
└── netlify.toml     # Netlify configuration

```

## 🛠️ Local Development

To test locally before pushing:

```bash
# Generate materials list
npm run build

# Open index.html in your browser
```

## 🌐 Deployment

Connected to Netlify for automatic deployment:
- Every push to main branch triggers a new build
- Build process scans assets folder
- Site updates automatically

## 📝 Notes

- Materials are generated automatically from filenames
- No need to manually edit `materials-data.js`
- Just add/remove files from the assets folders
