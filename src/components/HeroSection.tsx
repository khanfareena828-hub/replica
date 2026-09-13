import React from 'react';
import { Play, Compass, Flame, ChefHat, Sparkles, Clock, Utensils } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onWatchVideosClick: () => void;
  onSelectTag: (tag: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onWatchVideosClick,
  onSelectTag
}) => {
  const quickTags = ['Butter Chicken', 'Pasta Carbonara', 'Lava Cake', 'Biryani', 'Pad Thai', 'Ramen', 'Vada Pav'];

  return (
    <div className="relative overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 my-6 shadow-2xl border border-amber-300/40 dark:border-zinc-800">
      {/* Background Image with Rich Warm Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105 hover:scale-100"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=2000&q=85')`
        }}
      />
      
      {/* Dynamic Multi-layered Gradient for Contrast & Appetizing Vibe */}
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/75 to-orange-950/50 backdrop-blur-[1px]" />
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/60" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl px-6 py-16 sm:px-12 sm:py-20 lg:py-24 text-white">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 border border-orange-400/30 backdrop-blur-md mb-6 animate-pulse">
          <Flame className="w-4 h-4 text-orange-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-200">
            Welcome to TastyTube • Culinary Masterclass Platform
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight sm:leading-none mb-6 font-heading drop-shadow-md">
          Cook Something <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-200">
            Amazing Today!
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-zinc-200 font-normal max-w-2xl mb-8 leading-relaxed drop-shadow">
          Discover delicious recipes, cooking tips and inspiring food videos created by world-class chefs and passionate street food masters.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-10">
          <button
            onClick={onExploreClick}
            id="explore-recipes-btn"
            className="flex items-center justify-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-base rounded-2xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Compass className="w-5 h-5" />
            Explore Recipes
          </button>
          
          <button
            onClick={onWatchVideosClick}
            id="watch-videos-btn"
            className="flex items-center justify-center gap-2.5 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-base rounded-2xl backdrop-blur-md border border-white/25 hover:border-white/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Play className="w-5 h-5 fill-white" />
            Watch Videos
          </button>
        </div>

        {/* Highlight Feature Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/15 max-w-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">20 Curated</p>
              <p className="text-xs text-zinc-300">Signature Recipes</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Top Chefs</p>
              <p className="text-xs text-zinc-300">Global Gastronomy</p>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">100% Free</p>
              <p className="text-xs text-zinc-300">HD Video Tutorials</p>
            </div>
          </div>
        </div>

        {/* Quick Recipe Chips */}
        <div className="mt-6 flex items-center flex-wrap gap-2">
          <span className="text-xs font-semibold text-zinc-300 mr-1 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-orange-400" /> Popular today:
          </span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onSelectTag(tag)}
              className="text-xs px-3 py-1 rounded-full bg-white/10 hover:bg-orange-500 text-zinc-200 hover:text-white border border-white/10 transition-colors"
            >
              #{tag}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
