import { Link } from "react-router-dom";
import {
  Zap,
  Gift,
  Target,
  Shield,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  PROJECTS,
  EXPERIENCES,
  TECH_STACKS,
  SERVICE_TIERS,
  ROUTE_PATHS,
  BRAND,
  CONTACT,
  mailtoHref,
} from "@/lib/index";

const TOTAL_SLIDES = 12;
const SLIDE_MAX_W = "max-w-[1280px]";

interface SlideProps {
  index: number;
  sectionLabel?: string;
  variant?: "cover" | "default" | "accent" | "cta";
  children: React.ReactNode;
}

function Slide({
  index,
  sectionLabel,
  variant = "default",
  children,
}: SlideProps) {
  const variants = {
    cover:
      "bg-gradient-to-br from-background via-card to-primary/20 border-primary/40",
    default: "bg-card/95 border-border/60",
    accent:
      "bg-gradient-to-br from-primary/10 via-card to-accent/15 border-primary/50",
    cta: "bg-gradient-to-br from-primary/20 via-card to-accent/20 border-primary/60",
  };

  return (
    <section
      id={`slide-${index}`}
      className={`ppt-slide relative flex flex-col w-full ${SLIDE_MAX_W} aspect-video mx-auto rounded-[2rem] border-[3px] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] ${variants[variant]}`}
    >
      <header className="shrink-0 px-12 pt-10 pb-4 flex items-start justify-between gap-4">
        {sectionLabel ? (
          <p className="text-primary font-mono text-base uppercase tracking-[0.3em] font-bold">
            {sectionLabel}
          </p>
        ) : (
          <div className="h-6" />
        )}
        <span className="font-mono text-base text-muted-foreground/80 tabular-nums shrink-0 font-bold">
          {String(index).padStart(2, "0")} / {TOTAL_SLIDES}
        </span>
      </header>

      <div className="flex-1 px-14 py-4 flex flex-col justify-center min-h-0 overflow-hidden">
        {children}
      </div>

      <footer className="shrink-0 px-12 pb-10 pt-6 mx-8 border-t-2 border-border/40 flex items-center justify-between text-base text-muted-foreground font-mono">
        <span className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          <span className="font-bold text-foreground/90">{BRAND}</span> · 김우혁
        </span>
        <span className="text-primary font-bold">AI MVP 전략가</span>
      </footer>
    </section>
  );
}

function BulletList({ items, size = "text-xl" }: { items: string[], size?: string }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li
          key={item}
          className={`flex items-start gap-4 ${size} text-foreground/90 leading-snug font-medium`}
        >
          <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PortfolioPpt() {
  return (
    <div className="min-h-screen bg-background text-foreground ppt-page">
      <div className="ppt-toolbar sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-md print:hidden">
        <div
          className={`${SLIDE_MAX_W} mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3`}
        >
          <Button variant="ghost" size="sm" asChild className="gap-1.5">
            <Link to={ROUTE_PATHS.HOME}>
              <ArrowLeft className="w-4 h-4" />
              랜딩으로
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground text-center flex-1 min-w-[200px]">
            <span className="text-foreground font-medium">
              당근 · 숨고 · 크몽용
            </span>{" "}
            — 슬라이드마다 스크롤 후 캡처 (권장{" "}
            <span className="font-mono text-primary">1920×1080</span> · 16:9)
          </p>
          <div className="flex gap-1 flex-wrap justify-end">
            {Array.from({ length: TOTAL_SLIDES }, (_, i) => (
              <a
                key={i}
                href={`#slide-${i + 1}`}
                className="w-8 h-8 rounded-md text-sm font-mono flex items-center justify-center border border-border/50 hover:bg-primary/20 hover:border-primary/40 font-bold"
              >
                {i + 1}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`${SLIDE_MAX_W} mx-auto px-4 py-16 space-y-16 print:space-y-0 print:py-0`}
      >
        <Slide index={1} variant="cover">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border-2 border-primary/40 bg-primary/10 text-primary text-lg font-mono shadow-[0_0_30px_rgba(var(--color-primary),0.2)]">
              <Zap className="w-5 h-5" />
              <span className="font-bold">{BRAND}</span>
            </div>
            <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary leading-tight pb-2 drop-shadow-sm">
              AI MVP 전략가
              <span className="text-foreground text-4xl mt-6 block drop-shadow-none">+ 빠른 구현 파트너</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mt-6">
              먼저 <strong className="text-foreground font-bold">무료로</strong> 검증 방향을 정리하고, <br />
              <strong className="text-foreground font-bold">필요할 때만</strong> 빠른 구현까지 함께합니다.
            </p>
          </div>
        </Slide>

        <Slide index={2} sectionLabel="소개" variant="accent">
          <div className="max-w-4xl mx-auto w-full">
            <h2 className="text-4xl font-extrabold mb-8 leading-tight">
              바로 개발을
              <br />
              <span className="text-primary drop-shadow-[0_0_20px_rgba(var(--color-primary),0.3)]">권하지 않습니다</span>
            </h2>
            <BulletList
              items={[
                "아이디어가 있다고 곧바로 외주·개발부터 시작하지 않아도 됩니다",
                "무료 상담으로 지금 검증해야 할 것부터 정리합니다",
                "개발이 아직 필요 없으면 솔직하게 말씀드립니다",
                "무조건 개발을 권하지 않습니다",
              ]}
            />
          </div>
        </Slide>

        <Slide index={3} sectionLabel="이런 분께">
          <div className="max-w-4xl mx-auto w-full">
            <h2 className="text-4xl font-extrabold mb-8">이런 분께 도움이 됩니다</h2>
            <BulletList
              items={[
                "개발부터 해야 할지 확신이 없는 예비·초기 창업자",
                "외주 견적이 커 보여 범위를 줄이고 싶은 분",
                "사이드프로젝트로 불필요한 개발비를 아끼고 싶은 팀",
                "MVP가 풀서비스로 커지기 전에 방향을 잡고 싶은 분",
              ]}
            />
            <div className="flex flex-wrap gap-4 mt-10">
              {[
                { icon: Gift, value: "무료", label: "첫 상담" },
                { icon: Target, value: "검증", label: "우선" },
                { icon: Shield, value: "필요시", label: "개발" },
              ].map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 px-5 py-2.5 rounded-2xl border-2 border-border/50 bg-background/60 shadow-lg"
                >
                  <Icon className="w-5 h-5 text-primary" />
                  <span className="font-mono text-lg font-bold">{value}</span>
                  <span className="text-base text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </Slide>

        <Slide index={4} sectionLabel="무료 상담" variant="accent">
          <div className="max-w-4xl mx-auto w-full">
            <h2 className="text-4xl font-extrabold mb-3">무료 MVP 상담</h2>
            <p className="text-xl text-primary font-medium mb-8">
              약 30~40분 · 부담 없이 현재 단계만 점검
            </p>
            <BulletList
              items={[
                "지금 바로 개발이 필요한지 vs 인터뷰·랜딩이 먼저인지",
                "먼저 검증해야 할 고객 문제",
                "첫 MVP에 넣을 기능 / 빼도 되는 기능",
                "예상 개발 범위와 리스크",
                "돈을 쓰기 전에 확인할 것",
              ]}
            />
          </div>
        </Slide>

        <Slide index={5} sectionLabel="서비스">
          <div className="max-w-4xl mx-auto w-full">
            <h2 className="text-3xl font-extrabold mb-6">단계별로, 필요한 만큼만</h2>
            <div className="space-y-4">
              {SERVICE_TIERS.map((tier) => (
                <div
                  key={tier.id}
                  className={`rounded-2xl border-[2px] px-6 py-4 shadow-lg transition-transform hover:scale-[1.01] ${
                    tier.id === "free-consult"
                      ? "border-emerald-500/50 bg-emerald-500/10"
                      : tier.highlight
                        ? "border-primary/50 bg-primary/10 shadow-[0_0_20px_rgba(var(--color-primary),0.15)]"
                        : "border-border/50 bg-background/40"
                  }`}
                >
                  <div className="flex justify-between gap-4 flex-wrap items-center">
                    <span className="text-xl font-bold">{tier.label}</span>
                    <span
                      className={`font-mono text-lg font-bold px-3 py-1 rounded-md bg-background/50 ${
                        tier.id === "free-consult"
                          ? "text-emerald-400"
                          : "text-primary"
                      }`}
                    >
                      {tier.priceLine}
                    </span>
                  </div>
                  <p className="text-base text-muted-foreground mt-2 leading-snug">
                    {tier.target}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Slide>

        <Slide index={6} sectionLabel="프로세스" variant="accent">
          <div className="max-w-4xl mx-auto w-full">
            <h2 className="text-3xl font-extrabold mb-8">함께 가는 방식</h2>
            <ol className="space-y-4">
              {[
                "고객이 돈을 낼 핵심 문제 정의",
                "검증 가설 1~3개로 좁히기",
                "넣을 기능 / 버릴 기능 구분",
                "정리된 뒤 AI로 빠르게 구현·배포",
                "반응 기준으로 유지·수정·중단 판단",
              ].map((step, i) => (
                <li key={step} className="flex items-center gap-4 bg-background/30 p-3 rounded-xl border border-border/30">
                  <span className="w-10 h-10 rounded-lg bg-primary/20 border-2 border-primary/40 flex items-center justify-center font-mono font-bold text-primary text-lg shrink-0 shadow-[0_0_10px_rgba(var(--color-primary),0.2)]">
                    {i + 1}
                  </span>
                  <span className="text-xl text-foreground/90 font-semibold">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
            {/* <p className="mt-8 text-lg text-muted-foreground border-t border-border/40 pt-4 text-center">
              끝은 <strong className="text-primary font-bold">의사결정</strong> — 개발
              완료가 목표가 아닙니다.
            </p> */}
          </div>
        </Slide>

        <Slide index={7} sectionLabel="주의">
          <div className="max-w-4xl mx-auto w-full">
            <h2 className="text-2xl font-extrabold mb-4 text-destructive flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-destructive/20 flex items-center justify-center text-xl pb-1">!</span>
              흔한 실수
            </h2>
            <ul className="space-y-3 mb-8 bg-destructive/5 border border-destructive/20 p-5 rounded-xl">
              {[
                "“간단한 MVP”가 로그인·결제까지 붙어 풀서비스로 커짐",
                "반응 애매한데 기능만 계속 추가",
                "외주 견적이 예상보다 훨씬 큼",
                "비용은 썼는데 무엇을 검증했는지 모름",
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-lg text-foreground/80 font-medium"
                >
                  <span className="text-destructive font-bold shrink-0">×</span>
                  {item}
                </li>
              ))}
            </ul>
            <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6" />
              제가 돕는 방향
            </h3>
            <BulletList
              size="text-lg"
              items={[
                "예산이 작으면 돈 덜 쓰는 검증부터",
                "인터뷰가 먼저면 그렇게 안내",
                "도울 수 없는 영역은 솔직히 말씀",
              ]}
            />
          </div>
        </Slide>

        {PROJECTS.map((project, i) => (
          <Slide
            key={project.id}
            index={8 + i}
            sectionLabel={`프로젝트 ${i + 1}`}
          >
            <div className="grid grid-cols-5 gap-8 items-center h-full">
              <div className="col-span-2 rounded-2xl overflow-hidden border-[2px] border-border/50 aspect-[4/5] bg-muted/30 shadow-xl relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="col-span-3 flex flex-col justify-center h-full">
                <h2 className="text-3xl font-extrabold mb-2">{project.name}</h2>
                <p className="text-primary font-mono text-base mb-4 font-bold tracking-wide">
                  {project.subtitle}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-5">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.techStack.slice(0, 5).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-primary/10 text-primary border border-primary/30"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <ul className="space-y-3 bg-background/40 p-5 rounded-xl border border-border/40">
                  {project.achievements.slice(0, 3).map((a) => (
                    <li
                      key={a}
                      className="text-base flex items-start gap-2.5 text-foreground/90 font-medium"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Slide>
        ))}

        <Slide index={10} sectionLabel="경력">
          <div className="max-w-4xl mx-auto w-full">
            <h2 className="text-3xl font-extrabold mb-6">실무 경력</h2>
            <div className="space-y-4">
              {EXPERIENCES.map((exp) => (
                <div
                  key={exp.id}
                  className="rounded-2xl border-[2px] border-border/50 bg-background/40 px-6 py-4 shadow-md"
                >
                  <div className="flex justify-between gap-4 flex-wrap items-center mb-2">
                    <span className="text-xl font-bold">{exp.company}</span>
                    {exp.period && (
                      <span className="font-mono text-sm text-muted-foreground font-semibold bg-muted px-2 py-1 rounded-md">
                        {exp.period}
                      </span>
                    )}
                  </div>
                  <p className="text-primary text-lg font-bold mb-2">{exp.role}</p>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Slide>

        <Slide index={11} sectionLabel="기술 · 실적" variant="accent">
          <div className="max-w-4xl mx-auto w-full">
            <h2 className="text-2xl font-extrabold mb-5">기술 스택</h2>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {TECH_STACKS.map((stack) => (
                <div
                  key={stack.category}
                  className="rounded-xl border-[2px] border-border/40 p-4 bg-background/40 shadow hover:border-primary/40 transition-colors"
                >
                  <p className="text-lg font-bold mb-2 flex items-center gap-2">
                    <span className="text-xl">{stack.icon}</span> {stack.category}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed font-mono">
                    {stack.items.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {[
                { value: "200+", label: "MAU" },
                { value: "3,000+", label: "스크래핑 몰" },
                { value: "AI First", label: "방법론" },
                { value: "100%", label: "CI/CD" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center rounded-xl border-[2px] border-primary/30 bg-primary/10 py-5 shadow-[0_0_15px_rgba(var(--color-primary),0.1)]"
                >
                  <div className="font-mono font-extrabold text-3xl text-primary mb-1.5">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-semibold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Slide>

        <Slide index={12} sectionLabel="연락" variant="cta">
          <div className="text-center space-y-6 max-w-3xl mx-auto w-full">
            <h2 className="text-4xl font-extrabold leading-tight">
              개발 견적 전,
              <br />
              <span className="text-primary drop-shadow-[0_0_20px_rgba(var(--color-primary),0.3)]">무료로 점검하세요</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              상담 후 무조건 개발을 권하지 않습니다.
              <br />
              필요한 경우에만 다음 단계를 제안드립니다.
            </p>
            <div className="rounded-3xl border-4 border-primary/40 bg-background/60 px-8 py-6 space-y-4 text-left shadow-[0_0_40px_rgba(var(--color-primary),0.15)] backdrop-blur-xl">
              <div className="space-y-3">
                <p className="font-mono text-xl text-primary font-bold break-all flex items-center gap-3">
                  <span className="text-muted-foreground text-base w-14">Email</span>
                  {CONTACT.email}
                </p>
                <p className="font-mono text-lg text-foreground font-bold flex items-center gap-3">
                  <span className="text-muted-foreground text-base w-14">Tel</span>
                  <a href={CONTACT.phoneTel} className="hover:text-primary transition-colors">
                    {CONTACT.phone}
                  </a>
                </p>
                <p className="font-mono text-base text-muted-foreground break-all flex items-center gap-3">
                  <span className="text-muted-foreground/50 text-sm w-14">Github</span>
                  {CONTACT.githubLabel}
                </p>
              </div>
              <div className="pt-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground font-semibold">
                  ✓ 24시간 내 응답
                </p>
              </div>
            </div>
            <p className="text-lg font-semibold">
              메일 제목:{" "}
              <span className="font-mono text-primary font-bold bg-primary/10 px-3 py-1.5 rounded-lg ml-1">무료 MVP 상담</span>
            </p>
          </div>
        </Slide>
      </div>

      <p className="text-center text-sm text-muted-foreground py-10 print:hidden font-medium">
        <Link to={ROUTE_PATHS.HOME} className="text-primary hover:underline hover:text-primary/80 transition-colors">
          랜딩 사이트
        </Link>
        {" · "}
        <a href={mailtoHref()} className="text-primary hover:underline hover:text-primary/80 transition-colors">
          메일 보내기
        </a>
      </p>
    </div>
  );
}
