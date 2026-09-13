import React, { useState } from 'react';
import { 
  Play, 
  Heart, 
  Bookmark, 
  Share2, 
  Clock, 
  Eye, 
  CheckCircle2, 
  Sparkles,
  Flame
} from 'lucide-react';
import { CookingVideo } from '../types';

interface VideoCardProps {
  video: CookingVideo;
  isLiked: boolean;
  isSaved: boolean;
  onToggleLike: (videoId: string) => void;
  onToggleSave: (videoId: string) => void;
  onShare: (video: CookingVideo) => void;
  onSelectVideo: (video: CookingVideo) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  isLiked,
  isSaved,
  onToggleLike,
  onToggleSave,
  onShare,
  onSelectVideo
}) => {
  const [imgSrc, setImgSrc] = useState<string>(
    `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`
  );
  const [isHovered, setIsHovered] = useState(false);

  // Fallback if high-res fails
  const handleImageError = () => {
    // try standard default or curated food placeholder
    if (imgSrc.includes('hqdefault.jpg')) {
      setImgSrc(`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`);
    } else {
      setImgSrc('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80');
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white dark:bg-zinc-800/90 rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-700/70 shadow-sm hover:shadow-xl hover:border-orange-300 dark:hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between"
      id={`video-card-${video.id}`}
    >
      {/* Top Thumbnail Section */}
      <div 
        onClick={() => onSelectVideo(video)}
        className="relative aspect-video w-full overflow-hidden bg-zinc-900 cursor-pointer"
      >
        <img
          src={imgSrc}
          alt={video.title}
          onError={handleImageError}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Gradient Shadow Overlay on Thumbnail */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Play Button Overlay on Hover */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-12 h-12 rounded-full bg-orange-600/90 text-white flex items-center justify-center shadow-lg shadow-black/40 transform transition-all duration-300 ${
            isHovered ? 'scale-110 opacity-100 bg-orange-500' : 'opacity-0 scale-75'
          }`}>
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/85 backdrop-blur-sm text-white text-[11px] font-semibold flex items-center gap-1">
          <Clock className="w-3 h-3 text-orange-400" />
          <span>{video.duration}</span>
        </div>

        {/* Category & Badge Tags */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
          <span className="px-2 py-0.5 rounded-md bg-orange-600/90 backdrop-blur-sm text-white text-[11px] font-bold shadow">
            {video.category}
          </span>
          {video.isSpecial && (
            <span className="px-2 py-0.5 rounded-md bg-amber-500 text-zinc-950 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow">
              <Sparkles className="w-2.5 h-2.5" /> Special
            </span>
          )}
          {video.isTrending && (
            <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow">
              <Flame className="w-2.5 h-2.5" /> Hot
            </span>
          )}
        </div>

        {/* Veg / Non-Veg Indicator */}
        <div className="absolute top-2.5 right-2.5">
          <div 
            title={video.foodType}
            className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center bg-white/95 shadow ${
              video.foodType === 'Vegetarian' ? 'border-emerald-600' : 'border-rose-600'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${
              video.foodType === 'Vegetarian' ? 'bg-emerald-600' : 'bg-rose-600'
            }`} />
          </div>
        </div>
      </div>

      {/* Video Details & Meta */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 
            onClick={() => onSelectVideo(video)}
            title={video.title}
            className="text-base font-bold text-zinc-900 dark:text-zinc-100 line-clamp-2 hover:text-orange-600 dark:hover:text-orange-400 cursor-pointer transition-colors leading-snug mb-2 font-heading"
          >
            {video.title}
          </h3>

          {/* Chef info */}
          <div className="flex items-center gap-2 mb-2">
            <img 
              src={video.channelAvatar} 
              alt={video.channelName} 
              className="w-6 h-6 rounded-full object-cover border border-amber-300 dark:border-zinc-700" 
            />
            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 truncate">
              {video.channelName}
            </span>
            <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 fill-orange-500/20 flex-shrink-0" />
          </div>

          {/* Views and Upload Time */}
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {video.views}
            </span>
            <span>•</span>
            <span>{video.uploadTime}</span>
          </div>
        </div>

        {/* Interactive Action Bar */}
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-zinc-100 dark:border-zinc-700/60">
          <div className="flex items-center gap-1">
            {/* Like Button */}
            <button
              onClick={() => onToggleLike(video.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isLiked
                  ? 'text-rose-600 bg-rose-50 dark:bg-rose-950/40'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-rose-500 hover:bg-zinc-100 dark:hover:bg-zinc-700/50'
              }`}
              title={isLiked ? 'Unlike' : 'Like'}
              id={`like-btn-${video.id}`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{video.likesCount + (isLiked ? 1 : 0)}</span>
            </button>

            {/* Save/Bookmark Button */}
            <button
              onClick={() => onToggleSave(video.id)}
              className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                isSaved
                  ? 'text-orange-600 bg-orange-50 dark:bg-orange-950/40'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-orange-500 hover:bg-zinc-100 dark:hover:bg-zinc-700/50'
              }`}
              title={isSaved ? 'Saved to Recipes' : 'Save Recipe'}
              id={`save-btn-${video.id}`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-orange-500 text-orange-500' : ''}`} />
            </button>

            {/* Share Button */}
            <button
              onClick={() => onShare(video)}
              className="p-1.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-orange-500 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition-colors"
              title="Share Video"
              id={`share-btn-${video.id}`}
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Watch Button */}
          <button
            onClick={() => onSelectVideo(video)}
            className="px-3 py-1.5 bg-orange-50 dark:bg-orange-950/40 hover:bg-orange-500 hover:text-white text-orange-600 dark:text-orange-400 font-bold text-xs rounded-lg transition-colors flex items-center gap-1"
          >
            <Play className="w-3 h-3 fill-current" />
            Watch
          </button>
        </div>

      </div>
    </div>
  );
};
