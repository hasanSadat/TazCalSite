'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { PrimaryButton } from '@/components/ui/buttons';
import { Reveal } from '@/components/ui/reveal';
import { useLocale } from '@/components/providers/locale-provider';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Mail, Loader2 } from 'lucide-react';

export function LoginPage() {
  const { t } = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || '/';

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = createClient();

      if (mode === 'login') {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });

        if (signInError) {
          setError(signInError.message);
          setLoading(false);
          return;
        }

        router.push(redirectTarget);
        router.refresh();
      } else {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            data: { full_name: form.name },
          },
        });

        if (signUpError) {
          setError(signUpError.message);
          setLoading(false);
          return;
        }

        if (data.user) {
          router.push(redirectTarget);
          router.refresh();
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

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
            {/* Email form */}
            <form onSubmit={handleSubmit} className="space-y-3">
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
                  required
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
                  required
                  minLength={6}
                />
              </div>

              {error && (
                <div className="rounded-xl bg-tazcal-danger/10 px-4 py-3 text-sm text-tazcal-danger">
                  {error}
                </div>
              )}

              <PrimaryButton type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Mail className="h-4 w-4" />
                )}
                {mode === 'login' ? t('login.signIn') : t('login.signUp')}
              </PrimaryButton>
            </form>

            {/* Toggle */}
            <div className="mt-6 text-center text-sm text-white/55">
              {mode === 'login' ? `${t('login.noAccount')} ` : `${t('login.haveAccount')} `}
              <button
                onClick={() => {
                  setMode(mode === 'login' ? 'register' : 'login');
                  setError(null);
                }}
                className="font-medium text-tazcal-primary hover:underline"
              >
                {mode === 'login' ? t('login.signUpLink') : t('login.signInLink')}
              </button>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </div>
  );
}
