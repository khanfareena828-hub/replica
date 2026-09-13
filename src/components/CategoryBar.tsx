import React, { useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Flame, 
  UtensilsCrossed, 
  Soup, 
  Cake, 
  Coffee, 
  Cookie, 
  Salad, 
  Store, 
  Leaf, 
  Beef 
} from 'lucide-react';
import { CategoryType } from '../types';
import { CATEGORIES_DATA } from '../data/videos';

interface CategoryBarProps {
  selectedCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  categoryCounts: Record<string, number>;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return Sparkles;
      case 'Flame': return Flame;
      case 'UtensilsCrossed': return UtensilsCrossed;
      case 'Soup': return Soup;
      case 'Cake': return Cake;
      case 'Coffee': return Coffee;
      case 'Cookie': return Cookie;
      case 'Salad': return Salad;
      case 'Store': return Store;
      case 'Leaf': return Leaf;
      case 'Beef': return Beef;
      default: return Sparkles;
    }
  };

  return (
    <div id="category-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white font-heading flex items-center gap-2">
            <span>Explore by Cuisine & Category</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Select a category to filter delicious recipes and cooking videos
          </p>
        </div>

        {/* Scroll Controls */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-orange-500 hover:border-orange-500 transition-colors shadow-sm"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-orange-500 hover:border-orange-500 transition-colors shadow-sm"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Categories Horizontal Carousel */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 scrollbar-none no-scrollbar scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {CATEGORIES_DATA.map((cat) => {
          const Icon = getIcon(cat.icon);
          const isSelected = selectedCategory === cat.name;
          const count = categoryCounts[cat.name] ?? cat.count;

          return (
            <button
              key={cat.name}
              onClick={() => onSelectCategory(cat.name)}
              id={`category-btn-${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
              className={`flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-200 border ${
                isSelected
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-orange-500 shadow-md shadow-orange-500/25 scale-[1.03]'
                  : `bg-white dark:bg-zinc-800/90 text-zinc-700 dark:text-zinc-200 border-zinc-200/80 dark:border-zinc-700/80 hover:border-orange-400 dark:hover:border-orange-500/60 hover:bg-orange-50/50 dark:hover:bg-zinc-750`
              }`}
            >
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : `${cat.color} bg-amber-50 dark:bg-zinc-700/60`
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              
              <span className="whitespace-nowrap">{cat.name}</span>

              <span
                className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                  isSelected
                    ? 'bg-black/20 text-white'
                    : 'bg-zinc-100 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
