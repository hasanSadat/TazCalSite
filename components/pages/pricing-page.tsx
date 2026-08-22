'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { useLocale } from '@/components/providers/locale-provider';
import { Check, X, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface PlanFeature {
  labelKey: string;
  free: boolean | string;
  pro: boolean | string;
  badgeKey?: string;
}

const features: PlanFeature[] = [
  { labelKey: 'features.dynamicCalories.p1', free: true, pro: true, badgeKey: 'features.dynamicCalories.badge' },
  { labelKey: 'features.aiFood.p1', free: 'limited', pro: 'unlimited' },
  { labelKey: 'features.foodTracking.p1', free: 'basic', pro: 'full' },
  { labelKey: 'features.aiPlanner.p1', free: false, pro: true },
  { labelKey: 'features.planner.p1', free: true, pro: true },
  { labelKey: 'features.habits.p1', free: 'basic', pro: 'full' },
  { labelKey: 'features.goals.p1', free: 'limited', pro: 'unlimited' },
  { labelKey: 'features.journal.p1', free: true, pro: true },
  { labelKey: 'features.analytics.p1', free: 'basic', pro: 'full' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 220,
      damping: 24,
      mass: 0.9,
      delay: 0.1 + i * 0.12,
    },
  }),
};

const tableVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 220, damping: 26, delay: 0.5 },
  },
};

export function PricingPage() {
  const { t } = useLocale();

  // NEEDED: pricing amounts — placeholders for now
  const monthlyPrice: string | null = null as string | null; // NEEDED: monthly price
  const yearlyPrice: string | null = null as string | null; // NEEDED: yearly price
  const showDiscount = monthlyPrice !== null && yearlyPrice !== null;

  // Auto-calculate yearly discount when both prices exist
  let discountPct: number | null = null;
  if (showDiscount) {
    const m = parseFloat(monthlyPrice!.replace(/[^0-9.]/g, ''));
    const y = parseFloat(yearlyPrice!.replace(/[^0-9.]/g, ''));
    if (!isNaN(m) && !isNaN(y) && m > 0) {
      const yearlyEquivalent = m * 12;
      discountPct = Math.round((1 - y / yearlyEquivalent) * 100);
    }
  }

  const renderCell = (value: boolean | string, isPro: boolean) => {
    if (value === true) {
      return <Check className="mx-auto h-5 w-5 text-tazcal-success" />;
    }
    if (value === false) {
      return <X className="mx-auto h-5 w-4 text-white/20" />;
    }
    // string value — translate limited/basic/full/unlimited
    const key = `pricing.tier.${value}`;
    const translated = t(key);
    return (
      <span
        className={
          isPro
            ? 'text-sm font-semibold text-white'
            : 'text-sm font-medium text-white/60'
        }
      >
        {translated === key ? value : translated}
      </span>
    );
  };

  return (
    <div className="px-4 pt-32 pb-24 sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26, delay: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-5xl font-bold tracking-tight text-gradient sm:text-6xl lg:text-7xl">
            {t('pricing.title')}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/55 sm:text-xl">
            {t('pricing.subtitle')}
          </p>
        </motion.div>

        {/* Price cards — 3 plans, horizontal, equal width */}
        <div className="mb-16 grid items-stretch gap-6 md:grid-cols-3">
          {/* Free */}
          <motion.div custom={0} variants={cardVariants} initial="hidden" animate="visible" className="h-full">
            <GlassCard
              hover
              className="flex h-full flex-col p-8 transition-transform duration-300 hover:-translate-y-1.5"
            >
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {t('pricing.free')}
              </h2>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
                  {t('pricing.free.price')}
                </span>
                <span className="text-base font-normal text-white/50">
                  {t('pricing.free.perMonth')}
                </span>
              </div>
              <p className="mt-3 text-sm text-white/50 sm:text-base">
                {t('pricing.free.desc')}
              </p>
              <div className="mt-auto pt-8">
                <a href="/download" className="block">
                  <button className="w-full rounded-2xl glass glass-hover px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98]">
                    {t('pricing.free.cta')}
                  </button>
                </a>
              </div>
            </GlassCard>
          </motion.div>

          {/* Monthly */}
          <motion.div custom={1} variants={cardVariants} initial="hidden" animate="visible" className="h-full">
            <GlassCard
              hover
              className="flex h-full flex-col p-8 transition-transform duration-300 hover:-translate-y-1.5"
            >
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {t('pricing.monthly')}
              </h2>
              <div className="mt-5 flex items-baseline gap-1">
                {monthlyPrice !== null ? (
                  <>
                    <span className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
                      {monthlyPrice}
                    </span>
                    <span className="text-base font-normal text-white/50">
                      {t('pricing.free.perMonth')}
                    </span>
                  </>
                ) : (
                  <span className="text-5xl font-bold tracking-tight text-white/40 sm:text-6xl">
                    NEEDED
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm text-white/50 sm:text-base">
                {t('pricing.monthly.desc')}
              </p>
              <div className="mt-auto pt-8">
                <a href="/download" className="block">
                  <button className="w-full rounded-2xl glass glass-hover px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98]">
                    {t('pricing.monthly.cta')}
                  </button>
                </a>
              </div>
            </GlassCard>
          </motion.div>

          {/* Yearly — highlighted with gold glow */}
          <motion.div custom={2} variants={cardVariants} initial="hidden" animate="visible" className="h-full">
            <GlassCard
              className="glass-glow-gold relative flex h-full flex-col p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_80px_rgba(255,183,26,0.35)]"
            >
              {/* Best Value badge */}
              <div className="absolute -top-3 inset-inline-end-6 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 px-3.5 py-1 text-xs font-bold text-black shadow-[0_0_20px_rgba(250,204,21,0.45)]">
                <Sparkles className="h-3 w-3" />
                {t('pricing.yearly.badge')}
              </div>

              {/* Auto-calculated discount badge */}
              {discountPct !== null && discountPct > 0 && (
                <div className="absolute top-4 inset-inline-start-6 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-400/30">
                  {t('pricing.discount')} {discountPct}%
                </div>
              )}

              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {t('pricing.yearly')}
              </h2>
              <div className="mt-5 flex items-baseline gap-1">
                {yearlyPrice !== null ? (
                  <>
                    <span className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
                      {yearlyPrice}
                    </span>
                    <span className="text-base font-normal text-white/50">/year</span>
                  </>
                ) : (
                  <span className="text-5xl font-bold tracking-tight text-white/40 sm:text-6xl">
                    NEEDED
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm text-white/50 sm:text-base">
                {t('pricing.yearly.desc')}
              </p>
              <div className="mt-auto pt-8">
                <a href="/download" className="block">
                  <button className="w-full rounded-2xl bg-tazcal-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_-4px_rgba(122,90,248,0.5)] transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_-2px_rgba(122,90,248,0.7)] active:scale-[0.98]">
                    {t('pricing.yearly.cta')}
                  </button>
                </a>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Comparison table */}
        <motion.div variants={tableVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          <GlassCard className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="p-5 text-start text-sm font-semibold text-white/60">
                      {t('pricing.feature')}
                    </th>
                    <th className="p-5 text-center text-sm font-semibold text-white/60">
                      {t('pricing.freeCol')}
                    </th>
                    <th className="p-5 text-center text-sm font-semibold text-tazcal-primary">
                      {t('pricing.proCol')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((row, i) => (
                    <tr key={i} className="border-b border-white/5 last:border-0 transition-colors hover:bg-white/[0.02]">
                      <td className="p-5 text-start">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-white/70">{t(row.labelKey)}</span>
                          {row.badgeKey && (
                            <span className="rounded-full bg-tazcal-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-tazcal-primary">
                              {t(row.badgeKey)}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-5 text-center">
                        {renderCell(row.free, false)}
                      </td>
                      <td className="p-5 text-center">
                        {renderCell(row.pro, true)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
