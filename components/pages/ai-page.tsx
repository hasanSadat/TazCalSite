'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { Reveal } from '@/components/ui/reveal';
import { useLocale } from '@/components/providers/locale-provider';
import { Brain, Calendar, Sparkles, MessageSquare, Play, ChevronDown } from 'lucide-react';

interface AiFeature {
  icon: typeof Brain;
  titleKey: string;
  descriptionKey: string;
  futureNoteKey?: string;
}

const aiFeatures: AiFeature[] = [
  {
    icon: Brain,
    titleKey: 'ai.aiFood.title',
    descriptionKey: 'ai.aiFood.desc',
  },
  {
    icon: Calendar,
    titleKey: 'ai.aiPlanner.title',
    descriptionKey: 'ai.aiPlanner.desc',
  },
  {
    icon: Sparkles,
    titleKey: 'ai.aiCoach.title',
    futureNoteKey: 'ai.aiCoach.note',
    descriptionKey: 'ai.aiCoach.desc',
  },
];

const aiFaqs = [
  { qKey: 'ai.faq1q', aKey: 'ai.faq1a' },
  { qKey: 'ai.faq2q', aKey: 'ai.faq2a' },
  { qKey: 'ai.faq3q', aKey: 'ai.faq3a' },
];

export const chatMessages = [
  { role: 'user', text: 'ai.chat.user1' },
  { role: 'ai', text: 'ai.chat.ai1' },
  { role: 'user', text: 'ai.chat.user2' },
  { role: 'ai', text: 'ai.chat.ai2' },
];

export function AIPage() {
  const { t } = useLocale();

  return (
    <div className="px-4 pt-32 pb-24 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-tazcal-primary">
              <Sparkles className="h-3.5 w-3.5" />
              {t('ai.badge')}
            </div>
            <h1 className="text-4xl font-bold text-gradient sm:text-5xl lg:text-6xl">
              {t('ai.title')}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/55">
              {t('ai.subtitle')}
            </p>
          </div>
        </Reveal>

        {/* AI Features */}
        <div className="space-y-6">
          {aiFeatures.map((feature, i) => (
            <Reveal key={feature.titleKey} delay={i * 0.1}>
              <GlassCard hover className="p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-tazcal-primary/15 text-tazcal-primary">
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold text-white">{t(feature.titleKey)}</h2>
                      {feature.futureNoteKey && (
                        <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/50">
                          {t('roadmap.title')}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">{t(feature.descriptionKey)}</p>
                    {feature.futureNoteKey && (
                      <p className="mt-2 text-xs italic text-white/40">{t(feature.futureNoteKey)}</p>
                    )}
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        {/* Chat Demo */}
        <Reveal>
          <div className="mt-16">
            <h2 className="mb-6 text-center text-2xl font-bold text-white">{t('ai.demoTitle')}</h2>
            <GlassCard glow className="p-6">
              <div className="space-y-4">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                      msg.role === 'user'
                        ? 'rounded-br-sm bg-tazcal-primary text-white'
                        : 'rounded-bl-sm glass text-white/80'
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        {msg.role === 'ai' && <MessageSquare className="h-3 w-3 text-tazcal-primary" />}
                        <span className="text-xs font-medium text-white/50">{msg.role === 'user' ? t('ai.chatUser') : t('ai.chatAI')}</span>
                      </div>
                      <p className="whitespace-pre-line">{t(msg.text)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </Reveal>

        {/* Video placeholder */}
        {/* <Reveal>
          <div className="mt-12">
            <PlaceholderAsset name={t('placeholder.demoVideo')} size="1200x675" minHeight={300} className="w-full" />
          </div>
        </Reveal> */}

        {/* AI FAQ */}
        <Reveal>
          <div className="mt-16">
            <h2 className="mb-6 text-center text-2xl font-bold text-white">{t('ai.faqTitle')}</h2>
            <div className="space-y-3">
              {aiFaqs.map((faq, i) => (
                <details key={i} className="group glass rounded-2xl overflow-hidden">
                  <summary className="flex cursor-pointer items-center justify-between p-5 text-base font-medium text-white list-none">
                    {t(faq.qKey)}
                    <ChevronDown className="h-5 w-5 text-white/50 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-5 pb-5 text-sm leading-relaxed text-white/60">{t(faq.aKey)}</div>
                </details>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
