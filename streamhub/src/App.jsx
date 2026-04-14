import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import VideoCard from './components/VideoCard/VideoCard';
import ProductCard from './components/ProductCard/ProductCard';
import VideoModal from './components/VideoModal/VideoModal';
import Cart from './components/Cart/Cart';
import { useYouTubeVideos } from './hooks/useYouTubeVideos';
import { useProducts } from './hooks/useProducts';

const SKELETON_COUNT = 8;

function App() {
  const [activeTab, setActiveTab] = useState('videos');
  const [searchQuery, setSearchQuery] = useState('react js');
  const [productFilter, setProductFilter] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim() || 'react js');
    }, 450);

    return () => clearTimeout(timerId);
  }, [searchQuery]);

  const {
    videos,
    loading: videosLoading,
    error: videosError,
    refetch: refetchVideos,
  } = useYouTubeVideos(debouncedQuery);

  const {
    products,
    loading: productsLoading,
    error: productsError,
    refetch: refetchProducts,
  } = useProducts();

  const filteredProducts = useMemo(() => {
    if (!productFilter.trim()) return products;

    const query = productFilter.toLowerCase();
    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
  }, [products, productFilter]);

  const renderVideoState = () => {
    if (videosLoading) {
      return (
        <div>
          <div className="loading-row">
            <span className="loading-spinner" />
            <span>Loading videos...</span>
          </div>
          <div className="cards-grid">
            {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
              <div key={`video-skeleton-${index}`} className="skeleton-card">
                <div className="skeleton-thumb" />
                <div className="skeleton-line short" />
                <div className="skeleton-line" />
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (videosError) {
      return (
        <div className="state-card">
          <h3>Unable to load videos</h3>
          <p>{videosError}</p>
          <button className="action-btn" onClick={refetchVideos}>
            Retry videos
          </button>
        </div>
      );
    }

    return (
      <div className="cards-grid fade-in">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} onClick={() => setSelectedVideo(video)} />
        ))}
      </div>
    );
  };

  const renderProductState = () => {
    if (productsLoading) {
      return (
        <div>
          <div className="loading-row">
            <span className="loading-spinner" />
            <span>Loading products...</span>
          </div>
          <div className="cards-grid products-grid">
            {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
              <div key={`product-skeleton-${index}`} className="skeleton-card product">
                <div className="skeleton-thumb square" />
                <div className="skeleton-line short" />
                <div className="skeleton-line" />
                <div className="skeleton-line tiny" />
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (productsError) {
      return (
        <div className="state-card">
          <h3>Unable to load products</h3>
          <p>{productsError}</p>
          <button className="action-btn" onClick={refetchProducts}>
            Retry products
          </button>
        </div>
      );
    }

    if (!filteredProducts.length) {
      return (
        <div className="state-card">
          <h3>No matching products found</h3>
          <p>Try another keyword to discover more items.</p>
        </div>
      );
    }

    return (
      <div className="cards-grid products-grid fade-in">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  };

  return (
    <div className="app-shell">
      <div className="bg-orb orb-a" />
      <div className="bg-orb orb-b" />
      <div className="bg-orb orb-c" />

      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        productFilter={productFilter}
        setProductFilter={setProductFilter}
        onCartOpen={() => setIsCartOpen(true)}
      />

      <main className="app-content">
        <section className="hero-panel glass">
          <p className="eyebrow">Premium Discovery Experience</p>
          <h1>StreamHub - Video + Product Discovery Platform</h1>
          <p>
            Explore trending YouTube videos and curated products in one seamless interface.
            Built with React, Vite, and handcrafted CSS.
          </p>
        </section>

        <section className="content-panel glass">
          <div className="panel-header">
            <h2>{activeTab === 'videos' ? 'Video Feed' : 'Product Feed'}</h2>
            <span className="panel-count">
              {activeTab === 'videos' ? videos.length : filteredProducts.length} items
            </span>
          </div>

          {activeTab === 'videos' ? renderVideoState() : renderProductState()}
        </section>
      </main>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => {
            setSelectedVideo(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
