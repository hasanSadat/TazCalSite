'use client';

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ type: 'spring', stiffness: 260, damping: 26, mass: 0.9, delay }}
    >
      {children}
    </motion.div>
  );
}
