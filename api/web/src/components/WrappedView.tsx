import { useState } from 'react';
import type { AnalyzeApiResponse, RelationshipProfile, WrappedInsight } from '../../shared/wrappedTypes';

interface WrappedViewProps {
  data: AnalyzeApiResponse;
  onBack: () => void;
}

const SCREENS = 8;

function formatHour(h: number): string {
  if (h === 0) return '12 AM';
  if (h < 12) return `${h} AM`;
  if (h === 12) return '12 PM';
  return `${h - 12} PM`;
}

function formatMinutes(m: number): string {
  if (m < 1) return `${Math.round(m * 60)}s`;
  if (m < 60) return `${Math.round(m)}m`;
  return `${Math.round(m / 60)}h ${Math.round(m % 60)}m`;
}

// ─── Individual screen components ────────────────────────────────────────────

function Screen1Cover({ chatName }: { chatName: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6 py-8">
      <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center text-white shadow-lg mb-4">
        <svg className="w-9 h-9" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3C6.5 3 2 6.8 2 11.5c0 2.5 1.3 4.8 3.5 6.4-.3 1.2-1.1 2.8-2.2 3.8 2.2 0 4.2-.9 5.5-2.1.7.2 1.4.3 2.2.3 5.5 0 10-3.8 10-8.5S17.5 3 12 3z"/>
        </svg>
      </div>
      <p className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2">Chat Wrapped</p>
      <h1 className="text-2xl font-extrabold text-neutral-900 leading-tight mb-1">
        You & {chatName}
      </h1>
      <p className="text-neutral-400 text-sm">Here's what your messages reveal.</p>
    </div>
  );
}

function Screen2Balance({ p, chatName }: { p: RelationshipProfile; chatName: string }) {
  const youPct = p.messageBalance.you.percentage;
  const themPct = p.messageBalance.them.percentage;
  const charRatio = p.messageBalance.them.avgCharacters > 0
    ? (p.messageBalance.them.avgCharacters / p.messageBalance.you.avgCharacters).toFixed(1)
    : null;

  return (
    <div className="flex flex-col h-full px-5 py-6">
      <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold mb-1">Who carried the chat?</p>
      <h2 className="text-xl font-extrabold text-neutral-900 mb-5">Message Balance</h2>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm font-semibold mb-1">
            <span>You</span><span>{youPct}%</span>
          </div>
          <div className="h-3 rounded-full bg-neutral-100 overflow-hidden">
            <div className="h-full bg-neutral-900 rounded-full" style={{ width: `${youPct}%` }} />
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">{p.messageBalance.you.count.toLocaleString()} messages · avg {p.messageBalance.you.avgCharacters} chars</p>
        </div>
        <div>
          <div className="flex justify-between text-sm font-semibold mb-1">
            <span>{chatName}</span><span>{themPct}%</span>
          </div>
          <div className="h-3 rounded-full bg-neutral-100 overflow-hidden">
            <div className="h-full bg-[#25D366] rounded-full" style={{ width: `${themPct}%` }} />
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">{p.messageBalance.them.count.toLocaleString()} messages · avg {p.messageBalance.them.avgCharacters} chars</p>
        </div>
      </div>
      {charRatio && parseFloat(charRatio) > 1.3 && (
        <p className="mt-5 text-sm text-neutral-500 bg-neutral-50 rounded-2xl p-3">
          💬 {chatName} sends fewer messages but writes <strong>{charRatio}× more characters</strong> per message.
        </p>
      )}
    </div>
  );
}

function Screen3Initiation({ p, chatName }: { p: RelationshipProfile; chatName: string }) {
  const youPct = p.conversationInitiation.youPercentage;
  const themPct = p.conversationInitiation.themPercentage;
  return (
    <div className="flex flex-col h-full px-5 py-6">
      <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold mb-1">Conversation starter?</p>
      <h2 className="text-xl font-extrabold text-neutral-900 mb-5">Who says "Hey" first?</h2>
      <div className="space-y-3">
        {[
          { label: 'You', count: p.conversationInitiation.you, pct: youPct, color: 'bg-neutral-900' },
          { label: chatName, count: p.conversationInitiation.them, pct: themPct, color: 'bg-[#25D366]' },
        ].map(({ label, count, pct, color }) => (
          <div key={label}>
            <div className="flex justify-between text-sm font-semibold mb-1">
              <span>{label}</span><span>{pct}%</span>
            </div>
            <div className="h-3 rounded-full bg-neutral-100 overflow-hidden">
              <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">{count} conversations started</p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm text-neutral-500 bg-neutral-50 rounded-2xl p-3">
        {youPct > themPct
          ? `🙋 You apparently have more "hey" energy.`
          : `🙋 ${chatName} tends to make the first move.`}
      </p>
    </div>
  );
}

function Screen4ReplyTime({ p, chatName }: { p: RelationshipProfile; chatName: string }) {
  const faster = p.replyTime.youMedianMinutes <= p.replyTime.themMedianMinutes ? 'You' : chatName;
  return (
    <div className="flex flex-col h-full px-5 py-6">
      <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold mb-1">Speed check</p>
      <h2 className="text-xl font-extrabold text-neutral-900 mb-5">Who replies faster?</h2>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'You', median: p.replyTime.youMedianMinutes, under5: p.replyTime.youUnder5MinPercentage },
          { label: chatName, median: p.replyTime.themMedianMinutes, under5: p.replyTime.themUnder5MinPercentage },
        ].map(({ label, median, under5 }) => (
          <div key={label} className="bg-neutral-50 rounded-2xl p-3 text-center">
            <p className="text-xs text-neutral-400 font-medium">{label}</p>
            <p className="text-2xl font-extrabold text-neutral-900 mt-1">{formatMinutes(median)}</p>
            <p className="text-[11px] text-neutral-400 mt-0.5">median reply</p>
            <p className="text-xs text-green-600 font-semibold mt-1">{under5}% under 5m</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-neutral-500 bg-neutral-50 rounded-2xl p-3">
        ⚡ {faster} is operating on premium response time.
      </p>
    </div>
  );
}

function Screen5Activity({ p }: { p: RelationshipProfile }) {
  return (
    <div className="flex flex-col h-full px-5 py-6">
      <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold mb-1">Peak schedule</p>
      <h2 className="text-xl font-extrabold text-neutral-900 mb-5">When do you two exist?</h2>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-neutral-50 rounded-2xl p-3 text-center">
          <p className="text-xs text-neutral-400">Peak hour</p>
          <p className="text-2xl font-extrabold text-neutral-900 mt-1">{formatHour(p.activity.peakHour)}</p>
        </div>
        <div className="bg-neutral-50 rounded-2xl p-3 text-center">
          <p className="text-xs text-neutral-400">Peak day</p>
          <p className="text-2xl font-extrabold text-neutral-900 mt-1">{p.activity.peakDay}</p>
        </div>
      </div>
      <div className="bg-neutral-50 rounded-2xl p-3 text-center">
        <p className="text-[11px] text-neutral-400">Night messages (after 10 PM)</p>
        <p className="text-xl font-extrabold text-neutral-900 mt-0.5">{p.activity.nightMessagePercentage}%</p>
      </div>
      {p.activity.nightMessagePercentage > 35 && (
        <p className="mt-4 text-sm text-neutral-500 bg-neutral-50 rounded-2xl p-3">
          🌙 Apparently, daytime is not for this relationship.
        </p>
      )}
    </div>
  );
}

function Screen6Streaks({ p }: { p: RelationshipProfile }) {
  return (
    <div className="flex flex-col h-full px-5 py-6">
      <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold mb-1">Dedication check</p>
      <h2 className="text-xl font-extrabold text-neutral-900 mb-5">The streak</h2>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-neutral-900 text-white rounded-2xl p-4 text-center">
          <p className="text-3xl font-extrabold">{p.streaks.longestDays}</p>
          <p className="text-[11px] text-neutral-300 mt-1">day streak 🔥</p>
        </div>
        <div className="bg-neutral-50 rounded-2xl p-4 text-center">
          <p className="text-3xl font-extrabold text-neutral-900">{p.engagement.longestConversationMinutes}m</p>
          <p className="text-[11px] text-neutral-400 mt-1">longest convo</p>
        </div>
      </div>
      <div className="bg-neutral-50 rounded-2xl p-3 text-center">
        <p className="text-[11px] text-neutral-400">Longest conversation</p>
        <p className="text-lg font-extrabold text-neutral-900 mt-0.5">{p.engagement.longestConversationMessages} messages</p>
      </div>
    </div>
  );
}

function Screen7Relationship({ wrapped }: { chatName: string; wrapped: WrappedInsight }) {
  return (
    <div className="flex flex-col h-full px-5 py-6">
      <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold mb-1">The verdict</p>
      <h2 className="text-xl font-extrabold text-neutral-900 mb-4">Your relationship</h2>
      <div className="bg-neutral-900 text-white rounded-3xl p-5 text-center mb-4">
        <p className="text-[11px] uppercase tracking-widest text-neutral-400 font-semibold">{wrapped.status}</p>
        <p className="text-lg font-extrabold mt-1 leading-tight">{wrapped.relationshipType}</p>
        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="text-4xl font-black">{wrapped.chatChemistryScore}</span>
          <div className="text-left">
            <p className="text-[11px] text-neutral-400">Chat</p>
            <p className="text-[11px] text-neutral-400">Chemistry</p>
          </div>
        </div>
      </div>
      <p className="text-sm text-neutral-600 leading-relaxed">{wrapped.summary}</p>
      <p className="mt-3 text-xs text-neutral-400 italic">{wrapped.topSignal}</p>
    </div>
  );
}

function Screen8Evidence({ p, wrapped }: { p: RelationshipProfile; wrapped: WrappedInsight }) {
  const facts = [
    p.emojis.topOverall && `${p.emojis.topOverall.emoji} used ${p.emojis.topOverall.count}× total`,
    p.engagement.doubleTextsByYou > 0 && `You sent ${p.engagement.doubleTextsByYou} double texts`,
    p.engagement.doubleTextsByThem > 0 && `They sent ${p.engagement.doubleTextsByThem} double texts`,
    `${p.activity.peakDay} = your busiest day`,
    `${formatHour(p.activity.peakHour)} = your official chat hour`,
    `Longest streak: ${p.streaks.longestDays} days`,
    p.overview.avgMessagesPerDay > 0 && `${p.overview.avgMessagesPerDay} msgs/day on average`,
  ].filter(Boolean) as string[];

  return (
    <div className="flex flex-col h-full px-5 py-6">
      <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold mb-1">Hard evidence</p>
      <h2 className="text-xl font-extrabold text-neutral-900 mb-4">The proof</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {facts.map((f, i) => (
          <span key={i} className="bg-neutral-100 text-neutral-700 text-xs font-medium rounded-full px-3 py-1.5">
            {f}
          </span>
        ))}
      </div>
      <div className="mt-auto bg-neutral-50 rounded-2xl p-3">
        <p className="text-xs text-neutral-400 font-medium mb-1">💡 Fun observation</p>
        <p className="text-sm text-neutral-700">{wrapped.funObservation}</p>
      </div>
    </div>
  );
}

// ─── Main WrappedView ─────────────────────────────────────────────────────────

export const WrappedView = ({ data, onBack }: WrappedViewProps) => {
  const [screen, setScreen] = useState(0);
  const { profile: p, wrapped, chatName } = data;

  const screens = [
    <Screen1Cover chatName={chatName} />,
    <Screen2Balance p={p} chatName={chatName} />,
    <Screen3Initiation p={p} chatName={chatName} />,
    <Screen4ReplyTime p={p} chatName={chatName} />,
    <Screen5Activity p={p} />,
    <Screen6Streaks p={p} />,
    <Screen7Relationship chatName={chatName} wrapped={wrapped} />,
    <Screen8Evidence p={p} wrapped={wrapped} />,
  ];

  return (
    <div className="w-full flex flex-col select-none" style={{ minHeight: '520px' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <button onClick={onBack} className="text-neutral-400 hover:text-neutral-700 transition-colors p-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex gap-1">
          {screens.map((_, i) => (
            <button
              key={i}
              onClick={() => setScreen(i)}
              className={`h-1.5 rounded-full transition-all ${i === screen ? 'w-5 bg-neutral-900' : 'w-1.5 bg-neutral-200'}`}
            />
          ))}
        </div>
        <span className="text-xs text-neutral-300 font-medium">{screen + 1}/{SCREENS}</span>
      </div>

      {/* Screen content */}
      <div className="flex-1 overflow-hidden">
        {screens[screen]}
      </div>

      {/* Navigation */}
      <div className="flex gap-2 px-4 pb-4">
        {screen > 0 && (
          <button
            onClick={() => setScreen((s) => s - 1)}
            className="flex-1 py-2.5 rounded-full border border-neutral-200 text-neutral-600 text-sm font-medium hover:bg-neutral-50 transition-colors"
          >
            ← Back
          </button>
        )}
        {screen < SCREENS - 1 ? (
          <button
            onClick={() => setScreen((s) => s + 1)}
            className="flex-1 py-2.5 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-black transition-colors"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={onBack}
            className="flex-1 py-2.5 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-black transition-colors"
          >
            Done ✓
          </button>
        )}
      </div>
    </div>
  );
};
