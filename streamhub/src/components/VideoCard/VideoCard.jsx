import './VideoCard.css';

const VideoCard = ({ video, onClick }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <article className="video-card" onClick={onClick}>
      <div className="video-thumbnail">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="thumbnail-image"
          loading="lazy"
        />
        <div className="video-overlay">
          <div className="play-button">▶</div>
        </div>
      </div>

      <div className="video-info">
        <h3 className="video-title" title={video.title}>
          {truncateText(video.title, 60)}
        </h3>

        <div className="video-meta">
          <span className="channel-name">{video.channelTitle}</span>
          <div className="video-stats">
            <span className="stat-item">
              <span aria-hidden="true">⏱</span>
              {formatDate(video.publishedAt)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default VideoCard;
