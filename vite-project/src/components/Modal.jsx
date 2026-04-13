const FALLBACK_IMAGE = 'https://via.placeholder.com/600x400/1A1A1A/D4AF37?text=Art';

export default function Modal({ isOpen, data, onClose }) {
  if (!data) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        onClick={handleBackdropClick}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
      />

      {/* Modal Content */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-primary-card rounded-2xl shadow-2xl overflow-hidden max-w-2xl w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-primary-accent/20">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                {data.title}
              </h2>
              <p className="text-primary-accent">by {data.artist}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-primary-accent transition-colors duration-300 text-2xl"
            >
              ✕
            </button>
          </div>

          {/* Image */}
          <div className="relative h-96 bg-primary-bg overflow-hidden">
            <img
              key={data.image}
              src={data.image || FALLBACK_IMAGE}
              alt={data.title}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = FALLBACK_IMAGE;
              }}
              className="w-full h-full object-cover"
            />

            {/* Golden Accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-accent to-transparent shadow-gold-glow" />
          </div>

          {/* Details Section */}
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">
                  Medium
                </p>
                <p className="text-white font-medium">Oil on Canvas</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">
                  Year
                </p>
                <p className="text-white font-medium">2024</p>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                Description
              </p>
              <p className="text-gray-300 leading-relaxed">
                A stunning piece that captures the essence of contemporary art, blending classical techniques with modern aesthetics.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-primary-accent/20">
              <button className="flex-1 px-4 py-3 rounded-lg bg-primary-accent/10 border border-primary-accent/30 text-primary-accent hover:bg-primary-accent/20 transition-colors duration-300 font-medium">
                Add to Favorites
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 rounded-lg bg-primary-accent text-primary-bg hover:bg-yellow-300 transition-colors duration-300 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
