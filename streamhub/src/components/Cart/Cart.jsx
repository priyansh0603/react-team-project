import { useCart } from '../../hooks/useCart';
import { formatINR } from '../../utils/currency';
import './Cart.css';

const Cart = ({ isOpen, onClose }) => {
  const { cartItems, cartCount, cartTotal, removeFromCart, updateQuantity, clearCart } =
    useCart();

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={onClose} />
      <div className="cart-drawer">
        <div className="cart-header">
          <div className="cart-header-title">
            <span aria-hidden="true">🛒</span>
            <h2>Your Cart</h2>
            <span className="cart-count-badge">{cartCount} items</span>
          </div>
          <button
            className="cart-close"
            onClick={onClose}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">📦</div>
              <h3>Your cart is empty</h3>
              <p>Add some products to get started!</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                      />
                    </div>

                    <div className="cart-item-details">
                      <h4 className="cart-item-title">{item.title}</h4>
                      <span className="cart-item-price">
                        {formatINR(item.price)}
                      </span>

                      <div className="cart-item-actions">
                        <div className="cart-item-quantity">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="cart-item-remove"
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove item"
                        >
                          🗑
                        </button>
                      </div>
                    </div>

                    <div className="cart-item-total">
                      {formatINR(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <button
                  className="cart-clear-btn"
                  onClick={clearCart}
                >
                  <span aria-hidden="true">🧹</span>
                  Clear Cart
                </button>

                <div className="cart-summary">
                  <div className="cart-total-row">
                    <span>Total</span>
                    <span className="cart-total-amount">
                      {formatINR(cartTotal)}
                    </span>
                  </div>

                  <button className="cart-checkout-btn">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
