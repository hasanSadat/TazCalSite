'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { PrimaryButton } from '@/components/ui/buttons';
import { Reveal } from '@/components/ui/reveal';
import { useLocale } from '@/components/providers/locale-provider';
import { useState } from 'react';
import { ArrowBigUp, Send, Flame, Sparkles, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureRequest {
  id: number;
  title: string;
  description: string;
  category: string;
  votes: number;
  voted: boolean;
}

const initialRequests: FeatureRequest[] = [
  { id: 1, title: 'NEEDED: example feature request', description: 'NEEDED: example description', category: 'AI', votes: 42, voted: false },
  { id: 2, title: 'NEEDED: example feature request', description: 'NEEDED: example description', category: 'Analytics', votes: 28, voted: false },
  { id: 3, title: 'NEEDED: example feature request', description: 'NEEDED: example description', category: 'Planner', votes: 15, voted: false },
];

export function FeatureRequestsPage() {
  const { t } = useLocale();
  const [requests, setRequests] = useState<FeatureRequest[]>(initialRequests);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sortBy, setSortBy] = useState<'votes' | 'newest'>('votes');
  const [form, setForm] = useState({ title: '', description: '', category: '' });

  const handleVote = (id: number) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, votes: r.voted ? r.votes - 1 : r.votes + 1, voted: !r.voted } : r
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq: FeatureRequest = {
      id: Date.now(),
      title: form.title,
      description: form.description,
      category: form.category || 'General',
      votes: 1,
      voted: true,
    };
    setRequests((prev) => [newReq, ...prev]);
    setForm({ title: '', description: '', category: '' });
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setShowForm(false); }, 2000);
  };

  const sorted = [...requests].sort((a, b) =>
    sortBy === 'votes' ? b.votes - a.votes : b.id - a.id
  );

  return (
    <div className="px-4 pt-32 pb-24 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gradient sm:text-5xl">{t('featureRequests.title')}</h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/55">{t('featureRequests.subtitle')}</p>
          </div>
        </Reveal>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('votes')}
              className={cn(
                'rounded-xl px-4 py-2 text-sm font-medium transition-colors',
                sortBy === 'votes' ? 'bg-tazcal-primary/20 text-white' : 'glass text-white/55 hover:text-white'
              )}
            >
              <Flame className="me-1.5 inline h-4 w-4" />
              {t('featureRequests.sortByVotes')}
            </button>
            <button
              onClick={() => setSortBy('newest')}
              className={cn(
                'rounded-xl px-4 py-2 text-sm font-medium transition-colors',
                sortBy === 'newest' ? 'bg-tazcal-primary/20 text-white' : 'glass text-white/55 hover:text-white'
              )}
            >
              <Sparkles className="me-1.5 inline h-4 w-4" />
              {t('featureRequests.sortByNewest')}
            </button>
          </div>
          <PrimaryButton onClick={() => setShowForm((v) => !v)} className="text-sm">
            <Send className="h-4 w-4" />
            {t('featureRequests.submit')}
          </PrimaryButton>
        </div>

        {showForm && (
          <Reveal>
            <GlassCard glow className="mb-8 p-6">
              {submitted ? (
                <div className="py-8 text-center">
                  <Check className="mx-auto mb-3 h-8 w-8 text-tazcal-success" />
                  <p className="text-lg font-medium text-white">{t('featureRequests.submit')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-white/70">{t('featureRequests.titleField')}</label>
                    <input
                      type="text"
                      required
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="w-full rounded-xl glass px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-tazcal-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-white/70">{t('featureRequests.descField')}</label>
                    <textarea
                      required
                      rows={3}
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      className="w-full rounded-xl glass px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-tazcal-primary resize-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-white/70">{t('featureRequests.categoryField')}</label>
                    <input
                      type="text"
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full rounded-xl glass px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-tazcal-primary"
                    />
                  </div>
                  <div className="flex gap-3">
                    <PrimaryButton type="submit" className="text-sm">{t('featureRequests.submitCta')}</PrimaryButton>
                    <button type="button" onClick={() => setShowForm(false)} className="rounded-[18px] glass glass-hover px-6 py-3 text-sm font-medium text-white/65">
                      {t('common.cancel')}
                    </button>
                  </div>
                </form>
              )}
            </GlassCard>
          </Reveal>
        )}

        {sorted.length === 0 ? (
          <Reveal>
            <GlassCard className="p-12 text-center">
              <p className="text-white/55">{t('featureRequests.empty')}</p>
            </GlassCard>
          </Reveal>
        ) : (
          <div className="space-y-4">
            {sorted.map((req, i) => (
              <Reveal key={req.id} delay={i * 0.05}>
                <GlassCard hover className="flex items-start gap-4 p-5">
                  <button
                    onClick={() => handleVote(req.id)}
                    className={cn(
                      'flex flex-col items-center gap-1 rounded-xl px-3 py-2 transition-all shrink-0',
                      req.voted ? 'bg-tazcal-primary/20 text-tazcal-primary' : 'glass text-white/55 hover:text-white'
                    )}
                    aria-label={t('featureRequests.upvote')}
                  >
                    <ArrowBigUp className="h-5 w-5" />
                    <span className="text-sm font-bold">{req.votes}</span>
                  </button>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-white">{req.title}</h3>
                    <p className="mt-1 text-sm text-white/55">{req.description}</p>
                    <span className="mt-2 inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/50">{req.category}</span>
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        )}

        <p className="mt-8 text-center text-xs text-white/30">{t('featureRequests.placeholder')}</p>
      </div>
    </div>
  );
}
