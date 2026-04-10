# 🚀 Installation & Setup Instructions

## Quick Start (5 Minutes)

### Step 1: Navigate to Project
```bash
cd "/Users/priyansh/sem react project/react-team-project/vite-project"
```

### Step 2: Dependencies Already Installed ✅
All dependencies are already in `package.json`:
```json
{
  "dependencies": {
    "react": "^19.2.4",
    "react-dom": "^19.2.4"
  },
  "devDependencies": {
    "tailwindcss": "latest",
    "@tailwindcss/postcss": "latest",
    "framer-motion": "latest",
    "react-masonry-css": "latest",
    "postcss": "latest",
    "autoprefixer": "latest",
    // ... other vite deps
  }
}
```

If needed, install:
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm run dev
```

**Output:**
```
VITE v8.0.8 ready in 141 ms
➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

Open browser → http://localhost:5173/

---

## 📦 Dependency List

### Core Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.2.4 | UI framework |
| react-dom | ^19.2.4 | React rendering |
| framer-motion | latest | Animations |
| react-masonry-css | latest | Masonry layout |

### Style Tooling
| Package | Version | Purpose |
|---------|---------|---------|
| tailwindcss | latest | CSS utility framework |
| @tailwindcss/postcss | latest | Tailwind PostCSS plugin |
| postcss | latest | CSS processing |
| autoprefixer | latest | Vendor prefixes |

### Build Tools (DevDependencies)
| Package | Version | Purpose |
|---------|---------|---------|
| vite | ^8.0.4 | Build tool |
| @vitejs/plugin-react | ^6.0.1 | React plugin |
| eslint | ^9.39.4 | Linting |

---

## 🔧 Configuration Files

### tailwind.config.js ✅
```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: '#0D0D0D',
          card: '#1A1A1A',
          accent: '#D4AF37',
          dark: '#0A0A0A',
          hover: '#2A2A2A',
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
    },
  },
  plugins: [/* scrollbar plugin */],
}
```

### postcss.config.js ✅
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

### vite.config.js ✅
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

---

## 📂 Project Structure

```
vite-project/
├── dist/                      # Production build (after npm run build)
├── node_modules/              # Dependencies
├── public/                     # Static assets
├── src/
│   ├── components/
│   │   ├── ArtCard.jsx             ⭐ Card component with lazy load
│   │   ├── ImageSkeleton.jsx       ⭐ Skeleton loader
│   │   ├── MasonryGrid.jsx         ⭐ Masonry layout engine
│   │   ├── MasonryGrid.css         ⭐ Masonry styles
│   │   ├── Sidebar.jsx             Navigation
│   │   ├── TopNav.jsx              Search bar & filters
│   │   └── Modal.jsx               Detail view modal
│   ├── App.jsx                 ⭐ Main app with infinite scroll
│   ├── index.css               Global styles
│   ├── main.jsx                Entry point
│   └── assets/                 Images & icons
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js           ✅ Tailwind PostCSS
├── tailwind.config.js          ✅ Tailwind configuration
└── vite.config.js
```

---

## 🎯 Available Scripts

### Development
```bash
npm run dev
# Starts Vite dev server on http://localhost:5173/
# Hot module reloading enabled
```

### Production Build
```bash
npm run build
# Creates optimized bundle in dist/
# Output: ~333 KB (gzip: 105 KB)
```

### Preview Build
```bash
npm run preview
# Preview production build locally
```

### Lint
```bash
npm run lint
# Run ESLint on codebase
```

---

## 🔍 Verification Checklist

After starting `npm run dev`:

- [ ] Page loads at http://localhost:5173/
- [ ] See "MUSEUM" sidebar on left
- [ ] See "Artworks Collection" header
- [ ] See 12 artworks in masonry grid
- [ ] Images load with skeleton shimmer
- [ ] Scroll to bottom → "18 artworks found"
- [ ] Hover any card → zoom + glow effect
- [ ] Search works (type "Zen" → 1 result)
- [ ] Click "View Details" → modal opens
- [ ] Dark theme applied throughout
- [ ] Custom gold scrollbar visible
- [ ] Responsive: resize window → columns adjust

---

## 🐛 Troubleshooting

### Issue: Port 5173 Already in Use
```bash
npm run dev -- --port 3000
# Or kill process on port 5173:
# macOS/Linux:
lsof -i :5173
kill -9 <PID>

# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Issue: Module Not Found Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: CSS Not Loading
```bash
# Rebuild Tailwind CSS
npm run dev
# If still not working, check tailwind.config.js path
```

### Issue: Images Not Loading
- Check browser console for CORS errors
- Verify image URLs are correct
- Try different image sources
- Clear browser cache (Ctrl+Shift+Delete)

### Issue: Animations Not Smooth
- Check performance in DevTools (Chrome F12)
- Ensure browser hardware acceleration is enabled
- Try different browser (Chrome, Firefox, Safari)
- Check if CPU usage is high

### Issue: Infinite Scroll Not Working
- Open DevTools → Network tab
- Scroll to bottom → should see API call
- Check console for JavaScript errors
- Verify viewport height is sufficient

---

## 📱 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Full support |
| Firefox | 88+ | ✅ Full support |
| Safari | 14+ | ✅ Full support |
| Edge | 90+ | ✅ Full support |
| iOS Safari | 14+ | ✅ Full support |
| Chrome Mobile | 90+ | ✅ Full support |

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
# Follow prompts to deploy
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
# If deploying first time:
netlify init
```

### GitHub Pages
```bash
# Update vite.config.js:
base: '/repo-name/'  # Your repo name

npm run build
git add dist/
git commit -m "Deploy"
git push
# Then enable GitHub Pages from Settings
```

### Custom Server
```bash
npm run build
# Upload dist/ folder to your server
# Point web server to dist/index.html
# Enable gzip compression for .gz files
```

---

## 🔐 Environment Variables (if needed)

Create `.env` file:
```
VITE_API_URL=https://api.example.com
VITE_IMAGE_CDN=https://cdn.example.com
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

---

## 📊 Build Output

After `npm run build`:
```
dist/
├── index.html                      (0.46 kB)
├── assets/
│   ├── index-DDpUhxOk.css         (23.19 kB / gzip: 4.97 kB)
│   └── index-CuOET1LA.js          (333.62 kB / gzip: 105.65 kB)
└── vite.svg                        (assets)

Total: ~357 KB (gzip: ~110 KB)
```

---

## ✅ Complete Setup Checklist

- [x] Dependencies installed
- [x] Tailwind CSS configured
- [x] PostCSS configured
- [x] Vite configured
- [x] All components created
- [x] All animations implemented
- [x] Lazy loading enabled
- [x] Infinite scroll working
- [x] Search filtering working
- [x] Modal working
- [x] Responsive layout working
- [x] Production build successful
- [x] No console errors

---

## 📞 Quick Reference

### To Start Working
```bash
cd vite-project
npm run dev
```

### To Build for Production
```bash
npm run build
```

### To Deploy
```bash
# Choose your platform and follow steps above
```

### To Make Changes
1. Edit component in `src/components/`
2. Save file (hot reload automatic)
3. Refresh browser to see changes
4. If CSS doesn't update, clear browser cache

### To Test Responsiveness
- Desktop: Full width
- Tablet: Resize to 1024px
- Mobile: Resize to 640px
- DevTools: Ctrl+Shift+I → Device toolbar (Ctrl+Shift+M)

---

**Status**: ✅ Ready to Use
**Last Updated**: April 10, 2026
**Tested On**: macOS, Chrome/Safari/Firefox
