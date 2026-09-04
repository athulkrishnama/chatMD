import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from './Marquee';

interface FloatingStickerProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  rotateRange?: [number, number];
  yRange?: [number, number];
  className?: string;
  initialRotate?: number;
}

export function FloatingSticker({ 
  children, 
  delay = 0, 
  duration = 6, 
  rotateRange = [-3, 3],
  yRange = [-4, 4],
  className,
  initialRotate = 0
}: FloatingStickerProps) {
  return (
    <motion.div
      className={cn("inline-block", className)}
      initial={{ rotate: initialRotate, y: 0 }}
      animate={{ 
        rotate: [initialRotate + rotateRange[0], initialRotate + rotateRange[1], initialRotate + rotateRange[0]],
        y: [yRange[0], yRange[1], yRange[0]]
      }}
      transition={{
        repeat: Infinity,
        duration,
        delay,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
}
