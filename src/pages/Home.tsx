import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight, Bot, Code2, Gift, Mail, Github, MessageSquare, Phone,
  Shield, Zap, CheckCircle, Clock, DollarSign, Star,
  ChevronRight, Target,
} from 'lucide-react';
import { SiReact, SiTypescript, SiPython, SiAmazon } from 'react-icons/si';
import { springPresets, staggerContainer, staggerItem } from '@/lib/motion';
import { SectionTitle, GlassCard, NeonBadge } from '@/components/UI';
import { ProjectCard } from '@/components/ProjectCard';
import { ContactModal } from '@/components/ContactModal';
import { PROJECTS, EXPERIENCES, TECH_STACKS, SERVICE_TIERS, CONTACT, mailtoHref } from '@/lib/index';
import { amplitudeEvents } from '@/lib/amplitude';

/* ========== HERO SECTION ========== */
function HeroSection({ onOpenModal }: { onOpenModal: () => void }) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Radial glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/8 blur-3xl pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 w-[300px] h-[300px] rounded-full bg-accent/6 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16 text-center">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springPresets.gentle, delay: 0.1 }}
          className="flex justify-center mb-6"
        >
          <span className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-primary text-sm font-mono font-medium">
            <Bot className="w-4 h-4" />
            AI MVP 전략가 + 빠른 구현 파트너
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springPresets.gentle, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.2] mb-6"
        >
          개발비 쓰기 전에,
          <br className="hidden sm:block" />
          <span className="text-primary mt-2 block sm:inline"> 먼저 검증 방향부터 정리합니다</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springPresets.gentle, delay: 0.3 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-4"
        >
          <span className="text-foreground font-semibold">바로 개발을 권하지 않습니다.</span>
          <br className="hidden sm:block" />
          아이디어가 있다고 곧바로 MVP를 만들 필요는 없습니다.
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springPresets.gentle, delay: 0.35 }}
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-4"
        >
          무료 상담으로 지금 확인해야 할 고객 문제와 MVP 범위를 함께 정리하고, 아직 개발이 필요 없는 단계라면 그렇게 솔직하게 말씀드립니다.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springPresets.gentle, delay: 0.4 }}
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8"
        >
          검증할 것이 정리된 뒤에만 AI로 최소 범위 MVP를 빠르게 구현·배포합니다. 목표는 많이 만드는 것이 아니라,{' '}
          <span className="text-primary font-semibold">빠르게 배우고 다음 결정을 내리는 것</span>입니다.
        </motion.p>

        {/* Key metrics */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springPresets.gentle, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {[
            { label: '무료 상담으로 방향부터', value: '먼저 도움', icon: Gift },
            { label: '개발보다 검증 우선', value: '검증 우선', icon: Target },
            { label: '맞을 때만 다음 단계', value: '필요할 때만', icon: Shield },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm">
              <Icon className="w-4 h-4 text-primary" />
              <span className="font-mono font-bold text-foreground text-lg">{value}</span>
              <span className="text-muted-foreground text-sm">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springPresets.gentle, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <Button
            size="lg"
            onClick={onOpenModal}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 shadow-lg shadow-primary/25 gap-2"
          >
            무료 MVP 상담 신청하기
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollTo('projects')}
            className="border-border/60 hover:border-primary/40 font-semibold px-8 gap-2"
          >
            프로젝트 보기
            <ChevronRight className="w-4 h-4" />
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex flex-col items-center gap-1 text-muted-foreground/50">
            <div className="w-px h-8 bg-gradient-to-b from-transparent to-primary/50" />
            <span className="text-xs font-mono">scroll</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ========== ABOUT SECTION ========== */
function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          badge="About"
          title="먼저 도와드리고, 필요할 때만 함께합니다"
          subtitle="전문가가 일방적으로 진단한다기보다, 지금 단계에 맞는 다음 한 걸음을 같이 고릅니다. 상담 후 무조건 개발을 권하지 않습니다."
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: MessageSquare,
              title: '방향부터 듣기',
              desc: '아이디어를 코드로 바꾸기 전에, 지금 단계에서 무엇을 확인하면 좋은지부터 짚습니다. 개발보다 고객 인터뷰가 먼저라면 그렇게 말씀드립니다.',
              badge: 'Listen',
              badgeVariant: 'primary' as const,
            },
            {
              icon: Code2,
              title: '만들지 않을 것 고르기',
              desc: '초기에는 무엇을 만들지보다 무엇을 만들지 않을지가 더 중요할 때가 많습니다. 예산이 작다면 돈을 덜 쓰는 검증 방법부터 제안드립니다.',
              badge: 'Focus',
              badgeVariant: 'accent' as const,
            },
            {
              icon: Bot,
              title: '정리된 뒤의 실행',
              desc: '검증 범위가 정리된 뒤에만 AI와 자동화로 구현·배포를 함께 봅니다. 제가 도울 수 없는 영역이면 솔직하게 말씀드립니다.',
              badge: 'Build',
              badgeVariant: 'success' as const,
            },
          ].map(({ icon: Icon, title, desc, badge, badgeVariant }) => (
            <motion.div key={title} variants={staggerItem}>
              <GlassCard className="p-6 h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <NeonBadge variant={badgeVariant}>{badge}</NeonBadge>
                <h3 className="text-lg font-bold text-foreground mt-3 mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ========== FREE CONSULT SECTION ========== */
function FreeConsultSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const items = [
    '지금 바로 개발이 필요한 단계인지, 인터뷰·랜딩·노코드 테스트가 먼저인지',
    '먼저 검증해야 할 고객 문제는 무엇인지',
    '첫 MVP에 꼭 넣을 기능과 당분간 빼도 되는 기능',
    '예상 개발 범위와 리스크(과대 범위, 의존 기술 등)',
    '돈을 쓰기 전에 확인해 두면 좋은 것들',
  ];

  return (
    <section id="free-consult" className="py-24 px-4 sm:px-6 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          badge="무료 상담"
          title="무료 상담에서 함께 정리하는 것"
          subtitle="개발 전에 먼저 확인할 것들을 약 30~40분 안에서 가볍게 짚어 드립니다. 부담 없이 현재 단계만 점검하셔도 됩니다."
        />
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={springPresets.gentle}
        >
          <GlassCard className="p-6 md:p-8 max-w-3xl mx-auto">
            <ul className="space-y-3">
              {items.map((text) => (
                <li key={text} className="flex items-start gap-3 text-sm md:text-base text-foreground/90">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground text-center">
              상담은 무료이며, 무조건 개발을 권하지 않습니다. 필요한 경우에만 다음 단계를 제안드립니다.
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

/* ========== PRICING / COST COMPARISON SECTION ========== */
function PricingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6">
      <div ref={ref} className="max-w-6xl mx-auto">
        <SectionTitle
          badge="서비스"
          title="단계별로, 필요한 만큼만"
          subtitle="처음부터 큰 개발비를 쓰지 않아도 됩니다. 먼저 무료 상담으로 단계를 확인하고, 필요한 경우에만 작은 단위의 진단·기획·개발로 이어갑니다."
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-center text-muted-foreground text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          비용과 기간은 프로젝트마다 달라질 수 있어 아래는 대략적인 구간입니다. 세부는 상담 후 협의로 맞춥니다.
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-16"
        >
          {SERVICE_TIERS.map((item) => (
            <motion.div key={item.id} variants={staggerItem}>
              <div
                className={`relative rounded-2xl p-6 border transition-all duration-300 h-full flex flex-col ${
                  item.id === 'free-consult'
                    ? 'border-emerald-500/30 bg-emerald-500/5'
                    : item.highlight
                      ? 'border-primary/50 bg-primary/8 shadow-xl shadow-primary/10'
                      : 'border-border/40 bg-card/40'
                }`}
              >
                {item.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground font-mono text-xs px-3 whitespace-nowrap">
                      검증 정리 후 구현
                    </Badge>
                  </div>
                )}
                <h3 className={`font-bold text-lg mb-1 ${item.highlight ? 'text-primary' : 'text-foreground'}`}>
                  {item.label}
                </h3>
                <div className="mb-2 min-h-[2.5rem] flex items-center">
                  <span
                    className={`font-extrabold font-mono leading-tight ${
                      item.id === 'free-consult' ? 'text-2xl text-emerald-400' : item.highlight ? 'text-2xl sm:text-3xl text-primary' : 'text-xl sm:text-2xl text-foreground'
                    }`}
                  >
                    {item.priceLine}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  {item.time}
                </div>
                <p className="text-xs font-medium text-primary/90 mb-2 leading-snug">이런 분께</p>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3 flex-1">{item.target}</p>
                <p className={`text-xs leading-relaxed border-t border-border/40 pt-3 ${item.highlight ? 'text-foreground/80' : 'text-muted-foreground'}`}>
                  {item.note}
                </p>
                {item.highlight && (
                  <div className="mt-4 pt-3 border-t border-primary/20">
                    <div className="flex items-center gap-1.5 text-xs text-primary font-semibold">
                      <Zap className="w-3.5 h-3.5 shrink-0" />
                      범위·일정·금액은 협의
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Why cheaper but quality */}
        <div className="grid md:grid-cols-2 gap-8">
          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="font-bold text-foreground">흔한 실수</h3>
            </div>
            <ul className="space-y-2">
              {[
                '“간단한 MVP만”으로 시작했다가 로그인·관리자·결제·알림까지 붙어 풀서비스가 되는 경우',
                '출시 후 반응이 애매한데 원인 분석은 미뤄 두고 기능만 계속 추가하는 경우',
                '견적을 여러 번 받다 보니 예상보다 훨씬 큰 금액이 나오는 경우',
                '비용과 시간은 들었는데 무엇을 검증했는지 말하기 어려운 경우',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="font-bold text-foreground">함께 가는 방식</h3>
            </div>
            <ul className="space-y-2">
              {[
                '고객이 돈을 낼 핵심 문제를 먼저 정의',
                '검증할 가설을 1~3개로 좁힘',
                '첫 버전에 넣을 기능과 버릴 기능 구분',
                '정리된 뒤에만 AI로 빠르게 구현·배포',
                '실제 반응을 기준으로 유지·수정·중단 판단 — 끝은 “개발 완료”가 아니라 의사결정',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-foreground/80">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>

        {/* Period disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-8 p-4 rounded-xl border border-primary/20 bg-primary/5 text-center"
        >
          <p className="text-sm text-foreground/80">
            <span className="font-semibold text-primary">핵심 철학:</span> MVP는 작게 만드는 제품이 아니라{' '}
            <strong>빠르게 배우기 위한 제품</strong>입니다. 개발이 먼저가 아니라 무엇을 검증할지가 먼저이며, AI는 시장 반응
            기반으로 <strong>의사결정</strong>하기 위한 속도를 만드는 데 씁니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ========== PROJECTS SECTION ========== */
function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          badge="Projects"
          title="실제로 만든 프로덕트"
          subtitle="문제를 좁히고 검증 가능한 범위로 구현한 사례입니다. 비슷한 단계라면 참고해 주세요."
        />
        <div className="space-y-8">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========== EXPERIENCE SECTION ========== */
function ExperienceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          badge="Experience"
          title="실무 경력"
          subtitle="스타트업과 대기업 양쪽에서 쌓은 실전 개발 경험으로 다양한 환경에 빠르게 적응합니다."
        />
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-6"
        >
          {EXPERIENCES.map((exp) => (
            <motion.div key={exp.id} variants={staggerItem}>
              <GlassCard className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-5">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-foreground">{exp.company}</h3>
                    </div>
                    <p className="text-primary font-semibold text-sm">{exp.role}</p>
                  </div>
                  {exp.period && (
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground font-mono shrink-0">
                      <Clock className="w-4 h-4" />
                      {exp.period}
                    </div>
                  )}
                </div>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{exp.description}</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-primary mb-3">주요 업무</h4>
                    <ul className="space-y-2">
                      {exp.tasks.map((task) => (
                        <li key={task} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <ChevronRight className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-primary mb-3">사용 기술</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tech.map((t) => (
                        <NeonBadge key={t} variant="primary">{t}</NeonBadge>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ========== SKILLS SECTION ========== */
function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          badge="Skills"
          title="MVP를 빠르게 구현하는 기술 스택"
          subtitle="검증 속도를 최우선으로 설계된 기술 스택입니다. 빠른 프로토타이핑과 안정적인 배포를 동시에 지원합니다."
        />
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 xl:grid-cols-4 gap-5"
        >
          {TECH_STACKS.map((stack) => (
            <motion.div key={stack.category} variants={staggerItem}>
              <GlassCard className="p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{stack.icon}</span>
                  <h3 className="font-bold text-foreground">{stack.category}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {stack.items.map((item) => (
                    <NeonBadge key={item} variant="primary">{item}</NeonBadge>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust metrics */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...springPresets.gentle, delay: 0.5 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: '🚀', value: '200+', label: 'MAU 유저 (Mailpocket)' },
            { icon: '⚡', value: '3,000+', label: '스크래핑 쇼핑몰 관리' },
            { icon: '🤖', value: 'AI First', label: '개발 방법론' },
            { icon: '🛡️', value: '100%', label: 'CI/CD 자동화' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 rounded-xl border border-border/40 bg-card/30">
              <span className="text-2xl block mb-1">{stat.icon}</span>
              <div className="font-mono font-bold text-xl text-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ========== CONTACT SECTION ========== */
function ContactSection({ onOpenModal }: { onOpenModal: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [copied, setCopied] = useState(false);

  const emailLink = mailtoHref();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 bg-muted/20">
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          badge="Contact"
          title="무료 MVP 상담"
          subtitle="아이디어가 있다면, 바로 개발 견적을 받기 전에 먼저 무료로 점검해 보세요. 개발이 필요한지, 고객 인터뷰·랜딩·노코드 테스트가 먼저인지 함께 정리해 드립니다."
        />
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={springPresets.gentle}
        >
          <GlassCard className="p-8 md:p-12 text-center">
            {/* Big CTA */}
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">개발 전, 방향부터</h3>
            <p className="text-muted-foreground mb-3 max-w-lg mx-auto text-sm leading-relaxed">
              상담 후 무조건 개발을 권하지 않습니다. 필요한 경우에만 다음 단계를 제안드립니다.
            </p>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto text-sm leading-relaxed">
              메일 제목에 <span className="text-foreground font-mono">무료 MVP 상담</span>만 적어 주셔도 됩니다. 24시간
              내 답 드립니다.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6 flex-wrap mt-8">
              <Button size="lg" onClick={onOpenModal} className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold gap-2 shadow-lg shadow-primary/20">
                <Mail className="w-4 h-4" />
                무료 MVP 상담 신청하기
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-border/60 hover:border-primary/40 font-semibold gap-2"
                onClick={() => amplitudeEvents.clickExternalLink('phone')}
              >
                <a href={CONTACT.phoneTel}>
                  <Phone className="w-4 h-4" />
                  {CONTACT.phone}
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-6 text-sm text-muted-foreground font-mono">
              <span>{CONTACT.email}</span>
              <span className="hidden sm:inline opacity-40">|</span>
              <span>{CONTACT.phone}</span>
            </div>
            <div className="flex justify-center mb-8">
              <Button 
                size="sm" 
                variant="ghost" 
                asChild 
                className="text-muted-foreground hover:text-foreground gap-2"
                onClick={() => amplitudeEvents.clickExternalLink('github')}
              >
                <a href={CONTACT.github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                  GitHub 보기
                </a>
              </Button>
            </div>

            {/* Trust signals */}
            <div className="pt-8 border-t border-border/40">
              <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                {[
                  { icon: Star, text: '무료 MVP 상담 (약 30~40분)' },
                  { icon: Clock, text: '24시간 내 응답' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-1.5">
                     <Icon className="w-4 h-4 text-primary" />
                     <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

/* ========== HOME PAGE ========== */
export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (source: 'hero' | 'contact') => {
    amplitudeEvents.clickConsultation(source);
    amplitudeEvents.openConsultationModal(source);
    setIsModalOpen(true);
  };

  return (
    <>
      <HeroSection onOpenModal={() => handleOpenModal('hero')} />
      <AboutSection />
      <FreeConsultSection />
      <PricingSection />
      <ProjectsSection />
      <ExperienceSection />
      <SkillsSection />
      <ContactSection onOpenModal={() => handleOpenModal('contact')} />
      
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
