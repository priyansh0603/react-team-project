import { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import ArtCard from './ArtCard';
import './MasonryGrid.css';

export default function MasonryGrid({ items, onCardClick, onLoadMore }) {
  const [columnCount, setColumnCount] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        // Small devices: 1 column
        setColumnCount(1);
      } else if (width < 768) {
        // Mobile: 2 columns
        setColumnCount(2);
      } else if (width < 1024) {
        // Tablets: 3 columns
        setColumnCount(3);
      } else if (width < 1536) {
        // Large tablets: 4 columns
        setColumnCount(4);
      } else {
        // Desktop: 5 columns
        setColumnCount(5);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive breakpoints for react-masonry-css
  const breakpointColumns = {
    default: 5,      // Desktop (1536px+)
    1536: 4,         // Large tablets (1024px - 1535px)
    1024: 3,         // Tablets (768px - 1023px)
    768: 2,          // Mobile (640px - 767px)
    640: 1,          // Small devices (< 640px)
  };

  // Infinite scroll detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && onLoadMore) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    const sentinel = document.getElementById('masonry-sentinel');
    if (sentinel) observer.observe(sentinel);

    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [onLoadMore]);

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumns}
        className="masonry-grid"
        columnClassName="masonry-grid-column"
      >
        {items.map((item, index) => (
          <ArtCard
            key={item.id || index}
            data={item}
            index={index}
            onClick={onCardClick}
          />
        ))}
      </Masonry>
      
      {/* Sentinel for infinite scroll */}
      <div id="masonry-sentinel" className="h-4 mt-8" />
    </>
  );
}
