'use client';

import { cn } from '@/lib/utils';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

export interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-[18px] px-6 py-3 text-sm font-semibold text-white transition-all duration-200',
          'bg-gradient-to-b from-[#7A3CFF] to-[#6A2EF2] hover:from-[#A67CFF] hover:to-[#7A3CFF]',
          'shadow-[0_0_20px_-4px_rgba(122,60,255,0.5)] hover:shadow-[0_0_30px_-2px_rgba(122,60,255,0.7)]',
          'hover:scale-[1.02] active:scale-[0.98]',
          'disabled:opacity-50 disabled:pointer-events-none',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
PrimaryButton.displayName = 'PrimaryButton';

export interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const SecondaryButton = forwardRef<HTMLButtonElement, SecondaryButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-[18px] px-6 py-3 text-sm font-semibold text-white transition-all duration-200',
          'glass glass-hover',
          'disabled:opacity-50 disabled:pointer-events-none',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
SecondaryButton.displayName = 'SecondaryButton';

export interface AccentButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const AccentButton = forwardRef<HTMLButtonElement, AccentButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-[18px] px-6 py-3 text-sm font-semibold text-black transition-all duration-200',
          'bg-gradient-to-b from-[#FFB71A] to-[#FF9800] hover:from-[#FFD84D] hover:to-[#FFB71A]',
          'shadow-[0_0_20px_-4px_rgba(255,183,26,0.4)] hover:shadow-[0_0_30px_-2px_rgba(255,183,26,0.6)]',
          'hover:scale-[1.02] active:scale-[0.98]',
          'disabled:opacity-50 disabled:pointer-events-none',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
AccentButton.displayName = 'AccentButton';

export interface GhostButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const GhostButton = forwardRef<HTMLButtonElement, GhostButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-[18px] px-6 py-3 text-sm font-semibold text-white/65 transition-all duration-200',
          'hover:text-white hover:bg-white/5',
          'disabled:opacity-50 disabled:pointer-events-none',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
GhostButton.displayName = 'GhostButton';
