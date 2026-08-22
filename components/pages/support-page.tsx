'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { Reveal } from '@/components/ui/reveal';
import { PrimaryButton } from '@/components/ui/buttons';
import { useLocale } from '@/components/providers/locale-provider';
import { ChevronDown, Mail, MessageCircle, Bug } from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const generalFaqs = [
  { qKey: 'support.faq1q', aKey: 'support.faq1a' },
  { qKey: 'support.faq2q', aKey: 'support.faq2a' },
  { qKey: 'support.faq3q', aKey: 'support.faq3a' },
  { qKey: 'support.faq4q', aKey: 'support.faq4a' },
  { qKey: 'support.faq5q', aKey: 'support.faq5a' },
  { qKey: 'support.faq6q', aKey: 'support.faq6a' },
];

const springTransition = { type: 'spring' as const, stiffness: 260, damping: 26 };

export function SupportPage() {
  const { t } = useLocale();
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="px-4 pt-32 pb-24 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="mb-16 text-center">
            <h1 className="text-4xl font-bold text-gradient sm:text-5xl">{t('support.title')}</h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/55">
              {t('support.subtitle')}
            </p>
          </div>
        </Reveal>

        {/* FAQ */}
        <Reveal>
          <div id="faq" className="mb-16">
            <h2 className="mb-6 text-2xl font-bold text-gradient">{t('support.faqTitle')}</h2>
            <div className="space-y-3">
              {generalFaqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={i} className="glass rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="flex w-full cursor-pointer items-center justify-between p-5 text-base font-medium text-white"
                      aria-expanded={isOpen}
                    >
                      {t(faq.qKey)}
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={springTransition}
                      >
                        <ChevronDown className="h-5 w-5 text-white/50" />
                      </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={springTransition}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 text-sm leading-relaxed text-white/60">{t(faq.aKey)}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Contact form */}
        <Reveal>
          <div id="contact" className="mb-16">
            <h2 className="mb-6 text-2xl font-bold text-gradient">{t('support.contactTitle')}</h2>
            <GlassCard className="p-8">
              {submitted ? (
                <div className="py-8 text-center">
                  <div className="mb-3 text-4xl">✓</div>
                  <p className="text-lg font-medium text-white">{t('support.contactSuccess')}</p>
                  <p className="mt-2 text-sm text-white/55">{t('support.contactSuccessDesc')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-white/70">{t('common.name')}</label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full rounded-xl glass px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-tazcal-primary"
                      placeholder={t('common.name')}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-white/70">{t('support.email')}</label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full rounded-xl glass px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-tazcal-primary"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-white/70">{t('common.message')}</label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full rounded-xl glass px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-tazcal-primary resize-none"
                      placeholder={t('common.message')}
                    />
                  </div>
                  <PrimaryButton type="submit" className="w-full">{t('common.send')}</PrimaryButton>
                </form>
              )}
            </GlassCard>
          </div>
        </Reveal>

        {/* Other contact channels */}
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            <GlassCard hover className="p-6 text-center">
              <Mail className="mx-auto mb-3 h-6 w-6 text-tazcal-primary" />
              <h3 className="text-sm font-semibold text-white">{t('support.email')}</h3>
              <p className="mt-1 text-xs text-white/50">tazCalApplication@gmail.com</p>
            </GlassCard>
            {/* <GlassCard hover className="p-6 text-center">
              <MessageCircle className="mx-auto mb-3 h-6 w-6 text-tazcal-primary" />
              <h3 className="text-sm font-semibold text-white">{t('support.social')}</h3>
              <p className="mt-1 text-xs text-white/50">NEEDED: social links</p>
            </GlassCard> */}
            <GlassCard hover className="p-6 text-center">
              <Bug className="mx-auto mb-3 h-6 w-6 text-tazcal-primary" />
              <h3 className="text-sm font-semibold text-white">{t('support.reportProblem')}</h3>
              <p className="mt-1 text-xs text-white/50">{t('support.reportDesc')}</p>
            </GlassCard>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
