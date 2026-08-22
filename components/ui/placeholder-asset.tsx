'use client';

import { ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PlaceholderAssetProps {
  name: string;
  size?: string;
  className?: string;
  minHeight?: number;
}

export function PlaceholderAsset({ name, size, className, minHeight = 200 }: PlaceholderAssetProps) {
  return (
    <div
      className={cn('placeholder-asset', className)}
      data-needed={name}
      data-size={size}
      style={{ minHeight }}
    >
      <ImageIcon className="w-8 h-8 opacity-50" aria-hidden="true" />
      <span className="font-medium">NEEDED: {name}</span>
      {size && <span className="text-xs opacity-70">Recommended size: {size}</span>}
    </div>
  );
}
