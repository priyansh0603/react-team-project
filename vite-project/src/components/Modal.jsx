import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Modal({ isOpen, data, onClose }) {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsZoomed(false);
    }
  }, [isOpen]);

  if (!data) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            key="backdrop"
            onClick={handleBackdropClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal Content */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-primary-card rounded-2xl shadow-2xl overflow-hidden max-w-[92vw] sm:max-w-3xl w-full mx-auto h-full max-h-[92vh] sm:max-h-[85vh]">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-primary-accent/20">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">
                    Artist
                  </p>
                  <h2 className="text-3xl font-semibold text-white leading-tight">
                    {data.artist}
                  </h2>
                  <p className="mt-3 text-sm text-gray-300 max-w-2xl leading-relaxed">
                    {data.history || 'A refined creative vision rooted in contemporary craft.'}
                  </p>
                </div>
                <motion.button
                  onClick={onClose}
                  whileHover={{ rotate: 90, scale: 1.05 }}
                  className="text-gray-400 hover:text-primary-accent transition-colors duration-300 text-3xl"
                  aria-label="Close details modal"
                >
                  ✕
                </motion.button>
              </div>

              {/* Image */}
              <motion.div
                onClick={() => setIsZoomed((prev) => !prev)}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.35, type: 'spring', stiffness: 220, damping: 24 }}
                className="relative cursor-zoom-in overflow-hidden bg-primary-bg"
                style={{ minHeight: 320 }}
              >
                <motion.img
                  src={data.image || 'https://via.placeholder.com/600x400/1A1A1A/D4AF37?text=Art'}
                  alt={data.title}
                  className={`w-full h-full ${isZoomed ? 'object-cover' : 'object-contain'}`}
                  animate={{ scale: isZoomed ? 1.12 : 1, borderRadius: isZoomed ? '0px' : '0px' }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />

                <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                <div className="absolute bottom-4 left-4 rounded-full bg-black/70 px-4 py-2 text-xs uppercase tracking-[0.3em] text-gray-200">
                  {isZoomed ? 'Click to Fit' : 'Click to Fill'}
                </div>
              </motion.div>

              {/* Details Section */}
              <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(85vh-420px)] sm:max-h-[calc(85vh-420px)]">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">
                      Medium
                    </p>
                    <p className="text-white font-medium">{data.medium || 'Mixed Media'}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">
                      Year
                    </p>
                    <p className="text-white font-medium">{data.year || '2024'}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">
                      Title
                    </p>
                    <p className="text-white font-medium">{data.title}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                    About the Work
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    A refined composition built for a minimalist gallery experience. This piece balances light, texture, and narrative with calm, tactile elegance.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row pt-2 border-t border-primary-accent/20">
                  <button className="flex-1 px-5 py-3 rounded-2xl bg-primary-accent/15 border border-primary-accent/25 text-primary-accent hover:bg-primary-accent/25 transition-colors duration-300 font-semibold">
                    Save to Collection
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 px-5 py-3 rounded-2xl bg-primary-accent text-primary-bg hover:bg-yellow-300 transition-colors duration-300 font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
