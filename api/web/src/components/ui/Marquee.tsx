import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MarqueeProps {
  items: string[];
  className?: string;
  speed?: number; // seconds per loop
  rotate?: number; // degrees
}

export function Marquee({ items, className, speed = 20, rotate = 0 }: MarqueeProps) {
  // Duplicate items to ensure smooth infinite scroll
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div 
      className={cn(
        "w-[120%] -ml-[10%] flex overflow-hidden whitespace-nowrap select-none", 
        className
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <motion.div
        className="flex gap-4 min-w-max"
        animate={{ x: [0, -1035] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
      >
        {repeatedItems.map((item, i) => (
          <span key={i} className="inline-block">{item}</span>
        ))}
      </motion.div>
    </div>
  );
}
