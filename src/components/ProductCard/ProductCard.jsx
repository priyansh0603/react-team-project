import { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { formatINR } from '../../utils/currency';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 1500);
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const renderStars = (rating) => {
    return (
      <div className="product-rating">
        <span aria-hidden="true">★</span>
        <span>{rating?.rate || 4.5}</span>
        <span className="rating-count">({rating?.count || 100})</span>
      </div>
    );
  };

  return (
    <article className="product-card">
      <div className="product-image-container">
        {!imageLoaded && <div className="product-image-skeleton" />}
        <img
          src={product.image}
          alt={product.title}
          className={`product-image ${imageLoaded ? 'loaded' : ''}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        <div className="product-category-badge">{product.category}</div>
      </div>

      <div className="product-info">
        <h3 className="product-title" title={product.title}>
          {truncateText(product.title, 45)}
        </h3>

        <p className="product-description">
          {truncateText(product.description, 80)}
        </p>

        {renderStars(product.rating)}

        <div className="product-footer">
          <span className="product-price">{formatINR(product.price)}</span>

          <button
            className={`add-to-cart-btn ${isAdding ? 'added' : ''}`}
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? (
              <>
                <span aria-hidden="true">✓</span>
                <span>Added</span>
              </>
            ) : (
              <>
                <span aria-hidden="true">🛒</span>
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
