import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Article, ArticleFrontmatter } from './types';
import { CATEGORIES } from './constants';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export function calculateReadingTime(content: string): number {
  const charCount = content.replace(/\s/g, '').length;
  const minutes = Math.ceil(charCount / 500);
  return Math.max(1, minutes);
}

export function getArticles(): Article[] {
  const articles: Article[] = [];

  for (const category of Object.keys(CATEGORIES)) {
    const categoryDir = path.join(articlesDirectory, category);
    if (!fs.existsSync(categoryDir)) continue;

    const files = fs.readdirSync(categoryDir).filter((f) => f.endsWith('.md'));

    for (const file of files) {
      const slug = file.replace(/\.md$/, '');
      const filePath = path.join(categoryDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);
      const frontmatter = data as ArticleFrontmatter;

      articles.push({
        ...frontmatter,
        slug,
        content,
        readingTime: calculateReadingTime(content),
      });
    }
  }

  return articles.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getArticlesByCategory(category: string): Article[] {
  return getArticles().filter((article) => article.category === category);
}

export function getArticleBySlug(category: string, slug: string): Article | null {
  const filePath = path.join(articlesDirectory, category, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const frontmatter = data as ArticleFrontmatter;

  return {
    ...frontmatter,
    slug,
    content,
    readingTime: calculateReadingTime(content),
  };
}

export function getRelatedArticles(slugs: string[]): Article[] {
  const allArticles = getArticles();
  return slugs
    .map((slug) => allArticles.find((a) => a.slug === slug))
    .filter((a): a is Article => a !== undefined);
}
