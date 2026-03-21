export const SITE_NAME = 'Reboot Hub';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://reboot-hub.jp';
export const SITE_DESCRIPTION = 'IT12年×Big4経験者が語る、コンサルの先のキャリア戦略';
export const TAGLINE = 'IT12年×Big4経験者が語る、コンサルの先のキャリア戦略';

export const CATEGORIES = {
  'consul-real': {
    name: 'コンサルのリアル',
    description: 'Big4・コンサルファームの内部事情を経験者が語る',
    color: '#1B4F72',
    pillarContent: 'コンサルティングファームの実態は、外からは見えにくい。年収、働き方、プロジェクトの中身、辞めたくなる瞬間。Big4を経験した筆者が、入社前には知りえなかったリアルな内部事情を率直に語ります。「コンサルに興味がある人」にも「今まさにコンサルで働いている人」にも役立つ、経験者だからこそ書ける記事を揃えました。',
    pillarTopics: ['Big4の退職理由と体験談', '事業会社との比較', 'コンサルの辞めどきの判断基準'],
  },
  'career-change': {
    name: 'コンサルからの転職',
    description: 'コンサル出身者の転職戦略とエージェント比較',
    color: '#2E75B6',
    pillarContent: 'コンサル出身者の転職は、一般的な転職とはまったく違う。年収800万〜1,500万円のレンジで動く僕らに合ったエージェント選び、ポストコンサルのキャリアパターン、年収交渉のコツ。実際にエージェントを利用し、転職・独立の両方を検討した筆者が、コンサル出身者に特化した転職戦略を解説します。',
    pillarTopics: ['転職エージェントの選び方と比較', 'ポストコンサルのキャリアパターン', 'エージェント面談の活用法'],
  },
  'freelance': {
    name: 'コンサルからの独立',
    description: 'フリーランスコンサルへの転身ガイド',
    color: '#27AE60',
    pillarContent: 'コンサルファームから独立してフリーランスになる。収入は上がるのか、案件はどう見つけるのか、最初の1年で何が起きるのか。Big4を辞めてフリーランスに転身した筆者が、準備から案件獲得、収支のリアルまでを包み隠さず記録しています。',
    pillarTopics: ['独立1年目のリアル', '収支記録と案件獲得の方法'],
  },
  'ai-career': {
    name: 'AI×コンサルキャリア',
    description: 'AIスキルでキャリアを加速させる方法',
    color: '#8E44AD',
    pillarContent: 'AIスキルは、コンサル出身者のキャリアを大きく変える武器になる。Claude APIを使った業務自動化、AI人材としての市場価値、実務で使えるプロンプト設計。ITコンサル×AI活用の実践知識を、具体的なコードとユースケースとともに紹介します。',
    pillarTopics: ['AI活用による市場価値向上', 'Claude APIの実務活用'],
  },
  'global': {
    name: 'グローバルキャリア',
    description: '英語×コンサルで外資・海外キャリアを目指す',
    color: '#E67E22',
    pillarContent: '英語力とコンサル経験を掛け合わせれば、外資系企業や海外でのキャリアが現実的な選択肢になる。日英バイリンガルの筆者が、グローバルキャリアの築き方を実体験をもとに解説します。',
    pillarTopics: ['外資系への転職戦略', '海外キャリアの実現方法'],
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
