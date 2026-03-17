import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Product, ProductFrontmatter } from './types';

const productsDirectory = path.join(process.cwd(), 'content/products');

export function getProducts(): Product[] {
  if (!fs.existsSync(productsDirectory)) return [];

  const files = fs.readdirSync(productsDirectory).filter((f) => f.endsWith('.md'));

  return files
    .map((file) => {
      const filePath = path.join(productsDirectory, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);
      const frontmatter = data as ProductFrontmatter;

      return {
        ...frontmatter,
        content,
      };
    })
    .sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getProductBySlug(slug: string): Product | null {
  const filePath = path.join(productsDirectory, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const frontmatter = data as ProductFrontmatter;

  return {
    ...frontmatter,
    content,
  };
}
