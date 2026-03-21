import { SITE_NAME, SITE_URL, AUTHOR } from '@/lib/constants';
import { Article, FAQ } from '@/lib/types';

type SchemaType = 'website' | 'article' | 'person' | 'product' | 'faq' | 'collectionPage';

interface CollectionPageData {
  name: string;
  description: string;
  url: string;
  articles: { title: string; url: string }[];
}

interface SchemaOrgProps {
  type: SchemaType;
  article?: Article;
  product?: { title: string; description: string; price: number; thumbnail: string };
  faqs?: FAQ[];
  collectionPage?: CollectionPageData;
}

function getWebSiteSchema() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  ];
}

function getPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: AUTHOR.name,
    jobTitle: AUTHOR.title,
    knowsAbout: ['AI', 'IT Consulting', 'Career Development'],
    hasCredential: AUTHOR.credentials.map((cred) => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: cred,
    })),
  };
}

function getArticleSchema(article: Article) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.description,
      image: `${SITE_URL}${article.thumbnail}`,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      author: {
        '@type': 'Person',
        name: AUTHOR.name,
        url: `${SITE_URL}/about/`,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: article.category, item: `${SITE_URL}/${article.category}/` },
        { '@type': 'ListItem', position: 3, name: article.title },
      ],
    },
  ];
}

function getProductSchema(product: { title: string; description: string; price: number; thumbnail: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: `${SITE_URL}${product.thumbnail}`,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'JPY',
    },
  };
}

function getFAQSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

function getCollectionPageSchema(data: CollectionPageData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: data.name,
    description: data.description,
    url: data.url,
    hasPart: data.articles.map((a) => ({
      '@type': 'Article',
      headline: a.title,
      url: a.url,
    })),
  };
}

const SchemaOrg: React.FC<SchemaOrgProps> = ({ type, article, product, faqs, collectionPage }) => {
  let schema: unknown;

  switch (type) {
    case 'website':
      schema = getWebSiteSchema();
      break;
    case 'person':
      schema = getPersonSchema();
      break;
    case 'article':
      if (article) schema = getArticleSchema(article);
      break;
    case 'product':
      if (product) schema = getProductSchema(product);
      break;
    case 'faq':
      if (faqs && faqs.length > 0) schema = getFAQSchema(faqs);
      break;
    case 'collectionPage':
      if (collectionPage) schema = getCollectionPageSchema(collectionPage);
      break;
  }

  if (!schema) return null;

  const jsonLd = Array.isArray(schema)
    ? schema.map((s) => JSON.stringify(s))
    : [JSON.stringify(schema)];

  return (
    <>
      {jsonLd.map((json, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: json }}
        />
      ))}
    </>
  );
};

export default SchemaOrg;
