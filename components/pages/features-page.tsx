'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { Reveal } from '@/components/ui/reveal';
import { useLocale } from '@/components/providers/locale-provider';
import {
  Flame,
  Brain,
  Calendar,
  CheckCircle2,
  Target,
  BookOpen,
  BarChart3,
  Utensils,
  type LucideIcon,
} from 'lucide-react';
import {
  CalorieCard,
  PlannerCards,
  HabitCards,
  GoalsCard,
  AnalyticsVisual,DashboardMock
} from '@/components/dashboard-mock';  

interface FeatureDetail {
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
  pointKeys?: string[];
  badgeKey?: string;
  visual: React.ReactNode; // 👈 اضافه شد
}

export function FeaturesPage() {
  const { t } = useLocale();

  const features: FeatureDetail[] = [
    {
      icon: Flame,
      titleKey: 'home.dynamicCalories.title',
      badgeKey: 'features.dynamicCalories.badge',
      descriptionKey: 'features.dynamicCalories.desc',
      pointKeys: [
        'features.dynamicCalories.p1',
        'features.dynamicCalories.p2',
        'features.dynamicCalories.p3',
        'features.dynamicCalories.p4',
      ],
      visual: <CalorieCard />,
    },
    {
      icon: Brain,
      titleKey: 'home.aiFood.title',
      descriptionKey: 'features.aiFood.desc',
      pointKeys: [
        'features.aiFood.p1',
        'features.aiFood.p2',
        'features.aiFood.p3',
        'features.aiFood.p4',
      ],
      visual: (
        <GlassCard glow className="p-6">
          <div className="space-y-4">
            {/* می‌توانید همان چت‌های AI Food را اینجا قرار دهید */}
            <div className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-tazcal-primary px-4 py-3 text-sm text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-white/50">{t('ai.chatUser')}</span>
                </div>
                <p className="whitespace-pre-line">{t('ai.chat.user1')}</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl rounded-bl-sm glass px-4 py-3 text-sm text-white/80">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-white/50">{t('ai.chatAI')}</span>
                </div>
                <p className="whitespace-pre-line">{t('ai.chat.ai1')}</p>
              </div>
            </div>
          </div>
        </GlassCard>
      ),
    },
    {
      icon: Utensils,
      titleKey: 'features.foodTracking.title',
      descriptionKey: 'features.foodTracking.desc',
      pointKeys: [
        'features.foodTracking.p1',
        'features.foodTracking.p2',
        'features.foodTracking.p3',
        'features.foodTracking.p4',
      ],
      visual: (
        // بخش Food Tracking
<GlassCard glow className="p-6">
  <div className="space-y-3">
    {[0, 1, 2].map((i) => {
      // داده‌های ثابت (اعداد و مقادیر)
      const foodData = [
        { kcal: 250, protein: 30, carbs: 0, fat: 12 },
        { kcal: 180, protein: 4, carbs: 38, fat: 1.5 },
        { kcal: 55, protein: 3.5, carbs: 11, fat: 0.5 },
      ];
      
      return (
        <div key={i} className="flex items-center justify-between glass rounded-xl px-4 py-2.5">
          <div>
            <p className="text-sm font-medium text-white">
              {t(`foodTracking.items.${i}.name`)}
            </p>
            <p className="text-[10px] text-white/40">
              {foodData[i].protein}g {t('foodTracking.proteinLabel')} · 
              {foodData[i].carbs}g {t('foodTracking.carbsLabel')} · 
              {foodData[i].fat}g {t('foodTracking.fatLabel')}
            </p>
          </div>
          <span className="text-sm font-bold text-white">
            {foodData[i].kcal} {t('foodTracking.kcalLabel')}
          </span>
        </div>
      );
    })}
  </div>
</GlassCard>
      ),
    },
    {
      icon: Calendar,
      titleKey: 'home.aiPlanner.title',
      descriptionKey: 'features.aiPlanner.desc',
      pointKeys: [
        'features.aiPlanner.p1',
        'features.aiPlanner.p2',
        'features.aiPlanner.p3',
      ],
      visual: (
        <GlassCard glow className="p-6">
          <div className="space-y-4">
            <div className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-tazcal-primary px-4 py-3 text-sm text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-white/50">{t('ai.chatUser')}</span>
                </div>
                <p className="whitespace-pre-line">{t('ai.chat.user2')}</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl rounded-bl-sm glass px-4 py-3 text-sm text-white/80">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-white/50">{t('ai.chatAI')}</span>
                </div>
                <p className="whitespace-pre-line">{t('ai.chat.ai2')}</p>
              </div>
            </div>
          </div>
        </GlassCard>
      ),
    },
    {
      icon: Calendar,
      titleKey: 'home.planner.title',
      descriptionKey: 'features.planner.desc',
      pointKeys: [
        'features.planner.p1',
        'features.planner.p2',
        'features.planner.p3',
        'features.planner.p4',
      ],
      visual: <PlannerCards />,
    },
    {
      icon: CheckCircle2,
      titleKey: 'home.habits.title',
      descriptionKey: 'features.habits.desc',
      pointKeys: [
        'features.habits.p1',
        'features.habits.p2',
        'features.habits.p3',
      ],
      visual: <HabitCards />,
    },
    {
      icon: Target,
      titleKey: 'home.goals.title',
      descriptionKey: 'features.goals.desc',
      pointKeys: [
        'features.goals.p1',
        'features.goals.p2',
        'features.goals.p3',
      ],
      visual: <GoalsCard />,
    },
    {
      icon: BookOpen,
      titleKey: 'features.journal.title',
      descriptionKey: 'features.journal.desc',
      pointKeys: [
        'features.journal.p1',
        'features.journal.p2',
        'features.journal.p3',
      ],
      visual: (
        <GlassCard glow className="p-6">
          <div className="space-y-3">
            <div className="glass rounded-xl p-4">
              <p className="text-xs text-white/40 mb-1">۱۴۰۴/۰۵/۱۵</p>
              <p className="text-sm text-white/80">
                امروز احساس خوبی داشتم. تمرین صبحگاهی عالی بود و رژیم غذایی رو رعایت کردم.
              </p>
            </div>
            <div className="glass rounded-xl p-4">
              <p className="text-xs text-white/40 mb-1">۱۴۰۴/۰۵/۱۴</p>
              <p className="text-sm text-white/80">
                روز پرمشغله‌ای داشتم، اما موفق شدم برنامه غذایی رو رعایت کنم.
              </p>
            </div>
          </div>
        </GlassCard>
      ),
    },
    {
      icon: BarChart3,
      titleKey: 'home.analytics.title',
      descriptionKey: 'features.analytics.desc',
      pointKeys: [
        'features.analytics.p1',
        'features.analytics.p2',
        'features.analytics.p3',
        'features.analytics.p4',
        'features.analytics.p5',
      ],
      visual: <AnalyticsVisual />,
    },
  ];

  return (
    <div className="px-4 pt-32 pb-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-16 text-center">
            <h1 className="text-4xl font-bold text-gradient sm:text-5xl lg:text-6xl">
              {t('features.title')}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/55">
              {t('features.subtitle')}
            </p>
          </div>
        </Reveal>

        <div className="space-y-24">
          {features.map((feature, i) => (
            <Reveal key={feature.titleKey} delay={0.05}>
              <div className="grid items-center gap-12 lg:grid-cols-2">
                {/* سمت چپ: توضیحات */}
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-tazcal-primary/15 text-tazcal-primary">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    {feature.badgeKey && (
                      <span className="rounded-full bg-tazcal-primary/15 px-3 py-1 text-xs font-medium text-tazcal-primary">
                        {t(feature.badgeKey)}
                      </span>
                    )}
                  </div>
                  <h2 className="mb-4 text-3xl font-bold text-gradient">{t(feature.titleKey)}</h2>
                  <p className="text-base leading-relaxed text-white/65">{t(feature.descriptionKey)}</p>
                  {feature.pointKeys && (
                    <ul className="mt-6 space-y-2">
                      {feature.pointKeys.map((pointKey) => (
                        <li key={pointKey} className="flex items-start gap-2 text-sm text-white/60">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-tazcal-primary" />
                          {t(pointKey)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* سمت راست: کامپوننت بصری */}
                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  {feature.visual}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}