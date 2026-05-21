import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Users, Calendar, Cpu, TrendingUp, CheckCircle } from 'lucide-react';
import { GlassCard, NeonBadge } from '@/components/UI';
import { springPresets, staggerContainer, staggerItem } from '@/lib/motion';
import type { Project } from '@/lib/index';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...springPresets.gentle, delay: index * 0.15 }}
    >
      <GlassCard className="p-0 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative h-56 md:h-auto overflow-hidden bg-muted/30">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover  group-hover:opacity-90 transition-opacity duration-500 scale-105 group-hover:scale-100 transition-transform duration-700"
            />

            {/* Status badge */}
            <div className="absolute top-4 left-4">
              {project.status === 'active' ? (
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  진행중
                </span>
              ) : (
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-muted/60 text-muted-foreground border border-border/50 backdrop-blur-sm">
                  완료
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{project.name}</h3>
                  <p className="text-primary text-sm font-mono mt-0.5">{project.subtitle}</p>
                </div>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>

              {/* Meta info */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  {project.period}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Users className="w-3.5 h-3.5 text-primary" />
                  {project.teamSize}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground col-span-2">
                  <Cpu className="w-3.5 h-3.5 text-accent" />
                  <span className="text-accent font-medium">기여도 {project.contribution}</span>
                </div>
              </div>

              {/* AI Optimization highlight */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-3.5 mb-4">
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <p className="text-xs text-foreground/80 leading-relaxed">{project.aiOptimization}</p>
                </div>
              </div>

              {/* Achievements */}
              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="space-y-1.5 mb-5"
              >
                {project.achievements.map((ach) => (
                  <motion.li key={ach} variants={staggerItem} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    {ach}
                  </motion.li>
                ))}
              </motion.ul>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.techStack.map((tech) => (
                  <NeonBadge key={tech} variant="primary">{tech}</NeonBadge>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-3">
              {project.url && (
                <Button size="sm" asChild className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5">
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-3.5 h-3.5" />
                    라이브 데모
                  </a>
                </Button>
              )}
              {project.github && (
                <Button size="sm" variant="outline" asChild className="gap-1.5 border-border/60 hover:border-primary/40">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-3.5 h-3.5" />
                    GitHub
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
