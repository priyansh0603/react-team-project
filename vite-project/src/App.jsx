import { useMemo, useState } from 'react';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import MasonryGrid from './components/MasonryGrid';
import Modal from './components/Modal';
import useFetchArt from './hooks/useFetchArt';
import './components/MasonryGrid.css';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArt, setSelectedArt] = useState(null);
  const [activeView, setActiveView] = useState('gallery');
  const { artData, isLoading, error, searchQuery, setSearchQuery, fetchByDepartment } =
    useFetchArt();

  const allGridItems = useMemo(() => {
    return artData.map((art) => ({
      ...art,
      image: art.imageUrl,
    }));
  }, [artData]);

  const gridItems = useMemo(() => {
    if (activeView === 'artists') {
      return allGridItems.filter((item) => item.artist && item.artist !== 'Unknown Artist');
    }

    if (activeView === 'exhibitions') {
      return allGridItems.filter((item) => item.date && item.date !== 'Date Unknown');
    }

    return allGridItems;
  }, [activeView, allGridItems]);

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
      <Sidebar activeView={activeView} onViewChange={setActiveView} />

      {/* Top Navigation */}
      <TopNav onSearch={setSearchQuery} />

      {/* Main Content Area */}
      <main className="ml-72 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        {activeView === 'collections' && (
          <div className="mb-6 flex items-center gap-3">
            <button
              type="button"
              onClick={() => fetchByDepartment(10)}
              className="px-4 py-2 rounded-full text-sm border border-primary-accent/30 text-primary-accent hover:bg-primary-accent/10 transition-colors"
            >
              Egyptian
            </button>
            <button
              type="button"
              onClick={() => fetchByDepartment(6)}
              className="px-4 py-2 rounded-full text-sm border border-primary-accent/30 text-primary-accent hover:bg-primary-accent/10 transition-colors"
            >
              Asian
            </button>
            <button
              type="button"
              onClick={() => fetchByDepartment(11)}
              className="px-4 py-2 rounded-full text-sm border border-primary-accent/30 text-primary-accent hover:bg-primary-accent/10 transition-colors"
            >
              European
            </button>
          </div>
        )}

        {activeView !== 'about' && activeView !== 'contact' && (
          <div className="mb-8">
            <p className="text-gray-400 text-sm">
              {gridItems.length} artwork{gridItems.length !== 1 ? 's' : ''} found
              {searchQuery && ` for "${searchQuery}"`}
            </p>
            {activeView === 'artists' && (
              <p className="text-xs text-gray-500 mt-1">Showing artworks with known artist names.</p>
            )}
            {activeView === 'exhibitions' && (
              <p className="text-xs text-gray-500 mt-1">Showing artworks with exhibition/year metadata.</p>
            )}
            {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
          </div>
        )}

        {activeView === 'about' && (
          <div className="rounded-2xl border border-primary-accent/20 bg-primary-card p-8 text-gray-300 max-w-3xl">
            <h3 className="text-2xl font-semibold text-white mb-3">About The Digital Museum</h3>
            <p className="leading-relaxed">
              This gallery streams public domain artworks from The Metropolitan Museum API and
              presents them in a Pinterest-style visual experience.
            </p>
          </div>
        )}

        {activeView === 'contact' && (
          <div className="rounded-2xl border border-primary-accent/20 bg-primary-card p-8 text-gray-300 max-w-3xl">
            <h3 className="text-2xl font-semibold text-white mb-3">Contact</h3>
            <p className="leading-relaxed">
              For feedback, share your feature ideas with the project team. You can also use the
              Favorites and Filters actions in the top navigation for upcoming flows.
            </p>
          </div>
        )}

        {(activeView !== 'about' && activeView !== 'contact') && (gridItems.length > 0 ? (
          <>
            <MasonryGrid 
              items={gridItems}
              onCardClick={handleCardClick}
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
            <p className="text-xl text-gray-400 mb-2">
              {isLoading ? 'Loading artworks...' : 'No artworks found'}
            </p>
            <p className="text-sm text-gray-500">
              Try adjusting your search query or department filter
            </p>
          </div>
        ))}
      </main>

      {/* Modal for Art Details */}
      <Modal isOpen={modalOpen} data={selectedArt} onClose={handleCloseModal} />
    </div>
  );
}

export default App
