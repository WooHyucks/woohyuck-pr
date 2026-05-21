export const ROUTE_PATHS = {
  HOME: '/',
} as const;

export const BRAND = 'WooHyuk';

export const CONTACT = {
  email: 'kimwoosky123@gmail.com',
  phone: '010-3663-4833',
  phoneTel: 'tel:010-3663-4833',
  github: 'https://github.com/WooHyucks',
  githubLabel: 'github.com/WooHyucks',
  mailSubject: '무료 MVP 상담',
} as const;

export function mailtoHref(subject = CONTACT.mailSubject) {
  const body = encodeURIComponent(
    '안녕하세요.\n\n현재 아이디어 및 고민을 짧게 적어주세요:\n\n',
  );
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
}

// ─── Types ─────────────────────────────────────────────────────────────
export interface Project {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  period: string;
  status: 'active' | 'completed';
  role: string;
  teamSize: string;
  platform: string;
  contribution: string;
  techStack: string[];
  aiOptimization: string;
  achievements: string[];
  url?: string;
  github?: string;
  image: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  type: 'fulltime' | 'parttime';
  description: string;
  tasks: string[];
  tech: string[];
}

export interface Skill {
  category: string;
  icon: string;
  items: string[];
}

/** 랜딩 서비스 단계 (무료 상담 → 유료는 필요 시만) */
export interface ServiceTier {
  id: string;
  label: string;
  /** 가격 한 줄 표기 (예: 무료, 약 10~30만원대) */
  priceLine: string;
  time: string;
  target: string;
  note: string;
  highlight?: boolean;
}

// ─── Data ──────────────────────────────────────────────────────────────
export const PROJECTS: Project[] = [
  {
    id: 'mailpocket',
    name: 'Mailpocket',
    subtitle: '뉴스레터 AI 3줄 요약 알림 서비스',
    description:
      '뉴스레터를 매번 열지 않아도 핵심만 잡히도록, OpenAI 기반 3줄 요약과 Slack 알림 흐름을 구현했습니다. Amplitude로 이탈 지점을 보고 개선하고, CI/CD로 반복 배포 부담을 줄였습니다.',
    period: '2024.01 ~ 진행중',
    status: 'active',
    role: '프론트엔드 (기여도 90%)',
    teamSize: '4명 (BackEnd, FrontEnd×2, PO)',
    platform: 'Web (반응형)',
    contribution: '90%',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'AWS S3', 'CloudFront', 'GitHub Actions', 'Amplitude SDK', 'OpenAI'],
    aiOptimization:
      '불필요한 기능을 줄인 뒤 우선 구현하고, 유사 외주 범위 대비 더 작은 MVP 단위로 설계했습니다. 분석·배포 자동화로 운영 부담을 낮췄습니다.',
    achievements: [
      'UI/UX 개선으로 페이지 이탈률 대폭 감소',
      'Amplitude 분석 기반 200+ 유저 리텐션 향상',
      'AWS CloudFront로 글로벌 CDN 최적화',
      'GitHub Actions CI/CD 파이프라인 완전 자동화',
    ],
    url: 'https://mailpocket.shop',
    github: 'https://github.com/MoonJunYoung/mailpocket-frontend',
    image: '/images/cropped_image_3_1777555307944292434.jpg',
  },
  {
    id: 'nbbang',
    name: 'Nbbang',
    subtitle: '모임 정산 웹 애플리케이션',
    description: '카카오/네이버/구글 OAuth 소셜 로그인과 카카오페이·토스 원클릭 송금을 지원하는 모임 정산 서비스. 프론트엔드를 100% 단독 설계·구현했습니다.',
    period: '2023.10 ~ 2023.12',
    status: 'completed',
    role: '프론트엔드 (기여도 100%)',
    teamSize: '2명 (BackEnd, FrontEnd)',
    platform: 'Web / App',
    contribution: '100%',
    techStack: ['React', 'Axios', 'React Router DOM', 'styled-components', 'OAuth', 'AWS EC2', 'MySQL'],
    aiOptimization:
      '재사용 가능한 컴포넌트와 상태 관리로 반복 작업을 줄였고, 로그인·결제처럼 신뢰가 필요한 구간을 초기에 꼼꼼히 다뤘습니다.',
    achievements: [
      '카카오/네이버/구글 OAuth 소셜 로그인 전체 구현',
      '카카오페이·토스 원클릭 송금 연동',
      '간편 정산(n/1) 링크 공유 기능 구현',
      '컴포넌트 재사용성 극대화로 유지보수 비용 절감',
    ],
    url: 'https://www.nbbang.store/',
    github: 'https://github.com/MoonJunYoung/nbbang-frontend',
    image: '/images/cropped_image_8_1777555307953480720.jpg',
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'okolabs',
    company: '(주)오코랩스',
    role: '프론트엔드 개발자',
    period: '',
    type: 'fulltime',
    description: 'Concept K 프로젝트 프론트엔드 전담. 반응형 UI/UX 구현 및 CI/CD 자동화 파이프라인 구축.',
    tasks: [
      '반응형 UI/UX 구현 — 다양한 기기 일관된 사용자 경험 제공',
      'Axios·Fetch API 비동기 처리 및 상태 관리 라이브러리 활용',
      '재사용 가능한 컴포넌트 개발로 코드 일관성 확보',
      'GitHub Actions·Jenkins CI/CD 파이프라인 구축',
      'S3·CloudFront 프론트엔드 배포 자동화',
    ],
    tech: ['React', 'TypeScript', 'AWS S3', 'CloudFront', 'GitHub Actions', 'Jenkins'],
  },
  {
    id: 'ably',
    company: '(주)에이블리 코퍼레이션',
    role: '데이터 스크래핑',
    period: '',
    type: 'parttime',
    description: '일본 패션 플랫폼 amood 상품 데이터 수집 자동화. 3,000개 쇼핑몰 스크래핑 환경 관리 및 추상화 모듈 개발.',
    tasks: [
      'Python Scrapy + ZyteCloud로 쇼핑몰 상품 스크래핑 코드 개발',
      '약 3,000개 쇼핑몰 스크래핑 로깅 및 이슈 대응',
      '반복 구조 쇼핑몰 대상 재사용 가능한 추상화 모듈 개발',
      'GitHub 기반 코드리뷰 및 팀 협업',
    ],
    tech: ['Python', 'Scrapy', 'ZyteCloud', 'GitHub', 'HTML/CSS Selector'],
  },
];

export const TECH_STACKS: Skill[] = [
  {
    category: 'Frontend',
    icon: '⚡',
    items: ['React', 'TypeScript', 'JavaScript', 'HTML5/CSS3', 'Tailwind CSS', 'styled-components'],
  },
  {
    category: 'Backend & DB',
    icon: '🗄️',
    items: ['Python', 'Flask', 'FastAPI', 'MySQL', 'SQLAlchemy'],
  },
  {
    category: 'Cloud & DevOps',
    icon: '☁️',
    items: ['AWS S3', 'CloudFront', 'EC2', 'Route53', 'RDS', 'GitHub Actions', 'Jenkins', 'CI/CD'],
  },
  {
    category: 'AI & 자동화',
    icon: '🤖',
    items: ['OpenAI API', 'AI Workflow', 'Amplitude SDK', 'Scrapy', 'ZyteCloud'],
  },
];

export const SERVICE_TIERS: ServiceTier[] = [
  {
    id: 'free-consult',
    label: '무료 MVP 상담',
    priceLine: '무료',
    time: '약 30~40분',
    target: '아이디어는 있는데 개발부터 해야 할지 고민되는 분',
    note: '현재 아이디어 단계, 검증 방향, 개발 필요 여부를 가볍게 점검합니다.',
  },
  {
    id: 'diagnosis-report',
    label: 'MVP 진단 리포트',
    priceLine: '약 10~30만원대',
    time: '약 2~3일',
    target: '상담 후 문서로 더 구체적인 정리가 필요한 분',
    note: '핵심 문제, 타깃, 검증 가설, 첫 MVP 범위를 리포트로 정리합니다. (범위에 따라 협의)',
  },
  {
    id: 'planning',
    label: 'MVP 기획 정리 패키지',
    priceLine: '약 50~150만원대',
    time: '약 1주 전후',
    target: '외주 견적 전 기능 범위·우선순위를 정리하고 싶은 분',
    note: '기능 목록, 화면 흐름, 우선순위, 개발 로드맵 등 기획 단위로 정리합니다.',
  },
  {
    id: 'dev',
    label: 'MVP 개발 지원',
    priceLine: '300만원~',
    time: '일정 협의',
    target: '검증 범위가 정리되어 실제 구현이 필요한 분',
    note: '정리된 MVP 범위를 바탕으로 구현·배포를 지원합니다. 범위에 따라 금액·기간은 협의합니다.',
    highlight: true,
  },
];

/** @deprecated Home에서는 SERVICE_TIERS 사용 */
export const COST_COMPARISON = SERVICE_TIERS;
