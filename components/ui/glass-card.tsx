'use client';

import { cn } from '@/lib/utils';
import { type HTMLAttributes, forwardRef } from 'react';

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  hover?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, glow = false, hover = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'glass rounded-3xl',
          glow && 'glass-glow',
          hover && 'glass-hover',
          className
        )}
        {...props}
      />
    );
  }
);
GlassCard.displayName = 'GlassCard';
