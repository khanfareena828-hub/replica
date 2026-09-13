import React, { useState } from 'react';
import { X, Copy, Check, Share2, Send, Code } from 'lucide-react';
import { CookingVideo } from '../types';

interface ShareModalProps {
  video: CookingVideo | null;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ video, onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  if (!video) return null;

  const embedCode = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${video.youtubeId}" title="${video.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(video.youtubeUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(embedCode);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2000);
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(`Check out this delicious recipe on TastyTube: ${video.title} - ${video.youtubeUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`Cooking ${video.title} today! Watch on TastyTube: ${video.youtubeUrl} #TastyTube #Recipes`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-zinc-200 dark:border-zinc-800 space-y-5">
        
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold text-lg font-heading">
            <Share2 className="w-5 h-5 text-orange-500" />
            <span>Share This Recipe</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video preview mini */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-orange-50/60 dark:bg-zinc-800/60 border border-orange-200/50 dark:border-zinc-700">
          <img
            src={`https://img.youtube.com/vi/${video.youtubeId}/default.jpg`}
            alt={video.title}
            className="w-16 h-12 rounded-lg object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-zinc-900 dark:text-white line-clamp-1">
              {video.title}
            </p>
            <p className="text-[11px] text-orange-600 dark:text-orange-400 font-medium">
              {video.channelName} • {video.category}
            </p>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div>
          <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block mb-2">
            Share via Social Apps
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={shareOnWhatsApp}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-sm"
            >
              <Send className="w-4 h-4" /> WhatsApp
            </button>
            <button
              onClick={shareOnTwitter}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-colors shadow-sm"
            >
              <Share2 className="w-4 h-4" /> X (Twitter)
            </button>
          </div>
        </div>

        {/* Direct Link Copy */}
        <div>
          <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block mb-1.5">
            Direct Recipe / Video URL
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={video.youtubeUrl}
              className="flex-1 px-3 py-2 text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-xl border border-zinc-200 dark:border-zinc-700 font-mono"
            />
            <button
              onClick={handleCopyLink}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                copiedLink
                  ? 'bg-emerald-600 text-white'
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
              }`}
            >
              {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Embed Code Copy */}
        <div>
          <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block mb-1.5 flex items-center gap-1">
            <Code className="w-3.5 h-3.5 text-orange-500" /> HTML Embed Code
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={embedCode}
              className="flex-1 px-3 py-2 text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-xl border border-zinc-200 dark:border-zinc-700 font-mono truncate"
            />
            <button
              onClick={handleCopyEmbed}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                copiedEmbed
                  ? 'bg-emerald-600 text-white'
                  : 'bg-zinc-700 hover:bg-zinc-800 text-white'
              }`}
            >
              {copiedEmbed ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedEmbed ? 'Copied' : 'Embed'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
