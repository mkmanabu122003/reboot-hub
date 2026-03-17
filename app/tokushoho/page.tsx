import type { Metadata } from 'next';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: '特定商取引法に基づく表記',
  description: '特定商取引法に基づく表記。',
};

export default function TokushohoPage() {
  return (
    <div className="max-w-article mx-auto px-4">
      <Breadcrumb items={[{ label: '特定商取引法に基づく表記' }]} />

      <article className="py-8 prose max-w-none">
        <h1>特定商取引法に基づく表記</h1>

        <table>
          <tbody>
            <tr>
              <th className="text-left pr-8 py-2">販売業者</th>
              <td className="py-2">Manabu</td>
            </tr>
            <tr>
              <th className="text-left pr-8 py-2">所在地</th>
              <td className="py-2">請求があった場合、遅滞なく開示いたします。</td>
            </tr>
            <tr>
              <th className="text-left pr-8 py-2">連絡先</th>
              <td className="py-2">お問い合わせフォームよりご連絡ください。</td>
            </tr>
            <tr>
              <th className="text-left pr-8 py-2">販売価格</th>
              <td className="py-2">各商品ページに記載の価格（税込）</td>
            </tr>
            <tr>
              <th className="text-left pr-8 py-2">支払方法</th>
              <td className="py-2">各販売プラットフォーム（note、Brain等）の決済方法に準じます。</td>
            </tr>
            <tr>
              <th className="text-left pr-8 py-2">商品の引渡時期</th>
              <td className="py-2">決済完了後、即時ダウンロードまたは閲覧可能。</td>
            </tr>
            <tr>
              <th className="text-left pr-8 py-2">返品・キャンセル</th>
              <td className="py-2">デジタルコンテンツの性質上、購入後の返品・キャンセルはお受けしておりません。</td>
            </tr>
          </tbody>
        </table>
      </article>
    </div>
  );
}
