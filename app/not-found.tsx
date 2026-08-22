'use client';

import Link from 'next/link';
import { GlassCard } from '@/components/ui/glass-card';
import { PrimaryButton } from '@/components/ui/buttons';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { useLocale } from '@/components/providers/locale-provider';

export default function NotFound() {
  const { t } = useLocale();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26, mass: 0.9 }}
        >
          <div className="relative mx-auto mb-8 h-40 w-40">
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="h-32 w-32 rounded-full bg-gradient-to-br from-tazcal-primary/30 to-tazcal-secondary/20 blur-xl" />
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="glass glass-glow flex h-24 w-24 items-center justify-center rounded-full">
                <span className="text-3xl font-bold text-gradient">404</span>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gradient sm:text-4xl">{t('notFound.title')}</h1>
          <p className="mx-auto mt-3 max-w-sm text-sm text-white/55">{t('notFound.desc')}</p>

          <Link href="/" className="mt-8 inline-block">
            <PrimaryButton>
              <Home className="h-4 w-4" />
              {t('notFound.backHome')}
            </PrimaryButton>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
