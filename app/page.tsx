'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '@/components/providers/locale-provider';
import { GlassCard } from '@/components/ui/glass-card';
import { PrimaryButton, SecondaryButton } from '@/components/ui/buttons';
import { MockupFrame } from '@/components/ui/mockup-frame';
import { PlaceholderAsset } from '@/components/ui/placeholder-asset';
import { Reveal } from '@/components/ui/reveal';
import {
  Flame, Brain, Calendar, CheckCircle2, Target, BookOpen, BarChart3,
  Sparkles, ChevronDown, Download, ArrowRight, Activity, Droplets, Zap,
  MessageSquare,
} from 'lucide-react';
import Link from 'next/link';
import { type LucideIcon } from 'lucide-react';
import { AnalyticsVisual, CalorieCard, DashboardMock, FoodMessages, GoalsCard, HabitCards, PlannerCards, TaskMessages } from '@/components/dashboard-mock';
import { DownloadSection } from '@/components/download-section';

const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'] as const;

export default function HomePage() {
  const { t } = useLocale();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="overflow-hidden">
      {/* ===== 1. HERO ===== */}
      <section className="relative flex min-h-screen items-center px-4 pt-32 sm:px-6">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26, mass: 0.9 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-white/70"
            >
              <Sparkles className="h-3.5 w-3.5 text-tazcal-primary" />
              {t('hero.badge')}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26, mass: 0.9, delay: 0.05 }}
              className="text-4xl font-extrabold tracking-tight text-gradient sm:text-5xl lg:text-6xl xl:text-7xl"
              style={{ lineHeight: 1.1 }}
            >
              {t('hero.title')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26, mass: 0.9, delay: 0.1 }}
              className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/65 lg:mx-0 lg:text-lg"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26, mass: 0.9, delay: 0.15 }}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
            >
              <Link href="/download">
                <PrimaryButton className="w-full sm:w-auto">
                  <Download className="h-4 w-4" />
                  {t('hero.download')}
                </PrimaryButton>
              </Link>
              <Link href="/features">
                <SecondaryButton className="w-full sm:w-auto">
                  {t('hero.learnmore')}
                  <ArrowRight className="h-4 w-4" />
                </SecondaryButton>
              </Link>
            </motion.div>
          </div>

          {/* Hero phone mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26, mass: 0.9, delay: 0.2 }}
            className="flex justify-center"
          >
            <MockupFrame label={t('placeholder.dashboard')}>
             <DashboardMock/>
            </MockupFrame>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="h-6 w-6 animate-bounce text-white/30" />
        </motion.div>
      </section>

      {/* ===== 2. DYNAMIC CALORIES (USP) ===== */}
      <FeatureSection
        index={0}
        icon={Flame}
        eyebrow={t('home.dynamicCalories.eyebrow')}
        title={t('home.dynamicCalories.title')}
        description={t('home.dynamicCalories.desc')}
        visual={<CalorieCard />}
        reverse={false}
        learnMore={t('common.learnMore')}
      />

      {/* ===== 3. AI FOOD ===== */}
      <FeatureSection
        index={1}
        icon={Brain}
        eyebrow={t('home.aiFood.eyebrow')}
        title={t('home.aiFood.title')}
        description={t('home.aiFood.desc')}
          visual={<GlassCard glow className="p-6">
              <div className="space-y-4">
                {FoodMessages.map((msg, i) => (
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
            </GlassCard>}
        reverse={true}
        learnMore={t('common.learnMore')}
      />

      {/* ===== 4. AI PLANNER ===== */}
      <FeatureSection
        index={2}
        icon={Calendar}
        eyebrow={t('home.aiPlanner.eyebrow')}
        title={t('home.aiPlanner.title')}
        description={t('home.aiPlanner.desc')}
        visual={<GlassCard glow className="p-6">
              <div className="space-y-4">
                {TaskMessages.map((msg, i) => (
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
            </GlassCard>}
        reverse={false}
        learnMore={t('common.learnMore')}
      />

      {/* ===== 5. PLANNER ===== */}
      <FeatureSection
        index={3}
        icon={Calendar}
        title={t('home.planner.title')}
        description={t('home.planner.desc')}
        visual={
<PlannerCards/>        }
        reverse={true}
        learnMore={t('common.learnMore')}
      />

      {/* ===== 6. HABITS ===== */}
      <FeatureSection
        index={4}
        icon={CheckCircle2}
        title={t('home.habits.title')}
        description={t('home.habits.desc')}
        visual={
          <HabitCards/>
        }
        reverse={false}
        learnMore={t('common.learnMore')}
      />

      {/* ===== 7. GOALS ===== */}
      <FeatureSection
        index={5}
        icon={Target}
        title={t('home.goals.title')}
        description={t('home.goals.desc')}
        visual={
<GoalsCard/>        }
        reverse={true}
        learnMore={t('common.learnMore')}
      />

      {/* ===== 8. ANALYTICS ===== */}
      <FeatureSection
        index={6}
        icon={BarChart3}
        title={t('home.analytics.title')}
        description={t('home.analytics.desc')}
        visual={<AnalyticsVisual />}
        reverse={false}
        learnMore={t('common.learnMore')}
      />

      {/* ===== 9. TESTIMONIALS ===== */}
      {/* <section className="px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-gradient sm:text-4xl">{t('home.testimonials.title')}</h2>
              <p className="mt-3 text-white/55">{t('home.testimonials.subtitle')}</p>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <GlassCard hover className="h-full p-6">
                  <div className="mb-4 flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className="text-tazcal-primary">★</span>
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-white/70">{item.text}</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/50">
                      {item.name[0]}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{item.name}</div>
                      <div className="text-xs text-white/45">{item.role}</div>
                    </div>
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section> */}

      {/* ===== 10. DOWNLOAD ===== */}
      <section className="px-4 py-24 sm:px-6">
       <DownloadSection />
      </section>

      {/* ===== 11. FAQ ===== */}
      <section className="px-4 py-24 sm:px-6" id="faq">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-gradient sm:text-4xl">{t('home.faq.title')}</h2>
            </div>
          </Reveal>
          <div className="space-y-3">
            {faqKeys.map((key, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <FAQItem
                  question={t(`home.faq.${key}`)}
                  answer={t(`home.faq.a${key.slice(1)}`)}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureSection({
  index,
  icon: Icon,
  title,
  description,
  visual,
  eyebrow,
  reverse = false,
  learnMore,
}: {
  index: number;
  icon: LucideIcon;
  title: string;
  description: string;
  visual: React.ReactNode;
  eyebrow?: string;
  reverse?: boolean;
  learnMore: string;
}) {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className={`grid items-center gap-12 lg:grid-cols-2 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
          <Reveal>
            <div>
              {eyebrow && (
                <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-tazcal-primary">
                  <Icon className="h-3.5 w-3.5" />
                  {eyebrow}
                </div>
              )}
              <h2 className="mb-4 text-3xl font-bold text-gradient sm:text-4xl">{title}</h2>
              <p className="text-base leading-relaxed text-white/65 lg:text-lg">{description}</p>
              <Link href="/features" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-tazcal-primary hover:gap-2.5 transition-all">
                {learnMore} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>{visual}</Reveal>
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer, isOpen, onToggle }: { question: string; answer: string; isOpen: boolean; onToggle: () => void }) {
  const springTransition = { type: 'spring' as const, stiffness: 260, damping: 26 };
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <button
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between p-5 text-base font-medium text-white"
        aria-expanded={isOpen}
      >
        {question}
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={springTransition}>
          <ChevronDown className="h-5 w-5 text-white/50" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={springTransition}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-sm leading-relaxed text-white/60">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
