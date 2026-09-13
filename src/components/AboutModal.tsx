import React from 'react';
import { X, ChefHat, Sparkles, Youtube, Heart, Utensils, Award, ShieldCheck } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-zinc-200 dark:border-zinc-800 space-y-6">
        
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-400 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
              <ChefHat className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white font-heading">
                About Tasty<span className="text-orange-600">Tube</span>
              </h3>
              <p className="text-xs text-orange-600 dark:text-orange-400 font-semibold uppercase tracking-wider">
                The Food & Culinary Video Platform
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          <p>
            <strong className="text-zinc-900 dark:text-white">TastyTube</strong> is an original, vibrant video-sharing web platform crafted exclusively for food lovers, home cooks, and aspiring culinary masters.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-zinc-800/60 border border-amber-200/60 dark:border-zinc-700">
              <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white text-xs mb-1">
                <Youtube className="w-4 h-4 text-red-500" />
                <span>20 Curated Masterclasses</span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Official YouTube video embeds with automated thumbnail extraction and recipe timing.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-orange-50/70 dark:bg-zinc-800/60 border border-orange-200/60 dark:border-zinc-700">
              <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white text-xs mb-1">
                <Utensils className="w-4 h-4 text-orange-500" />
                <span>Full Recipe Integration</span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Every video includes checkable ingredients, prep & cook times, and step-by-step cooking steps.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-rose-50/70 dark:bg-zinc-800/60 border border-rose-200/60 dark:border-zinc-700">
              <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white text-xs mb-1">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>Local Bookmarks & Likes</span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Save your favorite recipes to your personal browser recipe book without needing any login.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-zinc-800/60 border border-emerald-200/60 dark:border-zinc-700">
              <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white text-xs mb-1">
                <Award className="w-4 h-4 text-emerald-500" />
                <span>Celebrity & Street Chefs</span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Subscribe to creator channels and filter videos by your favorite culinary creators.
              </p>
            </div>
          </div>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            Easily replace any of the 20 YouTube links in <code className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-mono text-orange-600">src/data/videos.ts</code> or <code className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-mono text-orange-600">public/videos-data.js</code> with your own video URLs.
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-2xl transition-all shadow-md shadow-orange-500/25"
          >
            Start Exploring Recipes
          </button>
        </div>

      </div>
    </div>
  );
};
