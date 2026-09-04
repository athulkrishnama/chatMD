import { Reveal } from '../ui/Reveal';
import { StoryHeader } from '../ui/StoryHeader';

interface CommStyleProps {
  creatorName: string;
  chatName: string;
  engagement: {
    questionsByYou: number;
    questionsByThem: number;
    doubleTextsByYou: number;
    doubleTextsByThem: number;
  };
  chapter: number;
  totalChapters: number;
  onNext: () => void;
}

export function CommunicationStyleSection({ chatName, creatorName, engagement, chapter, totalChapters, onNext }: CommStyleProps) {
  const youInterrogator = engagement.questionsByYou >= engagement.questionsByThem;
  const youDoubleTexter = engagement.doubleTextsByYou >= engagement.doubleTextsByThem;

  return (
    <section className="flex-1 flex flex-col relative w-full pt-28 pb-safe bg-surface-cream min-h-screen">
      <StoryHeader chapter={chapter} totalChapters={totalChapters} />
      <div className="flex flex-col w-full px-margin-mobile pb-space-lg select-none">
        
        {/* Ticker */}
        <Reveal delay={0.1} className="-mx-margin-mobile bg-hot-pink text-surface-cream py-space-xxs overflow-hidden rotate-1 border-y-4 border-border-black shadow-[0_4px_0_#000]">
          <div className="animate-marquee whitespace-nowrap font-label-sm text-label-sm uppercase tracking-widest flex items-center gap-space-md">
            <span>💬 BEHAVIORAL FORENSICS // 2024</span>
            <span className="text-electric-yellow">★</span>
            <span className="text-electric-cyan">LINGUISTIC DYNAMICS</span>
            <span className="text-electric-yellow">★</span>
            <span className="text-lime-green">UNFILTERED STATS</span>
          </div>
        </Reveal>

        {/* Hero */}
        <Reveal delay={0.2} className="flex flex-col items-start gap-space-xs pt-space-md">
          <div className="bg-electric-cyan text-border-black px-space-xs py-0.5 border-[2px] border-border-black font-label-sm text-label-sm uppercase tracking-widest rotate-2 shadow-[2px_2px_0px_#000000]">
            COMMUNICATION STYLE
          </div>
          <h1 className="font-headline-sm text-headline-sm uppercase text-border-black tracking-tight leading-tight mt-1">
            HOW DO YOU TWO
            <br />
            <span className="inline-block bg-lime-green px-1 py-0.5 border-4 border-border-black shadow-[4px_4px_0px_#000000] transform -rotate-1 mt-1">ACTUALLY TALK?</span>
          </h1>
        </Reveal>

        <div className="flex flex-col gap-space-md mt-space-md">
          {/* Questions */}
          <Reveal delay={0.4} className="bg-electric-cyan border-4 border-border-black p-space-md shadow-[6px_6px_0px_#000000] flex flex-col gap-space-md relative">
            <div className="flex items-center justify-between">
              <span className="font-headline-sm text-headline-sm uppercase text-border-black tracking-tight">QUESTIONS ASKED</span>
              <span className="bg-border-black text-electric-cyan font-label-sm text-label-sm uppercase px-space-xs py-1 border-2 border-border-black">
                THE INTERROGATOR
              </span>
            </div>
            
            <div className="flex flex-col gap-space-sm">
              <div className="flex items-end justify-between">
                <span className="font-label-md text-label-md uppercase font-extrabold">{creatorName}</span>
                <span className="font-stat-number-mobile text-stat-number-mobile leading-none tracking-tighter">{engagement.questionsByYou}</span>
              </div>
              <div className="w-full h-3 bg-surface-cream border-[2px] border-border-black">
                <div className="h-full bg-border-black" style={{ width: `${Math.max(10, (engagement.questionsByYou / (engagement.questionsByYou + engagement.questionsByThem || 1)) * 100)}%` }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-space-sm">
              <div className="flex items-end justify-between">
                <span className="font-label-md text-label-md uppercase font-extrabold">{chatName}</span>
                <span className="font-stat-number-mobile text-stat-number-mobile leading-none tracking-tighter">{engagement.questionsByThem}</span>
              </div>
              <div className="w-full h-3 bg-surface-cream border-[2px] border-border-black">
                <div className="h-full bg-border-black" style={{ width: `${Math.max(10, (engagement.questionsByThem / (engagement.questionsByYou + engagement.questionsByThem || 1)) * 100)}%` }}></div>
              </div>
            </div>
            
            <div className="mt-2 text-center bg-surface-cream border-2 border-border-black px-2 py-1 font-label-sm text-label-sm uppercase font-bold text-border-black shadow-[2px_2px_0px_#000000]">
              WINNER: {youInterrogator ? creatorName : chatName}
            </div>
          </Reveal>

          {/* Double Texts */}
          <Reveal delay={0.5} className="bg-hot-pink border-4 border-border-black p-space-md shadow-[6px_6px_0px_#000000] flex flex-col gap-space-md text-surface-cream relative">
            <div className="flex items-center justify-between">
              <span className="font-headline-sm text-headline-sm uppercase text-surface-cream tracking-tight">DOUBLE TEXTS</span>
              <span className="bg-surface-cream text-border-black font-label-sm text-label-sm uppercase px-space-xs py-1 border-2 border-border-black shadow-[2px_2px_0px_#000000]">
                ZERO CHILL ZONE 🚨
              </span>
            </div>

            <div className="flex flex-col gap-space-sm">
              <div className="flex items-end justify-between">
                <span className="font-label-md text-label-md uppercase font-extrabold text-surface-cream">{creatorName}</span>
                <span className="font-stat-number-mobile text-stat-number-mobile leading-none tracking-tighter">{engagement.doubleTextsByYou}</span>
              </div>
              <div className="w-full h-3 bg-surface-cream border-[2px] border-border-black">
                <div className="h-full bg-electric-yellow" style={{ width: `${Math.max(10, (engagement.doubleTextsByYou / (engagement.doubleTextsByYou + engagement.doubleTextsByThem || 1)) * 100)}%` }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-space-sm">
              <div className="flex items-end justify-between">
                <span className="font-label-md text-label-md uppercase font-extrabold text-surface-cream">{chatName}</span>
                <span className="font-stat-number-mobile text-stat-number-mobile leading-none tracking-tighter">{engagement.doubleTextsByThem}</span>
              </div>
              <div className="w-full h-3 bg-surface-cream border-[2px] border-border-black">
                <div className="h-full bg-electric-yellow" style={{ width: `${Math.max(10, (engagement.doubleTextsByThem / (engagement.doubleTextsByYou + engagement.doubleTextsByThem || 1)) * 100)}%` }}></div>
              </div>
            </div>
            
            <div className="mt-2 text-center bg-electric-yellow border-2 border-border-black px-2 py-1 font-label-sm text-label-sm uppercase font-bold text-border-black shadow-[2px_2px_0px_#000000]">
              MOST UNHINGED: {youDoubleTexter ? creatorName : chatName}
            </div>
          </Reveal>
        </div>

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
