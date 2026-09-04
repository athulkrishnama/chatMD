import { Reveal } from '../ui/Reveal';
import { StoryHeader } from '../ui/StoryHeader';

interface CircadianProps {
  activity: {
    peakHour: number;
    peakDay: string;
    nightMessagePercentage: number;
  };
  chapter: number;
  totalChapters: number;
  onNext: () => void;
}

export function CircadianAuditSection({ activity, chapter, totalChapters, onNext }: CircadianProps) {
  const formatHour = (hour: number) => {
    if (hour === 0) return '12 AM';
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return '12 PM';
    return `${hour - 12} PM`;
  };

  return (
    <section className="flex-1 flex flex-col relative w-full pt-28 pb-safe bg-surface-cream min-h-screen">
      <StoryHeader chapter={chapter} totalChapters={totalChapters} />
      <div className="flex flex-col w-full px-margin-mobile pb-space-lg select-none">
        
        {/* Top Tag */}
        <Reveal delay={0.1} className="flex items-center justify-between mt-space-xs mb-space-sm">
          <div className="inline-flex items-center gap-space-xxs bg-hot-pink text-surface-cream px-space-xs py-0.5 border-[3px] border-border-black shadow-[3px_3px_0px_#000000] -rotate-1">
            <span className="material-symbols-outlined text-[14px]">nightlight</span>
            <span className="font-label-sm text-label-sm tracking-wider uppercase">CIRCADIAN AUDIT // 2024</span>
          </div>
          <div className="inline-flex items-center gap-1 bg-lime-green text-border-black px-2 py-0.5 border-[2.5px] border-border-black shadow-[2px_2px_0px_#000000] rotate-2">
            <span className="w-2 h-2 rounded-full bg-border-black animate-ping"></span>
            <span className="font-label-sm text-label-sm uppercase font-extrabold">CHAOS METER: 99%</span>
          </div>
        </Reveal>

        {/* Hero */}
        <Reveal delay={0.2} className="flex flex-col mb-space-sm">
          <span className="font-headline-sm text-headline-sm uppercase tracking-tight text-border-black">
            APPARENTLY, YOU TWO HAVE
          </span>
          <div className="inline-block mt-0.5">
            <span className="inline-block bg-electric-yellow text-border-black font-display-hero-mobile text-display-hero-mobile uppercase px-space-xs border-[3.5px] border-border-black shadow-[5px_5px_0px_#000000] tracking-tighter -rotate-1">
              OFFICE HOURS.
            </span>
          </div>
        </Reveal>

        {/* Big Stat */}
        <Reveal delay={0.4} className="w-full bg-surface-cream-alt border-[3.5px] border-border-black shadow-[6px_6px_0px_#000000] p-space-sm mb-space-md relative overflow-hidden">
          <div className="absolute -top-1 -right-2 bg-hot-pink text-surface-cream border-[2.5px] border-border-black px-2 py-0.5 rotate-6 shadow-[3px_3px_0px_#000000] z-10">
            <span className="font-label-sm text-label-sm uppercase tracking-widest font-extrabold">CERTIFIED OWLS 🦉</span>
          </div>
          
          <div className="flex items-baseline justify-between gap-space-xs pt-1">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">APEX CONVERSATION VELOCITY</span>
              <div className="flex items-center gap-space-xxs">
                <span className="font-stat-number-mobile text-stat-number-mobile text-border-black tracking-tighter leading-none">{formatHour(activity.peakHour).split(' ')[0]}</span>
                <span className="bg-electric-purple text-surface-cream text-label-lg font-label-lg px-space-xs py-0.5 border-[2.5px] border-border-black shadow-[2px_2px_0px_#000000]">
                  {formatHour(activity.peakHour).split(' ')[1]}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end text-right">
              <span className="material-symbols-outlined text-[32px] text-border-black -rotate-12">alarm_on</span>
              <span className="font-label-sm text-label-sm uppercase bg-electric-cyan text-border-black px-1.5 py-0.5 border-[2px] border-border-black mt-1 font-bold">PEAK SYNC</span>
            </div>
          </div>
          
          <div className="mt-space-xs bg-electric-yellow text-border-black border-[2px] border-border-black px-space-xs py-1 inline-flex items-center gap-1.5 shadow-[2px_2px_0px_#000000]">
            <span className="material-symbols-outlined text-[16px]">bolt</span>
            <span className="font-label-md text-label-md uppercase tracking-tight">MOST ACTIVE DAY: {activity.peakDay}</span>
          </div>
        </Reveal>

        {/* 24-Hour Matrix (Mocked Breakdown) */}
        <Reveal delay={0.5} className="w-full flex flex-col mb-space-md">
          <div className="flex items-center justify-between mb-space-xs">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px]">timelapse</span>
              <span className="font-label-md text-label-md uppercase tracking-wide text-border-black">DIURNAL METRICS</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-space-xs mt-space-sm">
            <div className="bg-hot-pink text-surface-cream border-[3px] border-border-black p-2 shadow-[3px_3px_0px_#000000] flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-surface-cream uppercase font-bold">NIGHT TIME DEGENERACY</span>
                <span className="font-label-sm text-label-sm">⚡</span>
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <span className="font-headline-sm text-headline-sm text-surface-cream leading-none font-extrabold">{Math.round(activity.nightMessagePercentage)}%</span>
                <span className="font-label-sm text-label-sm uppercase tracking-tight bg-border-black text-electric-yellow px-1 py-0.2 font-extrabold">UNHINGED</span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.7} className="w-full mt-auto">
          <button onClick={onNext} className="w-full bg-electric-yellow text-border-black p-space-md font-label-lg text-label-lg uppercase tracking-wider flex items-center justify-between shadow-[5px_5px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer">
            <span>NEXT CHAPTER</span>
            <span className="material-symbols-outlined text-2xl font-bold">arrow_forward</span>
          </button>
        </Reveal>

      </div>
    </section>
  );
}
