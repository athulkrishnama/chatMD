import { Reveal } from '../ui/Reveal';
import { StoryHeader } from '../ui/StoryHeader';

interface ResponseTimeProps {
  creatorName: string;
  chatName: string;
  replyTime: {
    youMedianMinutes: number;
    themMedianMinutes: number;
  };
  chapter: number;
  totalChapters: number;
  onNext: () => void;
}

export function ResponseTimeSection({ chatName, creatorName, replyTime, chapter, totalChapters, onNext }: ResponseTimeProps) {
  const formatTime = (minutes: number) => {
    if (minutes < 1) return '< 1m';
    if (minutes < 60) return `${Math.round(minutes)}m`;
    const h = Math.floor(minutes / 60);
    const m = Math.round(minutes % 60);
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  };

  const youPercentage = Math.round((replyTime.themMedianMinutes / (replyTime.youMedianMinutes + replyTime.themMedianMinutes)) * 100) || 50;
  const themPercentage = 100 - youPercentage;

  return (
    <section className="flex-1 flex flex-col relative w-full pt-28 pb-safe bg-surface-cream min-h-screen">
      <StoryHeader chapter={chapter} totalChapters={totalChapters} />
      <div className="flex flex-col w-full px-margin-mobile pb-space-2xl gap-space-lg select-none">
        
        {/* Top Ticker */}
        <Reveal delay={0.1} className="-mx-margin-mobile bg-border-black text-electric-cyan py-space-xxs overflow-hidden -rotate-1 border-y-4 border-border-black shadow-[0_4px_0_#000]">
          <div className="animate-marquee whitespace-nowrap font-label-sm text-label-sm uppercase tracking-widest flex items-center gap-space-md">
            <span className="flex items-center gap-space-xs">💬 BEHAVIORAL FORENSICS // 2024</span>
            <span className="text-electric-yellow">★</span>
            <span className="flex items-center gap-space-xs text-hot-pink">LINGUISTIC DYNAMICS</span>
            <span className="text-electric-yellow">★</span>
            <span className="flex items-center gap-space-xs text-lime-green">UNFILTERED STATS</span>
          </div>
        </Reveal>

        {/* Hero */}
        <Reveal delay={0.2} className="flex flex-col items-start gap-space-xs pt-space-xs relative">
          <div className="inline-block bg-hot-pink text-surface-cream px-space-sm py-1 border-4 border-border-black font-label-md text-label-md uppercase tracking-wider -rotate-2 shadow-[4px_4px_0px_#000000]">
            COMMUNICATION STYLE // RAW AUDIT
          </div>
          <div className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface flex items-center gap-space-xxs pt-space-xs">
            <span className="w-2 h-2 bg-border-black"></span>
            // CHAT PHYSICS
          </div>
          <div className="flex flex-col gap-1 w-full">
            <h1 className="font-display-hero-mobile text-display-hero-mobile uppercase text-border-black tracking-tight leading-none">
              LET'S TALK ABOUT
            </h1>
            <div className="bg-lime-green border-4 border-border-black px-space-sm py-space-xs -rotate-1 shadow-[5px_5px_0px_#000000] inline-block self-start mt-1">
              <span className="font-display-hero-mobile text-display-hero-mobile uppercase text-border-black tracking-tight leading-none">
                RESPONSE TIME
              </span>
            </div>
          </div>
        </Reveal>

        {/* Two Cards */}
        <div className="flex flex-col space-y-space-md mt-space-md">
          {/* YOU */}
          <Reveal delay={0.4} className="relative bg-lime-green text-border-black border-[4px] border-border-black shadow-[6px_6px_0px_#000000] p-space-md overflow-hidden">
            <div className="absolute -top-1 -right-2 bg-hot-pink text-surface-cream font-label-sm text-label-sm uppercase px-space-xs py-0.5 border-[2.5px] border-border-black rotate-6 shadow-[2px_2px_0px_#000000]">
              UNHINGED SPEED
            </div>
            <div className="flex items-center justify-between mb-space-xs">
              <div className="flex items-center gap-space-xs">
                <div className="w-8 h-8 bg-border-black text-lime-green flex items-center justify-center font-label-md text-label-md">{creatorName.substring(0, 2)}</div>
                <span className="font-label-md text-label-md uppercase tracking-wider">CHRONICALLY ONLINE</span>
              </div>
            </div>
            <div className="flex items-baseline gap-space-xs">
              <span className="font-stat-number-mobile text-stat-number-mobile text-border-black font-extrabold tracking-tighter leading-none">
                {formatTime(replyTime.youMedianMinutes)}
              </span>
            </div>
            <p className="font-label-sm text-label-sm uppercase tracking-widest text-border-black/80 font-bold mt-1">
              AVERAGE RESPONSE VELOCITY
            </p>
          </Reveal>

          {/* THEM */}
          <Reveal delay={0.5} className="relative bg-electric-yellow text-border-black border-[4px] border-border-black shadow-[6px_6px_0px_#000000] p-space-md overflow-hidden">
            <div className="absolute -top-1 -right-2 bg-border-black text-electric-yellow font-label-sm text-label-sm uppercase px-space-xs py-0.5 border-[2.5px] border-border-black -rotate-3 shadow-[2px_2px_0px_#000000]">
              AFK SPECIALIST
            </div>
            <div className="flex items-center justify-between mb-space-xs">
              <div className="flex items-center gap-space-xs">
                <div className="w-8 h-8 bg-border-black text-electric-yellow flex items-center justify-center font-label-md text-label-md uppercase">
                  {chatName.substring(0, 2)}
                </div>
                <span className="font-label-md text-label-md uppercase tracking-wider">{chatName} • ON READ</span>
              </div>
            </div>
            <div className="flex items-baseline gap-space-xs">
              <span className="font-stat-number-mobile text-stat-number-mobile text-border-black font-extrabold tracking-tighter leading-none">
                {formatTime(replyTime.themMedianMinutes)}
              </span>
            </div>
            <p className="font-label-sm text-label-sm uppercase tracking-widest text-border-black/80 font-bold mt-1">
              AVERAGE RESPONSE VELOCITY
            </p>
          </Reveal>
        </div>

        {/* Ratio Box */}
        <Reveal delay={0.6} className="bg-surface-cream border-[4px] border-border-black shadow-[6px_6px_0px_#000000] p-space-md mt-space-sm">
          <div className="flex items-center justify-between pb-space-xs border-b-[3px] border-border-black">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-border-black text-[20px]">timer</span>
              <span className="font-headline-sm text-headline-sm text-border-black uppercase">SPEED RATIO</span>
            </div>
          </div>
          <div className="mt-space-md space-y-space-md">
            <div>
              <div className="flex justify-between font-label-md text-label-md uppercase mb-1">
                <span className="text-border-black font-extrabold flex items-center gap-1">
                  <span className="w-3 h-3 bg-lime-green border-[2px] border-border-black inline-block"></span>
                  {creatorName} (SPEED RUNNER)
                </span>
                <span className="text-border-black font-extrabold">{youPercentage}%</span>
              </div>
              <div className="w-full h-7 bg-surface-container-high border-[3px] border-border-black p-0.5 shadow-[2px_2px_0px_#000000]">
                <div className="h-full bg-lime-green border-r-[3px] border-border-black flex items-center justify-end px-2" style={{ width: `${youPercentage}%` }}>
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between font-label-md text-label-md uppercase mb-1">
                <span className="text-border-black font-extrabold flex items-center gap-1">
                  <span className="w-3 h-3 bg-electric-yellow border-[2px] border-border-black inline-block"></span>
                  {chatName} (ZEN MODE)
                </span>
                <span className="text-border-black font-extrabold">{themPercentage}%</span>
              </div>
              <div className="w-full h-7 bg-surface-container-high border-[3px] border-border-black p-0.5 shadow-[2px_2px_0px_#000000]">
                <div className="h-full bg-electric-yellow border-r-[3px] border-border-black flex items-center justify-end px-2" style={{ width: `${themPercentage}%` }}>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.7} className="mt-space-lg flex flex-col gap-space-xs">
          <button onClick={onNext} className="w-full bg-electric-yellow text-border-black p-space-md font-label-lg text-label-lg uppercase tracking-wider flex items-center justify-between shadow-[5px_5px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer">
            <span>NEXT CHAPTER</span>
            <span className="material-symbols-outlined text-2xl font-bold">arrow_forward</span>
          </button>
        </Reveal>

      </div>
    </section>
  );
}
