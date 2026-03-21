import { AUTHOR } from '@/lib/constants';
import Link from 'next/link';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'プロフィール',
  description: `${AUTHOR.name} - ${AUTHOR.title}。${AUTHOR.bioShort}`,
  path: '/about/',
});

export default function AboutPage() {
  return (
    <div className="max-w-article mx-auto px-4">
      <SchemaOrg type="person" />
      <Breadcrumb items={[{ label: 'プロフィール' }]} />

      {/* リード */}
      <section className="py-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-32 h-32 rounded-full bg-bg-secondary flex items-center justify-center text-text-muted text-4xl flex-shrink-0">
            {AUTHOR.name[0]}
          </div>
          <div>
            <h1>{AUTHOR.name}</h1>
            <p className="text-text-muted mt-1">{AUTHOR.title}</p>
            <p className="mt-4 text-text leading-relaxed">
              Big4コンサルファームを経てフリーランスとして独立。<br />
              月額100万円台の案件を獲得しながら、コンサル出身者向けのキャリア戦略メディア「Reboot Hub」を運営しています。
            </p>
          </div>
        </div>
      </section>

      {/* なぜこのメディアを作ったか */}
      <section className="py-8">
        <h2 className="mb-4">なぜReboot Hubを作ったか</h2>
        <div className="space-y-4 text-text leading-relaxed">
          <p>
            コンサルを辞めたいと思ったとき、参考になる情報がほとんどなかった。
          </p>
          <p>
            転職サイトのコラムは表面的で、実際にコンサルを経験した人間のリアルな声が見つからない。年収はどう変わるのか、フリーランスは本当に成り立つのか、どのエージェントが本当に使えるのか。知りたいことは山ほどあるのに、信頼できるソースがない。
          </p>
          <p>
            だから自分で作ることにした。IT業界12年、Big4での実務経験、フリーランスとしての独立。全て自分が経験したことだけを書く。それがReboot Hubのルールです。
          </p>
        </div>
      </section>

      {/* 経歴タイムライン */}
      <section className="py-8">
        <h2 className="mb-4">経歴</h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-2 bg-text-muted rounded flex-shrink-0" />
            <div>
              <p className="font-bold text-text">メガベンチャー → ITベンチャー → 事業会社</p>
              <p className="text-body-sm text-text-muted">新卒入社からIT業界でキャリアを積む。マーケティング、社内SE、システム部門を経験。</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-2 bg-primary rounded flex-shrink-0" />
            <div>
              <p className="font-bold text-text">Big4コンサルティングファーム</p>
              <p className="text-body-sm text-text-muted">ITコンサルタントとしてチームリーダーを務める。大企業のDX推進、基幹システム刷新、BPR、PMOに従事。年収700万円→約1,000万円。</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-2 bg-secondary rounded flex-shrink-0" />
            <div>
              <p className="font-bold text-text">フリーランスとして独立</p>
              <p className="text-body-sm text-text-muted">約2.5年のBig4経験を経て独立。AI活用コンサルティング・ITコンサルティングを中心に、月額100万円台の案件を継続獲得。</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-2 bg-accent rounded flex-shrink-0" />
            <div>
              <p className="font-bold text-text">Reboot Hub 運営開始</p>
              <p className="text-body-sm text-text-muted">コンサル出身者に特化したキャリア戦略メディアを立ち上げ。自身の経験に基づく情報のみを発信。</p>
            </div>
          </div>
        </div>
      </section>

      {/* このサイトで得られること */}
      <section className="py-8">
        <h2 className="mb-4">Reboot Hubで得られること</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="bg-bg-secondary rounded-lg p-5">
            <p className="font-bold text-text mb-2">コンサルのリアル</p>
            <p className="text-body-sm text-text-muted">Big4の内部事情、辞めどきの判断基準、年収のリアルなど、経験者だから書ける情報。</p>
          </div>
          <div className="bg-bg-secondary rounded-lg p-5">
            <p className="font-bold text-text mb-2">転職・独立の実践知</p>
            <p className="text-body-sm text-text-muted">エージェント比較、フリーランスの収支記録、独立1年目に起きることのリアル。</p>
          </div>
          <div className="bg-bg-secondary rounded-lg p-5">
            <p className="font-bold text-text mb-2">AI×キャリア戦略</p>
            <p className="text-body-sm text-text-muted">Claude APIの実務活用、AIスキルによる市場価値向上など、これからのキャリアの武器。</p>
          </div>
        </div>
      </section>

      {/* スキル・資格 */}
      <section className="py-8">
        <h2 className="mb-4">スキル・資格</h2>
        <div className="flex flex-wrap gap-2">
          {AUTHOR.credentials.map((cred) => (
            <span key={cred} className="px-3 py-1.5 bg-bg-secondary rounded-full text-body-sm text-text border border-border">
              {cred}
            </span>
          ))}
        </div>
      </section>

      {/* CTA: まず読んでほしい記事 */}
      <section className="py-8">
        <h2 className="mb-4">まず読んでほしい3記事</h2>
        <div className="space-y-3">
          <Link href="/consul-real/why-i-left-big4/" className="block bg-bg-secondary rounded-lg p-4 hover:bg-border/30 transition-colors">
            <p className="font-bold text-text">コンサルを辞めたいと思った瞬間</p>
            <p className="text-body-sm text-text-muted mt-1">Big4を辞めた理由をリアルに語る、このサイトの原点となる記事。</p>
          </Link>
          <Link href="/freelance/freelance-first-year/" className="block bg-bg-secondary rounded-lg p-4 hover:bg-border/30 transition-colors">
            <p className="font-bold text-text">フリーランス1年目のリアル</p>
            <p className="text-body-sm text-text-muted mt-1">独立後に何が起きるか、準備から案件獲得までを時系列で記録。</p>
          </Link>
          <Link href="/career-change/consul-agent-top5/" className="block bg-bg-secondary rounded-lg p-4 hover:bg-border/30 transition-colors">
            <p className="font-bold text-text">コンサル出身者向け転職エージェントTOP5</p>
            <p className="text-body-sm text-text-muted mt-1">実際に使ったエージェントを忖度なしで比較。</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
