'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, Globe, Download, LogIn } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale } from '@/components/providers/locale-provider';
import { languages } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { PrimaryButton } from '@/components/ui/buttons';
import Image from 'next/image';

const navLinks = [
  { href: '/features', labelKey: 'nav.features' },
  { href: '/ai', labelKey: 'nav.ai' },
  // { href: '/pricing', labelKey: 'nav.pricing' },
];

const resourceLinks = [
  // { href: '/blog', labelKey: 'nav.blog' },
  { href: '/support', labelKey: 'nav.support' },
  { href: '/roadmap', labelKey: 'nav.roadmap' },
  // { href: '/changelog', labelKey: 'nav.changelog' },
  { href: '/support#faq', labelKey: 'nav.faq' },
  { href: '/feature-requests', labelKey: 'nav.featureRequests' },
];

const dropdownSpring = { type: 'spring' as const, stiffness: 400, damping: 30 };

const dropdownVariants = {
  initial: { opacity: 0, y: -4 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
};

const mobileMenuVariants = {
  initial: { opacity: 0, y: -8, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -8, scale: 0.98 },
};

const HOVER_CLOSE_DELAY = 200;

export function NavBar() {
  const pathname = usePathname();
  const { t, locale, setLocale, dir } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const resourcesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearResourcesCloseTimer = useCallback(() => {
    if (resourcesCloseTimer.current) {
      clearTimeout(resourcesCloseTimer.current);
      resourcesCloseTimer.current = null;
    }
  }, []);

  const handleResourcesEnter = useCallback(() => {
    clearResourcesCloseTimer();
    setResourcesOpen(true);
  }, [clearResourcesCloseTimer]);

  const handleResourcesLeave = useCallback(() => {
    clearResourcesCloseTimer();
    resourcesCloseTimer.current = setTimeout(() => {
      setResourcesOpen(false);
      resourcesCloseTimer.current = null;
    }, HOVER_CLOSE_DELAY);
  }, [clearResourcesCloseTimer]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setResourcesOpen(false);
    setLangOpen(false);
  }, [pathname]);

  useEffect(() => {
    return () => clearResourcesCloseTimer();
  }, [clearResourcesCloseTimer]);

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'py-2' : 'py-4'
      )}
    >
      <nav
        className={cn(
          'mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-2xl px-4 py-2.5 transition-all duration-300 sm:px-6',
          scrolled ? 'glass glass-glow' : 'glass'
        )}
      >
        <Link href="/" className="flex items-center gap-2 shrink-0">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl text-gradient glow-primary">
  <Image 
    src="/images/icon_foreground.png" 
    alt="Tazcal Icon"
    width={36}  // عرض رو به اندازه container تنظیم کنید (h-9 = 36px)
    height={36} // ارتفاع رو به اندازه container تنظیم کنید (w-9 = 36px)
    className="rounded-xl" // برای هماهنگی با rounded-xl container
 
 />
</div>
          <span className="text-lg font-bold tracking-tight text-gradient">Tazcal</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'relative rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-300',
                isActive(link.href)
                  ? 'text-white bg-tazcal-primary/10 shadow-[0_0_12px_rgba(122,60,255,0.15)]'
                  : 'text-white/65 hover:text-white hover:bg-tazcal-primary/8 hover:shadow-[0_0_16px_rgba(122,60,255,0.12)]'
              )}
            >
              {t(link.labelKey)}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={handleResourcesEnter}
            onMouseLeave={handleResourcesLeave}
          >
            <button
              className={cn(
                'flex items-center gap-1 rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-300',
                resourcesOpen
                  ? 'text-white bg-tazcal-primary/10 shadow-[0_0_12px_rgba(122,60,255,0.15)]'
                  : 'text-white/65 hover:text-white hover:bg-tazcal-primary/8 hover:shadow-[0_0_16px_rgba(122,60,255,0.12)]'
              )}
              aria-haspopup="true"
              aria-expanded={resourcesOpen}
            >
              {t('nav.resources')}
              <ChevronDown className={cn('h-4 w-4 transition-transform duration-300', resourcesOpen && 'rotate-180')} />
            </button>
            <AnimatePresence>
              {resourcesOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={dropdownSpring}
                  className="absolute top-full mt-2 glass rounded-2xl p-2 min-w-[200px]"
                >
                  {resourceLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-xl px-3 py-2 text-sm text-white/65 hover:text-white hover:bg-tazcal-primary/10 hover:shadow-[0_0_12px_rgba(122,60,255,0.1)] transition-all duration-300"
                    >
                      {t(item.labelKey)}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1 rounded-xl px-2.5 py-2 text-sm text-white/65 hover:text-white hover:bg-tazcal-primary/8 hover:shadow-[0_0_12px_rgba(122,60,255,0.1)] transition-all duration-300"
              aria-label={t('nav.menu')}
              aria-haspopup="true"
              aria-expanded={langOpen}
            >
              <Globe className="h-4 w-4" />
              <span className="hidden lg:inline">{languages.find((l) => l.code === locale)?.name}</span>
              <ChevronDown className={cn('h-3 w-3 transition-transform duration-300', langOpen && 'rotate-180')} />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={dropdownSpring}
                  className={cn(
                    'absolute top-full mt-2 glass rounded-2xl p-2 min-w-[140px]',
                    dir === 'rtl' ? 'left-0' : 'right-0'
                  )}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setLocale(lang.code); setLangOpen(false); }}
                      className={cn(
                        'block w-full rounded-xl px-3 py-2 text-start text-sm transition-all duration-300',
                        locale === lang.code
                          ? 'bg-tazcal-primary/15 text-white shadow-[0_0_12px_rgba(122,60,255,0.12)]'
                          : 'text-white/65 hover:bg-tazcal-primary/10 hover:text-white hover:shadow-[0_0_12px_rgba(122,60,255,0.08)]'
                      )}
                    >
                      {lang.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* <Link
            href="/login"
            className="hidden items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-white/65 hover:text-white hover:bg-tazcal-primary/8 hover:shadow-[0_0_12px_rgba(122,60,255,0.1)] transition-all duration-300 sm:flex"
          >
            <LogIn className="h-4 w-4" />
            {t('nav.login')}
          </Link> */}

          <Link href="/download" className="hidden sm:block">
            <PrimaryButton className="px-4 py-2 text-sm">
              <Download className="h-4 w-4" />
              {t('nav.getapp')}
            </PrimaryButton>
          </Link>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-xl p-2 text-white hover:bg-tazcal-primary/10 hover:shadow-[0_0_12px_rgba(122,60,255,0.1)] transition-all duration-300 md:hidden"
            aria-label={t('nav.menu')}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            className="md:hidden"
          >
            <div className="mx-4 mt-2">
              <div className="glass rounded-2xl p-4">
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300',
                        isActive(link.href)
                          ? 'bg-tazcal-primary/10 text-white shadow-[0_0_12px_rgba(122,60,255,0.12)]'
                          : 'text-white/65 hover:bg-tazcal-primary/8 hover:text-white'
                      )}
                    >
                      {t(link.labelKey)}
                    </Link>
                  ))}

                  <button
                    onClick={() => setResourcesOpen((v) => !v)}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-white/65 hover:bg-tazcal-primary/8 hover:text-white transition-all duration-300"
                  >
                    {t('nav.resources')}
                    <ChevronDown className={cn('h-4 w-4 transition-transform duration-300', resourcesOpen && 'rotate-180')} />
                  </button>
                  <AnimatePresence>
                    {resourcesOpen && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={dropdownSpring}
                        className="flex flex-col gap-0.5 ps-4"
                      >
                        {resourceLinks.map((item) => (
                          <Link key={item.href} href={item.href} className="rounded-xl px-3 py-2 text-sm text-white/55 hover:text-white hover:bg-tazcal-primary/8 transition-all duration-300">
                            {t(item.labelKey)}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Link href="/login" className="rounded-xl px-3 py-2.5 text-sm font-medium text-white/65 hover:bg-tazcal-primary/8 hover:text-white transition-all duration-300">
                    {t('nav.login')}
                  </Link>
                  <Link href="/download" className="mt-2">
                    <PrimaryButton className="w-full">
                      <Download className="h-4 w-4" />
                      {t('nav.getapp')}
                    </PrimaryButton>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
