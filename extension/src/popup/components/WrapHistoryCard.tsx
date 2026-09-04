import type { WrapHistoryItem } from '../../shared/wrappedTypes';

interface WrapHistoryCardProps {
  wrap: WrapHistoryItem;
  onClick: () => void;
}

export function WrapHistoryCard({ wrap, onClick }: WrapHistoryCardProps) {
  const dateStr = new Date(wrap.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let statusText = '';
  switch (wrap.status) {
    case 'completed': statusText = `Completed`; break;
    case 'processing':
    case 'pending': statusText = `Preparing your Wrapped...`; break;
    case 'failed': statusText = `Couldn't generate Wrapped`; break;
  }

  return (
    <div 
      onClick={onClick}
      className="w-full text-left bg-white border border-neutral-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-neutral-200 transition-all cursor-pointer flex justify-between items-center group"
    >
      <div>
        <h3 className="font-semibold text-neutral-900">{wrap.chatName}</h3>
        <p className={`text-xs mt-1 ${wrap.status === 'failed' ? 'text-red-500' : 'text-neutral-500'}`}>
          {wrap.status === 'completed' ? `${statusText} • ${dateStr}` : statusText}
        </p>
      </div>
      <div className="text-neutral-300 group-hover:text-neutral-900 transition-colors">
        →
      </div>
    </div>
  );
}
