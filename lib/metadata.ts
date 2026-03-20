import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from './constants';

interface PageMetaOptions {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  type?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
}

export function generatePageMetadata({
  title,
  description,
  path,
  ogImage = '/images/ogp/default.webp',
  type = 'website',
  twitterCard = 'summary',
}: PageMetaOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      type,
      siteName: SITE_NAME,
      images: [{ url: `${SITE_URL}${ogImage}` }],
    },
    twitter: {
      card: twitterCard,
      title: fullTitle,
      description,
    },
    alternates: { canonical: url },
  };
}
