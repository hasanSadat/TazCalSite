'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { PlaceholderAsset } from '@/components/ui/placeholder-asset';
import { Reveal } from '@/components/ui/reveal';
import { useLocale } from '@/components/providers/locale-provider';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useMemo } from 'react';

const articles = [
  { slug: 'best-weight-loss-approaches', title: 'Best Weight-Loss Approaches', excerpt: 'Evidence-based strategies for sustainable weight loss.', categoryKey: 'blog.category.nutrition' },
  { slug: 'understanding-tdee', title: 'Understanding TDEE', excerpt: 'What Total Daily Energy Expenditure means and why it matters.', categoryKey: 'blog.category.nutrition' },
  { slug: 'what-is-met', title: 'What is MET?', excerpt: 'Metabolic Equivalent of Task explained — and how Tazcal uses it.', categoryKey: 'blog.category.science' },
  { slug: 'how-much-protein-per-day', title: 'How Much Protein Per Day?', excerpt: 'Protein needs by activity level, body weight, and goals.', categoryKey: 'blog.category.nutrition' },
  { slug: 'building-better-habits', title: 'Building Better Habits', excerpt: 'The science of habit formation and how to make habits stick.', categoryKey: 'blog.category.productivity' },
  { slug: 'planning-your-day', title: 'Planning Your Day for Success', excerpt: 'How structured daily planning improves focus and outcomes.', categoryKey: 'blog.category.productivity' },
];

const ARTICLES_PER_PAGE = 10;

export function BlogIndexPage() {
  const { t } = useLocale();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!search.trim()) return articles;
    const q = search.toLowerCase();
    return articles.filter(
      (a) => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q)
    );
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ARTICLES_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * ARTICLES_PER_PAGE, currentPage * ARTICLES_PER_PAGE);

  return (
    <div className="px-4 pt-32 pb-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gradient sm:text-5xl lg:text-6xl">{t('blog.title')}</h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/55">
              {t('blog.subtitle')}
            </p>
            <p className="mt-2 text-sm text-white/40">
              {articles.length} {t('blog.totalArticles')}
            </p>
          </div>
        </Reveal>

        {/* Search bar */}
        <Reveal>
          <div className="mb-10 flex justify-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute top-1/2 -translate-y-1/2 left-4 h-4 w-4 text-white/40" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder={t('common.searchPlaceholder')}
                className="w-full rounded-2xl glass px-4 py-3 pl-11 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-tazcal-primary"
              />
            </div>
          </div>
        </Reveal>

        {/* Articles grid or no results */}
        {paginated.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginated.map((article, i) => (
              <Reveal key={article.slug} delay={i * 0.05}>
                <a href={`/blog/${article.slug}`} className="block h-full">
                  <GlassCard hover className="h-full overflow-hidden">
                    <PlaceholderAsset name={`${t('placeholder.blogCover')}: ${article.title}`} size="1600x900" minHeight={180} />
                    <div className="p-6">
                      <span className="text-xs font-medium text-tazcal-primary">{t(article.categoryKey)}</span>
                      <h2 className="mt-2 text-lg font-semibold text-white">{article.title}</h2>
                      <p className="mt-2 text-sm text-white/55">{article.excerpt}</p>
                    </div>
                  </GlassCard>
                </a>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg text-white/50">{t('blog.noResults')}</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1.5 rounded-xl glass px-4 py-2 text-sm font-medium text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              {t('common.previous')}
            </button>
            <span className="text-sm text-white/50">
              {t('common.page')} {currentPage} {t('common.of')} {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1.5 rounded-xl glass px-4 py-2 text-sm font-medium text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              {t('common.next')}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
