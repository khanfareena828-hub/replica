import React, { useState, useEffect } from 'react';
import { 
  X, 
  Heart, 
  Bookmark, 
  Share2, 
  Eye, 
  Clock, 
  Utensils, 
  ChefHat, 
  Check, 
  Copy, 
  Sparkles, 
  ExternalLink,
  ArrowLeft,
  Flame,
  CheckCircle2,
  Printer
} from 'lucide-react';
import { CookingVideo } from '../types';
import { getYouTubeEmbedUrl } from '../data/videos';

interface VideoWatchModalProps {
  video: CookingVideo | null;
  onClose: () => void;
  allVideos: CookingVideo[];
  onSelectVideo: (video: CookingVideo) => void;
  isLiked: boolean;
  isSaved: boolean;
  onToggleLike: (videoId: string) => void;
  onToggleSave: (videoId: string) => void;
  onShare: (video: CookingVideo) => void;
  subscribedChannels: Record<string, boolean>;
  onToggleSubscribe: (channelName: string) => void;
}

export const VideoWatchModal: React.FC<VideoWatchModalProps> = ({
  video,
  onClose,
  allVideos,
  onSelectVideo,
  isLiked,
  isSaved,
  onToggleLike,
  onToggleSave,
  onShare,
  subscribedChannels,
  onToggleSubscribe
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'ingredients' | 'instructions'>('overview');
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    // Reset checked ingredients and active tab when video changes
    setCheckedIngredients({});
    setActiveTab('overview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [video?.id]);

  if (!video) return null;

  const isSubscribed = !!subscribedChannels[video.channelName];

  // Related videos: same category or other top videos excluding current
  const relatedVideos = allVideos
    .filter((v) => v.id !== video.id)
    .sort((a, b) => (a.category === video.category ? -1 : 1))
    .slice(0, 6);

  const toggleIngredient = (index: number) => {
    setCheckedIngredients((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(video.youtubeUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePrintRecipe = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex flex-col justify-start animate-in fade-in duration-200">
      
      {/* Top Header Bar for Watch Page */}
      <div className="sticky top-0 z-20 w-full bg-zinc-950/90 border-b border-zinc-800/80 px-4 sm:px-8 py-3 flex items-center justify-between text-white backdrop-blur-md">
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-sm font-semibold transition-colors"
          id="back-to-browse-btn"
        >
          <ArrowLeft className="w-4 h-4 text-orange-400" />
          <span>Back to Browse</span>
        </button>

        <div className="hidden md:flex items-center gap-2 text-sm text-zinc-400">
          <span>TastyTube</span>
          <span>•</span>
          <span className="text-orange-400 font-medium">{video.category}</span>
          <span>•</span>
          <span className="text-zinc-200 truncate max-w-xs">{video.title}</span>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
          title="Close"
          id="close-watch-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Watch Page Body */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Video & Content Column (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Embedded YouTube Player */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl border border-zinc-800">
              <iframe
                src={getYouTubeEmbedUrl(video.youtubeId, true)}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Video Title & Badges */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
              
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 font-bold text-xs uppercase tracking-wider">
                  {video.category}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold text-xs">
                  {video.foodType}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 font-semibold text-xs flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Prep: {video.prepTime} • Cook: {video.cookTime}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-zinc-900 dark:text-white leading-tight font-heading">
                {video.title}
              </h1>

              {/* Channel Row & Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                
                {/* Channel & Subscribe */}
                <div className="flex items-center gap-3">
                  <img
                    src={video.channelAvatar}
                    alt={video.channelName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-orange-500 shadow"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-zinc-900 dark:text-white">
                      <span>{video.channelName}</span>
                      <CheckCircle2 className="w-4 h-4 text-orange-500 fill-orange-500/20" />
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Verified Culinary Channel</p>
                  </div>

                  <button
                    onClick={() => onToggleSubscribe(video.channelName)}
                    className={`ml-3 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                      isSubscribed
                        ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300'
                        : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/25'
                    }`}
                    id={`subscribe-btn-${video.id}`}
                  >
                    {isSubscribed ? 'Subscribed ✓' : 'Subscribe'}
                  </button>
                </div>

                {/* Actions: Like, Save, Share, Copy */}
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => onToggleLike(video.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      isLiked
                        ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 border border-rose-300 dark:border-rose-900'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                    }`}
                    id="watch-like-btn"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                    <span>{video.likesCount + (isLiked ? 1 : 0)}</span>
                  </button>

                  <button
                    onClick={() => onToggleSave(video.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      isSaved
                        ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 border border-orange-300 dark:border-orange-900'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                    }`}
                    id="watch-save-btn"
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-orange-500 text-orange-500' : ''}`} />
                    <span>{isSaved ? 'Saved' : 'Save'}</span>
                  </button>

                  <button
                    onClick={() => onShare(video)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                    id="watch-share-btn"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>

                  <button
                    onClick={handleCopyLink}
                    className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                    title="Copy Video Link"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={handlePrintRecipe}
                    className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                    title="Print Recipe Card"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Official YouTube Link Reference */}
              <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-orange-500" /> {video.views} • Uploaded {video.uploadTime}
                </span>
                <a
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-orange-600 dark:text-orange-400 hover:underline font-semibold"
                >
                  Watch directly on YouTube <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>

            {/* Recipe Interactive Details Tabs */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
              
              {/* Tab Navigation */}
              <div className="flex items-center border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/40 px-6 pt-3 gap-6">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-3 text-sm font-bold border-b-2 transition-all ${
                    activeTab === 'overview'
                      ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                      : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                  }`}
                >
                  Recipe Overview
                </button>
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                    activeTab === 'ingredients'
                      ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                      : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                  }`}
                >
                  <Utensils className="w-4 h-4" />
                  Ingredients ({video.ingredients.length})
                </button>
                <button
                  onClick={() => setActiveTab('instructions')}
                  className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                    activeTab === 'instructions'
                      ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                      : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                  }`}
                >
                  <ChefHat className="w-4 h-4" />
                  Step-by-Step Instructions ({video.instructions.length})
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-base">
                      {video.description}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-orange-50/50 dark:bg-zinc-800/60 border border-orange-200/50 dark:border-zinc-700">
                      <div>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 block font-medium">Difficulty</span>
                        <span className="text-sm font-bold text-zinc-900 dark:text-white">{video.difficulty}</span>
                      </div>
                      <div>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 block font-medium">Prep Time</span>
                        <span className="text-sm font-bold text-zinc-900 dark:text-white">{video.prepTime}</span>
                      </div>
                      <div>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 block font-medium">Cook Time</span>
                        <span className="text-sm font-bold text-zinc-900 dark:text-white">{video.cookTime}</span>
                      </div>
                      <div>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 block font-medium">Yield / Servings</span>
                        <span className="text-sm font-bold text-zinc-900 dark:text-white">{video.servings}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Recipe Tags</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {video.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-md text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'ingredients' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
                      <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
                        Check items off as you prep
                      </span>
                      <button
                        onClick={() => setCheckedIngredients({})}
                        className="text-xs text-orange-500 hover:underline font-semibold"
                      >
                        Reset Checkmarks
                      </button>
                    </div>

                    <ul className="space-y-2.5">
                      {video.ingredients.map((ingredient, idx) => {
                        const isChecked = !!checkedIngredients[idx];
                        return (
                          <li
                            key={idx}
                            onClick={() => toggleIngredient(idx)}
                            className={`flex items-start gap-3 p-2.5 rounded-xl cursor-pointer transition-colors border ${
                              isChecked
                                ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900 text-zinc-400 line-through'
                                : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200/60 dark:border-zinc-700/60 text-zinc-800 dark:text-zinc-200 hover:border-orange-300'
                            }`}
                          >
                            <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                              isChecked
                                ? 'bg-emerald-500 border-emerald-500 text-white'
                                : 'border-zinc-300 dark:border-zinc-600'
                            }`}>
                              {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                            <span className="text-sm font-medium leading-normal">{ingredient}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {activeTab === 'instructions' && (
                  <div className="space-y-4">
                    <p className="text-xs text-zinc-400 uppercase tracking-wider font-semibold pb-2 border-b border-zinc-100 dark:border-zinc-800">
                      Culinary Masterclass Steps
                    </p>

                    <ol className="space-y-4">
                      {video.instructions.map((step, idx) => (
                        <li key={idx} className="flex gap-4 items-start">
                          <span className="w-7 h-7 rounded-xl bg-orange-500 text-white font-extrabold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                            {idx + 1}
                          </span>
                          <div className="flex-1">
                            <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
                              {step}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* Right Sidebar: Related Cooking Videos (1 Col) */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white font-heading mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-500" />
                Related Cooking Videos
              </h3>

              <div className="space-y-4">
                {relatedVideos.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectVideo(rel)}
                    className="flex gap-3 group cursor-pointer p-2 rounded-xl hover:bg-orange-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <div className="relative w-28 aspect-video rounded-lg overflow-hidden bg-black flex-shrink-0">
                      <img
                        src={`https://img.youtube.com/vi/${rel.youtubeId}/hqdefault.jpg`}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-black/80 text-[10px] text-white font-bold">
                        {rel.duration}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 line-clamp-2 group-hover:text-orange-500 transition-colors">
                        {rel.title}
                      </h4>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 truncate">
                        {rel.channelName}
                      </p>
                      <p className="text-[10px] text-orange-600 dark:text-orange-400 font-semibold mt-0.5">
                        {rel.category} • {rel.views}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chef Mini Spotlight Card */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-100 dark:from-zinc-900 dark:to-zinc-850 p-5 rounded-2xl border border-amber-200 dark:border-zinc-800">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={video.channelAvatar}
                  alt={video.channelName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-orange-500"
                />
                <div>
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-white flex items-center gap-1">
                    {video.channelName}
                  </h4>
                  <p className="text-xs text-orange-700 dark:text-orange-400 font-semibold">Featured Master Chef</p>
                </div>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                Watch full masterclasses, subscribe for notifications on new recipe drops, and explore authentic signature culinary techniques.
              </p>
              <button
                onClick={() => onToggleSubscribe(video.channelName)}
                className={`w-full py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  isSubscribed
                    ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200'
                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                }`}
              >
                {isSubscribed ? 'Subscribed to Chef ✓' : 'Subscribe to Chef Channel'}
              </button>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
