interface SenderBreakdownProps {
  counts: Record<string, number>;
}

export const SenderBreakdown = ({ counts }: SenderBreakdownProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      {Object.entries(counts).map(([sender, count]) => (
        <div
          key={sender}
          className="flex items-center justify-between py-1.5 px-2.5 rounded-xl bg-neutral-50 text-xs text-neutral-700"
        >
          <span className="font-semibold text-neutral-900 truncate max-w-[200px]">{sender}</span>
          <span className="bg-white px-2 py-0.5 rounded-full border border-neutral-200/60 font-medium text-neutral-600 text-[11px]">
            {count}
          </span>
        </div>
      ))}
    </div>
  );
};
