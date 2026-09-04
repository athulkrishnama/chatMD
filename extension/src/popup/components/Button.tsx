import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Button = ({ children, className = '', ...props }: ButtonProps) => {
  return (
    <button
      className={`bg-[#18181B] hover:bg-black text-white font-medium text-[14px] py-3 px-6 rounded-full flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(0,0,0,0.18)] transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
