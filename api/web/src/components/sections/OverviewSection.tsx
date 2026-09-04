import { Reveal } from '../ui/Reveal';
import { FloatingSticker } from '../ui/FloatingSticker';
import { AnimatedNumber } from '../ui/AnimatedNumber';
import { Marquee } from '../ui/Marquee';

interface OverviewProps {
  creatorName: string;
  chatName: string;
  totalMessages: number;
  avgMessagesPerDay: number;
  longestStreak: number;
  activePercentage: number;
  totalConversations: number;
  peakDay: string;
  peakHour: number;
  onNext: () => void;
  chapter: number;
  totalChapters: number;
}

export function OverviewSection({ 
  chatName,
  creatorName, 
  totalMessages, 
  avgMessagesPerDay,
  longestStreak,
  activePercentage,
  totalConversations,
  peakDay,
  peakHour,
  onNext,
  chapter,
  totalChapters
}: OverviewProps) {

  const formatHour = (hour: number) => {
    if (hour === 0) return '12 AM';
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return '12 PM';
    return `${hour - 12} PM`;
  };

  return (
    <section className="flex flex-col w-full h-[100svh] relative select-none pb-6 overflow-hidden pt-safe pb-safe bg-surface-cream">
      
      {/* Story Progression Bar */}
      <div className="w-full px-4 pt-2 pb-3 flex gap-1.5 items-center z-10">
        {Array.from({ length: totalChapters }).map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full overflow-hidden border-2 border-border-black ${i < chapter ? 'bg-border-black' : 'bg-surface-container-highest'}`}>
            {i < chapter && <div className="h-full w-full bg-electric-yellow"></div>}
            {i === chapter && <div className="h-full w-full bg-hot-pink animate-pulse" style={{ transformOrigin: 'left', animation: 'progress 5s linear forwards' }}></div>}
          </div>
        ))}
      </div>

      {/* Story Meta & Pause Notice */}
      <div className="flex justify-between items-center px-4 mb-2 z-10">
        <div className="flex items-center gap-2">
          <span className="bg-border-black text-electric-yellow font-label-sm text-label-sm px-2 py-0.5 uppercase tracking-widest border-2 border-border-black shadow-[2px_2px_0px_#000000]">
            CHAPTER {String(chapter + 1).padStart(2, '0')} // {String(totalChapters).padStart(2, '0')}
          </span>
          <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider font-bold">
            VOLUME OVERLOAD
          </span>
        </div>
        <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
          <span className="material-symbols-outlined text-[14px]">touch_app</span>
          <span>TAP TO ADVANCE</span>
        </div>
      </div>

      {/* High-Voltage Ticker Ribbon */}
      <Reveal delay={0.1} direction="down" className="z-10">
        <Marquee 
          items={['✦ UNFILTERED DATA DUMP', '●', 'CHAT PROTOCOL ARCHIVE 2024', '●', 'NO RECEIPTS HIDDEN', '●', 'RECORD SMASHED', '●']}
          className="bg-border-black text-electric-cyan py-1.5 shadow-[4px_4px_0px_#000000] border-y-2 border-border-black mb-3 font-label-md text-label-md tracking-widest uppercase"
          rotate={-1}
          speed={15}
        />
      </Reveal>

      <div className="px-4 flex flex-col gap-3.5 flex-1 relative z-10">
        {/* Main Dynamic Headline Block */}
        <Reveal delay={0.2} className="relative">
          <div className="inline-block bg-lime-green px-2.5 py-1 border-3 border-border-black shadow-[3px_3px_0px_#000000] transform -rotate-2 mb-1">
            <p className="font-label-sm text-label-sm uppercase tracking-wider text-border-black font-extrabold flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">record_voice_over</span>
              YAP LEVEL: LETHAL
            </p>
          </div>
          <h1 className="font-display-hero-mobile text-display-hero-mobile uppercase leading-none tracking-tight text-border-black font-extrabold m-0 p-0 drop-shadow-sm">
            YOU TWO<br/>
            <span className="text-hot-pink underline decoration-4 underline-offset-4 decoration-border-black">REALLY</span> TALKED.
          </h1>
          <FloatingSticker initialRotate={3} rotateRange={[1, 5]} className="absolute -right-1 bottom-0 translate-y-3">
            <div className="bg-surface-cream border-2 border-border-black shadow-[3px_3px_0px_#000000] px-2.5 py-1 max-w-[140px]">
              <p className="font-body-sm text-[11px] leading-tight text-border-black font-bold">
                {chatName}: <span className="font-medium">"go to sleep bro"</span> 💀
              </p>
            </div>
          </FloatingSticker>
        </Reveal>

        {/* Central Mega Stat Card */}
        <Reveal delay={0.3} className="relative mt-2 bg-electric-yellow border-4 border-border-black shadow-[6px_6px_0px_#000000] p-4 flex flex-col items-center text-center">
          <FloatingSticker initialRotate={-6} rotateRange={[-10, -2]} className="absolute -top-4 -left-3 z-20">
            <div className="bg-hot-pink text-surface-cream px-2.5 py-1 border-3 border-border-black shadow-[3px_3px_0px_#000000] flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-electric-yellow">local_fire_department</span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider font-extrabold">TOP 1% YAPPERS</span>
            </div>
          </FloatingSticker>
          
          <div className="absolute -top-3 -right-2 bg-border-black text-electric-cyan px-2 py-0.5 border-2 border-border-black transform rotate-6 z-20">
            <span className="font-label-sm text-[10px] tracking-widest uppercase font-mono">STAT VERIFIED // 100%</span>
          </div>
          
          <div className="pt-2 w-full flex flex-col items-center">
            <span className="font-stat-number-mobile text-stat-number-mobile leading-none font-black text-border-black tracking-tighter scale-y-110 mb-1">
              <AnimatedNumber value={totalMessages} />
            </span>
            <div className="bg-border-black text-surface-cream px-4 py-1 border-2 border-border-black shadow-[2px_2px_0px_#000000] transform -rotate-1">
              <p className="font-headline-sm text-headline-sm uppercase tracking-wider font-black text-electric-yellow">
                TOTAL MESSAGES SENT
              </p>
            </div>
          </div>
          
          <div className="w-full mt-3 pt-2.5 border-t-2 border-border-black flex items-center justify-between text-left">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-border-black text-surface-cream flex items-center justify-center font-label-md text-label-md border-2 border-border-black">
                ME
              </div>
              <p className="font-body-sm text-body-sm font-semibold text-border-black leading-tight">
                "wait hear me out 😭"
              </p>
            </div>
            <span className="font-label-sm text-[10px] bg-white border border-border-black px-1.5 py-0.5 font-bold uppercase">
              SENT AT 3:42 AM
            </span>
          </div>
        </Reveal>

        {/* Daily Average Brutalist Banner */}
        <Reveal delay={0.4}>
          <div className="bg-vibrant-orange border-3 border-border-black shadow-[4px_4px_0px_#000000] p-3 flex items-center justify-between gap-2 transform rotate-0.5">
            <div className="flex items-center gap-2">
              <span className="bg-border-black text-white p-1 rounded border border-border-black">
                <span className="material-symbols-outlined text-[20px]">bolt</span>
              </span>
              <div>
                <p className="font-headline-sm text-headline-sm leading-none font-extrabold uppercase text-border-black">
                  ~{Math.round(avgMessagesPerDay)} MSGS / DAY
                </p>
                <p className="font-label-sm text-[11px] uppercase tracking-wide text-border-black font-bold opacity-90 mt-0.5">
                  THAT'S {Math.round(avgMessagesPerDay / 24)} MSGS EVERY SINGLE HOUR
                </p>
              </div>
            </div>
            <div className="bg-border-black text-lime-green font-label-sm text-[11px] px-2 py-1 font-mono uppercase tracking-widest border border-border-black whitespace-nowrap">
              RELENTLESS
            </div>
          </div>
        </Reveal>

        {/* Asymmetric Data Cards Grid */}
        <Reveal delay={0.5} className="grid grid-cols-3 gap-2.5">
          <div className="bg-electric-cyan border-3 border-border-black shadow-[3px_3px_0px_#000000] p-2.5 flex flex-col justify-between">
            <span className="font-label-sm text-[10px] text-border-black font-extrabold uppercase tracking-tighter">
              TOTAL STREAK
            </span>
            <div className="my-1">
              <span className="font-headline-md-mobile text-headline-md-mobile font-black text-border-black leading-none block">
                <AnimatedNumber value={longestStreak} />
              </span>
              <span className="font-label-sm text-label-sm font-black uppercase text-border-black">
                DAYS
              </span>
            </div>
            <span className="bg-surface-cream border border-border-black text-[9px] font-bold px-1 py-0.5 text-center uppercase tracking-tight text-border-black">
              NO DROP-OFF
            </span>
          </div>
          
          <div className="bg-lime-green border-3 border-border-black shadow-[3px_3px_0px_#000000] p-2.5 flex flex-col justify-between transform -rotate-1">
            <span className="font-label-sm text-[10px] text-border-black font-extrabold uppercase tracking-tighter">
              ACTIVE TIME
            </span>
            <div className="my-1">
              <span className="font-headline-md-mobile text-headline-md-mobile font-black text-border-black leading-none block">
                <AnimatedNumber value={Math.round(activePercentage)} />%
              </span>
              <span className="font-label-sm text-label-sm font-black uppercase text-border-black">
                OF YEAR
              </span>
            </div>
            <span className="bg-border-black text-lime-green text-[9px] font-bold px-1 py-0.5 text-center uppercase tracking-tight">
              ON FIRE
            </span>
          </div>
          
          <div className="bg-surface-cream-alt border-3 border-border-black shadow-[3px_3px_0px_#000000] p-2.5 flex flex-col justify-between">
            <span className="font-label-sm text-[10px] text-border-black font-extrabold uppercase tracking-tighter">
              CONVOS
            </span>
            <div className="my-1">
              <span className="font-headline-md-mobile text-headline-md-mobile font-black text-border-black leading-none block">
                <AnimatedNumber value={totalConversations} />
              </span>
              <span className="font-label-sm text-label-sm font-black uppercase text-border-black">
                TOPICS
              </span>
            </div>
            <span className="bg-hot-pink text-white border border-border-black text-[9px] font-bold px-1 py-0.5 text-center uppercase tracking-tight">
              PURE CHAOS
            </span>
          </div>
        </Reveal>

        {/* Hand-Drawn Arrow & Callout Note */}
        <Reveal delay={0.6} className="flex items-center justify-between px-2 pt-1 pb-0 mt-auto">
          <div className="flex items-center gap-1.5 text-border-black">
            <svg className="w-5 h-5 text-border-black transform -rotate-45" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
            <span className="font-label-sm text-[11px] font-extrabold uppercase tracking-wider text-border-black">
              PEAK CHAT: {formatHour(peakHour)} ON {peakDay.toUpperCase()}S
            </span>
          </div>
          <span className="bg-border-black text-white text-[10px] font-mono px-1.5 py-0.5 font-bold uppercase">
            FIG. 02
          </span>
        </Reveal>

        {/* Primary Action CTA Button */}
        <Reveal delay={0.7} className="mt-1 pb-2">
          <button 
            onClick={onNext}
            className="w-full bg-hot-pink text-surface-cream font-headline-sm text-headline-sm uppercase font-extrabold py-3.5 px-4 border-4 border-border-black shadow-[5px_5px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-[0px_0px_0px_#000000] transition-all flex items-center justify-center gap-3 group cursor-pointer"
          >
            <span>SEE WHEN YOU TALKED MOST</span>
            <span className="material-symbols-outlined text-[24px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
