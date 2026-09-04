import { Reveal } from '../ui/Reveal';
import { StoryHeader } from '../ui/StoryHeader';

interface YapProps {
  longestConversationMinutes: number;
  chapter: number;
  totalChapters: number;
  onNext: () => void;
}

export function InfiniteYapSection({ longestConversationMinutes, chapter, totalChapters, onNext }: YapProps) {
  const formatMarathon = (minutes: number) => {
    if (minutes < 60) return `${Math.round(minutes)}M`;
    const h = Math.floor(minutes / 60);
    const m = Math.round(minutes % 60);
    return `${h}H ${m}M`;
  };

  return (
    <section className="flex-1 flex flex-col relative w-full pt-28 pb-safe bg-surface-cream min-h-screen">
      <StoryHeader chapter={chapter} totalChapters={totalChapters} />
      <div className="flex flex-col w-full px-margin-mobile pb-space-lg select-none">
        
        {/* Ticker */}
        <Reveal delay={0.1} className="-mx-margin-mobile bg-electric-cyan text-border-black py-space-xxs overflow-hidden rotate-1 border-y-4 border-border-black shadow-[0_4px_0_#000]">
          <div className="animate-marquee whitespace-nowrap font-label-sm text-label-sm uppercase tracking-widest flex items-center gap-space-md">
            <span className="flex items-center gap-space-xs font-extrabold">🚨 THE INFINITE YAP // INCIDENT REPORT</span>
            <span>★</span>
            <span className="flex items-center gap-space-xs font-extrabold">🚨 THE INFINITE YAP // INCIDENT REPORT</span>
          </div>
        </Reveal>

        {/* Hero */}
        <Reveal delay={0.2} className="flex flex-col items-start gap-space-xxs pt-space-md">
          <div className="bg-border-black text-electric-yellow px-space-xs py-0.5 border-[2px] border-electric-yellow font-label-sm text-label-sm uppercase tracking-widest rotate-2">
            CRITICAL EVENT
          </div>
          <h1 className="font-headline-sm text-headline-sm uppercase text-border-black tracking-tight leading-tight mt-1">
            YOU ONCE FORGOT <br/>
            <span className="inline-block bg-lime-green px-1 py-0.5 border-4 border-border-black shadow-[4px_4px_0px_#000000] transform -rotate-1 mt-1">TIME EXISTED.</span>
          </h1>
        </Reveal>

        {/* The Big Number */}
        <Reveal delay={0.4} className="mt-space-md">
          <div className="relative bg-electric-yellow border-4 border-border-black shadow-[8px_8px_0px_#000000] p-space-md flex flex-col items-center justify-center w-full">
            <div className="absolute top-0 right-0 bg-hot-pink text-surface-cream text-label-sm font-label-sm px-2 py-1 border-b-4 border-l-4 border-border-black font-extrabold">
              (LONGEST UNBROKEN MARATHON)
            </div>
            <div className="mt-space-sm mb-space-xxs relative flex justify-center w-full">
              <span className="font-display-hero-mobile text-display-hero-mobile text-border-black leading-none tracking-tighter text-center">
                {formatMarathon(longestConversationMinutes)}
              </span>
            </div>
            <div className="w-full bg-border-black h-1 mb-space-xs mt-space-xs"></div>
            <div className="flex w-full items-center justify-between font-label-sm text-label-sm uppercase font-bold text-border-black">
              <span>STRAIGHT YAP.</span>
              <span>NO BREAKS.</span>
            </div>
          </div>
        </Reveal>

        {/* Fun stat */}
        <Reveal delay={0.5} className="mt-space-sm w-full">
          <div className="bg-surface-cream-alt border-[3px] border-border-black shadow-[5px_5px_0px_#000000] p-space-xs flex items-center justify-between">
            <span className="font-label-sm text-label-sm uppercase tracking-wider">BATTERY LIFE DRAINED:</span>
            <span className="font-headline-sm text-headline-sm text-hot-pink font-black">99%</span>
          </div>
        </Reveal>

        <Reveal delay={0.6} className="mt-auto pt-space-lg">
          <button onClick={onNext} className="w-full bg-border-black text-electric-yellow p-space-md font-label-lg text-label-lg uppercase tracking-wider flex items-center justify-between border-[3px] border-border-black shadow-[6px_6px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer">
            <span>NEXT CHAPTER</span>
            <span className="material-symbols-outlined text-2xl font-bold">arrow_forward</span>
          </button>
        </Reveal>

      </div>
    </section>
  );
}
