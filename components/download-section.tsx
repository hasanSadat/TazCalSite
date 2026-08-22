'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { Reveal } from '@/components/ui/reveal';
import { useLocale } from '@/components/providers/locale-provider';
import { Download, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface StoreConfig {
  key: string;
  name: string;
  descKey: string;
  available: boolean;
  icon: string;
  url: string;
}

function getStoresForLocale(locale: string): StoreConfig[] {
  if (locale === 'fa') {
    return [
      {
        key: 'myket',
        name: 'مایکت',
        descKey: 'download.myketDesc',
        available: true,
        icon: '/images/appsIcon/mayket.svg',
        url: 'https://myket.ir/app/com.tazcal.app',
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

export function DownloadSection() {
  const { t, locale } = useLocale();
  const stores = getStoresForLocale(locale);
const hasAvailableStore = stores.some(s => s.available);

  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <GlassCard glow className="p-10 text-center rounded-3xl relative overflow-hidden">
            {/* گرادینت پس‌زمینه */}
            <div className="absolute inset-0 bg-gradient-to-br from-tazcal-primary/5 via-transparent to-tazcal-secondary/5 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-tazcal-primary to-tazcal-secondary flex items-center justify-center shadow-lg glow-primary">
                  <Download className="w-8 h-8 text-white" />
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gradient sm:text-4xl">
                {t('home.download.title') || 'دانلود تزکال'}
              </h2>
              <p className="mx-auto mt-3 max-w-md text-white/55">
                {t('home.download.desc') || 'تزکال را روی دستگاه خود دریافت کنید.'}
              </p>

              {/* دکمه دانلود مستقیم (اگر استوری موجود باشد) */}
              {hasAvailableStore && (
                <div className="mt-6 flex justify-center">
                  <Link
                    href={stores.find(s => s.available)?.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-tazcal-primary to-tazcal-primary/80 px-8 py-3.5 text-base font-semibold text-white shadow-[0_0_30px_-4px_rgba(122,90,248,0.6)] transition-all hover:scale-[1.02] hover:shadow-[0_0_45px_-2px_rgba(122,90,248,0.85)] active:scale-[0.98]"
                  >
                    <Download className="w-5 h-5" />
                    {t('download.direct') || 'دانلود مستقیم'}
                  </Link>
                </div>
              )}

              {/* استورها */}
              <div className="mt-8 grid gap-4 grid-cols-2 items-center">
                {stores.map((store) => (
                  <Link
                    key={store.key}
                    href={store.available ? store.url : '#'}
                    target={store.available ? '_blank' : '_self'}
                    rel={store.available ? 'noopener noreferrer' : ''}
                    className={`block ${!store.available ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className={`glass rounded-2xl p-4 text-center transition-all hover:border-tazcal-primary/30 ${!store.available ? 'opacity-50 grayscale' : ''}`}>
                      <div className="flex justify-center mb-2">
                        <Image
                          src={store.icon}
                          alt={store.name}
                          width={48}
                          height={48}
                          className="object-contain"
                          unoptimized
                        />
                      </div>
                      <p className="text-sm font-medium text-white">{store.name}</p>
                      <p className="text-[10px] text-white/40 mt-0.5">
                        {store.available ? t('download.goToStore') + store.name || 'موجود' : t('common.comingSoon') || 'به‌زودی'}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* اطلاع‌رسانی iOS */}
              {locale !== 'fa' && (
                <div className="mt-6 text-sm text-white/40 flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-tazcal-primary" />
                  {t('download.iOSComingSoon') || 'نسخه iOS به‌زودی منتشر می‌شود.'}
                </div>
              )}
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}