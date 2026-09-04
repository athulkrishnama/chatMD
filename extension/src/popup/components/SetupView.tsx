import { useState } from 'react';
import { Button } from './Button';
import { setCreatorName } from '../../shared/device';

interface SetupViewProps {
  onComplete: () => void;
}

export function SetupView({ onComplete }: SetupViewProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setCreatorName(name);
      onComplete();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center animate-fade-in">
      <h1 className="text-2xl font-bold text-neutral-900 mb-2 tracking-tight">
        Welcome to Chat Wrapped
      </h1>
      <p className="text-neutral-500 mb-8 text-sm">
        What should we call you?
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-[240px] flex flex-col gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          autoFocus
          className="w-full px-4 py-3 rounded-2xl bg-neutral-100 border-none outline-none text-center font-medium focus:ring-2 focus:ring-black/5 transition-all"
        />
        <Button type="submit" disabled={!name.trim()}>
          Continue
        </Button>
      </form>
    </div>
  );
}
