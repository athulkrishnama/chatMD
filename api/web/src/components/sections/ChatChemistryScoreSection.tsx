import { Reveal } from '../ui/Reveal';
import { StoryHeader } from '../ui/StoryHeader';

interface ScoreProps {
  score: number;
  chapter: number;
  totalChapters: number;
  onNext: () => void;
}

export function ChatChemistryScoreSection({ score, chapter, totalChapters, onNext }: ScoreProps) {
  return (
    <section className="flex-1 flex flex-col relative w-full pt-28 pb-safe bg-surface-cream min-h-screen">
      <StoryHeader chapter={chapter} totalChapters={totalChapters} />
      <div className="flex flex-col w-full px-margin-mobile pb-space-lg select-none items-center">
        
        {/* Ticker */}
        <Reveal delay={0.1} className="-mx-margin-mobile bg-border-black text-lime-green py-space-xxs overflow-hidden rotate-1 border-y-4 border-border-black shadow-[0_4px_0_#000]">
          <div className="animate-marquee whitespace-nowrap font-label-sm text-label-sm uppercase tracking-widest flex items-center gap-space-md">
            <span>// 07. THE GRAND CALCULATION // 2024</span>
            <span className="text-electric-yellow">★</span>
            <span className="text-hot-pink">SCIENTIFICALLY UNHINGED</span>
          </div>
        </Reveal>

        {/* Hero */}
        <Reveal delay={0.2} className="flex flex-col items-center gap-space-xxs pt-space-lg">
          <div className="bg-lime-green text-border-black px-space-xs py-0.5 border-[2px] border-border-black font-label-sm text-label-sm uppercase tracking-widest -rotate-2 shadow-[2px_2px_0px_#000000]">
            THE GRAND CALCULATION
          </div>
          <h1 className="font-headline-sm text-headline-sm uppercase text-border-black tracking-tight leading-tight mt-1 text-center">
            YOUR CHAT <br />
            <span className="inline-block bg-electric-yellow px-1 py-0.5 border-4 border-border-black shadow-[4px_4px_0px_#000000] transform rotate-1 mt-1">CHEMISTRY.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.4} className="mt-space-xl relative w-full flex justify-center">
          <div className="absolute top-2 right-1 z-20 bg-electric-cyan border-[3px] border-border-black px-space-xs py-1 shadow-[3px_3px_0px_#000000] rotate-6">
            <span className="font-label-sm text-label-sm text-border-black font-extrabold uppercase">TROPHY PROTOCOL 🏆</span>
          </div>
          
          <div className="relative w-64 h-64 rounded-full bg-surface-cream border-[5px] border-border-black shadow-[6px_6px_0px_#000000] flex flex-col items-center justify-center p-space-md select-none mt-4">
            <div className="absolute inset-2.5 rounded-full border-[2px] border-dashed border-border-black pointer-events-none opacity-40"></div>
            
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant font-extrabold -mt-2">
              SYNAPSE MATCH SCORE
            </span>
            
            <div className="flex items-baseline justify-center gap-1 my-space-xxs">
              <span className="font-stat-number-mobile text-stat-number-mobile tracking-tighter text-border-black leading-none scale-125 origin-center text-[100px]">
                {score}
              </span>
              <span className="font-headline-sm text-headline-sm text-border-black">%</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.5} className="mt-space-xl w-full">
          <div className="bg-hot-pink border-[3px] border-border-black shadow-[5px_5px_0px_#000000] p-space-sm flex flex-col items-center justify-center">
            <span className="font-label-md text-label-md uppercase font-extrabold text-surface-cream">CERTIFIED DYNAMIC DUO // AUDIT COMPLETE</span>
          </div>
        </Reveal>

        <Reveal delay={0.6} className="mt-auto pt-space-lg w-full">
          <button onClick={onNext} className="w-full bg-electric-cyan text-border-black p-space-md font-label-lg text-label-lg uppercase tracking-wider flex items-center justify-between border-[4px] border-border-black shadow-[6px_6px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer">
            <span>CLAIM DIPLOMA</span>
            <span className="material-symbols-outlined text-2xl font-bold">school</span>
          </button>
        </Reveal>

      </div>
    </section>
  );
}
