import { Reveal } from '../ui/Reveal';
import { StoryHeader } from '../ui/StoryHeader';

interface VocabProps {
  emojis: Array<{ emoji: string; count: number }>;
  chapter: number;
  totalChapters: number;
  onNext: () => void;
}

export function VocabularySection({ emojis, chapter, totalChapters, onNext }: VocabProps) {
  const topEmojis = emojis.slice(0, 3);
  const remainingEmojis = emojis.slice(3, 8);

  return (
    <section className="flex-1 flex flex-col relative w-full pt-28 pb-safe bg-surface-cream min-h-screen">
      <StoryHeader chapter={chapter} totalChapters={totalChapters} />
      <div className="flex flex-col w-full px-margin-mobile pb-space-lg select-none">
        
        {/* Ticker */}
        <Reveal delay={0.1} className="-mx-margin-mobile bg-border-black text-hot-pink py-space-xxs overflow-hidden rotate-1 border-y-4 border-border-black shadow-[0_4px_0_#000]">
          <div className="animate-marquee whitespace-nowrap font-label-sm text-label-sm uppercase tracking-widest flex items-center gap-space-md font-extrabold">
            <span>🗣️ LINGUISTIC AUTOPSY</span>
            <span className="text-electric-yellow">★</span>
            <span>🗣️ LINGUISTIC AUTOPSY</span>
          </div>
        </Reveal>

        {/* Hero */}
        <Reveal delay={0.2} className="flex flex-col items-start gap-space-xxs pt-space-md">
          <div className="bg-lime-green text-border-black px-space-xs py-0.5 border-[2px] border-border-black font-label-sm text-label-sm uppercase tracking-widest -rotate-2 shadow-[2px_2px_0px_#000000]">
            EMOJI ANALYSIS
          </div>
          <h1 className="font-headline-sm text-headline-sm uppercase text-border-black tracking-tight leading-tight mt-1">
            YOUR VOCABULARY,
            <span className="inline-block bg-electric-cyan px-1 py-0.5 border-4 border-border-black shadow-[4px_4px_0px_#000000] transform rotate-1 mt-1 ml-2">APPARENTLY.</span>
          </h1>
        </Reveal>

        {/* Podium */}
        <Reveal delay={0.4} className="mt-space-lg flex items-end justify-center gap-space-xs h-40">
          {/* Rank 2 */}
          {topEmojis[1] && (
            <div className="flex flex-col items-center">
              <div className="text-[40px] mb-2">{topEmojis[1].emoji}</div>
              <div className="w-20 h-24 bg-electric-yellow border-4 border-border-black shadow-[4px_4px_0px_#000000] flex flex-col justify-start pt-2 items-center">
                <span className="font-headline-sm text-headline-sm text-border-black">#2</span>
                <span className="font-label-sm text-label-sm text-border-black">{topEmojis[1].count}x</span>
              </div>
            </div>
          )}
          {/* Rank 1 */}
          {topEmojis[0] && (
            <div className="flex flex-col items-center -mt-6">
              <div className="text-[56px] mb-2 animate-bounce">{topEmojis[0].emoji}</div>
              <div className="w-24 h-32 bg-hot-pink border-4 border-border-black shadow-[4px_4px_0px_#000000] flex flex-col justify-start pt-2 items-center text-surface-cream">
                <span className="font-headline-md-mobile text-headline-md-mobile">#1</span>
                <span className="font-label-sm text-label-sm font-extrabold">{topEmojis[0].count}x</span>
              </div>
            </div>
          )}
          {/* Rank 3 */}
          {topEmojis[2] && (
            <div className="flex flex-col items-center">
              <div className="text-[32px] mb-2">{topEmojis[2].emoji}</div>
              <div className="w-16 h-16 bg-electric-cyan border-4 border-border-black shadow-[4px_4px_0px_#000000] flex flex-col justify-start pt-1 items-center">
                <span className="font-headline-sm text-headline-sm text-border-black leading-none">#3</span>
                <span className="font-label-sm text-label-sm text-border-black">{topEmojis[2].count}x</span>
              </div>
            </div>
          )}
        </Reveal>

        {/* Runner ups */}
        {remainingEmojis.length > 0 && (
          <Reveal delay={0.5} className="mt-space-md w-full">
            <div className="bg-surface-cream-alt border-[3px] border-border-black shadow-[5px_5px_0px_#000000] p-space-sm flex flex-wrap gap-2 justify-center items-center">
              <span className="w-full text-center font-label-sm text-label-sm uppercase font-bold text-on-surface-variant mb-1">RUNNER UPS</span>
              {remainingEmojis.map((e, i) => (
                <div key={i} className="flex items-center gap-1 bg-surface-cream border-[2px] border-border-black px-2 py-1 shadow-[2px_2px_0px_#000000]">
                  <span className="text-[16px]">{e.emoji}</span>
                  <span className="font-label-sm text-label-sm font-bold text-border-black">{e.count}</span>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        <Reveal delay={0.6} className="mt-auto pt-space-lg">
          <button onClick={onNext} className="w-full bg-border-black text-lime-green p-space-md font-label-lg text-label-lg uppercase tracking-wider flex items-center justify-between border-[4px] border-border-black shadow-[6px_6px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer">
            <span>NEXT CHAPTER</span>
            <span className="material-symbols-outlined text-2xl font-bold">arrow_forward</span>
          </button>
        </Reveal>

      </div>
    </section>
  );
}
