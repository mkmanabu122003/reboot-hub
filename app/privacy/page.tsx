import Breadcrumb from '@/components/layout/Breadcrumb';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'プライバシーポリシー',
  description: 'Reboot Hubのプライバシーポリシーについて。',
  path: '/privacy/',
});

export default function PrivacyPage() {
  return (
    <div className="max-w-article mx-auto px-4">
      <Breadcrumb items={[{ label: 'プライバシーポリシー' }]} />

      <article className="py-8 prose max-w-none">
        <h1>プライバシーポリシー</h1>

        <h2>個人情報の収集</h2>
        <p>本サイトでは、お問い合わせフォームを通じて、お名前、メールアドレス等の個人情報を収集する場合があります。これらの情報は、お問い合わせへの回答にのみ使用し、第三者に提供することはありません。</p>

        <h2>アクセス解析ツール</h2>
        <p>本サイトでは、Googleアナリティクス（Google Analytics 4）を使用してアクセス情報を収集しています。このデータは匿名で収集されており、個人を特定するものではありません。</p>
        <p>Googleアナリティクスの利用規約については、<a href="https://marketingplatform.google.com/about/analytics/terms/jp/" target="_blank" rel="noopener noreferrer">Google アナリティクス利用規約</a>をご参照ください。</p>

        <h2>Cookieの使用</h2>
        <p>本サイトでは、ユーザー体験の向上およびアクセス解析のためにCookieを使用しています。ブラウザの設定によりCookieの受け入れを拒否することも可能ですが、一部の機能が正しく動作しない場合があります。</p>

        <h2>ポリシーの変更</h2>
        <p>本プライバシーポリシーは、必要に応じて変更される場合があります。変更があった場合は、本ページにて通知いたします。</p>
      </article>
    </div>
  );
}
