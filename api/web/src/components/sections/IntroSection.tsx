import { Reveal } from '../ui/Reveal';
import { AnimatedNumber } from '../ui/AnimatedNumber';
import { Marquee } from '../ui/Marquee';
import { FloatingSticker } from '../ui/FloatingSticker';

interface IntroSectionProps {
  chatName: string;
  creatorName: string;
  totalMessages: number;
  daysOfChaos: number;
  topEmoji: string;
  avgMessagesPerDay: number;
  onStart: () => void;
}

export function IntroSection({ 
  creatorName, 
  chatName, 
  totalMessages, 
  daysOfChaos, 
  topEmoji,
  avgMessagesPerDay,
  onStart 
}: IntroSectionProps) {
  return (
    <section className="flex flex-col w-full min-h-[100svh] relative overflow-hidden px-margin-mobile pb-space-2xl pt-safe">
      {/* Marquee Ticker Ribbon */}
      <Reveal delay={0.1} direction="down">
        <Marquee 
          items={['✦ UNFILTERED RECIEPTS', '•', 'LATE NIGHT DELUSION', '•', 'TOP 1% YAPPERS', '•', 'NO RECEIPTS DELETED', '•']}
          className="bg-border-black text-electric-yellow py-space-xxs mb-space-md shadow-[4px_4px_0px_#FF1493] border-y-[3px] border-border-black font-label-md uppercase tracking-wider"
          rotate={-1}
          speed={15}
        />
      </Reveal>

      {/* Header / Title Block */}
      <header className="flex flex-col relative mb-space-lg">
        <Reveal delay={0.2} direction="right">
          <FloatingSticker initialRotate={-3} rotateRange={[-5, 0]} className="self-start mb-space-xs z-10 relative">
            <div className="bg-hot-pink text-surface-cream font-label-sm uppercase px-space-sm py-1 border-[3px] border-border-black shadow-[3px_3px_0px_#000000] inline-flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">bolt</span>
              <span>2024 EDITION // RAW</span>
            </div>
          </FloatingSticker>
        </Reveal>

        <Reveal delay={0.3}>
          <h1 className="font-display-hero-mobile text-display-hero-mobile uppercase text-border-black leading-none tracking-tighter drop-shadow-[2px_2px_0px_#ffffff] z-0 relative">
            {creatorName.toUpperCase()}'S CHAT<br/>WRAPPED
          </h1>
        </Reveal>

        <Reveal delay={0.4} className="flex items-center justify-between mt-space-xs relative z-10">
          <FloatingSticker initialRotate={1} rotateRange={[0, 4]} delay={0.5}>
            <div className="bg-lime-green text-border-black font-headline-sm text-headline-sm uppercase px-space-md py-space-xxs border-[3px] border-border-black shadow-[4px_4px_0px_#000000] inline-flex items-center gap-2">
              <span className="material-symbols-outlined font-bold">favorite</span>
              <span className="truncate max-w-[200px]">{chatName}</span>
            </div>
          </FloatingSticker>
          
          <FloatingSticker initialRotate={6} rotateRange={[4, 8]} delay={1}>
            <div className="bg-electric-cyan text-border-black font-label-sm uppercase px-space-xs py-1 border-[3px] border-border-black shadow-[3px_3px_0px_#000000] flex items-center gap-1 font-extrabold">
              <span className="material-symbols-outlined text-sm">verified</span>
              <span>100% UNHINGED</span>
            </div>
          </FloatingSticker>
        </Reveal>
      </header>

      {/* Giant Yellow Hero Card */}
      <Reveal delay={0.5} className="mt-auto">
        <section className="bg-electric-yellow border-[4px] border-border-black shadow-[6px_6px_0px_#000000] p-space-md relative mb-space-lg">
          <FloatingSticker initialRotate={-12} rotateRange={[-20, 0]} className="absolute -top-4 -left-3">
            <div className="bg-vibrant-orange text-surface-cream border-[3px] border-border-black p-1 shadow-[2px_2px_0px_#000000]">
              <span className="material-symbols-outlined text-xl">star</span>
            </div>
          </FloatingSticker>

          <div className="flex justify-between items-center border-b-[3px] border-border-black pb-space-xs mb-space-sm">
            <span className="font-label-md uppercase tracking-wider text-border-black font-extrabold">STAT SHEET #001</span>
            <span className="font-label-sm uppercase bg-border-black text-electric-yellow px-space-xs py-0.5 font-bold">CHAOS CERTIFIED</span>
          </div>

          <div className="grid grid-cols-1 gap-space-sm">
            <div className="bg-surface-cream border-[3px] border-border-black p-space-sm shadow-[4px_4px_0px_#000000] relative">
              <span className="font-label-sm uppercase text-on-surface-variant block tracking-wider">TOTAL DISPATCHES</span>
              <div className="flex items-baseline justify-between mt-space-xxs">
                <span className="font-stat-number-mobile text-stat-number-mobile text-border-black tracking-tighter leading-none">
                  <AnimatedNumber value={totalMessages} />
                </span>
                <span className="font-headline-md-mobile text-headline-md-mobile text-hot-pink uppercase">MSGS</span>
              </div>
              <div className="absolute -right-2 -bottom-3 text-border-black transform rotate-12 pointer-events-none">
                <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 20H32M32 20L22 10M32 20L22 30" stroke="#121212" strokeWidth="4" strokeLinecap="square"/>
                </svg>
              </div>
            </div>

            <div className="bg-surface-cream border-[3px] border-border-black p-space-sm shadow-[4px_4px_0px_#000000]">
              <span className="font-label-sm uppercase text-on-surface-variant block tracking-wider">CHRONIC VELOCITY</span>
              <div className="flex items-baseline justify-between mt-space-xxs">
                <span className="font-stat-number-mobile text-stat-number-mobile text-border-black tracking-tighter leading-none">
                  <AnimatedNumber value={daysOfChaos} />
                </span>
                <span className="font-headline-sm text-headline-sm uppercase text-border-black">DAYS OF CHAOS</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-space-sm pt-space-xs border-t-[3px] border-border-black">
            <div className="bg-surface-cream-alt text-border-black border-[2px] border-border-black px-space-xs py-1 font-label-sm uppercase shadow-[2px_2px_0px_#000000] flex items-center gap-1 font-bold">
              <span>TOP EMOJI:</span>
              <span className="text-sm">{topEmoji || '💀'}</span>
            </div>
            <div className="bg-electric-cyan text-border-black border-[2px] border-border-black px-space-xs py-1 font-label-sm uppercase shadow-[2px_2px_0px_#000000] font-bold">
              AVG {Math.round(avgMessagesPerDay)} MSGS/DAY
            </div>
          </div>
        </section>
      </Reveal>

      {/* Decorative scribbles */}
      <Reveal delay={0.7} className="relative z-10 flex justify-between items-center mb-space-lg px-2 mt-auto">
        <FloatingSticker initialRotate={-3} rotateRange={[-6, 2]}>
          <div className="bg-hot-pink text-surface-cream border-[3px] border-border-black shadow-[4px_4px_0px_#000000] px-space-sm py-1">
            <span className="font-label-lg uppercase tracking-tight font-extrabold">NO WAY ‼️</span>
          </div>
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-border-black ml-4"></div>
        </FloatingSticker>

        <div className="flex items-center gap-3">
          <FloatingSticker initialRotate={45} rotateRange={[0, 90]} duration={10}>
            <div className="w-8 h-8 bg-electric-purple text-surface-cream border-[2.5px] border-border-black flex items-center justify-center shadow-[3px_3px_0px_#000000]">
              <span className="font-bold text-xs">✦</span>
            </div>
          </FloatingSticker>
          <FloatingSticker initialRotate={-12} rotateRange={[-40, 20]} duration={8} delay={1}>
            <div className="w-7 h-7 bg-lime-green text-border-black border-[2.5px] border-border-black flex items-center justify-center shadow-[3px_3px_0px_#000000]">
              <span className="font-bold text-xs">★</span>
            </div>
          </FloatingSticker>
        </div>
      </Reveal>

      {/* Primary Call To Action */}
      <Reveal delay={0.8} className="w-full flex flex-col gap-2 relative mt-auto">
        <div className="flex items-center justify-center gap-2 text-border-black font-label-sm uppercase">
          <span className="material-symbols-outlined text-base">swipe_up</span>
          <span>AUDIO ON FOR MAX DRAMA</span>
        </div>
        <button 
          onClick={onStart}
          className="w-full bg-border-black text-surface-cream hover:bg-electric-yellow hover:text-border-black border-[4px] border-border-black py-space-md px-space-lg font-headline-md-mobile text-headline-md-mobile uppercase tracking-tight shadow-[5px_5px_0px_#FF1493] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-75 flex items-center justify-center gap-3 cursor-pointer"
        >
          <span>START THE WRAPPED</span>
          <span className="material-symbols-outlined font-black text-2xl">arrow_forward</span>
        </button>
      </Reveal>
    </section>
  );
}
