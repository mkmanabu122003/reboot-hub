import { Affiliate } from '@/lib/types';

interface AffiliateCardProps {
  affiliates: Affiliate[];
}

const AffiliateCard: React.FC<AffiliateCardProps> = ({ affiliates }) => {
  if (!affiliates || affiliates.length === 0) return null;

  return (
    <div id="affiliate" className="my-10">
      <h3 className="text-base font-bold text-primary mb-5">
        コンサルからの次の一歩を考えている方へ
      </h3>
      <div className="flex flex-col gap-5">
        {affiliates.map((affiliate) => (
          <div
            key={affiliate.name}
            className="flex flex-col sm:flex-row items-start gap-5 bg-white rounded-xl border border-border p-5 hover:shadow-md transition-shadow"
          >
            {/* Icon placeholder */}
            <div className="w-[140px] h-[100px] sm:w-[160px] sm:h-[110px] rounded-lg bg-bg-secondary flex-shrink-0 flex items-center justify-center">
              <svg className="w-10 h-10 text-text-muted/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.193 23.193 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-text text-lg">{affiliate.name}</h4>
              <p className="text-sm text-text-muted mt-2 leading-relaxed">{affiliate.description}</p>
              <a
                href={affiliate.url}
                rel="sponsored noopener"
                target="_blank"
                className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-[#163D5C] transition-colors"
              >
                詳細を見る
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AffiliateCard;
