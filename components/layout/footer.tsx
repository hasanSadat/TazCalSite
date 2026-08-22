'use client';

import Link from 'next/link';
import { useLocale } from '@/components/providers/locale-provider';
import { Globe, ChevronDown, Send, Instagram, Twitter, Youtube, Linkedin, MessageCircle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { languages } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const socialLinks = [
  { name: 'Telegram', href: '#', Icon: Send },
  { name: 'Instagram', href: '#', Icon: Instagram },
  { name: 'X', href: '#', Icon: Twitter },
  { name: 'Reddit', href: '#', Icon: MessageCircle },
  { name: 'YouTube', href: '#', Icon: Youtube },
  { name: 'LinkedIn', href: '#', Icon: Linkedin },
];

const linkHover = { x: 4, color: 'rgba(255,255,255,1)' };
const linkTap = { scale: 0.97 };
const springTransition = { type: 'spring' as const, stiffness: 400, damping: 30 };

function FooterLink({ href, labelKey, t }: { href: string; labelKey: string; t: (k: string) => string }) {
  return (
    <motion.li whileHover={linkHover} whileTap={linkTap} transition={springTransition}>
      <Link href={href} className="inline-block rounded-lg px-1 py-0.5 text-sm text-white/55 hover:text-white hover:shadow-[0_0_12px_rgba(122,60,255,0.15)] transition-all duration-300">
        {t(labelKey)}
      </Link>
    </motion.li>
  );
}

export function Footer() {
  const { t, locale, setLocale, dir } = useLocale();
  const [langOpen, setLangOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <footer className="relative z-10 mt-24 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
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
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">{t('footer.tagline')}</p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ name, href, Icon }) => (
                <motion.a
                  key={name}
                  href={href}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  transition={springTransition}
                  className="flex h-9 w-9 items-center justify-center rounded-xl glass text-white/55 hover:text-white hover:bg-tazcal-primary/15 hover:shadow-[0_0_16px_rgba(122,60,255,0.2)] transition-all duration-300"
                  aria-label={name}
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-gradient">{t('footer.product')}</h4>
            <ul className="space-y-2.5">
              <FooterLink href="/features" labelKey="nav.features" t={t} />
              <FooterLink href="/ai" labelKey="nav.ai" t={t} />
              {/* <FooterLink href="/pricing" labelKey="nav.pricing" t={t} /> */}
              <FooterLink href="/download" labelKey="nav.download" t={t} />
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-gradient">{t('footer.resources')}</h4>
            <ul className="space-y-2.5">
              {/* <FooterLink href="/blog" labelKey="nav.blog" t={t} /> */}
              <FooterLink href="/support" labelKey="nav.support" t={t} />
              <FooterLink href="/roadmap" labelKey="nav.roadmap" t={t} />
              {/* <FooterLink href="/changelog" labelKey="nav.changelog" t={t} /> */}
              <FooterLink href="/support#faq" labelKey="nav.faq" t={t} />
              <FooterLink href="/feature-requests" labelKey="nav.featureRequests" t={t} />
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-gradient">{t('footer.company')}</h4>
            <ul className="space-y-2.5">
              <FooterLink href="/about" labelKey="nav.about" t={t} />
              <FooterLink href="/support#contact" labelKey="nav.contact" t={t} />
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-gradient">{t('footer.legal')}</h4>
            <ul className="space-y-2.5">
              <FooterLink href="/privacy" labelKey="footer.privacy" t={t} />
              <FooterLink href="/terms" labelKey="footer.terms" t={t} />
              <FooterLink href="/privacy#cookies" labelKey="footer.cookies" t={t} />
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/40">{t('footer.version')}</span>
            <span className="text-xs text-white/40">·</span>
            <span className="text-xs text-white/40">© {new Date().getFullYear()} Tazcal. {t('footer.rights')}</span>
          </div>

          <div className="relative" ref={ref}>
            <motion.button
              onClick={() => setLangOpen((v) => !v)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={springTransition}
              className="flex items-center gap-1.5 rounded-lg glass px-3 py-1.5 text-sm text-white/65 hover:text-white transition-colors duration-200"
              aria-label={t('nav.menu')}
            >
              <Globe className="h-4 w-4" />
              {languages.find((l) => l.code === locale)?.name}
              <ChevronDown className={cn('h-3 w-3 transition-transform', langOpen && 'rotate-180')} />
            </motion.button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={springTransition}
                  className={cn('absolute bottom-full mb-1 glass rounded-xl p-1.5 min-w-[140px]', dir === 'rtl' ? 'left-0' : 'right-0')}
                >
                  {languages.map((lang) => (
                    <motion.button
                      key={lang.code}
                      onClick={() => { setLocale(lang.code); setLangOpen(false); }}
                      whileHover={{ x: dir === 'rtl' ? -3 : 3 }}
                      transition={springTransition}
                      className={cn(
                        'block w-full rounded-lg px-3 py-2 text-start text-sm transition-colors',
                        locale === lang.code ? 'bg-tazcal-primary/20 text-white' : 'text-white/65 hover:bg-white/10 hover:text-white'
                      )}
                    >
                      {lang.name}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </footer>
  );
}
