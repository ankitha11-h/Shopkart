import './SkeletonCard.css';

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image-container skeleton-shimmer"></div>
      <div className="skeleton-info">
        <div className="skeleton-category skeleton-shimmer"></div>
        <div className="skeleton-title skeleton-shimmer"></div>
        <div className="skeleton-description">
          <div className="skeleton-desc-line skeleton-shimmer"></div>
          <div className="skeleton-desc-line skeleton-shimmer"></div>
          <div className="skeleton-desc-line skeleton-shimmer"></div>
        </div>
        <div className="skeleton-footer">
          <div className="skeleton-price skeleton-shimmer"></div>
          <div className="skeleton-button skeleton-shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
