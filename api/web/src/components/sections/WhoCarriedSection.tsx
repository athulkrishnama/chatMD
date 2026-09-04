import { Reveal } from '../ui/Reveal';
import { StoryHeader } from '../ui/StoryHeader';

interface WhoCarriedProps {
  creatorName: string;
  chatName: string;
  balance: {
    you: { messages: number; percentage: number };
    them: { messages: number; percentage: number };
  };
  chapter: number;
  totalChapters: number;
  onNext: () => void;
}

export function WhoCarriedSection({ chatName, creatorName, balance, chapter, totalChapters, onNext }: WhoCarriedProps) {
  const youWon = balance.you.percentage > balance.them.percentage;
  const winner = youWon ? creatorName : chatName;
  const loser = youWon ? chatName : creatorName;
  
  const diff = Math.abs(balance.you.percentage - balance.them.percentage).toFixed(1);
  const diffMsgs = Math.abs(balance.you.messages - balance.them.messages);
  
  return (
    <section className="flex-1 flex flex-col relative w-full pt-28 pb-safe bg-surface-cream min-h-screen">
      <StoryHeader chapter={chapter} totalChapters={totalChapters} />
      
      <div className="flex flex-col w-full px-margin-mobile pb-space-xl overflow-hidden relative selection:bg-electric-yellow selection:text-border-black pt-space-md">
        
        {/* Micro Ribbon Ticker */}
        <Reveal delay={0.1}>
          <div className="-mx-margin-mobile mt-space-xs mb-space-sm bg-border-black py-1.5 transform -rotate-1 shadow-[4px_4px_0px_#000000]">
            <div className="flex items-center justify-around font-label-sm text-label-sm uppercase tracking-widest text-electric-yellow">
              <span className="flex items-center gap-1"><span className="text-hot-pink">✦</span> RATIO VERIFIED</span>
              <span className="flex items-center gap-1"><span className="text-electric-cyan">✦</span> LETHAL YAP DYNAMICS</span>
              <span className="hidden xs:flex items-center gap-1"><span className="text-lime-green">✦</span> CHAT CARRIERS</span>
            </div>
          </div>
        </Reveal>

        {/* Hero Headline */}
        <Reveal delay={0.2} className="relative mb-space-md pt-space-xxs">
          <div className="inline-block bg-hot-pink text-surface-cream px-space-xs py-0.5 transform -rotate-2 shadow-[3px_3px_0px_#000000] mb-space-xs">
            <span className="font-label-sm text-label-sm tracking-wider uppercase">DEBATE SETTLED // 2024</span>
          </div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface uppercase tracking-tight leading-[0.95] drop-shadow-none">
            SO... WHO <span className="bg-electric-yellow px-1 inline-block transform rotate-1 text-border-black shadow-[3px_3px_0px_#000000]">CARRIED</span> THIS CHAT?
          </h1>
        </Reveal>

        {/* VS Cards */}
        <div className="flex flex-col gap-space-md relative">
          <Reveal delay={0.4} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <div className="w-14 h-14 bg-border-black text-electric-yellow rounded-full flex flex-col items-center justify-center font-display-hero-mobile text-headline-sm shadow-[4px_4px_0px_#FF1493] transform -rotate-12">
              <span className="leading-none">VS</span>
            </div>
          </Reveal>

          {/* YOU Card */}
          <Reveal delay={0.3}>
            <div className={`w-full ${youWon ? 'bg-electric-yellow' : 'bg-electric-cyan'} p-space-md shadow-[5px_5px_0px_#000000] transform -rotate-[0.5deg] relative transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none`}>
              <div className="flex items-center justify-between pb-space-xs">
                <div className={`flex items-center gap-space-xs ${youWon ? 'bg-hot-pink text-surface-cream' : 'bg-surface-cream text-border-black'} px-space-xs py-1 shadow-[2px_2px_0px_#000000]`}>
                  <span className="material-symbols-outlined text-[18px]">{youWon ? 'emoji_events' : 'sentiment_very_satisfied'}</span>
                  <span className="font-label-md text-label-md uppercase">{creatorName}</span>
                </div>
                {youWon ? (
                  <div className="flex items-center gap-1 bg-lime-green px-space-xs py-0.5 shadow-[2px_2px_0px_#000000]">
                    <span className="w-2 h-2 rounded-full bg-border-black animate-pulse"></span>
                    <span className="font-label-sm text-label-sm text-border-black uppercase">CHAMPION 👑</span>
                  </div>
                ) : (
                  <span className="bg-border-black text-surface-cream font-label-sm text-label-sm px-space-xs py-0.5 uppercase tracking-wide">
                    CHRONIC SENDER
                  </span>
                )}
              </div>
              
              <div className="flex items-baseline justify-between pt-space-xs">
                <div className="font-stat-number-mobile text-stat-number-mobile text-border-black leading-none tracking-tighter">
                  {balance.you.percentage.toFixed(1)}<span className="text-headline-md-mobile">%</span>
                </div>
                <div className="text-right">
                  <div className={`font-label-lg text-label-lg ${youWon ? 'text-hot-pink' : 'text-border-black'} tracking-normal`}>{balance.you.messages.toLocaleString()}</div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant uppercase">MESSAGES</div>
                </div>
              </div>

              <div className="mt-space-sm bg-surface-cream p-space-xs shadow-[3px_3px_0px_#000000] inline-flex items-center gap-space-xs transform rotate-1">
                <span className="font-body-sm text-body-sm text-border-black">
                  <strong className="font-bold">{creatorName}:</strong> {youWon ? '"numbers do not lie" 💀' : '"I carried the lore tbh" 💅'}
                </span>
              </div>
            </div>
          </Reveal>

          {/* THEM Card */}
          <Reveal delay={0.4}>
            <div className={`w-full ${!youWon ? 'bg-electric-yellow' : 'bg-surface-cream'} p-space-md shadow-[5px_5px_0px_#000000] transform rotate-[0.5deg] border-[3px] border-border-black relative transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none`}>
              <div className="flex items-center justify-between pb-space-xs">
                <div className={`flex items-center gap-space-xs ${!youWon ? 'bg-hot-pink text-surface-cream' : 'bg-surface-cream text-border-black'} px-space-xs py-1 shadow-[2px_2px_0px_#000000]`}>
                  <span className="material-symbols-outlined text-[18px]">{!youWon ? 'emoji_events' : 'sentiment_very_satisfied'}</span>
                  <span className="font-label-md text-label-md uppercase">{chatName}</span>
                </div>
                {!youWon ? (
                  <div className="flex items-center gap-1 bg-lime-green px-space-xs py-0.5 shadow-[2px_2px_0px_#000000]">
                    <span className="w-2 h-2 rounded-full bg-border-black animate-pulse"></span>
                    <span className="font-label-sm text-label-sm text-border-black uppercase">CHAMPION 👑</span>
                  </div>
                ) : (
                  <span className="bg-border-black text-surface-cream font-label-sm text-label-sm px-space-xs py-0.5 uppercase tracking-wide">
                    SPECTATOR
                  </span>
                )}
              </div>
              
              <div className="flex items-baseline justify-between pt-space-xs">
                <div className="font-stat-number-mobile text-stat-number-mobile text-border-black leading-none tracking-tighter">
                  {balance.them.percentage.toFixed(1)}<span className="text-headline-md-mobile">%</span>
                </div>
                <div className="text-right">
                  <div className={`font-label-lg text-label-lg ${!youWon ? 'text-hot-pink' : 'text-border-black'} tracking-normal`}>{balance.them.messages.toLocaleString()}</div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant uppercase">MESSAGES</div>
                </div>
              </div>

              <div className="mt-space-sm bg-surface-cream p-space-xs shadow-[3px_3px_0px_#000000] inline-flex items-center gap-space-xs transform -rotate-1 border-[1px] border-border-black">
                <span className="font-body-sm text-body-sm text-border-black">
                  <strong className="font-bold uppercase">{chatName}:</strong> {!youWon ? '"numbers do not lie" 💀' : '"my bad was asleep" 💀'}
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Verdict Banner */}
        <Reveal delay={0.6}>
          <div className="mt-space-md bg-surface-cream-alt p-space-md shadow-[5px_5px_0px_#000000] relative">
            <div className="flex items-start justify-between gap-space-xs">
              <div className="flex-1">
                <div className="flex items-center gap-space-xs mb-space-xxs">
                  <span className="bg-border-black text-electric-cyan font-label-sm text-label-sm px-1.5 py-0.5 uppercase">
                    STATISTICALLY PROVEN
                  </span>
                  <span className="bg-hot-pink text-surface-cream font-label-sm text-label-sm px-1.5 py-0.5 uppercase">
                    +{diff}% DIFF
                  </span>
                </div>
                <p className="font-headline-sm text-headline-sm text-border-black uppercase leading-tight">
                  “{winner} technically won.”
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  By a margin of <strong className="text-border-black font-label-md">{diffMsgs.toLocaleString()} messages</strong>.
                </p>
              </div>
              
              <div className="flex flex-col items-center justify-center shrink-0 w-16">
                <svg className="w-12 h-12 text-border-black -rotate-12" fill="none" viewBox="0 0 50 50">
                  <path d="M10 15 C 25 10, 35 20, 38 35" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="4"></path>
                  <path d="M28 35 L 39 37 L 42 26" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"></path>
                </svg>
                <span className="font-label-sm text-[9px] uppercase font-bold text-center leading-tight -rotate-6">CROWN THEM 🙄</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Bottom Proof Graphic */}
        <Reveal delay={0.7}>
          <div className="mt-space-sm bg-lime-green p-space-sm shadow-[4px_4px_0px_#000000] flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-border-black">verified</span>
              <span className="font-label-md text-label-md uppercase text-border-black">CERTIFIED YAPOLOGIST</span>
            </div>
            <div className="bg-surface-cream px-space-xs py-0.5 font-label-sm text-label-sm text-border-black shadow-[2px_2px_0px_#000000]">
              FIG. 03 // {String(totalChapters).padStart(2, '0')}
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={0.8} className="mt-space-lg flex flex-col gap-space-xs">
          <button onClick={onNext} className="w-full bg-electric-yellow text-border-black p-space-md font-label-lg text-label-lg uppercase tracking-wider flex items-center justify-between shadow-[5px_5px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer">
            <span>NEXT CHAPTER</span>
            <span className="material-symbols-outlined text-2xl font-bold">arrow_forward</span>
          </button>
          <div className="flex items-center justify-between px-space-xxs pt-1">
            <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">DATA DOES NOT LIE</span>
            <span className="font-label-sm text-label-sm uppercase text-hot-pink font-extrabold tracking-widest">TAP TO ADVANCE →</span>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
