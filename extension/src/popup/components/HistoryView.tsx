import { Button } from './Button';
import { WrapHistoryCard } from './WrapHistoryCard';
import type { WrapHistoryItem } from '../../shared/wrappedTypes';

interface HistoryViewProps {
  wraps: WrapHistoryItem[];
  creatorName: string;
  onSelect: (wrapId: string) => void;
  onCreateNew: () => void;
}

export function HistoryView({ wraps, creatorName, onSelect, onCreateNew }: HistoryViewProps) {
  if (wraps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center animate-fade-in">
        <h2 className="text-xl font-bold text-neutral-900 mb-2 tracking-tight">
          Your Wrapped library is empty
        </h2>
        <p className="text-neutral-500 mb-8 text-sm">
          Create your first Chat Wrapped from a WhatsApp conversation.
        </p>
        <Button onClick={onCreateNew}>Create Wrapped</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[400px] p-4 animate-fade-in bg-neutral-50">
      <div className="flex justify-between items-end mb-6 mt-2 px-2">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">Your Wrappeds</h2>
          <p className="text-neutral-500 text-sm">For {creatorName}</p>
        </div>
        <button 
          onClick={onCreateNew}
          className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-900 hover:bg-neutral-100 transition-colors shadow-sm"
          title="Create New Wrapped"
        >
          <span className="text-xl leading-none font-light">+</span>
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {wraps.map((wrap) => (
          <WrapHistoryCard 
            key={wrap.id} 
            wrap={wrap} 
            onClick={() => onSelect(wrap.id)} 
          />
        ))}
      </div>
    </div>
  );
}
