# StreamHub

Premium React + Vite web app for **video + product discovery** in one place.

Users can:
- Discover YouTube videos with search and modal playback
- Discover products from Fake Store API
- Add products to cart and manage quantity
- View prices in INR
- Switch between dark and light theme with persistence

---

## Project Overview

StreamHub is designed as a modern, scalable frontend project with:
- clean component architecture
- reusable hooks and context
- responsive UI
- professional glassmorphism + animated gradient visuals
- robust loading/error states

This project is built using **React functional components**, **hooks**, and **plain CSS only**.

---

## Tech Stack

- React
- Vite
- JavaScript (ES Modules)
- Plain CSS (no Tailwind / Bootstrap / UI framework)
- YouTube Data API v3
- Fake Store API

---

## Core Features

### 1) Video Discovery
- Fetches videos from YouTube Data API v3
- Search-based queries
- Responsive card grid
- Video title + channel details
- Click card to open embedded player modal
- Loading skeleton + retry UI on error

### 2) Product Discovery
- Fetches products from Fake Store API
- Client-side filtering with search
- Product cards with image/title/price/rating
- Add to cart flow

### 3) Cart Management
- Global cart state via context
- Add item
- Update quantity (+/-)
- Remove single item
- Clear full cart
- Cart badge count in navbar
- Total calculation

### 4) INR Price Display
- API prices are USD by default
- UI converts and displays values in INR format
- Formatter handled through utility function

### 5) Theme System
- Light / dark toggle
- Saved in `localStorage`
- Restored automatically on reload

### 6) UI/UX
- Sticky glassmorphism navbar
- Smooth hover, fade, and scale transitions
- Animated background accents
- Mobile-first responsive behavior
- Dedicated loading and error states

---

## Folder Structure

```text
streamhub/
├── public/
├── src/
│   ├── components/
│   │   ├── Cart/
│   │   ├── Navbar/
│   │   ├── ProductCard/
│   │   ├── VideoCard/
│   │   └── VideoModal/
│   ├── context/
│   │   ├── CartContext.jsx
│   │   └── ThemeContext.jsx
│   ├── hooks/
│   │   ├── useCart.jsx
│   │   ├── useProducts.js
│   │   ├── useTheme.jsx
│   │   └── useYouTubeVideos.js
│   ├── utils/
│   │   └── currency.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .env.example
├── package.json
└── README.md
```

---

## API Configuration

### YouTube Data API v3 (Required)

1. Open Google Cloud Console  
2. Create/select project  
3. Enable **YouTube Data API v3**  
4. Create API key  
5. Add key to `.env`

Create file: `streamhub/.env`

```env
VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
```

> Important: Restart dev server after editing `.env`.

### Fake Store API (No key required)

Endpoint used:
- `https://fakestoreapi.com/products`

---

## Installation & Run

From `streamhub` folder:

```bash
npm install
npm run dev
```

Local URL (default):
- `http://localhost:5173`

---

## Available Scripts

- `npm run dev` - Start dev server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint checks

---

## Environment Files

- `.env` - local secrets (ignored by git)
- `.env.example` - template for required vars

Current required env variable:
- `VITE_YOUTUBE_API_KEY`

---

## Architecture Notes

- **State management:** Context (`CartContext`, `ThemeContext`) + local component state
- **Data fetching:** Custom hooks (`useYouTubeVideos`, `useProducts`)
- **Reusability:** Shared hooks and utility modules
- **Scalability:** Modular components + dedicated CSS per component
- **Performance:** lightweight UI, lazy image loading, basic caching patterns

---

## Error Handling & UX

- API failures show friendly error cards
- Retry actions available for both video/product sections
- Skeleton cards and spinner for loading feedback
- Modal closes with overlay click / close button / escape behavior

---

## Future Improvements

- Debounced search suggestions
- Pagination / infinite scroll
- Cart persistence in localStorage
- Product detail page
- Better accessibility audits (ARIA + keyboard flow)
- Unit tests for hooks/context

---

## Author Notes

This project is structured to look and behave like a production-grade frontend assignment:
- clean code
- maintainable structure
- readable naming conventions
- polished UI behavior
