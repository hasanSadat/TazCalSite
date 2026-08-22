'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { PlaceholderAsset } from '@/components/ui/placeholder-asset';
import { Reveal } from '@/components/ui/reveal';
import { useLocale } from '@/components/providers/locale-provider';
import { Sparkles, Target, Eye } from 'lucide-react';

const teamMembers = [
  { name: 'NEEDED: team member name', role: 'NEEDED: role' },
  { name: 'NEEDED: team member name', role: 'NEEDED: role' },
  { name: 'NEEDED: team member name', role: 'NEEDED: role' },
];

const values = [
  { titleKey: 'about.value.intelligent', descKey: 'about.value.intelligentDesc' },
  { titleKey: 'about.value.scientific', descKey: 'about.value.scientificDesc' },
  { titleKey: 'about.value.minimal', descKey: 'about.value.minimalDesc' },
  { titleKey: 'about.value.premium', descKey: 'about.value.premiumDesc' },
  { titleKey: 'about.value.fast', descKey: 'about.value.fastDesc' },
  { titleKey: 'about.value.human', descKey: 'about.value.humanDesc' },
];

export function AboutPage() {
  const { t } = useLocale();

  return (
    <div className="px-4 pt-32 pb-24 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="mb-16 text-center">
            <h1 className="text-4xl font-bold text-gradient sm:text-5xl lg:text-6xl">{t('about.title')}</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/55">
              {t('about.subtitle')}
            </p>
          </div>
        </Reveal>

        {/* Story */}
        <Reveal>
          <GlassCard className="p-8 mb-8">
            <h2 className="mb-4 text-2xl font-bold text-white">{t('about.storyTitle')}</h2>
            <div className="space-y-4 text-base leading-relaxed text-white/65">
              <p>{t('about.storyP1')}</p>
              <p>{t('about.storyP2')}</p>
              <p>{t('about.storyP3')}</p>
            </div>
          </GlassCard>
        </Reveal>

        {/* Mission */}
        <Reveal>
          <GlassCard glow className="p-8 mb-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-tazcal-primary/15 text-tazcal-primary">
                <Target className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{t('about.missionTitle')}</h2>
                <p className="mt-2 text-base leading-relaxed text-white/65">
                  {t('about.missionText')}
                </p>
              </div>
            </div>
          </GlassCard>
        </Reveal>

        {/* Vision */}
        <Reveal>
          <GlassCard className="p-8 mb-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-tazcal-primary/15 text-tazcal-primary">
                <Eye className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{t('about.visionTitle')}</h2>
                <p className="mt-2 text-base leading-relaxed text-white/65">
                  {t('about.visionText')}
                </p>
              </div>
            </div>
          </GlassCard>
        </Reveal>

        {/* Values */}
        <Reveal>
          <div className="mb-8">
            <h2 className="mb-6 text-2xl font-bold text-white">{t('about.valuesTitle')}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((value) => (
                <GlassCard key={value.titleKey} hover className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-tazcal-primary" />
                    <h3 className="text-sm font-semibold text-white">{t(value.titleKey)}</h3>
                  </div>
                  <p className="text-xs text-white/55">{t(value.descKey)}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Team */}
        {/* <Reveal>
          <div>
            <h2 className="mb-6 text-2xl font-bold text-white">{t('about.teamTitle')}</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {teamMembers.map((member, i) => (
                <GlassCard key={i} hover className="p-6 text-center">
                  <PlaceholderAsset name={`${t('placeholder.teamPhoto')}: ${member.name}`} size="600x600" minHeight={200} className="rounded-full w-32 h-32 mx-auto" />
                  <h3 className="mt-4 text-sm font-semibold text-white">{member.name}</h3>
                  <p className="mt-1 text-xs text-white/50">{member.role}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </Reveal> */}
      </div>
    </div>
  );
}
