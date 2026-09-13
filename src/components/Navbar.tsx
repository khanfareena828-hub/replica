import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Sun, 
  Moon, 
  Bookmark, 
  Flame, 
  Menu, 
  X, 
  ChefHat, 
  User, 
  Heart,
  Utensils,
  Sparkles,
  Info
} from 'lucide-react';
import { ActiveTab, CookingVideo } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  savedCount: number;
  likedCount: number;
  onOpenSavedModal: () => void;
  onOpenAboutModal: () => void;
  videos: CookingVideo[];
  onSelectVideo: (video: CookingVideo) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  isDarkMode,
  setIsDarkMode,
  savedCount,
  likedCount,
  onOpenSavedModal,
  onOpenAboutModal,
  videos,
  onSelectVideo
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on query
  const suggestions = searchQuery.trim().length > 1
    ? videos.filter(v => 
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.channelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    // Scroll to video grid
    const el = document.getElementById('featured-videos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems: { id: ActiveTab; label: string; icon: any }[] = [
    { id: 'Home', label: 'Home', icon: Flame },
    { id: 'Categories', label: 'Categories', icon: Utensils },
    { id: 'Popular', label: 'Popular', icon: Sparkles },
    { id: 'Latest', label: 'Latest', icon: Flame },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-amber-200/50 dark:border-zinc-800 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                setActiveTab('Home');
                setSearchQuery('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 group focus:outline-none"
              id="tastytube-logo"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-400 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <ChefHat className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center tracking-tight font-extrabold text-xl font-heading">
                  <span className="text-zinc-900 dark:text-white">Tasty</span>
                  <span className="text-orange-600 dark:text-orange-500">Tube</span>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 -mt-1 hidden sm:block">
                  Culinary Videos
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Search Bar */}
          <div ref={searchContainerRef} className="hidden md:flex flex-1 max-w-xl mx-2 relative">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Search recipes, dishes, chefs..."
                  className="w-full pl-10 pr-20 py-2 text-sm bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 rounded-full border border-transparent focus:border-orange-500 focus:bg-white dark:focus:bg-zinc-800 focus:outline-none transition-all duration-150 shadow-inner"
                  id="search-input-desktop"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-12 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="submit"
                  className="absolute right-1.5 px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-full transition-colors shadow-sm"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-800 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-700 py-2 z-50 overflow-hidden">
                <div className="px-3 py-1.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Matching Recipes & Chefs
                </div>
                {suggestions.map((video) => (
                  <button
                    key={video.id}
                    onClick={() => {
                      onSelectVideo(video);
                      setShowSuggestions(false);
                    }}
                    className="w-full px-3 py-2 text-left flex items-center gap-3 hover:bg-orange-50 dark:hover:bg-zinc-700/60 transition-colors"
                  >
                    <img 
                      src={`https://img.youtube.com/vi/${video.youtubeId}/default.jpg`} 
                      alt="" 
                      className="w-10 h-8 object-cover rounded" 
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 truncate">
                        {video.title}
                      </p>
                      <p className="text-xs text-orange-600 dark:text-orange-400">
                        {video.channelName} • {video.category}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (item.id === 'Categories') {
                      const el = document.getElementById('category-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/30'
                      : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                  id={`nav-item-${item.id.toLowerCase()}`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
            <button
              onClick={onOpenAboutModal}
              className="px-3 py-2 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1.5"
            >
              <Info className="w-4 h-4" />
              About
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full"
              aria-label="Toggle Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Saved Recipes Quick Button */}
            <button
              onClick={onOpenSavedModal}
              className="relative p-2 text-zinc-600 dark:text-zinc-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-zinc-800 rounded-full transition-colors"
              title="Saved Recipes"
              id="saved-recipes-button"
            >
              <Bookmark className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-zinc-600 dark:text-zinc-300 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-zinc-800 rounded-full transition-colors"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              id="theme-toggle-btn"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Profile Dropdown */}
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-orange-400 transition-all"
                id="user-profile-button"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                  <User className="w-4 h-4" />
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-800 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-700 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-zinc-100 dark:border-zinc-700/60">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white">Culinary Explorer</p>
                    <p className="text-xs text-zinc-400">TastyTube Member</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        onOpenSavedModal();
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-zinc-700 dark:text-zinc-300 hover:bg-orange-50 dark:hover:bg-zinc-700 flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <Bookmark className="w-4 h-4 text-orange-500" /> Saved Recipes
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/40 text-orange-600 font-semibold">
                        {savedCount}
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        setActiveTab('Saved');
                        onOpenSavedModal();
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-zinc-700 dark:text-zinc-300 hover:bg-orange-50 dark:hover:bg-zinc-700 flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-red-500" /> Liked Videos
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950/40 text-red-600 font-semibold">
                        {likedCount}
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        onOpenAboutModal();
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-zinc-700 dark:text-zinc-300 hover:bg-orange-50 dark:hover:bg-zinc-700 flex items-center gap-2"
                    >
                      <Info className="w-4 h-4 text-amber-500" /> About Platform
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg"
              id="mobile-menu-button"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Expansion */}
        {isSearchOpen && (
          <div className="md:hidden py-3 border-t border-zinc-100 dark:border-zinc-800">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recipes, dishes, chefs..."
                className="w-full pl-10 pr-16 py-2 text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                id="search-input-mobile"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-1.5 px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full"
              >
                Go
              </button>
            </form>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-zinc-200 dark:border-zinc-800 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                    if (item.id === 'Categories') {
                      const el = document.getElementById('category-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`w-full px-3 py-2 rounded-xl text-left text-sm font-medium flex items-center gap-3 ${
                    activeTab === item.id
                      ? 'bg-orange-500 text-white'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAboutModal();
              }}
              className="w-full px-3 py-2 rounded-xl text-left text-sm font-medium flex items-center gap-3 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <Info className="w-4 h-4" />
              About TastyTube
            </button>
          </div>
        )}

      </div>
    </header>
  );
};
