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

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `http://localhost:3000/wrap/${wrap.id}`;
    if (navigator.share) {
      navigator.share({
        title: 'My Chat Wrapped',
        text: 'Check out our Chat Wrapped',
        url,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div 
      onClick={onClick}
      className="w-full text-left bg-white border border-neutral-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-neutral-200 transition-all cursor-pointer flex flex-col group"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-neutral-900">{wrap.chatName}</h3>
          <p className={`text-xs mt-1 ${wrap.status === 'failed' ? 'text-red-500' : 'text-neutral-500'}`}>
            {wrap.status === 'completed' ? `${statusText} • ${dateStr}` : statusText}
          </p>
        </div>
      </div>
      
      {wrap.status === 'completed' && (
        <div className="mt-4 flex gap-2">
          <button 
            onClick={onClick}
            className="flex-1 bg-neutral-100 text-neutral-800 text-xs font-semibold py-2 rounded-xl hover:bg-neutral-200 transition-colors"
          >
            View Wrapped
          </button>
          <button 
            onClick={handleShare}
            className="flex-1 border border-neutral-200 text-neutral-700 text-xs font-semibold py-2 rounded-xl hover:bg-neutral-50 transition-colors"
          >
            Share
          </button>
        </div>
      )}
    </div>
  );
}
