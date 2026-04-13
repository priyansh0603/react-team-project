import { useState } from 'react';

export default function TopNav({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch?.(value);
  };

  return (
    <nav className="fixed top-0 left-72 right-0 h-20 bg-primary-bg/80 backdrop-blur-xl border-b border-primary-accent/10 flex items-center justify-between px-8 z-40">
      {/* Left Section - Title */}
      <div>
        <h2 className="text-2xl font-light text-white">
          Artworks <span className="text-primary-accent font-medium">Collection</span>
        </h2>
      </div>

      {/* Center Section - Search Bar */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative group">
          <input
            type="text"
            placeholder="Search artworks..."
            value={searchQuery}
            onChange={handleSearch}
            className="
              w-full px-6 py-2 rounded-full
              bg-primary-card/60 border border-primary-accent/20
              text-white placeholder:text-gray-500
              focus:outline-none focus:border-primary-accent/50
              transition-all duration-300
              backdrop-blur-sm
            "
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-accent/10 to-transparent pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity" />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-accent">
            🔍
          </span>
        </div>
      </div>

      {/* Right Section - Action Buttons */}
      <div className="flex items-center gap-4">
        <button className="px-6 py-2 rounded-full text-sm font-medium text-white hover:text-primary-accent transition-colors duration-300">
          Filters
        </button>
        <button className="px-6 py-2 rounded-full text-sm font-medium text-primary-bg bg-primary-accent hover:bg-yellow-300 transition-colors duration-300">
          Favorites
        </button>
      </div>
    </nav>
  );
}
