import { useEffect } from 'react';
import Masonry from 'react-masonry-css';
import ArtCard from './ArtCard';
import './MasonryGrid.css';

export default function MasonryGrid({ items, onCardClick, onLoadMore }) {
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
