import { getCurrentUser } from '@/lib/auth/get-current-user';
import { FileText, MessageSquare, HelpCircle, Lightbulb } from 'lucide-react';
import { redirect } from 'next/navigation';

/**
 * Admin dashboard — placeholder welcome page.
 * Shows the admin's name and empty stat cards that will be populated later.
 */
export default async function AdminDashboardPage() {
  const current = await getCurrentUser();

  if (!current) {
    redirect('/404');
  }

  const displayName = current.profile.full_name || current.profile.username || 'Admin';

  const stats = [
    { label: 'Total Posts', value: 0, icon: FileText },
    { label: 'Total Comments', value: 0, icon: MessageSquare },
    { label: 'Pending Comments', value: 0, icon: HelpCircle },
    { label: 'Feature Requests', value: 0, icon: Lightbulb },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gradient">
          Welcome back, {displayName}
        </h1>
        <p className="mt-2 text-sm text-white/55">
          This is your admin dashboard. Real data will appear here soon.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="glass rounded-2xl p-5"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-tazcal-primary/10">
                <Icon className="h-5 w-5 text-tazcal-primary" />
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="mt-1 text-xs text-white/45">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
