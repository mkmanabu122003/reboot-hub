import type { Metadata } from 'next';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: '広告掲載ポリシー',
  description: 'Reboot Hubの広告掲載ポリシーについて。',
};

export default function DisclosurePage() {
  return (
    <div className="max-w-article mx-auto px-4">
      <Breadcrumb items={[{ label: '広告掲載ポリシー' }]} />

      <article className="py-8 prose max-w-none">
        <h1>広告掲載ポリシー</h1>

        <p>本サイト「Reboot Hub」では、サイト運営費用を賄うため、一部の記事にアフィリエイトリンクを掲載しています。</p>

        <h2>アフィリエイトリンクについて</h2>
        <p>本サイトの一部記事には、転職エージェント・フリーランスエージェント等のアフィリエイトリンクが含まれています。読者の方がこれらのリンクを経由してサービスに登録された場合、当サイトに報酬が支払われることがあります。</p>

        <h2>記事の独立性</h2>
        <p>アフィリエイト報酬の有無にかかわらず、記事の内容は筆者の実体験と客観的な評価に基づいて執筆しています。報酬を受け取ることで記事の評価が変わることはありません。</p>

        <h2>PR表記について</h2>
        <p>アフィリエイトリンクを含む記事には、記事冒頭に「PR」バッジを表示しています。</p>

        <h2>お問い合わせ</h2>
        <p>広告掲載に関するお問い合わせは、<a href="/contact/">お問い合わせページ</a>よりご連絡ください。</p>
      </article>
    </div>
  );
}
