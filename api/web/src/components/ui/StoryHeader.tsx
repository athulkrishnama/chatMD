import { Marquee } from './Marquee';

interface StoryHeaderProps {
  chapter: number;
  totalChapters: number;
  title?: string;
}

export function StoryHeader({ chapter, totalChapters, title = "CHAT WRAPPED 2024" }: StoryHeaderProps) {
  const chapterStr = String(chapter + 1).padStart(2, '0');
  const totalStr = String(totalChapters).padStart(2, '0');
  
  const marqueeItems = [
    `✦ CHAPTER ${chapterStr} // ${totalStr} • ${title}`,
    `MAXIMUM YAP VELOCITY DETECTED`
  ];

  return (
    <header className="fixed top-0 w-full max-w-[480px] left-1/2 -translate-x-1/2 z-50 pt-safe bg-surface-cream/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-28 flex flex-col justify-between px-margin-mobile pt-space-xs pb-space-xxs">
        
        {/* Progress Bar */}
        <div className="w-full flex items-center gap-space-xs">
          {Array.from({ length: totalChapters }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-DEFAULT ${i <= chapter ? 'bg-border-black' : 'bg-surface-variant'}`}>
              {i === chapter && <div className="h-full w-full bg-hot-pink animate-pulse rounded-DEFAULT"></div>}
            </div>
          ))}
        </div>

        {/* Marquee */}
        <div className="-mx-margin-mobile overflow-hidden bg-border-black text-electric-yellow py-1 px-margin-mobile">
          <Marquee 
            items={marqueeItems} 
            speed={20} 
            className="font-label-sm text-label-sm uppercase tracking-widest text-electric-yellow" 
          />
        </div>

        {/* Top Controls */}
        <div className="flex items-center justify-between pb-space-xxs">
          <button aria-label="Close Story" className="w-11 h-11 flex items-center justify-center bg-surface-cream-alt text-on-surface active:bg-electric-yellow transition-colors" onClick={() => window.close()}>
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
          
          <div className="flex items-center gap-space-xs">
            <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface">Total Yap Time</span>
            <span className="font-label-sm text-label-sm bg-electric-yellow px-space-xs py-0.5 text-border-black font-extrabold">LIVE</span>
          </div>
          
          <div className="flex items-center gap-space-xs">
            <button aria-label="Share Story" className="w-11 h-11 flex items-center justify-center bg-surface-cream-alt text-on-surface active:bg-hot-pink active:text-surface-cream transition-colors">
              <span className="material-symbols-outlined text-[20px]">ios_share</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}
