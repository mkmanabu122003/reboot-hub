import { AUTHOR } from '@/lib/constants';
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

      <section className="py-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-32 h-32 rounded-full bg-bg-secondary flex items-center justify-center text-text-muted text-4xl flex-shrink-0">
            {AUTHOR.name[0]}
          </div>
          <div>
            <h1>{AUTHOR.name}</h1>
            <p className="text-text-muted mt-1">{AUTHOR.title}</p>
          </div>
        </div>
      </section>

      <section className="py-8">
        <h2 className="mb-4">経歴</h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-2 bg-primary rounded flex-shrink-0" />
            <div>
              <p className="font-bold text-text">Big4コンサルティングファーム</p>
              <p className="text-body-sm text-text-muted">IT・業務改革プロジェクトを多数担当。大手企業の基幹システム刷新、BPR、PMOなどに従事。</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-2 bg-secondary rounded flex-shrink-0" />
            <div>
              <p className="font-bold text-text">フリーランス独立</p>
              <p className="text-body-sm text-text-muted">AI・ITコンサルタントとして独立。Claude API等を活用した業務自動化コンサルティングを提供。</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-2 bg-accent rounded flex-shrink-0" />
            <div>
              <p className="font-bold text-text">Reboot Hub 運営開始</p>
              <p className="text-body-sm text-text-muted">コンサル出身者向けのキャリア戦略メディアを立ち上げ、自身の経験とナレッジを発信中。</p>
            </div>
          </div>
        </div>
      </section>

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

      <section className="py-8">
        <h2 className="mb-4">SNS</h2>
        <div className="flex gap-4">
          {AUTHOR.social.twitter && (
            <a href={AUTHOR.social.twitter} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary">
              X (Twitter)
            </a>
          )}
          {AUTHOR.social.linkedin && (
            <a href={AUTHOR.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary">
              LinkedIn
            </a>
          )}
          {AUTHOR.social.note && (
            <a href={AUTHOR.social.note} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary">
              note
            </a>
          )}
        </div>
      </section>

      <section className="py-8">
        <p className="text-body-sm text-text-muted">{AUTHOR.bio}</p>
      </section>
    </div>
  );
}
