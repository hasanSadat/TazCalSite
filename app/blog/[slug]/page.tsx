import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogArticlePage } from '@/components/pages/blog-article-page';

const articles: Record<string, { title: string; description: string; category: string }> = {
  'best-weight-loss-approaches': { title: 'Best Weight-Loss Approaches', description: 'Evidence-based strategies for sustainable weight loss.', category: 'Nutrition' },
  'understanding-tdee': { title: 'Understanding TDEE', description: 'What Total Daily Energy Expenditure means and why it matters.', category: 'Nutrition' },
  'what-is-met': { title: 'What is MET?', description: 'Metabolic Equivalent of Task explained.', category: 'Science' },
  'how-much-protein-per-day': { title: 'How Much Protein Per Day?', description: 'Protein needs by activity level and goals.', category: 'Nutrition' },
  'building-better-habits': { title: 'Building Better Habits', description: 'The science of habit formation.', category: 'Productivity' },
  'planning-your-day': { title: 'Planning Your Day for Success', description: 'How structured daily planning improves outcomes.', category: 'Productivity' },
};

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = articles[params.slug];
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/blog/${params.slug}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      url: `/blog/${params.slug}`,
    },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const article = articles[params.slug];
  if (!article) notFound();
  return <BlogArticlePage slug={params.slug} title={article.title} category={article.category} />;
}
