'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { PrimaryButton } from '@/components/ui/buttons';
import { Reveal } from '@/components/ui/reveal';
import { useLocale } from '@/components/providers/locale-provider';
import { useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  status: 'draft' | 'published' | 'scheduled' | 'archived';
}

const initialPosts: Post[] = [
  { id: 1, title: 'NEEDED: post title', excerpt: 'NEEDED: excerpt', category: 'Nutrition', status: 'published' },
  { id: 2, title: 'NEEDED: post title', excerpt: 'NEEDED: excerpt', category: 'Science', status: 'draft' },
];

const statusColors: Record<string, string> = {
  draft: 'bg-white/10 text-white/50',
  published: 'bg-tazcal-success/15 text-tazcal-success',
  scheduled: 'bg-tazcal-accent/15 text-tazcal-accent',
  archived: 'bg-white/5 text-white/30',
};

export function BlogAdminPage() {
  const { t } = useLocale();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', category: '', tags: '', status: 'draft' as Post['status'] });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPost: Post = {
      id: Date.now(),
      title: form.title,
      excerpt: form.excerpt,
      category: form.category || 'General',
      status: form.status,
    };
    setPosts((prev) => [newPost, ...prev]);
    setForm({ title: '', excerpt: '', content: '', category: '', tags: '', status: 'draft' });
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="px-4 pt-32 pb-24 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gradient sm:text-4xl">{t('blog.admin.title')}</h1>
              <p className="mt-2 text-sm text-white/55">{t('blog.admin.subtitle')}</p>
            </div>
            <PrimaryButton onClick={() => setShowForm((v) => !v)} className="text-sm">
              <Plus className="h-4 w-4" />
              {t('blog.admin.newPost')}
            </PrimaryButton>
          </div>
        </Reveal>

        {showForm && (
          <Reveal>
            <GlassCard glow className="mb-8 p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold text-white">{t('blog.admin.newPost')}</h2>
                  <button type="button" onClick={() => setShowForm(false)} className="rounded-lg p-2 text-white/55 hover:text-white">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white/70">{t('blog.admin.postTitle')}</label>
                  <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-xl glass px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-tazcal-primary" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white/70">{t('blog.admin.excerpt')}</label>
                  <textarea required rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="w-full rounded-xl glass px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-tazcal-primary resize-none" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white/70">{t('blog.admin.content')}</label>
                  <textarea required rows={6} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full rounded-xl glass px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-tazcal-primary resize-none" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-white/70">{t('blog.admin.category')}</label>
                    <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-xl glass px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-tazcal-primary" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-white/70">{t('blog.admin.tags')}</label>
                    <input type="text" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="w-full rounded-xl glass px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-tazcal-primary" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white/70">{t('blog.admin.statusLabel')}</label>
                  <div className="flex gap-2">
                    {(['draft', 'published', 'scheduled', 'archived'] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setForm({ ...form, status: s })}
                        className={cn(
                          'rounded-xl px-4 py-2 text-sm font-medium transition-colors',
                          form.status === s ? 'bg-tazcal-primary/20 text-white' : 'glass text-white/55 hover:text-white'
                        )}
                      >
                        {t(`common.${s}`)}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white/70">{t('blog.admin.featuredImage')}</label>
                  <div className="placeholder-asset" style={{ minHeight: 100 }}>
                    <span className="text-xs">NEEDED: {t('blog.admin.featuredImage')}</span>
                  </div>
                </div>
                <PrimaryButton type="submit" className="text-sm">{t('common.save')}</PrimaryButton>
              </form>
            </GlassCard>
          </Reveal>
        )}

        <Reveal>
          <h2 className="mb-4 text-lg font-semibold text-white">{t('blog.admin.postList')}</h2>
          {posts.length === 0 ? (
            <GlassCard className="p-12 text-center">
              <p className="text-white/55">{t('blog.admin.noPosts')}</p>
            </GlassCard>
          ) : (
            <div className="space-y-3">
              {posts.map((post) => (
                <GlassCard key={post.id} hover className="flex items-center gap-4 p-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white">{post.title}</h3>
                    <p className="mt-0.5 text-xs text-white/45">{post.excerpt}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/50">{post.category}</span>
                      <span className={cn('rounded-full px-2 py-0.5 text-xs', statusColors[post.status])}>{t(`common.${post.status}`)}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button className="rounded-lg glass p-2 text-white/55 hover:text-white" aria-label={t('common.edit')}>
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(post.id)} className="rounded-lg glass p-2 text-white/55 hover:text-tazcal-danger" aria-label={t('common.delete')}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </Reveal>

        <p className="mt-8 text-center text-xs text-white/30">{t('blog.admin.placeholder')}</p>
      </div>
    </div>
  );
}
