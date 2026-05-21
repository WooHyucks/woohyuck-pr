import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { springPresets } from '@/lib/motion';

interface SectionTitleProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionTitle({ badge, title, subtitle, align = 'center' }: SectionTitleProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={springPresets.gentle}
      className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      {badge && (
        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 font-mono text-xs uppercase tracking-widest">
          {badge}
        </Badge>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">{title}</h2>
      {subtitle && (
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
      )}
    </motion.div>
  );
}

interface NeonBadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'accent' | 'success' | 'warning';
}

export function NeonBadge({ children, variant = 'primary' }: NeonBadgeProps) {
  const styles = {
    primary: 'bg-primary/10 text-primary border-primary/30',
    accent: 'bg-accent/10 text-accent border-accent/30',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border ${styles[variant]}`}>
      {children}
    </span>
  );
}

export function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-2xl border border-border/50 bg-card/60 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-lg group ${className}`}
      style={{
        boxShadow: '0 4px 24px -4px rgba(0,0,0,0.3)',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      {children}
    </div>
  );
}
