'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { Reveal } from '@/components/ui/reveal';
import { useLocale } from '@/components/providers/locale-provider';
import { useEffect, useState } from 'react';

interface LegalSection {
  id: string;
  titleKey: string;
  bodyKey: string;
}

export function LegalPage({
  title,
  sections,
}: {
  title: string;
  sections: LegalSection[];
}) {
  const { t } = useLocale();
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-100px 0px -60% 0px' }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="px-4 pt-32 pb-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h1 className="mb-12 text-4xl font-bold text-gradient sm:text-5xl">{t(title)}</h1>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
          {/* Table of contents sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-32">
              <nav className="space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                      activeId === section.id
                        ? 'bg-tazcal-primary/15 text-white font-medium'
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {t(section.titleKey)}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="space-y-8">
            {sections.map((section) => (
              <Reveal key={section.id}>
                <div id={section.id}>
                  <GlassCard className="p-8">
                    <h2 className="mb-4 text-xl font-bold text-white">{t(section.titleKey)}</h2>
                    <p className="text-sm leading-relaxed text-white/55">{t(section.bodyKey)}</p>
                  </GlassCard>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
