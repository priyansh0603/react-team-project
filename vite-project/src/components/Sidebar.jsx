const menuItems = [
  { id: 'gallery', label: 'Gallery', icon: '🖼️' },
  { id: 'collections', label: 'Collections', icon: '📚' },
  { id: 'artists', label: 'Artists', icon: '👨‍🎨' },
  { id: 'exhibitions', label: 'Exhibitions', icon: '🎭' },
  { id: 'about', label: 'About', icon: 'ℹ️' },
  { id: 'contact', label: 'Contact', icon: '✉️' },
];

export default function Sidebar({ activeView = 'gallery', onViewChange }) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-primary-bg border-r border-primary-accent/20 flex flex-col p-8 z-40">
      {/* Logo / Branding */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-primary-accent mb-2">
          MUSEUM
        </h1>
        <p className="text-xs text-gray-400 uppercase tracking-widest">
          Digital Art Gallery
        </p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1">
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onViewChange?.(item.id)}
                className="relative w-full text-left px-4 py-3 rounded-lg transition-all duration-300 group"
              >
                {/* Active Background */}
                {activeView === item.id && (
                  <div className="absolute inset-0 bg-primary-accent/10 rounded-lg" />
                )}

                {/* Content */}
                <div className="relative flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <span
                    className={`font-medium transition-colors duration-300 ${
                      activeView === item.id
                        ? 'text-primary-accent'
                        : 'text-gray-300 group-hover:text-white'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>

                {/* Gold Indicator Line */}
                {activeView === item.id && (
                  <div
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-accent rounded-l-full"
                    style={{
                      boxShadow: '0 0 15px rgba(212, 175, 55, 0.6)',
                    }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer / Social Links */}
      <div className="border-t border-primary-accent/20 pt-6">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">
          Follow Us
        </p>
        <div className="flex gap-3">
          {['Instagram', 'Twitter', 'Facebook'].map((social) => (
            <button
              key={social}
              className="w-8 h-8 rounded-full border border-primary-accent/30 text-primary-accent hover:bg-primary-accent/10 transition-all duration-300 text-xs font-bold"
            >
              {social[0]}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
