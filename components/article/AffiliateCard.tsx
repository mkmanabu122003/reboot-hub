import { Affiliate } from '@/lib/types';

interface AffiliateCardProps {
  affiliates: Affiliate[];
}

const AffiliateCard: React.FC<AffiliateCardProps> = ({ affiliates }) => {
  if (!affiliates || affiliates.length === 0) return null;

  return (
    <div id="affiliate" className="my-12 p-6 bg-bg-secondary rounded-lg border border-border">
      <h3 className="mb-2">コンサルからの次の一歩を考えている方へ</h3>
      <p className="text-body-sm text-text-muted mb-6">
        筆者が実際に利用・調査したサービスを紹介しています。
      </p>
      <div className="flex flex-col gap-4">
        {affiliates.map((affiliate) => (
          <div key={affiliate.name} className="bg-bg p-5 rounded-lg border border-border">
            <h4 className="font-bold text-text text-lg">{affiliate.name}</h4>
            <p className="text-body-sm text-text-muted mt-2">{affiliate.description}</p>
            <a
              href={affiliate.url}
              rel="sponsored noopener"
              target="_blank"
              className="inline-block mt-4 px-5 py-2.5 bg-accent text-white rounded-lg hover:opacity-90 transition-opacity text-body-sm font-bold"
            >
              無料で相談する
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AffiliateCard;
