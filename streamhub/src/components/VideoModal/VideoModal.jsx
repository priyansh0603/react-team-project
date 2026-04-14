import { useEffect, useCallback } from 'react';
import './VideoModal.css';

const VideoModal = ({ video, onClose }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleEscape = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [handleEscape]);

  if (!video) return null;

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className="modal-video-container">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="modal-iframe"
          />
        </div>

        <div className="modal-info">
          <h2 className="modal-title">{video.title}</h2>
          <p className="modal-channel">{video.channelTitle}</p>
          {video.description && (
            <p className="modal-description">{video.description}</p>
          )}

          <a
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="modal-link"
          >
            <span aria-hidden="true">↗</span>
            Watch on YouTube
          </a>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
