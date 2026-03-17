import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { getProducts, getProductBySlug } from '@/lib/products';
import { markdownToHtml } from '@/lib/markdown';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ProductLP from '@/components/product/ProductLP';
import SchemaOrg from '@/components/seo/SchemaOrg';

interface ProductPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  const products = getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return {};

  const url = `${SITE_URL}/products/${product.slug}/`;

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      url,
      type: 'website',
      siteName: SITE_NAME,
      images: [{ url: `${SITE_URL}${product.thumbnail}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);
  if (!product) {
    notFound();
  }

  const htmlContent = await markdownToHtml(product.content);

  return (
    <div>
      <SchemaOrg type="product" product={product} />
      <div className="max-w-content mx-auto px-4">
        <Breadcrumb
          items={[
            { label: '商品一覧', href: '/products/' },
            { label: product.title },
          ]}
        />
      </div>
      <ProductLP product={product} htmlContent={htmlContent} />
    </div>
  );
}
