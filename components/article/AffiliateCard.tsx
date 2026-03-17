import { Affiliate } from '@/lib/types';

interface AffiliateCardProps {
  affiliates: Affiliate[];
}

const AffiliateCard: React.FC<AffiliateCardProps> = ({ affiliates }) => {
  if (!affiliates || affiliates.length === 0) return null;

  return (
    <div className="my-12 p-6 bg-bg-secondary rounded-lg border border-border">
      <h3 className="mb-4">この記事で紹介したサービス</h3>
      <div className="flex flex-col gap-4">
        {affiliates.map((affiliate) => (
          <div key={affiliate.name} className="bg-bg p-4 rounded-lg border border-border">
            <h4 className="font-bold text-text">{affiliate.name}</h4>
            <p className="text-body-sm text-text-muted mt-1">{affiliate.description}</p>
            <a
              href={affiliate.url}
              rel="sponsored noopener"
              target="_blank"
              className="inline-block mt-3 px-4 py-2 bg-accent text-white rounded hover:opacity-90 transition-opacity text-body-sm font-bold"
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
