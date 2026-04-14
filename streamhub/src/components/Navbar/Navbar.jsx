import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useCart } from '../../hooks/useCart';
import './Navbar.css';

const Navbar = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  productFilter,
  setProductFilter,
  onCartOpen,
}) => {
  const { theme, toggleTheme } = useTheme();
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (activeTab === 'videos') {
      setSearchQuery(value);
    } else {
      setProductFilter(value);
    }
  };

  const currentSearchValue = activeTab === 'videos' ? searchQuery : productFilter;

  return (
    <nav className="navbar">
      <div className="navbar-blur"></div>
      <div className="navbar-content">
        <div className="navbar-left">
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>

          <div className="logo">
            <div className="logo-icon">▶</div>
            <span className="logo-text">StreamHub</span>
          </div>
        </div>

        <div className={`search-container ${searchFocused ? 'focused' : ''}`}>
          <span className="search-icon" aria-hidden="true">
            🔎
          </span>
          <input
            type="text"
            placeholder={
              activeTab === 'videos'
                ? 'Search videos...'
                : 'Filter products...'
            }
            value={currentSearchValue}
            onChange={handleSearchChange}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="search-input"
          />
        </div>

        <div className="navbar-right">
          <div className="tab-switcher">
            <button
              className={`tab-btn ${activeTab === 'videos' ? 'active' : ''}`}
              onClick={() => setActiveTab('videos')}
            >
              <span aria-hidden="true">▶</span>
              <span>Videos</span>
            </button>
            <button
              className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              <span aria-hidden="true">🛍</span>
              <span>Products</span>
            </button>
          </div>

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <button className="cart-indicator" onClick={onCartOpen} aria-label="Open cart">
            <span aria-hidden="true">🛒</span>
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount > 99 ? '99+' : cartCount}</span>
            )}
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-tabs">
          <button
            className={`mobile-tab ${activeTab === 'videos' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('videos');
              setMobileMenuOpen(false);
            }}
          >
            <span aria-hidden="true">▶</span>
            Videos
          </button>
          <button
            className={`mobile-tab ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('products');
              setMobileMenuOpen(false);
            }}
          >
            <span aria-hidden="true">🛍</span>
            Products
          </button>
        </div>

        <div className="mobile-search">
          <span className="mobile-search-icon" aria-hidden="true">
            🔎
          </span>
          <input
            type="text"
            placeholder={
              activeTab === 'videos'
                ? 'Search videos...'
                : 'Filter products...'
            }
            value={currentSearchValue}
            onChange={handleSearchChange}
            className="mobile-search-input"
          />
        </div>

        <button className="mobile-theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
          <span>Switch to {theme === 'light' ? 'dark' : 'light'} mode</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
