import React from 'react';
import { ChefHat, ArrowUp, Heart, Sparkles, Youtube, Instagram, Twitter, Utensils } from 'lucide-react';
import { CategoryType } from '../types';

interface FooterProps {
  onSelectCategory: (cat: CategoryType) => void;
  onOpenAboutModal: () => void;
  onOpenSavedModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenAboutModal,
  onOpenSavedModal
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories: CategoryType[] = [
    'Indian',
    'Italian',
    'Chinese',
    'Desserts',
    'Breakfast',
    'Snacks',
    'Healthy',
    'Street Food',
    'Vegetarian',
    'Non-Vegetarian'
  ];

  return (
    <footer className="mt-20 border-t border-amber-200/60 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-400 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
                <ChefHat className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="font-heading font-extrabold text-2xl tracking-tight text-zinc-900 dark:text-white">
                Tasty<span className="text-orange-600">Tube</span>
              </span>
            </div>
            
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Your premier destination for delicious cooking videos, authentic restaurant secrets, and culinary masterclasses from top chefs worldwide.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="w-8 h-8 rounded-full bg-orange-50 dark:bg-zinc-800 flex items-center justify-center text-orange-600 hover:bg-orange-500 hover:text-white cursor-pointer transition-colors">
                <Youtube className="w-4 h-4" />
              </span>
              <span className="w-8 h-8 rounded-full bg-orange-50 dark:bg-zinc-800 flex items-center justify-center text-orange-600 hover:bg-orange-500 hover:text-white cursor-pointer transition-colors">
                <Instagram className="w-4 h-4" />
              </span>
              <span className="w-8 h-8 rounded-full bg-orange-50 dark:bg-zinc-800 flex items-center justify-center text-orange-600 hover:bg-orange-500 hover:text-white cursor-pointer transition-colors">
                <Twitter className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white font-heading uppercase tracking-wider">
              Popular Cuisines
            </h4>
            <ul className="space-y-2 text-xs">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      const el = document.getElementById('category-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-zinc-500 dark:text-zinc-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                  >
                    {cat} Recipes
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* More Categories & Features */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white font-heading uppercase tracking-wider">
              Dietary & Discovery
            </h4>
            <ul className="space-y-2 text-xs">
              {categories.slice(5).map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      const el = document.getElementById('category-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-zinc-500 dark:text-zinc-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                  >
                    {cat} Dishes
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={onOpenSavedModal}
                  className="text-zinc-500 dark:text-zinc-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  My Saved Recipes
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3 md:col-span-1">
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white font-heading uppercase tracking-wider">
              Fresh Recipe Drops
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Get notified when top chefs upload new authentic recipes and kitchen tips.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for subscribing to TastyTube recipe alerts!');
              }}
              className="space-y-2"
            >
              <input
                type="email"
                placeholder="Enter your email address..."
                required
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-200/60 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <p>© {new Date().getFullYear()} TastyTube Culinary Platform. All 20 curated YouTube cooking videos credit to their respective creators.</p>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAboutModal}
              className="hover:text-orange-500 transition-colors"
            >
              About &amp; Attribution
            </button>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-orange-600 dark:text-orange-400 hover:underline font-bold"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
