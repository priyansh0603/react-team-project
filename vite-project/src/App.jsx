import { useState, useMemo, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import MasonryGrid from './components/MasonryGrid';
import Modal from './components/Modal';
import './components/MasonryGrid.css';

// Sample artwork data with varied dimensions
const SAMPLE_ARTWORKS = [
  {
    id: 1,
    title: 'Ethereal Dreams',
    artist: 'Aurora Studio',
    image: 'https://images.unsplash.com/photo-1579783902614-e3fb5141b0cb?w=400&h=500&fit=crop',
  },
  {
    id: 2,
    title: 'Urban Canvas',
    artist: 'City Collective',
    image: 'https://images.unsplash.com/photo-1561214115-6d2f1b0609fa?w=400&h=300&fit=crop',
  },
  {
    id: 3,
    title: 'Sunset Horizons',
    artist: 'Nature\'s Palette',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=600&fit=crop',
  },
  {
    id: 4,
    title: 'Abstract Geometry',
    artist: 'Modern Minds',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=400&fit=crop',
  },
  {
    id: 5,
    title: 'Nocturne Blue',
    artist: 'Mystic Visions',
    image: 'https://images.unsplash.com/photo-1578321272176-b8ec1c5e5d1c?w=400&h=500&fit=crop',
  },
  {
    id: 6,
    title: 'Color Symphony',
    artist: 'Vibrant Soul',
    image: 'https://images.unsplash.com/photo-1577720643272-265b434c0e0c?w=400&h=350&fit=crop',
  },
  {
    id: 7,
    title: 'Minimalist Space',
    artist: 'Zen Studio',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=500&fit=crop',
  },
  {
    id: 8,
    title: 'Electric Energy',
    artist: 'Pulse Art',
    image: 'https://images.unsplash.com/photo-1561214115-6d2f1b0609fa?w=400&h=400&fit=crop',
  },
  {
    id: 9,
    title: 'Serene Reflection',
    artist: 'Calm Waves',
    image: 'https://images.unsplash.com/photo-1579783902614-e3fb5141b0cb?w=400&h=450&fit=crop',
  },
  {
    id: 10,
    title: 'Dynamic Motion',
    artist: 'Flow Studios',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=500&fit=crop',
  },
  {
    id: 11,
    title: 'Golden Hour',
    artist: 'Light Masters',
    image: 'https://images.unsplash.com/photo-1578321272176-b8ec1c5e5d1c?w=400&h=300&fit=crop',
  },
  {
    id: 12,
    title: 'Cosmic Wonder',
    artist: 'Space Echoes',
    image: 'https://images.unsplash.com/photo-1577720643272-265b434c0e0c?w=400&h=500&fit=crop',
  },
];

// Generate additional artwork items for infinite scroll (duplicated with different IDs)
const generateMoreArtworks = (startId = 13) => {
  return SAMPLE_ARTWORKS.slice(0, 6).map((art, idx) => ({
    ...art,
    id: startId + idx,
    title: `${art.title} (Copy)`,
  }));
};

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArt, setSelectedArt] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedArtworks, setDisplayedArtworks] = useState(SAMPLE_ARTWORKS);
  const [isLoading, setIsLoading] = useState(false);

  // Filter artworks based on search query
  const filteredArtworks = useMemo(() => {
    if (!searchQuery.trim()) return displayedArtworks;

    const query = searchQuery.toLowerCase();
    return displayedArtworks.filter(
      (art) =>
        art.title.toLowerCase().includes(query) ||
        art.artist.toLowerCase().includes(query)
    );
  }, [searchQuery, displayedArtworks]);

  // Handle infinite scroll - load more items
  const handleLoadMore = useCallback(() => {
    if (isLoading) return;

    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setDisplayedArtworks((prev) => [
        ...prev,
        ...generateMoreArtworks(prev.length + 1),
      ]);
      setIsLoading(false);
    }, 600);
  }, [isLoading]);

  const handleCardClick = (artData) => {
    setSelectedArt(artData);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedArt(null), 300);
  };

  return (
    <div className="min-h-screen bg-primary-bg">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Top Navigation */}
      <TopNav onSearch={setSearchQuery} />

      {/* Main Content Area */}
      <main className="ml-72 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        {/* Results Info */}
        <div className="mb-8">
          <p className="text-gray-400 text-sm">
            {filteredArtworks.length} artwork{filteredArtworks.length !== 1 ? 's' : ''} found
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Masonry Grid */}
        {filteredArtworks.length > 0 ? (
          <>
            <MasonryGrid 
              items={filteredArtworks} 
              onCardClick={handleCardClick}
              onLoadMore={handleLoadMore}
            />
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-accent" />
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-xl text-gray-400 mb-2">No artworks found</p>
            <p className="text-sm text-gray-500">
              Try adjusting your search query
            </p>
          </div>
        )}
      </main>

      {/* Modal for Art Details */}
      <Modal isOpen={modalOpen} data={selectedArt} onClose={handleCloseModal} />
    </div>
  );
}

export default App
