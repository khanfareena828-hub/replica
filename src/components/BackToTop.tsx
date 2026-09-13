import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 p-3.5 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-110 active:scale-95 transition-all duration-200 focus:outline-none flex items-center justify-center border border-white/20"
      title="Back to Top"
      aria-label="Back to Top"
      id="floating-back-to-top-btn"
    >
      <ArrowUp className="w-5 h-5 stroke-[2.5]" />
    </button>
  );
};
