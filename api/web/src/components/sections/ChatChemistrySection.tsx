import { Reveal } from '../ui/Reveal';
import { StoryHeader } from '../ui/StoryHeader';

interface ChemistryProps {
  wrapped: any;
  chapter: number;
  totalChapters: number;
  onNext: () => void;
}

export function ChatChemistrySection({ wrapped, chapter, totalChapters, onNext }: ChemistryProps) {
  return (
    <section className="flex-1 flex flex-col relative w-full pt-28 pb-safe bg-surface-cream min-h-screen">
      <StoryHeader chapter={chapter} totalChapters={totalChapters} />
      <div className="flex flex-col w-full px-margin-mobile pb-space-lg select-none">
        
        {/* Ticker */}
        <Reveal delay={0.1} className="-mx-margin-mobile bg-electric-yellow text-border-black py-space-xxs overflow-hidden -rotate-1 border-y-4 border-border-black shadow-[0_4px_0_#000]">
          <div className="animate-marquee whitespace-nowrap font-label-sm text-label-sm uppercase tracking-widest flex items-center gap-space-md font-extrabold">
            <span>🔥 VIBE CHECK INITIATED</span>
            <span>★</span>
            <span>🔥 VIBE CHECK INITIATED</span>
          </div>
        </Reveal>

        {/* Hero */}
        <Reveal delay={0.2} className="flex flex-col items-start gap-space-xxs pt-space-md">
          <div className="bg-hot-pink text-surface-cream px-space-xs py-0.5 border-[2px] border-border-black font-label-sm text-label-sm uppercase tracking-widest rotate-2 shadow-[2px_2px_0px_#000000]">
            VIBE CHECK
          </div>
          <h1 className="font-headline-sm text-headline-sm uppercase text-border-black tracking-tight leading-tight mt-1">
            SO... WHAT ARE
            <span className="inline-block bg-lime-green px-1 py-0.5 border-4 border-border-black shadow-[4px_4px_0px_#000000] transform -rotate-1 mt-1 ml-2">YOU TWO?</span>
          </h1>
        </Reveal>

        {/* Dynamic Vibe Box */}
        <Reveal delay={0.4} className="mt-space-md">
          <div className="relative bg-surface-cream border-4 border-border-black shadow-[8px_8px_0px_#000000] p-space-md flex flex-col items-center justify-center w-full">
            <div className="w-16 h-16 bg-electric-cyan border-[3px] border-border-black flex items-center justify-center mb-space-sm rotate-6 shadow-[3px_3px_0px_#000000]">
              <span className="text-[32px]">🔮</span>
            </div>
            
            <h2 className="font-headline-md-mobile text-headline-md-mobile text-center text-border-black uppercase leading-none tracking-tighter mb-space-xs">
              {wrapped.relationshipDynamic || "THE CHAOTIC DUO"}
            </h2>
            
            <div className="w-full bg-border-black h-1 mb-space-xs"></div>
            
            <p className="font-body-sm text-body-sm text-center text-border-black font-medium leading-snug">
              "{wrapped.roast || "Y'all talk too much, but it's giving iconic energy."}"
            </p>
          </div>
        </Reveal>

        {/* Badges */}
        <Reveal delay={0.5} className="mt-space-sm w-full flex gap-space-xs">
          <div className="flex-1 bg-electric-purple text-surface-cream border-[3px] border-border-black shadow-[4px_4px_0px_#000000] p-space-xs text-center font-label-sm text-label-sm uppercase tracking-wider font-extrabold rotate-1">
            OFFICIALLY DIAGNOSED
          </div>
          <div className="flex-1 bg-vibrant-orange text-border-black border-[3px] border-border-black shadow-[4px_4px_0px_#000000] p-space-xs text-center font-label-sm text-label-sm uppercase tracking-wider font-extrabold -rotate-1">
            NO CURE FOUND
          </div>
        </Reveal>

        <Reveal delay={0.6} className="mt-auto pt-space-lg">
          <button onClick={onNext} className="w-full bg-electric-yellow text-border-black p-space-md font-label-lg text-label-lg uppercase tracking-wider flex items-center justify-between border-[4px] border-border-black shadow-[6px_6px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer">
            <span>NEXT CHAPTER</span>
            <span className="material-symbols-outlined text-2xl font-bold">arrow_forward</span>
          </button>
        </Reveal>

      </div>
    </section>
  );
}
