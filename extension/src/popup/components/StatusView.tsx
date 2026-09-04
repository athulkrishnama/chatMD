import type { ReactNode } from 'react';

interface StatusViewProps {
  message: string;
  actionButton?: ReactNode;
}

export const StatusView = ({ message, actionButton }: StatusViewProps) => {
  return (
    <div className="w-full min-h-[520px] p-5 flex flex-col justify-center items-center text-center select-none">
      <div className="bg-white rounded-[28px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-neutral-100 w-full flex flex-col items-center justify-center">
        {/* Logo Badge */}
        <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center text-white shadow-sm mb-4">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3C6.5 3 2 6.8 2 11.5c0 2.5 1.3 4.8 3.5 6.4-.3 1.2-1.1 2.8-2.2 3.8 2.2 0 4.2-.9 5.5-2.1.7.2 1.4.3 2.2.3 5.5 0 10-3.8 10-8.5S17.5 3 12 3z" />
            <circle cx="9" cy="11.5" r="1.5" fill="black" />
            <circle cx="15" cy="11.5" r="1.5" fill="black" />
            <rect x="9" y="10.8" width="6" height="1.4" rx="0.7" fill="black" />
          </svg>
        </div>

        <h3 className="text-lg font-bold text-neutral-900 mb-2">Chat Wrapped</h3>
        <p className="text-sm text-neutral-500 max-w-[220px] mb-6 leading-relaxed">
          {message}
        </p>

        {actionButton && (
          <div className="w-full flex justify-center">
            {actionButton}
          </div>
        )}
      </div>
    </div>
  );
};
