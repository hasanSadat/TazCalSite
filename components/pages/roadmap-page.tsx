'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { Reveal } from '@/components/ui/reveal';
import { useLocale } from '@/components/providers/locale-provider';
import { motion } from 'framer-motion';

type RoadmapStatus = 'inProgress' | 'planned';

interface RoadmapItem {
  emoji: string;
  titleKey: string;
  descriptionKey: string;
  status: RoadmapStatus;
}

const roadmapItems: RoadmapItem[] = [
  {
    emoji: '🚀',
    titleKey: 'roadmap.googlePlay',
    descriptionKey: 'roadmap.googlePlayDesc',
    status: 'inProgress',
  },
  {
    emoji: '📅',
    titleKey: 'roadmap.appStore',
    descriptionKey: 'roadmap.appStoreDesc',
    status: 'planned',
  },
  {
    emoji: '🥗',
    titleKey: 'roadmap.nutritionPlans',
    descriptionKey: 'roadmap.nutritionPlansDesc',
    status: 'planned',
  },
  {
    emoji: '🧠',
    titleKey: 'roadmap.habitAnalysis',
    descriptionKey: 'roadmap.habitAnalysisDesc',
    status: 'planned',
  },
];

const statusLabelKey: Record<RoadmapStatus, string> = {
  inProgress: 'roadmap.inProgress',
  planned: 'roadmap.planned',
};

export function RoadmapPage() {
  const { t } = useLocale();

  return (
    <div className="px-4 pt-32 pb-24 sm:px-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <Reveal>
          <div className="mb-20 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gradient sm:text-5xl lg:text-6xl">
              {t('roadmap.title')}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/55">
              {t('roadmap.subtitle')}
            </p>
          </div>
        </Reveal>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line on the start side (left in LTR, right in RTL) */}
          <div
            className="absolute top-2 bottom-2 w-px bg-gradient-to-b from-white/0 via-white/15 to-white/0"
            style={{ insetInlineStart: '28px' }}
            aria-hidden
          />

          <div className="space-y-8">
            {roadmapItems.map((item, i) => {
              const isInProgress = item.status === 'inProgress';

              return (
                <Reveal key={item.titleKey} delay={i * 0.12}>
                  <div
                    className="relative"
                    style={{ paddingInlineStart: '72px' }}
                  >
                    {/* Node + emoji icon on the start side of the line */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 20,
                        mass: 0.8,
                        delay: i * 0.12 + 0.15,
                      }}
                      className="absolute flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl backdrop-blur-md"
                      style={{ insetInlineStart: '0' }}
                    >
                      <span aria-hidden>{item.emoji}</span>
                      {isInProgress && (
                        <span
                          className="pointer-events-none absolute inset-0 rounded-2xl"
                          style={{
                            boxShadow:
                              '0 0 0 1px rgba(168,85,247,0.35), 0 0 24px 4px rgba(168,85,247,0.25)',
                          }}
                          aria-hidden
                        />
                      )}
                    </motion.div>

                    {/* Card */}
                    <GlassCard
                      hover
                      glow={isInProgress}
                      className="flex-1 p-6"
                    >
                      {/* Status badge */}
                      <div className="mb-3">
                        <span
                          className={
                            isInProgress
                              ? // In Progress — purple glow
                                'inline-flex items-center gap-1.5 rounded-full border border-purple-400/30 bg-purple-500/15 px-3 py-1 text-xs font-medium text-purple-200'
                              : // Planned — softer style
                                'inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/55'
                          }
                        >
                          {isInProgress && (
                            <span
                              className="h-1.5 w-1.5 rounded-full bg-purple-400"
                              style={{
                                boxShadow: '0 0 8px 2px rgba(192,132,252,0.7)',
                              }}
                              aria-hidden
                            />
                          )}
                          {t(statusLabelKey[item.status])}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-lg font-semibold text-white sm:text-xl">
                        {t(item.titleKey)}
                      </h2>

                      {/* Description */}
                      <p
                        className="mt-2 text-sm leading-relaxed text-white/55"
                        style={{ maxInlineSize: '60ch' }}
                      >
                        {t(item.descriptionKey)}
                      </p>
                    </GlassCard>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
