'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { Reveal } from '@/components/ui/reveal';
import { PlaceholderAsset } from '@/components/ui/placeholder-asset';
import { useLocale } from '@/components/providers/locale-provider';
import { motion } from 'framer-motion';

interface VersionEntry {
  version: string;
  date: string;
  changes: string[];
}

const versions: VersionEntry[] = [
  {
    version: '1.0.0',
    date: 'NEEDED: release date',
    changes: [
      'NEEDED: real changelog content — initial release',
      'NEEDED: real changelog content — feature list',
    ],
  },
  {
    version: '0.9.0',
    date: 'NEEDED: release date',
    changes: [
      'NEEDED: real changelog content — beta release',
    ],
  },
];

export function ChangelogPage() {
  const { t } = useLocale();

  return (
    <div className="px-4 pt-32 pb-24 sm:px-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <Reveal>
          <div className="mb-20 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gradient sm:text-5xl lg:text-6xl">
              {t('changelog.title')}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/55">
              {t('changelog.subtitle')}
            </p>
          </div>
        </Reveal>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical gradient line on the start side (left in LTR, right in RTL) */}
          <div
            className="absolute top-4 bottom-4 w-px"
            style={{
              insetInlineStart: '31px',
              background:
                'linear-gradient(to bottom, rgba(168,85,247,0.6) 0%, rgba(168,85,247,0.25) 40%, rgba(168,85,247,0.05) 80%, transparent 100%)',
            }}
            aria-hidden
          />

          <div className="space-y-10">
            {versions.map((entry, i) => {
              const isLatest = i === 0;

              return (
                <Reveal key={entry.version} delay={i * 0.12}>
                  <div
                    className="relative"
                    style={{ paddingInlineStart: '80px' }}
                  >
                    {/* Version badge node on the timeline */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{
                        type: 'spring',
                        stiffness: 220,
                        damping: 18,
                        mass: 0.9,
                        delay: i * 0.12 + 0.15,
                      }}
                      className="absolute flex flex-col items-center justify-center"
                      style={{ insetInlineStart: '0' }}
                    >
                      {/* Glowing ring around the badge for the latest version */}
                      {isLatest && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.12 + 0.3, duration: 0.6 }}
                          className="pointer-events-none absolute h-16 w-16 rounded-full"
                          style={{
                            boxShadow:
                              '0 0 0 1px rgba(168,85,247,0.35), 0 0 28px 6px rgba(168,85,247,0.25)',
                          }}
                          aria-hidden
                        />
                      )}

                      {/* The version badge */}
                      <div
                        className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md"
                      >
                        <span
                          className="text-base font-bold leading-none text-white"
                          style={{ textShadow: '0 1px 8px rgba(168,85,247,0.4)' }}
                        >
                          v{entry.version}
                        </span>
                      </div>

                      {/* Date below the badge */}
                      <span className="mt-2 text-[11px] font-medium uppercase tracking-wider text-white/40 whitespace-nowrap">
                        {entry.date}
                      </span>
                    </motion.div>

                    {/* Card */}
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    >
                      <GlassCard
                        hover
                        glow={isLatest}
                        className="overflow-hidden p-0"
                      >
                        {/* Screenshot placeholder */}
                        <div className="relative">
                          <PlaceholderAsset
                            name={`${t('placeholder.changelogScreenshot')} v${entry.version}`}
                            size="1200x675"
                            minHeight={180}
                            className="rounded-none border-0 border-b border-white/10"
                          />

                          {/* "Latest" pill overlaid on the screenshot */}
                          {isLatest && (
                            <span
                              className="absolute top-4 inline-flex items-center gap-1.5 rounded-full border border-purple-400/30 bg-purple-500/15 px-3 py-1 text-xs font-medium text-purple-200 backdrop-blur-md"
                              style={{ insetInlineEnd: '16px' }}
                            >
                              <span
                                className="h-1.5 w-1.5 rounded-full bg-purple-400"
                                style={{
                                  boxShadow: '0 0 8px 2px rgba(192,132,252,0.7)',
                                }}
                                aria-hidden
                              />
                              {t('changelog.title')}
                            </span>
                          )}
                        </div>

                        {/* Changes list */}
                        <div className="p-6 sm:p-8">
                          <ul className="space-y-3">
                            {entry.changes.map((change, j) => (
                              <motion.li
                                key={j}
                                initial={{ opacity: 0, x: -8 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{
                                  type: 'spring',
                                  stiffness: 260,
                                  damping: 24,
                                  delay: i * 0.12 + 0.25 + j * 0.08,
                                }}
                                className="flex items-start gap-3 text-sm leading-relaxed text-white/70"
                              >
                                <span
                                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-tazcal-primary"
                                  style={{
                                    boxShadow: '0 0 6px 1px rgba(168,85,247,0.5)',
                                  }}
                                  aria-hidden
                                />
                                <span style={{ maxInlineSize: '62ch' }}>
                                  {change}
                                </span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </GlassCard>
                    </motion.div>
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
