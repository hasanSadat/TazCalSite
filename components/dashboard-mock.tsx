'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { useLocale } from '@/components/providers/locale-provider';
import { motion } from 'framer-motion';
import {
  Home,
  BarChart3,
  User,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Clock,
  Flame,
  Calendar,
  Footprints,
  Dumbbell,
  Zap,
  TrendingUp,
  Target,
  Activity,
  Droplets,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Circle,
  Award,
} from 'lucide-react';

// ============================================================
// ۱. کامپوننت دایره پیشرفت (برای وعده‌ها)
// ============================================================

interface DashboardMockProps {
  className?: string;
}

export function DashboardMock({ className }: DashboardMockProps) {
  const { t, locale } = useLocale();
  const isRTL = false

  // داده‌های نمونه
  const user = {
    name: t('dashboard.userName') || 'علی',
    date: t('dashboard.date') || '۳ مرداد ۱۴۰۵',
  };

  const tasks = {
    completed: 5,
    total: 3,
    next: t('dashboard.nextTask') || 'تمیز کاری',
    progress: 60,
  };

  // وعده‌های روزانه با آیکون‌های جدید و پروگرس دایره‌ای — اندازه‌ها کوچک‌تر
  const meals = [
    { 
      icon: '🍔',
      progress: 20,
      color: '#FF6B6B'
    },
    { 
      icon: '🍞',
      progress: 45,
      color: '#FFD93D'
    },
    { 
      icon: '🥩',
      progress: 70,
      color: '#6BCB77'
    },
    { 
      icon: '🍩',
      progress: 90,
      color: '#4D96FF'
    },
  ];

  const goals = [
    { name: t('dashboard.goal1') || 'پیاده‌روی', frequency: t('dashboard.goal1Freq') || '۲ بار در هفته' },
    { name: t('dashboard.goal2') || 'کوه‌نوردی', frequency: '' },
  ];

  const lastMeal = t('dashboard.lastMealValue') || '۲ تا تخم‌مرغ آب‌پز';


  // کامپوننت دایره پروگرس با اندازه کوچک‌تر
  const ProgressCircle = ({ progress, color, size = 36 }: { progress: number; color: string; size?: number }) => {
    const strokeWidth = 3;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: offset,
              transition: 'stroke-dashoffset 0.8s ease-in-out',
            }}
          />
        </svg>
        <span className="absolute text-[9px] font-bold text-white" style={{ color }}>
          {progress}%
        </span>
      </div>
    );
  };

  return (
    <div className={`w-full max-w-[360px] mx-auto p-5  ${className || ''}`}>
      {/* <GlassCard glow className=" rounded-3xl overflow-hidden"> */}
        {/* Header */}
        <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
            <p className="text-xs text-white/40">{user.date}</p>
            <h2 className="text-xl font-bold text-white">{user.name}</h2>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-tazcal-primary to-tazcal-secondary flex items-center justify-center text-white font-bold shadow-lg glow-primary">
            {user.name.charAt(0)}
          </div>
        </div>

        {/* Daily Plan */}
        <div className="mb-4">
          <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <h3 className="text-sm font-semibold text-white/80">{t('dashboard.dailyPlan')}</h3>
            <button className="text-xs text-tazcal-primary hover:underline">
              {t('dashboard.viewDetails')}
            </button>
          </div>
          
          <div className="glass rounded-2xl p-4">
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-white">{tasks.completed}</span>
                  <span className="text-sm text-white/40">/ {tasks.total}</span>
                  <span className="text-xs text-white/40">{t('dashboard.tasksDone')}</span>
                </div>
                <p className="text-sm text-white/60 mt-0.5">
                  {t('dashboard.next')}: <span className="text-white font-medium">{tasks.next}</span>
                </p>
              </div>
              
              {/* Ring Progress کلی */}
              <div className="relative flex items-center justify-center">
                <svg className="w-14 h-14 transform -rotate-90">
                  <circle
                    cx="28"
                    cy="28"
                    r="22"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="4"
                    fill="none"
                  />
                  <circle
                    cx="28"
                    cy="28"
                    r="22"
                    stroke="url(#dashboardGradient)"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${(tasks.progress / 100) * 138.23} 138.23`}
                  />
                  <defs>
                    <linearGradient id="dashboardGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#7A3CFF" />
                      <stop offset="100%" stopColor="#A78BFA" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="absolute text-center text-sm font-bold text-white">{tasks.progress}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Meals — با اندازه‌های کوچک‌تر و اصلاح فاصله‌ها */}
        <div className="mb-4">
          <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <h3 className="text-sm font-semibold text-white/80">{t('dashboard.dailyMeals')}</h3>
            <button className="text-xs text-tazcal-primary hover:underline">
              {t('dashboard.viewAll')}
            </button>
          </div>
          
          <div className="glass rounded-2xl p-4">
            <div className={`flex items-center justify-around gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {meals.map((meal, index) => (
                <div key={index} className="flex flex-col items-center gap-1">
                  <div className="relative flex items-center justify-center">
                    <ProgressCircle progress={meal.progress} color={meal.color} size={34} />
                    <span className="absolute text-sm">{meal.icon}</span>
                  </div>
                  {/* بدون هیچ نوشته‌ای زیر آیکون‌ها */}
                </div>
              ))}
            </div>
            
            {/* آخرین وعده */}
            <div className={`mt-3 pt-3 border-t border-white/5 flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <p className="text-[10px] text-white/40">{t('dashboard.lastMeal')}</p>
              <p className="text-sm font-medium text-white">{lastMeal}</p>
            </div>
          </div>
        </div>

        {/* Goals */}
        <div className="mb-4">
          <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <h3 className="text-sm font-semibold text-white/80">{t('dashboard.goals')}</h3>
            <button className="text-xs text-tazcal-primary hover:underline">
              {t('dashboard.viewAll')}
            </button>
          </div>
          
          <div className="glass rounded-2xl p-4">
            <div className="space-y-2.5">
              {goals.map((goal, index) => (
                <div key={index} className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-5 h-5 rounded-full bg-tazcal-primary/20 flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-tazcal-primary" />
                    </div>
                    <span className="text-sm text-white">{goal.name}</span>
                  </div>
                  {goal.frequency && (
                    <span className="text-xs text-white/40">{goal.frequency}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Navigation — فقط ۳ آیتم */}
        <div className={`flex items-center justify-around pt-2 border-t border-white/5 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {[
            { icon: Home, label: t('dashboard.home'), active: true },
            { icon: BarChart3, label: t('dashboard.analytics'), active: false },
            { icon: User, label: t('dashboard.profile'), active: false },
          ].map((item, index) => (
            <button
              key={index}
              className={`flex flex-col items-center gap-0.5 transition-all ${
                item.active ? 'text-tazcal-primary' : 'text-white/30 hover:text-white/60'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[9px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      {/* </GlassCard> */}
    </div>
  );
}
// ۳. کامپوننت کارت کالری
// ============================================================
export function CalorieCard() {
  const { t, locale } = useLocale();
  const isRTL = locale === 'fa' || locale === 'ar';

  const stats = {
    target: 1000,
    consumed: 1029,
    burned: 2029,
    deficit: 1000,
    status: t('calorie.great') || 'عالیه!',
    fatBurningZone: true,
  };

  return (
    <GlassCard glow className="p-6 w-full max-w-sm mx-auto">
      <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="p-1.5 rounded-full bg-gradient-to-r from-tazcal-primary to-tazcal-secondary/60">
            <Flame className="w-4 h-4 text-white" />
          </div>
          <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
            <h3 className="text-sm font-semibold text-white">{t('calorie.fatBurningZone')}</h3>
            <p className="text-[10px] text-white/40">{t('calorie.fatBurningDesc')}</p>
          </div>
        </div>
        <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-tazcal-success/20 text-tazcal-success">
          {t('calorie.active')}
        </span>
      </div>

      <div className="text-center mb-4">
        <p className="text-xs text-white/40">{t('calorie.totalEnergy')}</p>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="text-5xl font-bold text-white mt-1"
        >
          {stats.target.toLocaleString()}
        </motion.div>
        <p className="text-xs text-white/40">{t('calorie.calories')}</p>
      </div>

      <div
        className={`flex items-center justify-between bg-white/5 rounded-xl px-4 py-2.5 mb-4 ${
          isRTL ? 'flex-row-reverse' : ''
        }`}
      >
        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <TrendingDown className="w-4 h-4 text-tazcal-success" />
          <span className="text-sm font-medium text-white">
            {stats.deficit.toLocaleString()} {t('calorie.calories')}
          </span>
        </div>
        <p className="text-sm font-semibold text-tazcal-success">
          {t('calorie.youAreInDeficit')} {stats.status}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="glass rounded-xl p-3">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-xs text-white/40">{t('calorie.burned')}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-tazcal-primary" />
          </div>
          <p className="text-lg font-bold text-white mt-1">{stats.burned.toLocaleString()}</p>
        </div>
        <div className="glass rounded-xl p-3">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-xs text-white/40">{t('calorie.consumed')}</span>
            <ArrowDownRight className="w-3.5 h-3.5 text-tazcal-warning" />
          </div>
          <p className="text-lg font-bold text-white mt-1">{stats.consumed.toLocaleString()}</p>
        </div>
      </div>
    </GlassCard>
  );
}

// ============================================================
// ۴. کامپوننت برنامه‌ریزی (Planner Cards)
// ============================================================
export function PlannerCards() {
  const { t, locale } = useLocale();
  const isRTL = locale === 'fa' || locale === 'ar';

  const activities = [
    { id: 'studying', titleKey: 'planner.studying', startTime: '15:00', endTime: '16:30', calories: 156,
      icon: <BookOpen className="w-4 h-4" />, color: 'from-tazcal-primary to-tazcal-secondary' },
    { id: 'light-cleaning', titleKey: 'planner.lightCleaning', startTime: '16:30', endTime: '17:00', calories: 92,
      icon: <Sparkles className="w-4 h-4" />, color: 'from-tazcal-glow to-tazcal-primary/60' },
  ];

  return (
    <div className="w-full max-w-sm mx-auto space-y-3">
      {activities.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, type: 'spring', stiffness: 300, damping: 25 }}
        >
          <GlassCard hover glow className="p-4">
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${activity.color} flex items-center justify-center text-white shadow-lg`}
                >
                  {activity.icon}
                </div>
                <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                  <h4 className="text-sm font-semibold text-white">{t(activity.titleKey)}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Clock className="w-3 h-3 text-white/30" />
                    <span className="text-xs text-white/50">
                      {activity.startTime} - {activity.endTime}
                    </span>
                  </div>
                </div>
              </div>
              <div className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Flame className="w-3.5 h-3.5 text-tazcal-primary" />
                <span className="text-sm font-medium text-white">
                  {activity.calories} {t('planner.kcal')}
                </span>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}

// ============================================================
// ۵. کامپوننت عادات (Habits)
// ============================================================
export function HabitCards() {
  const { t, locale } = useLocale();
  const isRTL = false

  const habits = [
    { id: 'meditation', titleKey: 'habits.meditation', done: true, streak: 1,
      frequency: t('habits.daily'), statusKey: 'habits.doneToday' },
    { id: 'cold-shower', titleKey: 'habits.coldShower', done: false, streak: 0,
      frequency: t('habits.daily'), statusKey: 'habits.pendingAction' },
  ];

  return (
    <div className="w-full max-w-sm mx-auto space-y-3">
      <h3 className="text-sm font-semibold text-white/80 mb-3">{t('habits.today')}</h3>

      {habits.map((habit, index) => (
        <motion.div
          key={habit.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, type: 'spring', stiffness: 300, damping: 25 }}
        >
          <GlassCard hover glow className="p-4">
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <button
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    habit.done
                      ? 'bg-gradient-to-r from-tazcal-primary to-tazcal-secondary text-white shadow-lg glow-primary'
                      : 'border-2 border-white/20 hover:border-white/40'
                  }`}
                >
                  {habit.done ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4 text-white/30" />}
                </button>
                <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                  <h4 className="text-sm font-semibold text-white">{t(habit.titleKey)}</h4>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className={`text-xs ${habit.done ? 'text-tazcal-success' : 'text-white/40'}`}>
                      {t(habit.statusKey)}
                    </span>
                    {habit.streak > 0 && (
                      <span className="flex items-center gap-1 text-xs text-tazcal-primary">
                        <Flame className="w-3 h-3" />
                        {habit.streak} {t('habits.dayStreak')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <span className="text-[10px] text-white/30">{habit.frequency}</span>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}

// ============================================================
// ۶. کامپوننت اهداف (Goals Card)
// ============================================================
export function GoalsCard() {
  const { t, locale } = useLocale();
  const isRTL = locale === 'fa' || locale === 'ar';

  const goal = {
    title: t('goals.walking'),
    subtitle: t('goals.exercise'),
    progress: 50,
    activities: 1,
    current: 4000,
    target: 8000,
    lastActivity: '2026-07-25',
    lastActivityDesc: t('goals.lastActivityDesc') || '4000+ راه برم یکم',
  };

  const progressPercent = Math.min((goal.current / goal.target) * 100, 100);

  return (
    <div className="w-full max-w-sm mx-auto">
      <GlassCard glow className="p-6">
        <div className={`${isRTL ? 'text-right' : 'text-left'} mb-4`}>
          <h3 className="text-sm font-semibold text-white/80">{t('goals.yourGoals')}</h3>
          <p className="text-xs text-white/40">{t('goals.subtitle')}</p>
        </div>

        <div className={`flex items-center gap-6 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="relative flex items-center justify-center">
            <svg className="w-20 h-20 transform -rotate-90">
              <circle cx="40" cy="40" r="32" stroke="rgba(255,255,255,0.08)" strokeWidth="5" fill="none" />
              <circle
                cx="40"
                cy="40"
                r="32"
                stroke="url(#goalsGradient)"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${(progressPercent / 100) * 201.06} 201.06`}
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="goalsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7A3CFF" />
                  <stop offset="100%" stopColor="#A78BFA" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute text-center">
              <span className="text-lg font-bold text-white">{Math.round(progressPercent)}%</span>
              <span className="block text-[9px] text-white/40">{t('goals.done')}</span>
            </span>
          </div>

          <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
              <span className="text-xl font-bold text-white">{goal.title}</span>
              <span className="text-xs text-white/30">{goal.subtitle}</span>
            </div>
            <div className={`flex items-center gap-3 mt-1 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
              <span className="text-xs text-white/40">{t('goals.activities')}</span>
              <span className="text-sm font-semibold text-white">{goal.activities}</span>
            </div>
            <div className={`flex items-center gap-2 mt-1 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
              <Zap className="w-3.5 h-3.5 text-tazcal-primary" />
              <span className="text-sm font-bold text-white">
                {goal.current.toLocaleString()} / {goal.target.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-3">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Calendar className="w-4 h-4 text-white/30" />
              <span className="text-xs text-white/40">{t('goals.recentActivity')}</span>
            </div>
            <span className="text-xs text-white/30">{goal.lastActivity}</span>
          </div>
          <div className={`flex items-center justify-between mt-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Footprints className="w-4 h-4 text-tazcal-primary" />
              <span className="text-sm font-medium text-white">{goal.lastActivityDesc}</span>
            </div>
            <TrendingUp className="w-4 h-4 text-tazcal-success" />
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

// ============================================================
// ۷. کامپوننت آنالیز (Analytics)
// ============================================================

// ==================== تنظیمات چارت ====================
const CHART_WIDTH = 300;
const CHART_HEIGHT = 110;
const BAR_GAP = 14;
const TOP_PADDING = 22; // فضای بالای هر ستون برای لیبل عدد

const easeOut = [0.16, 1, 0.3, 1] as const;

export function AnalyticsVisual() {
  const { t, locale } = useLocale();
  const isRTL = locale === 'fa' || locale === 'ar';

  // ==================== داده‌های ۴ هفته با کسری کالری ====================
  const weeklyData = [
    { week: 'هفته ۱', deficit: -400, label: 'W1' },
    { week: 'هفته ۲', deficit: -800, label: 'W2' },
    { week: 'هفته ۳', deficit: -300, label: 'W3' },
    { week: 'هفته ۴', deficit: -600, label: 'W4' },
  ];

  const monthlyData = {
    totalDeficit: weeklyData.reduce((sum, d) => sum + d.deficit, 0),
    avgDailyDeficit: Math.round(weeklyData.reduce((sum, d) => sum + d.deficit, 0) / 30),
    totalBurned: 58000,
    totalConsumed: 54000,
    daysInMonth: 30,
    bestDay: '۱۴۰۴/۰۵/۱۵',
    bestCalories: 420,
  };

  // ==================== محاسبات چارت (SVG، نه درصد CSS) ====================
  const maxAbsValue = Math.max(...weeklyData.map((d) => Math.abs(d.deficit)), 100);
  const barAreaHeight = CHART_HEIGHT - TOP_PADDING;
  const barWidth = (CHART_WIDTH - BAR_GAP * (weeklyData.length - 1)) / weeklyData.length;

  const bars = weeklyData.map((d, i) => {
    const barHeight = Math.max((Math.abs(d.deficit) / maxAbsValue) * barAreaHeight, 6);
    const x = i * (barWidth + BAR_GAP);
    const y = CHART_HEIGHT - barHeight;
    return { ...d, barHeight, x, y };
  });

  return (
    <div className="w-full max-w-sm mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      <GlassCard glow className="p-5 rounded-[28px] overflow-hidden relative">
        {/* گرادینت پس‌زمینه محیطی */}
        <div className="absolute inset-0 bg-gradient-to-br from-tazcal-primary/[0.06] via-transparent to-tazcal-success/[0.06] pointer-events-none" />

        {/* Header */}
        <div className={`relative flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h3 className="text-[15px] font-semibold tracking-tight text-white">
              {t('analytics.monthlyOverview') || 'نمای ماهانه'}
            </h3>
            <p className="text-[11px] text-white/40 mt-0.5">
              {t('analytics.caloriesTrends') || 'روند کسری کالری'}
            </p>
          </div>
          <div className="flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-[11px] font-medium text-white/60 border border-white/[0.06]">
            <Calendar className="w-3 h-3 text-tazcal-primary" strokeWidth={2.25} />
            {t('analytics.thisMonth') || 'این ماه'}
          </div>
        </div>

        {/* کارت کسری کالری (Hero stat) */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: easeOut }}
          className={`relative flex items-center justify-between mb-5 p-3.5 rounded-2xl bg-gradient-to-r from-tazcal-success/[0.16] via-tazcal-success/[0.06] to-transparent border border-tazcal-success/20 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <p className="text-[10.5px] text-white/40 mb-0.5">
              {t('analytics.totalDeficit') || 'مجموع کسری کالری'}
            </p>
            <div className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <TrendingDown className="w-4 h-4 text-tazcal-success shrink-0" strokeWidth={2.5} />
              <p className="text-[26px] leading-none font-bold tracking-tight text-tazcal-success tabular-nums">
                {monthlyData.totalDeficit.toLocaleString()}
                <span className="text-xs font-medium text-tazcal-success/70 ms-1">
                  {t('analytics.kcal') || 'کالری'}
                </span>
              </p>
            </div>
          </div>
          <div className={isRTL ? 'text-left' : 'text-right'}>
            <p className="text-[9.5px] text-white/30 mb-0.5">
              {t('analytics.avgDailyDeficit') || 'میانگین کسری روزانه'}
            </p>
            <p className="text-[13px] font-bold text-white/80 tabular-nums">
              {monthlyData.avgDailyDeficit} {t('analytics.kcal') || 'کالری'}
            </p>
          </div>
        </motion.div>

        {/* ====== نمودار ستونی SVG (رندر تضمین‌شده، بدون وابستگی به ارتفاع درصدی) ====== */}
        <div className="mb-5">
          <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-[10.5px] font-medium text-white/40">
              {t('analytics.weeklyDeficit') || 'کسری کالری هفتگی'}
            </span>
            <span className="text-[9px] text-white/25">{t('analytics.kcal') || 'کالری'}</span>
          </div>

          <svg
            viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT + 24}`}
            className="w-full h-32 overflow-visible"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--tazcal-danger, #ff6b6b)" stopOpacity="1" />
                <stop offset="100%" stopColor="var(--tazcal-danger, #ff6b6b)" stopOpacity="0.35" />
              </linearGradient>
            </defs>

            {/* خط مبنا (baseline) */}
            <line
              x1="0"
              y1={CHART_HEIGHT}
              x2={CHART_WIDTH}
              y2={CHART_HEIGHT}
              stroke="rgba(255,255,255,0.08)"
              strokeDasharray="3 4"
            />

            {bars.map((bar, i) => (
              <g key={bar.label}>
                {/* ستون */}
                <motion.rect
                  x={bar.x}
                  width={barWidth}
                  rx={7}
                  fill="url(#barFill)"
                  initial={{ height: 0, y: CHART_HEIGHT }}
                  animate={{ height: bar.barHeight, y: bar.y }}
                  transition={{ duration: 0.55, ease: easeOut, delay: i * 0.06 }}
                />
                {/* عدد بالای ستون */}
                <motion.text
                  x={bar.x + barWidth / 2}
                  y={bar.y - 8}
                  textAnchor="middle"
                  className="fill-white/70 tabular-nums"
                  style={{ fontSize: 9, fontWeight: 600 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.06 + 0.35 }}
                >
                  {bar.deficit}
                </motion.text>
                {/* لیبل هفته */}
                <text
                  x={bar.x + barWidth / 2}
                  y={CHART_HEIGHT + 16}
                  textAnchor="middle"
                  className="fill-white/30"
                  style={{ fontSize: 9, fontWeight: 500 }}
                >
                  {isRTL ? bar.week : bar.label}
                </text>
              </g>
            ))}
          </svg>

          <div className={`flex items-center justify-center gap-1.5 mt-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="w-2 h-2 rounded-full bg-tazcal-danger" />
            <span className="text-[9px] text-white/40">{t('analytics.deficit') || 'کسری کالری'}</span>
          </div>
        </div>

        {/* آمار پایین */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: Activity, value: monthlyData.totalBurned, label: t('analytics.totalBurned') || 'کل سوزانده شده', color: 'tazcal-primary' },
            { icon: Flame, value: monthlyData.totalConsumed, label: t('analytics.totalConsumed') || 'کل مصرف شده', color: 'tazcal-warning' },
            { icon: Award, value: monthlyData.daysInMonth, label: t('analytics.days') || 'روز', color: 'tazcal-success' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 + i * 0.05, ease: easeOut }}
              className="glass rounded-2xl p-2.5 text-center border border-white/[0.06] active:scale-95 transition-transform"
            >
              <div className={`w-7 h-7 mx-auto rounded-full bg-${stat.color}/15 flex items-center justify-center mb-1`}>
                <stat.icon className={`w-3.5 h-3.5 text-${stat.color}`} strokeWidth={2.25} />
              </div>
              <p className="text-[13px] font-bold text-white mt-1 tabular-nums">{stat.value.toLocaleString()}</p>
              <p className="text-[8px] text-white/30 mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* بهترین روز */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4, ease: easeOut }}
          className="mt-3 p-2.5 rounded-2xl bg-gradient-to-r from-tazcal-primary/[0.08] via-white/[0.03] to-transparent border border-white/[0.06]"
        >
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Target className="w-3.5 h-3.5 text-tazcal-primary" strokeWidth={2.25} />
              <span className="text-[10px] text-white/40">{t('analytics.bestDay') || 'بهترین روز'}</span>
              <span className="text-[10px] font-semibold text-white tabular-nums">{monthlyData.bestDay}</span>
            </div>
            <span className="text-[11px] font-bold text-tazcal-success tabular-nums">
              +{monthlyData.bestCalories} {t('analytics.kcal') || 'کالری'}
            </span>
          </div>
        </motion.div>
      </GlassCard>
    </div>
  );
}

export const FoodMessages = [
  { role: 'user', text: 'ai.chat.user1' },
  { role: 'ai', text: 'ai.chat.ai1' },

];
export const TaskMessages = [

  { role: 'user', text: 'ai.chat.user2' },
  { role: 'ai', text: 'ai.chat.ai2' },
];