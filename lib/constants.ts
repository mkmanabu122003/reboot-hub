export const SITE_NAME = 'Reboot Hub';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://reboot-hub.jp';
export const SITE_DESCRIPTION = 'IT12年×Big4経験者が語る、コンサルの先のキャリア戦略';
export const TAGLINE = 'IT12年×Big4経験者が語る、コンサルの先のキャリア戦略';

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
  bio: '新卒でメガベンチャーに入社後、ITベンチャー、事業会社のシステム部門を経て、Big4コンサルファームでITコンサルタントとしてチームリーダーを務める。その後フリーランスとして独立し、現在はAI活用コンサルティング・ITコンサルティングを中心に活動。日英バイリンガル。',
  bioShort: 'Big4出身のAI・ITコンサルタント',
  avatar: '/images/author/avatar.webp',
  credentials: ['IT業界12年', 'Big4コンサル出身', '日英バイリンガル'],
  social: {
    twitter: 'https://twitter.com/xxxxx',
    linkedin: 'https://linkedin.com/in/xxxxx',
    note: 'https://note.com/xxxxx',
  },
} as const;

export const ARTICLES_PER_PAGE = 10;
