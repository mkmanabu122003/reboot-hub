export const SITE_NAME = 'Reboot Hub';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://reboot-hub.jp';
export const SITE_DESCRIPTION = 'Big4出身者が語る、コンサルの先のキャリア戦略';
export const TAGLINE = 'Big4出身者が語る、コンサルの先のキャリア戦略';

export const CATEGORIES = {
  'consul-real': {
    name: 'コンサルのリアル',
    description: 'Big4・コンサルファームの内部事情を経験者が語る',
    color: '#1B4F72',
  },
  'career-change': {
    name: 'コンサルからの転職',
    description: 'コンサル出身者の転職戦略とエージェント比較',
    color: '#2E75B6',
  },
  'freelance': {
    name: 'コンサルからの独立',
    description: 'フリーランスコンサルへの転身ガイド',
    color: '#27AE60',
  },
  'ai-career': {
    name: 'AI×コンサルキャリア',
    description: 'AIスキルでキャリアを加速させる方法',
    color: '#8E44AD',
  },
  'global': {
    name: 'グローバルキャリア',
    description: '英語×コンサルで外資・海外キャリアを目指す',
    color: '#E67E22',
  },
} as const;

export type CategorySlug = keyof typeof CATEGORIES;

export const AUTHOR = {
  name: 'Manabu',
  nameEn: 'Manabu',
  title: 'AI・ITコンサルタント',
  bio: 'Big4コンサルティングファーム出身。IT・AIコンサルタントとして10年以上の経験を持つ。現在はフリーランスとして、AI活用による業務自動化のコンサルティングを提供。',
  bioShort: 'Big4出身のAI・ITコンサルタント',
  avatar: '/images/author/avatar.webp',
  credentials: ['公認会計士試験合格', '通訳案内士', 'AWS認定ソリューションアーキテクト'],
  social: {
    twitter: 'https://twitter.com/xxxxx',
    linkedin: 'https://linkedin.com/in/xxxxx',
    note: 'https://note.com/xxxxx',
  },
} as const;

export const ARTICLES_PER_PAGE = 10;
