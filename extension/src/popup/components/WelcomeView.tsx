interface WelcomeViewProps {
  onStart: () => void;
  isParsing: boolean;
  chatName?: string | null;
}

export const WelcomeView = ({ onStart, isParsing, chatName = 'Rahul' }: WelcomeViewProps) => {
  const displayName = chatName && chatName !== 'Unknown Chat' ? chatName : 'Rahul';
  const initial = displayName.trim().charAt(0).toUpperCase() || 'R';

  return (
    <div className="w-full p-4 flex flex-col justify-between select-none">
      {/* Top Bar Navigation */}
      <header className="flex items-center justify-between px-1 mb-2">
        <div className="flex items-center gap-2.5">
          {/* Logo Badge */}
          <div className="w-9 h-9 rounded-2xl bg-black flex items-center justify-center text-white shadow-sm flex-shrink-0">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3C6.5 3 2 6.8 2 11.5c0 2.5 1.3 4.8 3.5 6.4-.3 1.2-1.1 2.8-2.2 3.8 2.2 0 4.2-.9 5.5-2.1.7.2 1.4.3 2.2.3 5.5 0 10-3.8 10-8.5S17.5 3 12 3z" />
              <circle cx="9" cy="11.5" r="1.5" fill="black" />
              <circle cx="15" cy="11.5" r="1.5" fill="black" />
              <rect x="9" y="10.8" width="6" height="1.4" rx="0.7" fill="black" />
            </svg>
          </div>
          {/* Title & Subtitle */}
          <div className="flex flex-col text-left">
            <span className="text-[15px] font-bold text-neutral-900 tracking-tight leading-tight">
              Chat Wrapped
            </span>
            <span className="text-[11px] text-neutral-400 font-normal leading-tight">
              Your conversations, differently.
            </span>
          </div>
        </div>

        {/* 3-Dots Menu Button */}
        <button
          type="button"
          aria-label="Options"
          className="w-8 h-8 rounded-full bg-white border border-neutral-200/50 shadow-sm flex items-center justify-center text-neutral-600 hover:bg-neutral-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </header>

      {/* Main Hero Card */}
      <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-neutral-100 text-center relative mt-1">
        {/* Top Avatar Illustration Area */}
        <div className="relative flex justify-center items-center pt-2 pb-2">
          {/* Top-Left Radiating Sparkle Rays */}
          <div className="absolute left-[72px] top-2 pointer-events-none">
            <svg
              className="w-8 h-8 text-neutral-500/80"
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
            >
              <line x1="20" y1="7" x2="20" y2="2" />
              <line x1="12" y1="11" x2="7" y2="6" />
              <line x1="7" y1="20" x2="2" y2="20" />
            </svg>
          </div>

          {/* Central Avatar */}
          <div className="relative">
            <div className="w-[84px] h-[84px] rounded-full bg-[#BFE3CD] border-4 border-white shadow-sm flex items-center justify-center text-[#1C3E2D] font-bold text-3xl">
              {initial}
            </div>

            {/* Overlapping WhatsApp Logo Badge */}
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#25D366] border-2 border-white shadow-sm flex items-center justify-center text-white">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.072-.497-1.761-.73-2.883-2.518-2.97-2.635-.088-.117-.714-.949-.714-1.809 0-.86.449-1.282.609-1.458.16-.176.352-.22.469-.22.118 0 .235.001.338.006.107.005.251-.04.391.296.144.347.49 1.196.533 1.284.043.088.072.191.014.307-.058.117-.087.19-.174.293-.087.102-.183.228-.261.306-.088.087-.179.182-.077.357.102.175.454.749.975 1.213.673.6 1.24.786 1.416.874.176.088.279.073.383-.044.103-.117.44-5.13.558-.689.117-.176.234-.146.395-.088.161.059 1.026.484 1.202.572.176.088.293.132.337.205.044.074.044.426-.1.831z" />
              </svg>
            </div>
          </div>

          {/* Floating Speech Bubble */}
          <div className="absolute -top-1 right-2 bg-neutral-50/95 border border-neutral-200/60 rounded-2xl rounded-bl-sm px-3 py-1.5 shadow-sm text-left max-w-[130px]">
            <div className="text-[10.5px] text-neutral-500 font-medium leading-[1.3]">
              Good<br />conversations<br />deserve a rerun.
            </div>
          </div>
        </div>

        {/* Headings */}
        <h2 className="text-[25px] font-extrabold text-neutral-900 tracking-tight leading-[1.18] mt-4">
          Let’s create<br />your Chat Wrapped
        </h2>

        {/* "with" & Contact Name */}
        <div className="mt-2.5">
          <span className="text-[12px] text-neutral-400 font-medium block">with</span>
          <span className="text-[28px] font-extrabold text-[#1B5E20] tracking-tight block leading-tight mt-0.5">
            {displayName}
          </span>
        </div>

        {/* Ready Caption */}
        <p className="mt-2 text-[13px] text-neutral-400 font-normal leading-snug">
          Your conversation is<br />ready to be analyzed.
        </p>

        {/* Primary Action Button */}
        <button
          onClick={onStart}
          disabled={isParsing}
          className="w-full mt-6 bg-[#18181B] hover:bg-black text-white font-medium text-[14px] py-3.5 px-6 rounded-full flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(0,0,0,0.18)] transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer"
        >
          <span>{isParsing ? 'Analyzing...' : 'Let’s Create Wrapped'}</span>
          {!isParsing && (
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          )}
        </button>
      </div>

      {/* Bottom Feature Badges */}
      <div className="grid grid-cols-3 gap-2 mt-5 text-center px-1">
        {/* Feature 1: Stats */}
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-2xl bg-[#EEF2F6] flex items-center justify-center text-neutral-600 mb-1.5 shadow-sm">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 19h2V12H5v7zm6 0h2V7h-2v12zm6 0h2v-9h-2v9z" />
            </svg>
          </div>
          <span className="text-[11px] text-neutral-600 font-medium leading-tight">
            See your<br />chat stats
          </span>
        </div>

        {/* Feature 2: Relive */}
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-2xl bg-[#FDF2F4] flex items-center justify-center text-[#E11D48] mb-1.5 shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </div>
          <span className="text-[11px] text-neutral-600 font-medium leading-tight">
            Relive special<br />moments
          </span>
        </div>

        {/* Feature 3: Insights */}
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-2xl bg-[#F0F5FF] flex items-center justify-center text-[#3B82F6] mb-1.5 shadow-sm">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
            </svg>
          </div>
          <span className="text-[11px] text-neutral-600 font-medium leading-tight">
            Discover<br />fun insights
          </span>
        </div>
      </div>

      {/* Footer Tagline */}
      <footer className="mt-5 pb-1 text-center">
        <div className="font-serif italic text-neutral-400 text-[11.5px] tracking-wide leading-tight">
          Same chats.<br />A new perspective.
        </div>
        {/* Subtle decorative curved swoosh line */}
        <svg
          className="w-10 h-1.5 mx-auto mt-1 text-neutral-300 stroke-current opacity-70"
          viewBox="0 0 40 6"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M2 3c10 2 26 2 36-1" />
        </svg>
      </footer>
    </div>
  );
};
