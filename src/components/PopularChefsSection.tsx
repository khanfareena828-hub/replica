import React from 'react';
import { ChefHat, Video, Users, CheckCircle2, Sparkles } from 'lucide-react';
import { Chef } from '../types';
import { CHEFS_DATA } from '../data/videos';

interface PopularChefsSectionProps {
  subscribedChannels: Record<string, boolean>;
  onToggleSubscribe: (channelName: string) => void;
  onFilterByChef: (chefName: string) => void;
}

export const PopularChefsSection: React.FC<PopularChefsSectionProps> = ({
  subscribedChannels,
  onToggleSubscribe,
  onFilterByChef
}) => {
  return (
    <section id="popular-chefs-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">
            <ChefHat className="w-3.5 h-3.5" />
            Culinary Masters
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white font-heading tracking-tight">
            Popular Chefs & Creators
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Follow award-winning chefs, street food maestros, and master bakers
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CHEFS_DATA.map((chef) => {
          const isSubscribed = !!subscribedChannels[chef.name];

          return (
            <div
              key={chef.id}
              className="bg-white dark:bg-zinc-850 rounded-2xl p-6 border border-zinc-200/90 dark:border-zinc-750 shadow-sm hover:shadow-xl hover:border-orange-300 dark:hover:border-orange-500/50 transition-all duration-300 flex flex-col justify-between"
              id={`chef-card-${chef.id}`}
            >
              <div>
                {/* Chef Avatar & Info */}
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <img
                      src={chef.avatar}
                      alt={chef.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-orange-400 shadow-md"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center">
                      <Sparkles className="w-3 h-3" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base font-bold text-zinc-900 dark:text-white truncate">
                        {chef.name}
                      </h3>
                      <CheckCircle2 className="w-4 h-4 text-orange-500 fill-orange-500/20 flex-shrink-0" />
                    </div>
                    <p className="text-xs text-orange-600 dark:text-orange-400 font-semibold mt-0.5">
                      {chef.role}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-1">
                      {chef.specialty}
                    </p>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-2 mt-5 py-3 px-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-700/60">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-amber-500" />
                    <div>
                      <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block">
                        {chef.subscribers}
                      </span>
                      <span className="text-[10px] text-zinc-400">Subscribers</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-orange-500" />
                    <div>
                      <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block">
                        {chef.videosCount}+ Videos
                      </span>
                      <span className="text-[10px] text-zinc-400">Recipes</span>
                    </div>
                  </div>
                </div>

                {/* Signature Recipe Highlight */}
                <div className="mt-3 text-xs text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
                  <span className="font-semibold text-zinc-400">Top hit:</span>
                  <span className="text-zinc-700 dark:text-zinc-300 font-medium truncate">
                    {chef.featuredRecipe}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-5 pt-3 border-t border-zinc-100 dark:border-zinc-700/60">
                <button
                  onClick={() => onFilterByChef(chef.name)}
                  className="flex-1 py-2 px-3 rounded-xl text-xs font-bold bg-zinc-100 dark:bg-zinc-750 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  View Recipes
                </button>

                <button
                  onClick={() => onToggleSubscribe(chef.name)}
                  id={`chef-sub-btn-${chef.id}`}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all shadow-sm ${
                    isSubscribed
                      ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300'
                      : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-orange-500/20'
                  }`}
                >
                  {isSubscribed ? 'Subscribed ✓' : 'Subscribe'}
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
};
