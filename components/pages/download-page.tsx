'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { PlaceholderAsset } from '@/components/ui/placeholder-asset';
import { Reveal } from '@/components/ui/reveal';
import { useLocale } from '@/components/providers/locale-provider';
import { Download, X, Check, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

type StoreKey = 'googlePlay' | 'myket' | 'cafeBazaar' | 'appStore' | 'ruStore';


interface StoreConfig {
  key: StoreKey;
  descKey: string;
  available: boolean;
  icon: string;      // ← اضافه شد
  url: string;       // ← اضافه شد
  name: string;      // ← اضافه شد (برای نمایش نام استور)
}

/**
 * Region-specific store lists. The locale detected by `useLocale` decides which
 * set of stores is shown beneath the always-prominent Direct Download button.
 *   - fa (Persian): Myket + Cafe Bazaar
 *   - ru (Russian): RuStore
 *   - all others:   Google Play + Apple App Store (App Store flagged "Coming Soon")
 */
// app/download/page.tsx (فقط بخش‌های تغییر کرده)


function getStoresForLocale(locale: string): StoreConfig[] {
  if (locale === 'fa') {
    return [
      {
        key: 'myket',
        name: 'مایکت',
        descKey: 'download.myketDesc',
        available: true,
        icon: '/images/appsIcon/mayket.svg',
        url: 'https://myket.ir/app/com.tazcal.app', // لینک واقعی مایکت
      },
      {
        key: 'cafeBazaar',
        name: 'کافه‌بازار',
        descKey: 'download.cafeBazaarDesc',
        available: false,
        icon: '/images/appsIcon/CafeBazaar.svg',
        url: '#',
      },
    ];
  }
  if (locale === 'ru') {
    return [
      {
        key: 'ruStore',
        name: 'RuStore',
        descKey: 'download.ruStoreDesc',
        available: false,
        icon: '/images/appsIcon/rustore.svg',
        url: '#',
      },
    ];
  }
  return [
    {
      key: 'googlePlay',
      name: 'Google Play',
      descKey: 'download.googlePlayDesc',
      available: false,
      icon: '/images/appsIcon/googlePlay.svg',
      url: '#',
    },
    {
      key: 'appStore',
      name: 'App Store',
      descKey: 'download.appStoreDesc',
      available: false,
      icon: '/images/appsIcon/appStore.svg',
      url: '#',
    },
  ];
}

export function DownloadPage() {
  const { t, locale } = useLocale();
  const [showRequest, setShowRequest] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const stores = getStoresForLocale(locale);

  // Persian and Russian have native stores available; only show the
  // "Coming Soon" notice + Request App button for other locales.
  const showComingSoonNotice = locale !== 'fa' ;

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const closeModal = () => {
    setShowRequest(false);
    setSubmitted(false);
    setEmail('');
    setMessage('');
  };

  return (
    <div className="px-4 pt-32 pb-24 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="mb-16 text-center">
            <h1 className="text-4xl font-bold text-gradient sm:text-5xl lg:text-6xl">
              {t('download.title')}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/55">{t('download.desc')}</p>
          </div>
        </Reveal>

        {/* ──────────────────────────────────────────────────────────────
            Direct Download — always the most prominent button at the top.
            Large, primary gradient, glow, and a subtle hover lift.
        ────────────────────────────────────────────────────────────── */}
        {/* <Reveal>
          <div className="relative mb-14 overflow-hidden rounded-3xl">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-tazcal-primary/20 via-tazcal-primary/5 to-transparent" />
            <div className="relative border border-white/10 bg-white/[0.03] p-10 text-center backdrop-blur-xl sm:p-14">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-tazcal-primary to-tazcal-primary/60 text-white shadow-[0_0_40px_-8px_rgba(122,90,248,0.6)]">
                <Download className="h-10 w-10" />
              </div>
              <h2 className="text-3xl font-bold text-gradient sm:text-4xl">{t('download.direct')}</h2>
              <p className="mx-auto mt-3 max-w-md text-base text-white/55">
                {t('download.directDesc')}
              </p>
              <a href="#" className="mt-8 inline-block" download>
                <button className="group inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-tazcal-primary to-tazcal-primary/80 px-10 py-4 text-base font-semibold text-white shadow-[0_0_30px_-4px_rgba(122,90,248,0.6)] transition-all hover:scale-[1.03] hover:shadow-[0_0_45px_-2px_rgba(122,90,248,0.85)] active:scale-[0.98]">
                  <Download className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
                  {t('download.direct')}
                </button>
              </a>
            </div>
          </div>
        </Reveal> */}

        {/* ──────────────────────────────────────────────────────────────
            "Coming Soon" notice + Request App button.
            Only shown for locales without native stores (i.e. not fa/ru).
        ────────────────────────────────────────────────────────────── */}
        {showComingSoonNotice && (
          <Reveal>
            <div className="mb-14 flex flex-col items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-start">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-tazcal-primary/15 px-3 py-1 text-xs font-semibold text-tazcal-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  {t('common.comingSoon')}
                </span>
                <p className="text-sm text-white/60">{t('download.requestAppDesc')}</p>
              </div>
              <button
                onClick={() => setShowRequest(true)}
                className="shrink-0 rounded-2xl glass glass-hover px-6 py-3 text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                {t('download.requestApp')}
              </button>
            </div>
          </Reveal>
        )}

        {/* ──────────────────────────────────────────────────────────────
            Region-specific stores
        ────────────────────────────────────────────────────────────── */}
        <Reveal>
          <div className="mb-6 text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-white/40">
              {t('download.stores')}
            </p>
          </div>
        </Reveal>

<div className="grid gap-6 sm:grid-cols-2">
  {stores.map((store, i) => (
    <Reveal key={store.key} delay={i * 0.05}>
      <Link
        href={store.available ? store.url : '#'}
        target={store.available ? '_blank' : '_self'}
        rel={store.available ? 'noopener noreferrer' : ''}
        className={`block ${!store.available ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <GlassCard hover className="relative flex flex-col items-center p-8 text-center">
          {!store.available && (
            <span className="absolute end-4 top-4 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/60">
              {t('common.comingSoon')}
            </span>
          )}

          {/* ===== جایگزین PlaceholderAsset با Image ===== */}
          <div className="mb-4 flex h-20 w-full items-center justify-center">
            {store.available ? (
              <Image
                src={store.icon}
                alt={store.name}
                width={80}
                height={80}
                className="object-contain transition-transform duration-200 hover:scale-105"
                unoptimized // چون آیکون‌ها SVG هستن
              />
            ) : (
              <div className="opacity-40 grayscale">
                <Image
                  src={store.icon}
                  alt={store.name}
                  width={80}
                  height={80}
                  className="object-contain"
                  unoptimized
                />
              </div>
            )}
          </div>
          {/* =========================================== */}

          <h2 className="text-xl font-semibold text-white">{store.name}</h2>
          <p className="mt-2 text-sm text-white/55">{t(store.descKey)}</p>

          {/* دکمه اقدام (اختیاری) */}
          {store.available && (
            <span className="mt-4 inline-block rounded-full bg-tazcal-primary/20 px-4 py-1.5 text-xs font-medium text-tazcal-primary">
              {t('download.goToStore')} {store.name}
            </span>
          )}
        </GlassCard>
      </Link>
    </Reveal>
  ))}
</div>
      </div>

      {/* ──────────────────────────────────────────────────────────────
          Request App Modal — animated with AnimatePresence
      ────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showRequest && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="w-full max-w-md rounded-3xl glass p-8"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-8 text-center"
                  >
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-tazcal-success/15 text-tazcal-success">
                      <Check className="h-7 w-7" />
                    </div>
                    <p className="text-lg font-medium text-white">{t('download.requestAppSuccess')}</p>
                    <button
                      onClick={closeModal}
                      className="mt-6 rounded-xl glass glass-hover px-6 py-2.5 text-sm font-medium text-white/70 hover:text-white transition-colors"
                    >
                      {t('common.close')}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-xl font-bold text-white">{t('download.requestAppTitle')}</h2>
                      <button
                        onClick={closeModal}
                        className="rounded-lg p-1 text-white/40 transition-colors hover:text-white"
                        aria-label={t('common.close')}
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="mb-6 text-sm text-white/55">{t('download.requestAppDesc')}</p>
                    <form onSubmit={handleRequestSubmit} className="space-y-4">
                      <div>
                        <label
                          htmlFor="request-email"
                          className="mb-1.5 block text-sm font-medium text-white/70"
                        >
                          {t('common.email')}
                        </label>
                        <input
                          id="request-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full rounded-xl glass px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-tazcal-primary"
                          placeholder="you@example.com"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="request-message"
                          className="mb-1.5 block text-sm font-medium text-white/70"
                        >
                          {t('common.message')}{' '}
                          <span className="text-white/35">({t('common.optional')})</span>
                        </label>
                        <textarea
                          id="request-message"
                          rows={3}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full resize-none rounded-xl glass px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-tazcal-primary"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full rounded-2xl bg-gradient-to-r from-tazcal-primary to-tazcal-primary/80 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_-4px_rgba(122,90,248,0.5)] transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_-2px_rgba(122,90,248,0.7)] active:scale-[0.98]"
                      >
                        {t('common.submit')}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
