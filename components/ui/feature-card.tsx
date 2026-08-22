'use client';

import { type ReactNode } from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { cn } from '@/lib/utils';

export interface FeatureCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
  className?: string;
  children?: ReactNode;
}

export function FeatureCard({ icon, title, description, className, children }: FeatureCardProps) {
  return (
    <GlassCard hover className={cn('p-6', className)}>
      {icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-tazcal-primary/15 text-tazcal-primary">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/65">{description}</p>
      {children}
    </GlassCard>
  );
}
