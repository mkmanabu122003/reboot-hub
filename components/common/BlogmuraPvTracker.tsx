const PV_BANNER_URL = process.env.NEXT_PUBLIC_BLOGMURA_PV_URL || '';

export default function BlogmuraPvTracker() {
  if (!PV_BANNER_URL) return null;

  return (
    <div className="fixed bottom-0 left-0 w-0 h-0 overflow-hidden" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={PV_BANNER_URL} alt="" width="1" height="1" loading="lazy" />
    </div>
  );
}
