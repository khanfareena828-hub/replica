import React from 'react';
import { 
  Sparkles, 
  Flame, 
  Clock, 
  Play, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  Heart, 
  Bookmark,
  ChevronRight
} from 'lucide-react';
import { CookingVideo } from '../types';

interface ExtraSectionsProps {
  videos: CookingVideo[];
  onSelectVideo: (video: CookingVideo) => void;
  onToggleLike: (videoId: string) => void;
  onToggleSave: (videoId: string) => void;
  likedVideos: Record<string, boolean>;
  savedVideos: Record<string, boolean>;
}

export const TodaysSpecialSection: React.FC<ExtraSectionsProps> = ({
  videos,
  onSelectVideo,
  onToggleLike,
  onToggleSave,
  likedVideos,
  savedVideos
}) => {
  // Find special video (e.g. Butter Chicken or Dum Biryani)
  const specialVideo = videos.find((v) => v.isSpecial) || videos[0];
  if (!specialVideo) return null;

  const isLiked = !!likedVideos[specialVideo.id];
  const isSaved = !!savedVideos[specialVideo.id];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 text-white p-6 sm:p-10 shadow-xl">
        {/* Decorative background effects */}
        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Sparkles className="w-48 h-48" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Text & Recipe Spotlight */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 backdrop-blur-md border border-white/20 text-yellow-200 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              Today&apos;s Chef Special Selection
            </div>

            <h2 className="text-2xl sm:text-4xl font-black font-heading tracking-tight leading-tight">
              {specialVideo.title}
            </h2>

            <p className="text-sm sm:text-base text-orange-50/90 leading-relaxed max-w-xl">
              {specialVideo.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold pt-1">
              <span className="px-3 py-1 rounded-lg bg-black/20 backdrop-blur-md">
                Cuisine: {specialVideo.category}
              </span>
              <span className="px-3 py-1 rounded-lg bg-black/20 backdrop-blur-md flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Prep {specialVideo.prepTime} • Cook {specialVideo.cookTime}
              </span>
              <span className="px-3 py-1 rounded-lg bg-black/20 backdrop-blur-md">
                Chef: {specialVideo.channelName}
              </span>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <button
                onClick={() => onSelectVideo(specialVideo)}
                id="special-watch-now-btn"
                className="flex items-center gap-2 px-6 py-3 bg-white text-orange-600 hover:bg-orange-50 font-bold rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all text-sm"
              >
                <Play className="w-4 h-4 fill-orange-600" />
                Watch Full Masterclass
              </button>

              <button
                onClick={() => onToggleLike(specialVideo.id)}
                className={`p-3 rounded-2xl backdrop-blur-md border transition-all ${
                  isLiked
                    ? 'bg-rose-500 border-rose-400 text-white'
                    : 'bg-black/20 border-white/20 hover:bg-black/30 text-white'
                }`}
                title={isLiked ? 'Liked' : 'Like'}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
              </button>

              <button
                onClick={() => onToggleSave(specialVideo.id)}
                className={`p-3 rounded-2xl backdrop-blur-md border transition-all ${
                  isSaved
                    ? 'bg-amber-400 border-amber-300 text-zinc-950 font-bold'
                    : 'bg-black/20 border-white/20 hover:bg-black/30 text-white'
                }`}
                title={isSaved ? 'Saved' : 'Save'}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-zinc-950' : ''}`} />
              </button>
            </div>
          </div>

          {/* Thumbnail Preview on Card */}
          <div 
            onClick={() => onSelectVideo(specialVideo)}
            className="lg:col-span-5 relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-2 border-white/30 cursor-pointer group"
          >
            <img
              src={`https://img.youtube.com/vi/${specialVideo.youtubeId}/hqdefault.jpg`}
              alt={specialVideo.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-orange-600/90 group-hover:bg-orange-500 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 fill-white ml-0.5" />
              </div>
            </div>
            <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/80 text-xs font-bold">
              {specialVideo.duration}
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};

export const QuickEasySection: React.FC<{
  videos: CookingVideo[];
  onSelectVideo: (video: CookingVideo) => void;
}> = ({ videos, onSelectVideo }) => {
  const quickVideos = videos.filter((v) => v.isQuick || parseInt(v.duration) <= 12).slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Clock className="w-3.5 h-3.5" />
            Fast & Flavorful
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white font-heading">
            Quick & Easy Recipes (&lt; 15 Mins)
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {quickVideos.map((video) => (
          <div
            key={video.id}
            onClick={() => onSelectVideo(video)}
            className="group cursor-pointer bg-white dark:bg-zinc-850 rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-750 shadow-sm hover:shadow-lg hover:border-emerald-400 dark:hover:border-emerald-500/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-bold">
                  {video.duration}
                </span>
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-bold">
                  {video.prepTime} prep
                </span>
              </div>

              <div className="p-3.5">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white line-clamp-2 group-hover:text-emerald-500 transition-colors">
                  {video.title}
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  {video.channelName} • {video.views}
                </p>
              </div>
            </div>

            <div className="p-3.5 pt-0 flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              <span>Ready in {video.cookTime}</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Cook <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
