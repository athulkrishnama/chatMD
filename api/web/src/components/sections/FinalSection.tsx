import { Reveal } from '../ui/Reveal';
import { FloatingSticker } from '../ui/FloatingSticker';
import { Marquee } from '../ui/Marquee';

interface FinalSectionProps {
  chatName: string;
}

export function FinalSection({ chatName }: FinalSectionProps) {
  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `My Chat Wrapped with ${chatName}`,
          text: 'Check out our Chat Wrapped!',
          url: url,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <section className="flex flex-col w-full min-h-[100svh] relative overflow-hidden px-margin-mobile py-space-2xl justify-center bg-surface-cream text-border-black pt-safe pb-safe">
      <div className="absolute inset-0 pointer-events-none opacity-40 -z-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="brutalist-dots-final" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="1.5" fill="#121212"></circle>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#brutalist-dots-final)"></rect>
        </svg>
      </div>

      <Reveal delay={0.1} direction="up" className="z-10 text-center mb-space-xl mt-auto">
        <h2 className="font-display-hero-mobile text-headline-lg uppercase text-border-black leading-tight tracking-tighter drop-shadow-[2px_2px_0px_#FF1493] mb-4">
          THAT'S A<br/>WRAP.
        </h2>
        <p className="font-headline-sm uppercase text-on-surface-variant max-w-[280px] mx-auto">
          See you next year for more chaos with {chatName}.
        </p>
      </Reveal>

      <Reveal delay={0.4} className="w-full flex flex-col gap-4 relative mt-auto mb-space-xl">
        <FloatingSticker initialRotate={-2} rotateRange={[-4, 0]} className="w-full">
          <button 
            onClick={handleShare}
            className="w-full bg-electric-yellow text-border-black hover:bg-hot-pink hover:text-surface-cream border-[4px] border-border-black py-space-md px-space-lg font-headline-md-mobile text-headline-md-mobile uppercase tracking-tight shadow-[5px_5px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-75 flex items-center justify-center gap-3 cursor-pointer"
          >
            <span>SHARE WRAPPED</span>
            <span className="material-symbols-outlined font-black text-2xl">ios_share</span>
          </button>
        </FloatingSticker>

        <a 
          href="https://chatwrapped.com" 
          target="_blank"
          className="w-full bg-surface-cream text-border-black hover:bg-border-black hover:text-surface-cream border-[4px] border-border-black py-space-md px-space-lg font-headline-md-mobile text-headline-md-mobile uppercase tracking-tight shadow-[5px_5px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-75 flex items-center justify-center gap-3 cursor-pointer text-center"
        >
          MAKE YOUR OWN
        </a>
      </Reveal>

      <Reveal delay={0.6} direction="up">
        <Marquee 
          items={['CHAT WRAPPED 2024', '•', 'NO RECEIPTS DELETED', '•', '100% UNHINGED', '•']}
          className="bg-border-black text-surface-cream py-space-xs shadow-[4px_4px_0px_#00F0FF] border-y-[3px] border-border-black font-label-md uppercase tracking-wider absolute bottom-10 left-0 w-[120%]"
          rotate={2}
          speed={20}
        />
      </Reveal>
    </section>
  );
}
