'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { PrimaryButton } from '@/components/ui/buttons';
import { Reveal } from '@/components/ui/reveal';
import { useLocale } from '@/components/providers/locale-provider';
import { useState } from 'react';
import { Mail, Apple } from 'lucide-react';

export function LoginPage() {
  const { t } = useLocale();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [form, setForm] = useState({ email: '', password: '', name: '' });

  return (
    <div className="flex min-h-screen items-center justify-center px-4 pt-32 pb-24">
      <div className="w-full max-w-md">
        <Reveal>
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-tazcal-primary font-bold text-white glow-primary text-2xl">
              T
            </div>
            <h1 className="text-3xl font-bold text-gradient">
              {mode === 'login' ? t('login.welcomeBack') : t('login.createAccount')}
            </h1>
            <p className="mt-2 text-sm text-white/55">
              {mode === 'login' ? t('login.signInSubtitle') : t('login.signUpSubtitle')}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <GlassCard glow className="p-8">
            {/* Google */}
            <button className="w-full rounded-2xl glass glass-hover px-4 py-3 text-sm font-medium text-white flex items-center justify-center gap-2 mb-3">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {t('login.continueGoogle')}
            </button>

            {/* Apple */}
            <button disabled className="w-full rounded-2xl glass px-4 py-3 text-sm font-medium text-white/40 flex items-center justify-center gap-2 mb-3 cursor-not-allowed">
              <Apple className="h-5 w-5" />
              {t('login.continueApple')}
              <span className="ml-1 text-xs text-white/30">— {t('common.comingSoon')}</span>
            </button>

            {/* Divider */}
            <div className="my-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-white/40">{t('login.or')}</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Email form */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
              {mode === 'register' && (
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-white/70">{t('common.name')}</label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl glass px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-tazcal-primary"
                    placeholder={t('common.name')}
                  />
                </div>
              )}
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-white/70">{t('common.email')}</label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl glass px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-tazcal-primary"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-white/70">{t('common.password')}</label>
                <input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full rounded-xl glass px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-tazcal-primary"
                  placeholder="••••••••"
                />
              </div>
              <PrimaryButton type="submit" className="w-full">
                <Mail className="h-4 w-4" />
                {mode === 'login' ? t('login.signIn') : t('login.signUp')}
              </PrimaryButton>
            </form>

            {/* Toggle */}
            <div className="mt-6 text-center text-sm text-white/55">
              {mode === 'login' ? `${t('login.noAccount')} ` : `${t('login.haveAccount')} `}
              <button
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="font-medium text-tazcal-primary hover:underline"
              >
                {mode === 'login' ? t('login.signUpLink') : t('login.signInLink')}
              </button>
            </div>
          </GlassCard>
        </Reveal>

        <p className="mt-4 text-center text-xs text-white/30">
          {t('login.placeholder')}
        </p>
      </div>
    </div>
  );
}
