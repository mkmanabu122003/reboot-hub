import Link from 'next/link';

interface ActionItem {
  label: string;
  href: string;
}

const CATEGORY_ACTIONS: Record<string, ActionItem[]> = {
  'consul-real': [
    { label: '転職を考えたい', href: '/career-change/' },
    { label: '独立・フリーランスを考えたい', href: '/freelance/' },
    { label: 'AIスキルでキャリアを変えたい', href: '/ai-career/' },
  ],
  'career-change': [
    { label: 'エージェントに相談してみる', href: '#affiliate' },
    { label: '独立という選択肢も見てみる', href: '/freelance/' },
    { label: 'AIスキルに興味がある', href: '/ai-career/' },
  ],
  freelance: [
    { label: 'フリーランスエージェントを見る', href: '#affiliate' },
    { label: '転職も選択肢に入れる', href: '/career-change/' },
    { label: 'AIで稼働を減らしたい', href: '/ai-career/' },
  ],
  'ai-career': [
    { label: 'AIテンプレートを使ってみる', href: '/products/' },
    { label: '転職でAIスキルを活かす', href: '/career-change/' },
    { label: '独立してAIで稼ぐ', href: '/freelance/' },
  ],
  global: [
    { label: '外資系転職を考える', href: '/career-change/' },
    { label: '英語×フリーランス', href: '/freelance/' },
    { label: 'AI×英語でキャリアを広げる', href: '/ai-career/' },
  ],
};

interface NextActionBoxProps {
  category: string;
}

const NextActionBox: React.FC<NextActionBoxProps> = ({ category }) => {
  const actions = CATEGORY_ACTIONS[category] || CATEGORY_ACTIONS['consul-real'];

  return (
    <div className="my-12 p-6 bg-bg-secondary rounded-lg border border-border">
      <h3 className="mb-6 text-center">あなたの次の一歩は？</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="block p-4 bg-bg rounded-lg border border-border text-center font-bold text-text hover:border-primary hover:text-primary transition-colors"
          >
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NextActionBox;
