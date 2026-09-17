'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Lightbulb,
  Headphones,
  HelpCircle,
  Map,
  GitBranch,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';
import type { ProfileRow } from '@/lib/supabase/types';

interface NavItem {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
}

const navItems: NavItem[] = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/comments', label: 'Comments', icon: MessageSquare },
  { href: '/admin/feature-requests', label: 'Feature Requests', icon: Lightbulb },
  { href: '/admin/support', label: 'Support', icon: Headphones },
  { href: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
  { href: '/admin/roadmap', label: 'Roadmap', icon: Map },
  { href: '/admin/changelog', label: 'Changelog', icon: GitBranch },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

interface AdminSidebarProps {
  profile: Pick<ProfileRow, 'full_name' | 'username' | 'avatar_url'>;
}

export function AdminSidebar({ profile }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const displayName = profile.full_name || profile.username || 'Admin';

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-tazcal-primary to-tazcal-secondary text-lg font-bold text-white glow-primary">
          T
        </div>
        <span className="text-lg font-bold text-gradient">Tazcal Admin</span>
      </div>

      {/* Admin profile */}
      <div className="mx-3 mb-4 flex items-center gap-3 rounded-2xl glass px-4 py-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-tazcal-primary to-tazcal-secondary text-sm font-bold text-white">
          {displayName.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{displayName}</p>
          <p className="truncate text-xs text-white/45">Administrator</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200',
                    active
                      ? 'bg-tazcal-primary/15 text-white shadow-[0_0_12px_rgba(122,60,255,0.15)]'
                      : 'text-white/55 hover:bg-tazcal-primary/8 hover:text-white'
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="px-3 py-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-white/55 transition-all duration-200 hover:bg-tazcal-danger/10 hover:text-tazcal-danger"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile header bar */}
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between glass px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-tazcal-primary to-tazcal-secondary text-sm font-bold text-white">
            T
          </div>
          <span className="text-sm font-bold text-gradient">Tazcal Admin</span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-xl p-2 text-white/65 hover:bg-white/10 hover:text-white transition-all"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 transform glass border-r border-white/10 transition-transform duration-300 lg:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute right-3 top-4 rounded-xl p-1.5 text-white/55 hover:bg-white/10 hover:text-white"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
        {sidebarContent}
      </div>

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 w-64 border-r border-white/10 glass">
        {sidebarContent}
      </aside>
    </>
  );
}
