'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { PlaceholderAsset } from '@/components/ui/placeholder-asset';
import { Reveal } from '@/components/ui/reveal';
import { useLocale } from '@/components/providers/locale-provider';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function BlogArticlePage({
  slug,
  title,
  category,
}: {
  slug: string;
  title: string;
  category: string;
}) {
  const { t } = useLocale();

  return (
    <div className="px-4 pt-32 pb-24 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <Link href="/blog" className="mb-8 inline-flex items-center gap-1.5 text-sm text-white/55 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            {t('blog.backToBlog')}
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <article>
            <span className="text-xs font-medium text-tazcal-primary">{category}</span>
            <h1 className="mt-2 text-4xl font-bold text-gradient sm:text-5xl">{title}</h1>
            <div className="mt-4 flex items-center gap-3 text-sm text-white/45">
              <span>{t('blog.author')}</span>
              <span>·</span>
              <span>{t('blog.date')}</span>
            </div>

            <div className="mt-8">
              <PlaceholderAsset name={`${t('placeholder.blogCover')}: ${title}`} size="1600x900" minHeight={300} className="w-full" />
            </div>

            <div className="mt-8">
              {/* NEEDED: article content */}
              <GlassCard className="p-8">
                <p className="text-sm leading-relaxed text-white/50">
                  {t('blog.contentPlaceholder')}
                </p>
              </GlassCard>
            </div>

            <div className="mt-12">
              <h2 className="mb-4 text-lg font-semibold text-white">{t('blog.relatedArticles')}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {[1, 2].map((i) => (
                  <GlassCard key={i} hover className="p-4">
                    <PlaceholderAsset name={t('placeholder.relatedCover')} size="1600x900" minHeight={100} />
                    <p className="mt-3 text-sm text-white/50">{t('blog.contentPlaceholder')}</p>
                  </GlassCard>
                ))}
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </div>
  );
}
