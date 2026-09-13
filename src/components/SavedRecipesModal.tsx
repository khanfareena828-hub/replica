import React from 'react';
import { X, Bookmark, Play, Trash2, Clock, ChefHat, Sparkles } from 'lucide-react';
import { CookingVideo } from '../types';

interface SavedRecipesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedVideos: CookingVideo[];
  onSelectVideo: (video: CookingVideo) => void;
  onRemoveSave: (videoId: string) => void;
}

export const SavedRecipesModal: React.FC<SavedRecipesModalProps> = ({
  isOpen,
  onClose,
  savedVideos,
  onSelectVideo,
  onRemoveSave
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <Bookmark className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white font-heading">
                My Saved Recipe Book
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {savedVideos.length} {savedVideos.length === 1 ? 'recipe' : 'recipes'} bookmarked for cooking
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {savedVideos.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-orange-50 dark:bg-zinc-800 flex items-center justify-center mx-auto text-orange-400">
                <Bookmark className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-zinc-800 dark:text-zinc-200 font-heading">
                No Saved Recipes Yet
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
                Click the bookmark icon on any recipe card to save it here for quick access when you are in the kitchen!
              </p>
            </div>
          ) : (
            savedVideos.map((video) => (
              <div
                key={video.id}
                className="flex items-center gap-4 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-750 hover:border-orange-300 dark:hover:border-orange-500/40 transition-all group"
              >
                {/* Thumbnail */}
                <div
                  onClick={() => {
                    onSelectVideo(video);
                    onClose();
                  }}
                  className="relative w-28 aspect-video rounded-xl overflow-hidden bg-black flex-shrink-0 cursor-pointer"
                >
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.2 rounded bg-black/80 text-[10px] text-white font-bold">
                    {video.duration}
                  </span>
                </div>

                {/* Details */}
                <div
                  onClick={() => {
                    onSelectVideo(video);
                    onClose();
                  }}
                  className="flex-1 min-w-0 cursor-pointer"
                >
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white truncate group-hover:text-orange-500 transition-colors">
                    {video.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="text-orange-600 dark:text-orange-400 font-semibold">{video.category}</span>
                    <span>•</span>
                    <span>{video.channelName}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-[11px] text-zinc-400">
                    <Clock className="w-3 h-3 text-amber-500" />
                    <span>Prep: {video.prepTime} | Cook: {video.cookTime}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onSelectVideo(video);
                      onClose();
                    }}
                    className="p-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white shadow-sm"
                    title="Watch Recipe"
                  >
                    <Play className="w-4 h-4 fill-white" />
                  </button>

                  <button
                    onClick={() => onRemoveSave(video.id)}
                    className="p-2 rounded-xl text-zinc-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-zinc-700 transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
