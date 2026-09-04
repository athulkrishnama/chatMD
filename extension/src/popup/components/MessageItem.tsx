import type { ChatMessage } from '../../shared/types';

interface MessageItemProps {
  message: ChatMessage;
}

export const MessageItem = ({ message }: MessageItemProps) => {
  return (
    <div
      className={`p-2.5 rounded-xl text-xs transition-colors ${
        message.isOutgoing
          ? 'bg-[#E8F8EE] text-neutral-800 ml-3'
          : 'bg-[#F2F4F7] text-neutral-800 mr-3'
      }`}
    >
      <div className="flex justify-between items-center mb-1">
        <span className={`font-bold ${message.isOutgoing ? 'text-[#166534]' : 'text-neutral-700'}`}>
          {message.sender}
        </span>
        {(message.date || message.timestamp) && (
          <span className="text-[10px] text-neutral-400">
            {message.date ? `${message.date} ${message.timestamp || ''}` : message.timestamp}
          </span>
        )}
      </div>
      <div className="whitespace-pre-wrap break-words leading-relaxed text-neutral-700">
        {message.text}
      </div>
    </div>
  );
};
