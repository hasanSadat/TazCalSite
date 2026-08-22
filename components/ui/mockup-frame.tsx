'use client';

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useLocale } from '../providers/locale-provider';

export interface MockupFrameProps {
  children?: ReactNode;
  className?: string;
  label?: string;
}

export function MockupFrame({ children, className, label }: MockupFrameProps) {
  const { locale } = useLocale();
const isRTL = locale === 'fa' || locale === 'ar';

  return (
    <div className={cn('relative mx-auto', className)} style={{ perspective: '1200px' }}>
      <div
        className="relative mx-auto animate-float-phone"
        style={{
          width: '280px',
          maxWidth: '100%',
          aspectRatio: '9 / 19.5',
          borderRadius: '44px',
          background: 'linear-gradient(145deg, #2A1A4A, #0B0715)',
          padding: '8px',
          boxShadow:
            '0 0 60px -10px rgba(122,60,255,0.4), 0 0 120px -20px rgba(122,60,255,0.3), inset 0 0 0 2px rgba(255,255,255,0.08)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Notch */}
{/* Notch */}
{/* <div
  className="absolute top-2 z-20 rounded-full bg-black/80"
  style={{
    width: '90px',
    height: '24px',
    left: '50%',
    transform: 'translateX(-50%)',
  }}
/> */}
        <div
          className="relative h-full w-full overflow-hidden rounded-[36px] bg-gradient-to-b from-[#1A0F2E] to-[#0B0715]"
        >
          {children}
          {!children && (
            <div className="flex h-full items-center justify-center p-4 text-center text-xs text-white/40">
              {label || 'Screenshot placeholder'}
            </div>
          )}
        </div>
        {/* Side reflection */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[44px]"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.05) 100%)',
          }}
        />
      </div>
    </div>
  );
}
