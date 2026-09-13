import { useState, useEffect, useMemo } from 'react';
import { 
  Flame, 
  Sparkles, 
  Clock, 
  Utensils, 
  Compass, 
  ChefHat, 
  Search, 
  Filter, 
  SlidersHorizontal,
  Bookmark,
  Home,
  Sun,
  Moon,
  TrendingUp,
  RotateCcw
} from 'lucide-react';
import { ActiveTab, CategoryType, CookingVideo } from './types';
import { INITIAL_VIDEOS } from './data/videos';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryBar } from './components/CategoryBar';
import { VideoCard } from './components/VideoCard';
import { VideoWatchModal } from './components/VideoWatchModal';
import { PopularChefsSection } from './components/PopularChefsSection';
import { TodaysSpecialSection, QuickEasySection } from './components/ExtraSections';
import { ShareModal } from './components/ShareModal';
import { SavedRecipesModal } from './components/SavedRecipesModal';
import { AboutModal } from './components/AboutModal';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';

export default function App() {
  // Video dataset (contains all 20 YouTube links)
  const [videos] = useState<CookingVideo[]>(INITIAL_VIDEOS);
  
  // Navigation & Filtering
  const [activeTab, setActiveTab] = useState<ActiveTab>('Home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState<'recommended' | 'popular' | 'latest' | 'quick'>('recommended');
  
  // Active Video for Watch View
  const [selectedVideo, setSelectedVideo] = useState<CookingVideo | null>(null);
  
  // Modals
  const [shareVideo, setShareVideo] = useState<CookingVideo | null>(null);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState<boolean>(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState<boolean>(false);

  // Local Storage for Likes
  const [likedVideos, setLikedVideos] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('tastytube_likes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Local Storage for Saved / Bookmarked Recipes
  const [savedVideos, setSavedVideos] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('tastytube_saved');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Local Storage for Subscribed Channels
  const [subscribedChannels, setSubscribedChannels] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('tastytube_subs');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Dark / Light Theme
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('tastytube_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Apply dark mode class to root HTML element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('tastytube_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('tastytube_theme', 'light');
    }
  }, [isDarkMode]);

  // Sync likes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tastytube_likes', JSON.stringify(likedVideos));
    } catch (e) {
      console.error(e);
    }
  }, [likedVideos]);

  // Sync saved recipes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tastytube_saved', JSON.stringify(savedVideos));
    } catch (e) {
      console.error(e);
    }
  }, [savedVideos]);

  // Sync subscriptions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tastytube_subs', JSON.stringify(subscribedChannels));
    } catch (e) {
      console.error(e);
    }
  }, [subscribedChannels]);

  // Handlers
  const handleToggleLike = (videoId: string) => {
    setLikedVideos(prev => ({
      ...prev,
      [videoId]: !prev[videoId]
    }));
  };

  const handleToggleSave = (videoId: string) => {
    setSavedVideos(prev => ({
      ...prev,
      [videoId]: !prev[videoId]
    }));
  };

  const handleToggleSubscribe = (channelName: string) => {
    setSubscribedChannels(prev => ({
      ...prev,
      [channelName]: !prev[channelName]
    }));
  };

  const handleSelectChefFilter = (chefName: string) => {
    setSearchQuery(chefName);
    setSelectedCategory('All');
    const el = document.getElementById('featured-videos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: videos.length };
    videos.forEach(v => {
      counts[v.category] = (counts[v.category] || 0) + 1;
      if (v.foodType === 'Vegetarian') {
        counts['Vegetarian'] = (counts['Vegetarian'] || 0) + 1;
      }
      if (v.foodType === 'Non-Vegetarian') {
        counts['Non-Vegetarian'] = (counts['Non-Vegetarian'] || 0) + 1;
      }
    });
    return counts;
  }, [videos]);

  // Filter and sort videos
  const filteredVideos = useMemo(() => {
    let result = [...videos];

    // Category filter
    if (selectedCategory !== 'All') {
      if (selectedCategory === 'Vegetarian') {
        result = result.filter(v => v.foodType === 'Vegetarian');
      } else if (selectedCategory === 'Non-Vegetarian') {
        result = result.filter(v => v.foodType === 'Non-Vegetarian');
      } else {
        result = result.filter(v => v.category === selectedCategory);
      }
    }

    // Active tab filter
    if (activeTab === 'Popular') {
      result.sort((a, b) => b.numericViews - a.numericViews);
    } else if (activeTab === 'Latest') {
      // Latest takes newer videos or trending
      result = result.filter(v => v.isTrending || v.uploadTime.includes('days') || v.uploadTime.includes('week'));
    }

    // Search query filter (searches recipe name, food type, category, chef name, tags, ingredients)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(v => 
        v.title.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q) ||
        v.foodType.toLowerCase().includes(q) ||
        v.channelName.toLowerCase().includes(q) ||
        v.tags.some(tag => tag.toLowerCase().includes(q)) ||
        v.ingredients.some(ing => ing.toLowerCase().includes(q))
      );
    }

    // Manual Sort
    if (selectedSort === 'popular') {
      result.sort((a, b) => b.numericViews - a.numericViews);
    } else if (selectedSort === 'latest') {
      result.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0));
    } else if (selectedSort === 'quick') {
      result.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
    }

    return result;
  }, [videos, selectedCategory, activeTab, searchQuery, selectedSort]);

  // Saved videos array for the Saved modal
  const bookmarkedVideosList = useMemo(() => {
    return videos.filter(v => !!savedVideos[v.id]);
  }, [videos, savedVideos]);

  const likedVideosCount = Object.values(likedVideos).filter(Boolean).length;
  const savedVideosCount = Object.values(savedVideos).filter(Boolean).length;

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/30 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200 selection:bg-orange-500 selection:text-white pb-16 md:pb-0">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        savedCount={savedVideosCount}
        likedCount={likedVideosCount}
        onOpenSavedModal={() => setIsSavedModalOpen(true)}
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
        videos={videos}
        onSelectVideo={(v) => setSelectedVideo(v)}
      />

      {/* Hero Section */}
      <HeroSection
        onExploreClick={() => {
          const el = document.getElementById('category-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onWatchVideosClick={() => {
          const el = document.getElementById('featured-videos');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onSelectTag={(tag) => {
          setSearchQuery(tag);
          setSelectedCategory('All');
          const el = document.getElementById('featured-videos');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Category Section with colourful cards */}
      <CategoryBar
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('featured-videos');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        categoryCounts={categoryCounts}
      />

      {/* Today's Special Spotlight Section */}
      <TodaysSpecialSection
        videos={videos}
        onSelectVideo={(v) => setSelectedVideo(v)}
        onToggleLike={handleToggleLike}
        onToggleSave={handleToggleSave}
        likedVideos={likedVideos}
        savedVideos={savedVideos}
      />

      {/* Main Video Section: Featured & Filtered Videos Grid */}
      <main id="featured-videos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8 flex-1">
        
        {/* Section Header & Sorters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-200/80 dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-zinc-900 dark:text-white">
                {searchQuery ? `Search Results for "${searchQuery}"` : 
                 selectedCategory !== 'All' ? `${selectedCategory} Cooking Videos` : 
                 activeTab === 'Popular' ? 'Most Popular Cooking Videos' :
                 activeTab === 'Latest' ? 'Latest & Trending Recipes' :
                 'Featured Cooking Videos'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Showing {filteredVideos.length} of 20 hand-picked YouTube culinary masterclasses
            </p>
          </div>

          {/* Controls: Active filters reset & Sort dropdown */}
          <div className="flex items-center gap-3 flex-wrap">
            {(selectedCategory !== 'All' || searchQuery !== '') && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 text-xs font-semibold hover:bg-orange-200 transition-colors"
                id="reset-filters-btn"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Filters
              </button>
            )}

            {/* Sort Options */}
            <div className="flex items-center gap-2 bg-white dark:bg-zinc-800/90 px-3 py-1.5 rounded-xl border border-zinc-200/80 dark:border-zinc-700 text-xs shadow-sm">
              <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-zinc-500 dark:text-zinc-400 hidden sm:inline">Sort:</span>
              <select
                value={selectedSort}
                onChange={(e: any) => setSelectedSort(e.target.value)}
                className="bg-transparent text-zinc-800 dark:text-zinc-200 font-semibold focus:outline-none cursor-pointer"
                id="sort-select"
              >
                <option value="recommended" className="dark:bg-zinc-850">Recommended</option>
                <option value="popular" className="dark:bg-zinc-850">Most Watched</option>
                <option value="latest" className="dark:bg-zinc-850">Trending First</option>
                <option value="quick" className="dark:bg-zinc-850">Quickest Prep</option>
              </select>
            </div>
          </div>
        </div>

        {/* Video Cards Grid */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6">
            {filteredVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                isLiked={!!likedVideos[video.id]}
                isSaved={!!savedVideos[video.id]}
                onToggleLike={handleToggleLike}
                onToggleSave={handleToggleSave}
                onShare={(v) => setShareVideo(v)}
                onSelectVideo={(v) => setSelectedVideo(v)}
              />
            ))}
          </div>
        ) : (
          /* "No recipes found" Empty State */
          <div className="text-center py-16 px-4 space-y-4 max-w-md mx-auto">
            <div className="w-20 h-20 rounded-3xl bg-orange-100 dark:bg-zinc-800 flex items-center justify-center mx-auto text-orange-500 shadow-inner">
              <Utensils className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white font-heading">
              No Recipes Found
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              We couldn&apos;t find any recipes matching &ldquo;{searchQuery}&rdquo; in {selectedCategory}. Try searching for dishes like butter chicken, carbonara, tacos, or dim sum!
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs rounded-xl shadow-md transition-all"
            >
              Show All 20 Videos
            </button>
          </div>
        )}

      </main>

      {/* Quick & Easy Section */}
      <QuickEasySection
        videos={videos}
        onSelectVideo={(v) => setSelectedVideo(v)}
      />

      {/* Popular Chefs & Creators Section */}
      <PopularChefsSection
        subscribedChannels={subscribedChannels}
        onToggleSubscribe={handleToggleSubscribe}
        onFilterByChef={handleSelectChefFilter}
      />

      {/* Dedicated Video Watch Page / Player Modal */}
      {selectedVideo && (
        <VideoWatchModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
          allVideos={videos}
          onSelectVideo={(v) => setSelectedVideo(v)}
          isLiked={!!likedVideos[selectedVideo.id]}
          isSaved={!!savedVideos[selectedVideo.id]}
          onToggleLike={handleToggleLike}
          onToggleSave={handleToggleSave}
          onShare={(v) => setShareVideo(v)}
          subscribedChannels={subscribedChannels}
          onToggleSubscribe={handleToggleSubscribe}
        />
      )}

      {/* Share Modal */}
      {shareVideo && (
        <ShareModal
          video={shareVideo}
          onClose={() => setShareVideo(null)}
        />
      )}

      {/* Saved Recipes Modal */}
      <SavedRecipesModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedVideos={bookmarkedVideosList}
        onSelectVideo={(v) => setSelectedVideo(v)}
        onRemoveSave={handleToggleSave}
      />

      {/* About TastyTube Modal */}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />

      {/* Floating Back to Top Button */}
      <BackToTop />

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('featured-videos');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
        onOpenSavedModal={() => setIsSavedModalOpen(true)}
      />

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 md:hidden flex items-center justify-around py-2 px-3 shadow-lg">
        <button
          onClick={() => {
            setActiveTab('Home');
            setSelectedCategory('All');
            setSearchQuery('');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 p-1 text-xs font-semibold ${
            activeTab === 'Home' && selectedCategory === 'All'
              ? 'text-orange-600 dark:text-orange-400'
              : 'text-zinc-500 dark:text-zinc-400'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => {
            const el = document.getElementById('category-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-1 p-1 text-xs font-semibold text-zinc-500 dark:text-zinc-400"
        >
          <Utensils className="w-5 h-5" />
          <span>Cuisines</span>
        </button>

        <button
          onClick={() => {
            const el = document.getElementById('popular-chefs-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-1 p-1 text-xs font-semibold text-zinc-500 dark:text-zinc-400"
        >
          <ChefHat className="w-5 h-5" />
          <span>Chefs</span>
        </button>

        <button
          onClick={() => setIsSavedModalOpen(true)}
          className="relative flex flex-col items-center gap-1 p-1 text-xs font-semibold text-zinc-500 dark:text-zinc-400"
        >
          <Bookmark className="w-5 h-5" />
          <span>Saved</span>
          {savedVideosCount > 0 && (
            <span className="absolute top-0 right-2 w-4 h-4 bg-orange-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {savedVideosCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="flex flex-col items-center gap-1 p-1 text-xs font-semibold text-zinc-500 dark:text-zinc-400"
        >
          {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          <span>{isDarkMode ? 'Light' : 'Dark'}</span>
        </button>
      </nav>

    </div>
  );
}
