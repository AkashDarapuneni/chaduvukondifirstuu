# 🚀 Deployment Guide - GitHub to Netlify Auto-Sync

Follow these steps to set up automatic deployment with GitHub and Netlify.

## Step 1: Push Your Code to GitHub

### If you haven't initialized Git yet:

```bash
# Initialize Git repository
git init

# Add all files
git add .

# Make your first commit
git commit -m "Initial commit - Exam prep site with auto-sync"

# Create a new repository on GitHub (go to github.com)
# Then link it to your local repository:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

### If you already have a Git repository:

```bash
# Add new files
git add .

# Commit changes
git commit -m "Add Netlify auto-sync configuration"

# Push to GitHub
git push
```

## Step 2: Connect to Netlify

1. Go to [netlify.com](https://netlify.com) and sign up/log in
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" as your Git provider
4. Authorize Netlify to access your GitHub account
5. Select your repository (`YOUR_REPO_NAME`)
6. Netlify will auto-detect settings from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `.` (root)
7. Click "Deploy site"

## Step 3: Wait for Initial Deployment

- Netlify will build and deploy your site (takes 1-2 minutes)
- You'll get a random URL like `random-name-12345.netlify.app`
- You can customize this in Site settings → Domain management

## Step 4: Test Automatic Updates

### Adding a New File:

1. Add a new PDF/PPT/Note to the appropriate folder:
   ```bash
   # Example: Add a new PDF
   # Just copy your file to: assets/pdfs/new_topic.pdf
   ```

2. Push to GitHub:
   ```bash
   git add .
   git commit -m "Add new study material"
   git push
   ```

3. **Automatic magic happens:**
   - Netlify detects the push
   - Runs `npm run build`
   - Scans `assets/` folders
   - Generates new `materials-data.js`
   - Deploys updated site

4. Visit your site - the new file appears automatically! ✨

### Removing a File:

1. Delete the file from the assets folder
2. Push to GitHub:
   ```bash
   git add .
   git commit -m "Remove outdated material"
   git push
   ```

3. Netlify rebuilds and the file disappears from the site automatically!

## 🎯 That's It!

From now on:
- **Add file** → Push to GitHub → File appears on site
- **Delete file** → Push to GitHub → File disappears from site
- **Rename file** → Push to GitHub → Display name updates

The filename becomes the display name:
- `biology_chapter1.pdf` → "biology chapter1"
- `math-formulas.ppt` → "math formulas"
- `quick_notes.txt` → "quick notes"

## 🔧 Troubleshooting

### Build fails on Netlify:
- Check the deploy log on Netlify dashboard
- Make sure `package.json` exists
- Ensure `generate-materials.js` is in the repository

### Files not showing up:
- Verify files are in correct folders: `assets/pdfs/`, `assets/ppts/`, `assets/notes/`
- Check that files don't start with a dot (.)
- Run `npm run build` locally to test

### Need to rebuild without pushing:
- Go to Netlify dashboard
- Click "Trigger deploy" → "Clear cache and deploy site"

## 📱 Optional: Custom Domain

In Netlify:
1. Go to Domain settings
2. Add your custom domain
3. Follow DNS configuration instructions
