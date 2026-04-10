import { motion } from 'framer-motion';
import { useState } from 'react';
import ImageSkeleton from './ImageSkeleton';

export default function ArtCard({ image, title, artist, index, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: Math.min(i * 0.08, 0.6), // Cap stagger delay
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsImageLoaded(true);
  };

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick?.({ image, title, artist })}
      className="cursor-pointer group relative h-full"
    >
      <div
        className={`
          relative overflow-hidden rounded-2xl bg-primary-card
          transition-all duration-500 h-full
          ${isHovered ? 'shadow-gold-glow-lg' : 'shadow-lg'}
        `}
      >
        {/* Image Container */}
        <div className="relative w-full h-full overflow-hidden bg-primary-dark group/image">
          {/* Show skeleton while loading */}
          {!isImageLoaded && !imageError && (
            <ImageSkeleton />
          )}

          {/* Image with lazy loading */}
          <motion.img
            src={image || 'https://via.placeholder.com/400x500/1A1A1A/D4AF37?text=Art'}
            alt={title}
            loading="lazy"
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={`
              w-full h-full object-cover
              transition-transform duration-500
              ${isHovered ? 'scale-125' : 'scale-100'}
              ${!isImageLoaded ? 'opacity-0' : 'opacity-100'}
            `}
            initial={{ opacity: 0 }}
            animate={isImageLoaded ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Overlay Gradient */}
          <motion.div
            className={`
              absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent
              transition-opacity duration-500
              ${isHovered ? 'opacity-85' : 'opacity-40'}
            `}
          />

          {/* Golden Accent Line */}
          <motion.div
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

        {/* Content Overlay */}
        <motion.div 
          className="absolute inset-0 flex flex-col justify-end p-6"
          variants={containerVariants}
        >
          {/* Title and Artist - Always visible */}
          <motion.div className="mb-3">
            <h3 className="text-base font-semibold text-white line-clamp-2">
              {title}
            </h3>
            <p className="text-sm text-primary-accent font-medium mt-1">
              {artist}
            </p>
          </motion.div>

          {/* Details - Appear on hover */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <motion.button
              className={`
                w-full py-2.5 px-4 rounded-lg font-medium
                bg-primary-accent text-primary-bg
                hover:bg-yellow-300 transition-all duration-300
                text-sm uppercase tracking-widest
                transform origin-center
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Details
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
