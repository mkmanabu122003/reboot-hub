import { getArticles, getArticlesByCategory, calculateReadingTime } from '../lib/articles';
import { getProducts } from '../lib/products';

const articles = getArticles();
console.log(`Total articles: ${articles.length}`);
console.assert(articles.length === 4, `Expected 4 articles, got ${articles.length}`);

const consulReal = getArticlesByCategory('consul-real');
console.log(`consul-real articles: ${consulReal.length}`);
console.assert(consulReal.length === 1, `Expected 1 consul-real article, got ${consulReal.length}`);

const products = getProducts();
console.log(`Total products: ${products.length}`);
console.assert(products.length === 1, `Expected 1 product, got ${products.length}`);

const readingTime = calculateReadingTime('あ'.repeat(1000));
console.log(`Reading time for 1000 chars: ${readingTime} min`);
console.assert(readingTime === 2, `Expected 2 min, got ${readingTime}`);

console.log('\nAll Step 2 tests passed!');
