import { CATEGORIES } from './constants';

export interface ArticleFrontmatter {
  title: string;
  description: string;
  category: keyof typeof CATEGORIES;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  author: string;
  thumbnail: string;
  hasPR: boolean;
  affiliateKeys?: string[];
  relatedSlugs?: string[];
  productSlug?: string;
  faqs?: FAQ[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Affiliate {
  name: string;
  url: string;
  description: string;
  type: 'career' | 'freelance' | 'ai' | 'english' | 'accounting';
  logo?: string;
  impressionPixel?: string;
}

export interface Article extends ArticleFrontmatter {
  slug: string;
  content: string;
  readingTime: number;
  affiliates?: Affiliate[];
}

export interface ProductFrontmatter {
  title: string;
  slug: string;
  price: number;
  platform: 'note' | 'brain' | 'coconala' | 'udemy' | 'stripe';
  purchaseUrl: string;
  description: string;
  thumbnail: string;
  category: 'template' | 'course' | 'tool';
  features: string[];
  relatedArticles?: string[];
  publishedAt: string;
}

export interface Product extends ProductFrontmatter {
  content: string;
}

export interface Author {
  name: string;
  nameEn: string;
  title: string;
  bio: string;
  bioShort: string;
  avatar: string;
  credentials: string[];
  social: {
    twitter?: string;
    linkedin?: string;
    note?: string;
    website?: string;
  };
}
