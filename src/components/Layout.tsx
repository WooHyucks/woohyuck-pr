import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Zap } from 'lucide-react';
import { springPresets } from '@/lib/motion';
import { BRAND, ROUTE_PATHS } from '@/lib/index';

const NAV_ITEMS = [
  { label: '소개', href: 'about' },
  { label: '무료 상담', href: 'free-consult' },
  { label: '서비스', href: 'pricing' },
  { label: '프로젝트', href: 'projects' },
  { label: '경력', href: 'experience' },
  { label: '기술스택', href: 'skills' },
  { label: '연락하기', href: 'contact' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={springPresets.gentle}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground font-mono text-sm">
              {BRAND.slice(0, 3)}
              <span className="text-primary">{BRAND.slice(3)}</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50 font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              className="hidden md:flex bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-md shadow-primary/20"
              onClick={() => scrollTo('contact')}
            >
              무료 상담
            </Button>
            <button
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={springPresets.snappy}
            className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
          >
            <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="text-left px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors font-medium"
                >
                  {item.label}
                </button>
              ))}
              <Button
                size="sm"
                className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                onClick={() => scrollTo('contact')}
              >
                무료 MVP 상담
              </Button>
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Main */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <Zap className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="text-sm text-muted-foreground font-mono">{BRAND} — 무료 상담부터, 필요할 때만 함께</span>
          </div>
          <p className="text-xs text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 justify-center md:justify-end">
            <span>© 2026 김우혁. 상담은 무료 — 검증이 먼저인 파트너십을 지향합니다.</span>
            {/* <Link to={ROUTE_PATHS.PPT} className="text-primary hover:underline font-mono">
              프로필용 PPT →
            </Link> */}
          </p>
        </div>
      </footer>
    </div>
  );
}
