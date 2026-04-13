import { useState } from 'react';
import ImageSkeleton from './ImageSkeleton';

const FALLBACK_IMAGE = 'https://via.placeholder.com/400x500/1A1A1A/D4AF37?text=Art';

export default function ArtCard({ image, title, artist, index, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imageSrc = image || FALLBACK_IMAGE;

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleImageError = () => {
    setIsImageLoaded(true);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick?.({ image: imageSrc, title, artist, index })}
      className="cursor-pointer group relative"
    >
      <div
        className={`
          overflow-hidden rounded-2xl bg-primary-card
          transition-all duration-500
          ${isHovered ? 'shadow-gold-glow-lg' : 'shadow-lg'}
        `}
      >
        {/* Image Container */}
        <div className="relative w-full min-h-[260px] aspect-[3/4] overflow-hidden bg-primary-dark group/image">
          {/* Show skeleton while loading */}
          {!isImageLoaded && (
            <ImageSkeleton />
          )}

          {/* Image with lazy loading */}
          <img
            src={imageSrc}
            alt={title}
            loading="lazy"
            onLoad={handleImageLoad}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = FALLBACK_IMAGE;
              handleImageError();
            }}
            className={`
              w-full h-full object-cover
              transition-transform duration-500
              ${isHovered ? 'scale-105' : 'scale-100'}
              ${!isImageLoaded ? 'opacity-0' : 'opacity-100'}
            `}
          />

          {/* Overlay Gradient */}
          <div
            className={`
              absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent
              transition-opacity duration-500
              ${isHovered ? 'opacity-65' : 'opacity-30'}
            `}
          />

          {/* Golden Accent Line */}
          <div
            className={`
              absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-accent to-transparent
              transition-all duration-500
              ${isHovered ? 'h-1.5 opacity-100' : 'h-0 opacity-0'}
            `}
            style={{
              boxShadow: isHovered ? '0 0 20px rgba(212, 175, 55, 0.8)' : 'none',
            }}
          />
        </div>

        <div className="p-4">
          <div className="mb-3">
            <h3 className="text-base font-semibold text-white line-clamp-2">{title}</h3>
            <p className="text-sm text-primary-accent font-medium mt-1 line-clamp-1">{artist}</p>
          </div>

          <button
            className="
              w-full py-2.5 px-4 rounded-lg font-medium
              bg-primary-accent text-primary-bg
              hover:bg-yellow-300 transition-all duration-300
              text-sm uppercase tracking-widest
            "
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
