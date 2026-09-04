import { Reveal } from '../ui/Reveal';
import { StoryHeader } from '../ui/StoryHeader';

interface InitiativeProps {
  creatorName: string;
  chatName: string;
  initiation: {
    youPercentage: number;
    themPercentage: number;
  };
  chapter: number;
  totalChapters: number;
  onNext: () => void;
}

export function InitiativeAuditSection({ chatName, creatorName, initiation, chapter, totalChapters, onNext }: InitiativeProps) {
  const youCarrier = initiation.youPercentage >= initiation.themPercentage;
  const winner = youCarrier ? creatorName : chatName;

  return (
    <section className="flex-1 flex flex-col relative w-full pt-28 pb-safe bg-surface-cream min-h-screen">
      <StoryHeader chapter={chapter} totalChapters={totalChapters} />
      <div className="flex flex-col w-full px-margin-mobile pb-space-2xl gap-space-lg select-none">
        
        {/* Micro Ticker Sub-Ribbon */}
        <Reveal delay={0.1}>
          <div className="-mx-margin-mobile overflow-hidden bg-electric-yellow py-1.5 transform -rotate-1 border-y-4 border-border-black shadow-[0_4px_0_#000000]">
            <div className="animate-marquee whitespace-nowrap font-label-md text-label-md text-border-black uppercase tracking-wider flex items-center gap-space-md">
              <span className="flex items-center gap-space-xs font-extrabold"><span className="material-symbols-outlined text-[18px]">bolt</span> RELATIONSHIP CPR</span>
              <span>•</span>
              <span className="flex items-center gap-space-xs font-extrabold"><span className="material-symbols-outlined text-[18px]">favorite</span> 100% LIFE SUPPORT MODE</span>
              <span>•</span>
              <span className="flex items-center gap-space-xs font-extrabold"><span className="material-symbols-outlined text-[18px]">emergency</span> CHAT DEFIBRILLATOR ACTIVE</span>
            </div>
          </div>
        </Reveal>

        {/* Hero Section */}
        <Reveal delay={0.2} className="flex flex-col pt-space-xs items-start gap-space-xs relative">
          <div className="inline-flex items-center gap-space-xxs bg-hot-pink text-surface-cream px-space-sm py-1 border-3 border-border-black shadow-[3px_3px_0px_#000000] transform -rotate-2">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span className="font-label-sm text-label-sm tracking-widest uppercase">INITIATIVE AUDIT // 2024</span>
          </div>
          
          <div className="flex flex-col w-full mt-space-xxs">
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-border-black uppercase leading-none tracking-tighter m-0">
              WHO KEEPS THIS
            </h1>
            <div className="flex flex-wrap items-center gap-space-xs mt-1">
              <span className="inline-block bg-lime-green text-border-black px-space-xs py-0.5 border-4 border-border-black shadow-[4px_4px_0px_#000000] font-headline-lg-mobile text-headline-lg-mobile transform rotate-1">
                RELATIONSHIP
              </span>
              <span className="font-headline-lg-mobile text-headline-lg-mobile text-border-black uppercase leading-none tracking-tighter">
                ALIVE?
              </span>
            </div>
          </div>
        </Reveal>

        {/* Comparison Split Cards */}
        <div className="flex flex-col gap-space-md">
          {/* YOU */}
          <Reveal delay={0.4} className={`relative w-full ${youCarrier ? 'bg-lime-green' : 'bg-surface-cream'} border-4 border-border-black shadow-[5px_5px_0px_#000000] p-space-md flex flex-col gap-space-sm overflow-hidden`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xxs bg-border-black text-lime-green px-space-xs py-0.5 border-2 border-border-black">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                <span className="font-label-sm text-label-sm tracking-widest uppercase font-extrabold">{creatorName} {youCarrier ? '• CERTIFIED CARRIER' : ''}</span>
              </div>
              <span className="bg-surface-cream text-border-black font-label-sm text-label-sm px-space-xs py-0.5 border-2 border-border-black font-bold">
                {youCarrier ? 'HEAVY LIFTER' : 'CO-PILOT'}
              </span>
            </div>
            
            <div className="flex items-baseline justify-between gap-space-xs my-space-xxs">
              <div className="flex items-baseline">
                <span className="font-stat-number-mobile text-stat-number-mobile text-border-black tracking-tighter leading-none">{Math.round(initiation.youPercentage)}</span>
                <span className="font-headline-md-mobile text-headline-md-mobile text-border-black font-black leading-none">%</span>
              </div>
              <div className="text-right flex flex-col items-end">
                <span className="font-label-sm text-label-sm text-border-black/90 uppercase tracking-tight">STARTED BY {creatorName}</span>
              </div>
            </div>
            
            <div className="w-full bg-surface-cream border-3 border-border-black h-4 p-0.5 flex">
              <div className="h-full bg-border-black" style={{ width: `${initiation.youPercentage}%` }}></div>
            </div>
            
            <div className="relative bg-surface-cream border-[3px] border-border-black p-space-xs shadow-[3px_3px_0px_#000000] mt-space-xxs flex items-center justify-between">
              <div className="flex items-center gap-space-xs min-w-0">
                <span className="material-symbols-outlined text-hot-pink text-[20px]">chat_bubble</span>
                <p className="font-body-sm text-body-sm text-border-black truncate font-bold">
                  {creatorName}: “wyd” <span className="text-on-surface-variant font-normal text-[12px]">(11:42 PM)</span>
                </p>
              </div>
            </div>
          </Reveal>

          {/* THEM */}
          <Reveal delay={0.5} className={`relative w-full ${!youCarrier ? 'bg-lime-green' : 'bg-electric-yellow'} border-4 border-border-black shadow-[5px_5px_0px_#000000] p-space-md flex flex-col gap-space-sm overflow-hidden`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xxs bg-border-black text-electric-yellow px-space-xs py-0.5 border-2 border-border-black">
                <span className="material-symbols-outlined text-[16px]">{!youCarrier ? 'workspace_premium' : 'bedtime'}</span>
                <span className="font-label-sm text-label-sm tracking-widest uppercase font-extrabold">{chatName} {!youCarrier ? '• CERTIFIED CARRIER' : '• PASSIVE RESIDENT'}</span>
              </div>
            </div>
            
            <div className="flex items-baseline justify-between gap-space-xs my-space-xxs">
              <div className="flex items-baseline">
                <span className="font-stat-number-mobile text-stat-number-mobile text-border-black tracking-tighter leading-none">{Math.round(initiation.themPercentage)}</span>
                <span className="font-headline-md-mobile text-headline-md-mobile text-border-black font-black leading-none">%</span>
              </div>
              <div className="text-right flex flex-col items-end">
                <span className="font-label-sm text-label-sm text-border-black/90 uppercase tracking-tight">STARTED BY THEM</span>
              </div>
            </div>
            
            <div className="w-full bg-surface-cream border-[3px] border-border-black h-4 p-0.5 flex">
              <div className="h-full bg-border-black" style={{ width: `${initiation.themPercentage}%` }}></div>
            </div>
          </Reveal>
        </div>

        {/* Highlight Callout */}
        <Reveal delay={0.7} className="w-full bg-surface-cream-alt border-4 border-border-black shadow-[6px_6px_0px_#000000] p-space-md flex flex-col gap-space-sm relative">
          <div className="absolute -top-3.5 right-4 bg-vibrant-orange text-surface-cream px-space-xs py-0.5 border-2 border-border-black font-label-sm text-label-sm tracking-wider uppercase font-black transform rotate-2">
            HARSH REALITY CHECK ⚠️
          </div>
          <div className="pt-space-xs flex items-center gap-space-xs text-secondary font-label-md text-label-md uppercase tracking-wider">
            <span className="material-symbols-outlined text-[18px]">ecg_heart</span>
            <span>DIAGNOSIS REPORT</span>
          </div>
          <blockquote className="font-headline-sm text-headline-sm text-border-black uppercase leading-tight font-extrabold my-0">
            “{winner} IS RESPONSIBLE FOR MOST OF THE ‘HEY’ ENERGY IN THIS CHAT.”
          </blockquote>
        </Reveal>

        <Reveal delay={0.8} className="mt-space-lg flex flex-col gap-space-xs">
          <button onClick={onNext} className="w-full bg-electric-yellow text-border-black p-space-md font-label-lg text-label-lg uppercase tracking-wider flex items-center justify-between shadow-[5px_5px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer">
            <span>NEXT CHAPTER</span>
            <span className="material-symbols-outlined text-2xl font-bold">arrow_forward</span>
          </button>
        </Reveal>

      </div>
    </section>
  );
}
