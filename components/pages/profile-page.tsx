'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { Reveal } from '@/components/ui/reveal';
import { useLocale } from '@/components/providers/locale-provider';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { LogOut, Globe, ChevronDown, Check, RefreshCw, Smartphone } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { languages } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import type { ProfileRow } from '@/lib/supabase/types';

interface ProfilePageProps {
  profile: ProfileRow;
  email: string;
}

export function ProfilePage({ profile, email }: ProfilePageProps) {
  const { t, locale, setLocale } = useLocale();
  const router = useRouter();
  const [langOpen, setLangOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const displayName = profile.full_name || profile.username || 'User';
  const userRole = profile.role === 'admin' ? 'Admin' : t('profile.free');

  return (
    <div className="px-4 pt-32 pb-24 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <GlassCard glow className="p-8">
            {/* Header */}
            <div className="flex flex-col items-center text-center sm:flex-row sm:text-start gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-tazcal-primary to-tazcal-secondary text-2xl font-bold text-white shadow-[0_0_30px_-4px_rgba(122,90,248,0.5)]">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-bold text-white">{displayName}</h1>
                <p className="mt-1 text-sm text-white/55">{email}</p>
                <p className="mt-1 text-xs text-white/40">
                  {t('profile.plan')}: {userRole}
                </p>
                {profile.preferred_language && (
                  <p className="mt-1 text-xs text-white/40">
                    {t('profile.language')}: {languages.find((l) => l.code === profile.preferred_language)?.name || profile.preferred_language}
                  </p>
                )}
              </div>
            </div>
          </GlassCard>
        </Reveal>

        {/* Settings */}
        <Reveal delay={0.1}>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {/* Sync status */}
            <GlassCard className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <RefreshCw className="h-4 w-4 text-tazcal-success" />
                <h3 className="text-sm font-semibold text-white">{t('profile.syncStatus')}</h3>
              </div>
              <p className="text-xs text-white/55">{t('profile.synced')}</p>
            </GlassCard>

            {/* Connected devices */}
            <GlassCard className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="h-4 w-4 text-tazcal-primary" />
                <h3 className="text-sm font-semibold text-white">{t('profile.connectedDevices')}</h3>
              </div>
              <p className="text-xs text-white/55">{t('profile.noDevices')}</p>
            </GlassCard>
          </div>
        </Reveal>

        {/* Preferences — Language */}
        <Reveal delay={0.15}>
          <GlassCard className="mt-6 p-6">
            <h3 className="mb-4 text-sm font-semibold text-white">{t('profile.preferences')}</h3>

            <div>
              <label className="mb-2 block text-xs text-white/50">{t('profile.language')}</label>
              <div className="relative" ref={ref}>
                <button
                  onClick={() => setLangOpen((v) => !v)}
                  className="flex w-full items-center justify-between rounded-xl glass px-4 py-2.5 text-sm text-white"
                >
                  <span className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-white/50" />
                    {languages.find((l) => l.code === locale)?.name}
                  </span>
                  <ChevronDown className={cn('h-4 w-4 text-white/50 transition-transform', langOpen && 'rotate-180')} />
                </button>
                {langOpen && (
                  <div className="absolute top-full mt-1 z-10 w-full glass rounded-xl p-1.5">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLocale(lang.code);
                          setLangOpen(false);
                        }}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-white/65 hover:bg-white/10 hover:text-white transition-colors"
                      >
                        {lang.name}
                        {locale === lang.code && <Check className="h-4 w-4 text-tazcal-primary" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </GlassCard>
        </Reveal>

        {/* Logout */}
        <Reveal delay={0.2}>
          <div className="mt-6 text-center">
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-2xl glass glass-hover px-6 py-3 text-sm font-medium text-white/65 hover:text-tazcal-danger transition-colors"
            >
              <LogOut className="h-4 w-4" />
              {t('profile.logout')}
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
