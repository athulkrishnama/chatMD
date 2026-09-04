import type { ChatConversation } from '../../shared/types';
import { SenderBreakdown } from './SenderBreakdown';
import { MessageItem } from './MessageItem';
import { Button } from './Button';

interface ConversationViewProps {
  conversation: ChatConversation;
  onBack: () => void;
}

export const ConversationView = ({ conversation, onBack }: ConversationViewProps) => {
  console.log('[ChatWrapped] ConversationView data:', conversation);

  // Count messages per sender
  const counts: Record<string, number> = {};
  conversation.messages.forEach((m) => {
    counts[m.sender] = (counts[m.sender] || 0) + 1;
  });

  const latestMessages = conversation.messages.slice(-3);
  const initial = conversation.chatName.trim().charAt(0).toUpperCase() || 'C';

  return (
    <div className="w-full p-4 flex flex-col max-h-[580px] overflow-y-auto select-none">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-[#BFE3CD] text-[#1C3E2D] font-bold flex items-center justify-center text-sm shadow-sm flex-shrink-0">
            {initial}
          </div>
          <div className="flex flex-col text-left">
            <h2 className="text-[15px] font-bold text-neutral-900 leading-tight truncate max-w-[180px]">
              {conversation.chatName}
            </h2>
            <span className="text-[11px] text-neutral-400 font-normal leading-tight">
              {conversation.messages.length} messages analyzed
            </span>
          </div>
        </div>

        <button
          onClick={onBack}
          type="button"
          className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 bg-white border border-neutral-200/60 rounded-full px-3 py-1 shadow-sm transition-colors cursor-pointer"
        >
          ← Back
        </button>
      </div>

      {/* Participation Stats Card */}
      <div className="bg-white rounded-[24px] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-neutral-100 mb-3">
        <h3 className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2.5 text-left">
          Participation
        </h3>
        <SenderBreakdown counts={counts} />
      </div>

      {/* Latest Messages Card */}
      <div className="bg-white rounded-[24px] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-neutral-100 mb-3">
        <h3 className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2.5 text-left">
          Latest Messages
        </h3>
        {latestMessages.length === 0 ? (
          <p className="text-xs text-neutral-400 italic py-2 text-center">No messages detected in view.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {latestMessages.map((m) => (
              <MessageItem key={m.id} message={m} />
            ))}
          </div>
        )}
      </div>

      <Button onClick={onBack} className="w-full mt-1">
        Back to Start
      </Button>
    </div>
  );
};
