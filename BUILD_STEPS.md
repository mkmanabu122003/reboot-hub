# BUILD_STEPS.md
## Reboot Hub — ビルドオーケストレーション

このファイルはClaude Codeが自律的にビルドを進めるための進捗管理ファイルです。

### 使い方
Claude Codeに以下のように指示してください：

```
BUILD_STEPS.md を読んで、次の未完了ステップを1つだけ実行してください。
完了したらステータスを ✅ に更新し、完了条件を全て確認してください。
全ての完了条件をパスしたら、次のステップに進んでください。
問題が発生したら停止して報告してください。
```

---

## ステップ一覧

### Step 1: プロジェクト初期化
**ステータス:** ✅ 完了
**依存:** なし
**参照:** requirements-spec.md セクション1〜3, 9, 12

**やること:**
- [x] npx create-next-app@latest --typescript --tailwind --app でプロジェクト作成
- [x] ディレクトリ構造を requirements-spec.md セクション3 の通りに作成
- [x] lib/constants.ts にカテゴリ定義を記述（セクション2-2）
- [x] lib/types.ts に型定義を記述（セクション4）
- [x] tailwind.config.js にカラーパレットを設定（セクション9-1）
- [x] styles/globals.css にタイポグラフィとCSS変数を設定（セクション9-2）
- [x] netlify.toml を作成（セクション12-1）
- [x] .env.local.example を作成（セクション12-2の環境変数リスト）

**完了条件:**
- [x] npm run dev が起動すること
- [x] npm run build がエラーなく完了すること
- [x] ディレクトリ構造がセクション3と一致すること

---

### Step 2: Markdownパイプライン
**ステータス:** ✅ 完了
**依存:** Step 1 ✅
**参照:** requirements-spec.md セクション4, 7, 15

**やること:**
- [x] npm install gray-matter remark remark-gfm remark-rehype rehype-highlight rehype-slug rehype-autolink-headings rehype-external-links rehype-stringify
- [x] lib/markdown.ts を実装（セクション7-1のパイプライン構成）
- [x] lib/articles.ts を実装（セクション7-2の全関数）
- [x] lib/products.ts を実装（セクション7-3の全関数）
- [x] content/articles/consul-real/big4-quit-story.md を作成（サンプル記事）
- [x] content/articles/career-change/consul-agent-review.md を作成（アフィリあり）
- [x] content/articles/ai-career/claude-api-automation.md を作成（商品CTA付き）
- [x] content/articles/freelance/freelance-full-record.md を作成
- [x] content/products/ai-templates.md を作成（商品サンプル）

**完了条件:**
- [x] npm run build がエラーなく完了すること
- [x] getArticles() で4本の記事が取得できること（テストスクリプトで確認）
- [x] getArticlesByCategory('consul-real') で1本取得できること
- [x] getProducts() で1本の商品が取得できること
- [x] calculateReadingTime() が正しい値を返すこと

---

### Step 3: レイアウト + ナビゲーション
**ステータス:** ✅ 完了
**依存:** Step 1 ✅
**参照:** requirements-spec.md セクション6-1, 9

**やること:**
- [x] components/layout/Header.tsx を実装（セクション6-1）
- [x] components/layout/Footer.tsx を実装
- [x] components/layout/Navigation.tsx を実装（モバイル: ハンバーガーメニュー）
- [x] components/layout/Breadcrumb.tsx を実装
- [x] app/layout.tsx にHeader, Footerを組み込む
- [x] app/not-found.tsx を作成（404ページ）
- [x] レスポンシブ対応（375px, 768px, 1440px）

**完了条件:**
- [x] npm run dev でヘッダーとフッターが表示されること
- [x] ナビゲーションの全カテゴリリンクが正しいhrefを持つこと
- [x] モバイル幅（375px）でハンバーガーメニューが動作すること
- [x] 存在しないURLで404ページが表示されること

---

### Step 4: トップページ + カテゴリ一覧
**ステータス:** ✅ 完了
**依存:** Step 2 ✅ AND Step 3 ✅
**参照:** requirements-spec.md セクション5-1, 5-2, 6-2

**やること:**
- [x] components/article/ArticleCard.tsx を実装（セクション6-2）
- [x] components/common/CategoryTabs.tsx を実装
- [x] components/common/Pagination.tsx を実装（10記事/ページ）
- [x] app/page.tsx を実装（セクション5-1: ヒーロー, 人気記事, カテゴリ別新着）
- [x] app/[category]/page.tsx を実装（セクション5-2: カテゴリ一覧）
- [x] generateStaticParams でカテゴリページを静的生成
- [x] generateMetadata で各ページのmeta情報を動的生成

**完了条件:**
- [x] / にアクセスしてトップページが正しく表示されること
- [x] /consul-real/ にアクセスしてカテゴリ一覧が表示されること
- [x] /career-change/ にアクセスしてカテゴリ一覧が表示されること
- [x] /xxx/（存在しないカテゴリ）で404が表示されること
- [x] 各ページのtitleタグとmeta descriptionが正しいこと
- [x] ArticleCardにサムネイル、タイトル、日付、読了時間が表示されること

---

### Step 5: 記事ページ
**ステータス:** ✅ 完了
**依存:** Step 4 ✅
**参照:** requirements-spec.md セクション5-3, 6-3〜6-7, 8, 10

**やること:**
- [x] app/[category]/[slug]/page.tsx を実装（セクション5-3）
- [x] components/article/ArticleBody.tsx を実装（Markdown→HTML描画）
- [x] components/article/TOC.tsx を実装（セクション6-6: h2/h3から自動生成）
- [x] components/article/AuthorBox.tsx を実装（セクション6-3: コンパクト版+詳細版）
- [x] components/article/PRBadge.tsx を実装（セクション6-7: 控えめデザイン）
- [x] components/article/AffiliateCard.tsx を実装（セクション6-4）
- [x] components/article/RelatedArticles.tsx を実装
- [x] components/common/ShareButtons.tsx を実装（X, はてブ, LINE, コピー）
- [x] generateStaticParams で全記事ページを静的生成
- [x] generateMetadata でOGP, canonical, Twitter Card を動的生成

**完了条件:**
- [x] /consul-real/big4-quit-story/ でサンプル記事が正しく表示されること
- [x] 目次（TOC）がh2/h3から自動生成されていること
- [x] TOCのアンカーリンクが正しく動作すること
- [x] hasPR: true の記事にPRバッジが表示されること
- [x] hasPR: false の記事にPRバッジが表示されないこと
- [x] affiliatesがある記事にAffiliateCardが表示されること
- [x] RelatedArticlesが正しい記事を表示すること
- [x] アフィリエイトリンクに rel="sponsored noopener" が付いていること
- [x] 外部リンクに rel="noopener noreferrer" target="_blank" が付いていること
- [x] HTMLソースにOGPタグが正しく出力されていること
- [x] パンくずリストが正しく表示されていること

---

### Step 6: 商品ページ
**ステータス:** ✅ 完了
**依存:** Step 4 ✅
**参照:** requirements-spec.md セクション5-4, 5-5, 6-5

**やること:**
- [x] components/product/ProductCard.tsx を実装
- [x] components/product/ProductCTA.tsx を実装（セクション6-5）
- [x] components/product/ProductLP.tsx を実装
- [x] app/products/page.tsx を実装（セクション5-4: 商品一覧）
- [x] app/products/[slug]/page.tsx を実装（セクション5-5: 商品LP）
- [x] ProductCTA を ai-career カテゴリの記事ページに組み込む
  - 表示条件：category === 'ai-career' かつ productSlug が存在する場合のみ
- [x] generateStaticParams, generateMetadata を設定

**完了条件:**
- [x] /products/ にアクセスして商品一覧が表示されること
- [x] /products/ai-templates/ でサンプル商品LPが表示されること
- [x] CTAボタンが purchaseUrl にリンクしていること
- [x] ProductCTA が /ai-career/claude-api-automation/ に表示されること
- [x] ProductCTA が /consul-real/big4-quit-story/ には表示されないこと
- [x] 商品ページのOGPタグが正しいこと

---

### Step 7: 固定ページ + SEO + サイトマップ
**ステータス:** ✅ 完了
**依存:** Step 5 ✅ AND Step 6 ✅
**参照:** requirements-spec.md セクション5-6, 5-7, 6-8, 10

**やること:**
- [x] app/about/page.tsx を実装（セクション5-6）
  - 著者名は「Kay」のみ。姓は記載しない。イラストアバター使用
- [x] app/disclosure/page.tsx を実装（広告掲載ポリシー）
- [x] app/privacy/page.tsx を実装（プライバシーポリシー）
- [x] app/tokushoho/page.tsx を実装（特商法表記）
- [x] app/contact/page.tsx を実装（セクション5-7: Formspreeフォーム）
- [x] components/seo/SchemaOrg.tsx を実装（セクション6-8）
  - トップページ：WebSite + Organization
  - 著者ページ：Person（sameAsにguidetech.jpは含めない）
  - 各記事：Article + BreadcrumbList
  - 各商品：Product
- [x] app/sitemap.ts を実装（全記事+全商品+固定ページ）
- [x] app/robots.ts を実装
- [x] app/feed.xml/route.ts を実装（RSSフィード）

**完了条件:**
- [x] /about/ が正しく表示され、著者名が「Kay」のみであること
- [x] /disclosure/, /privacy/, /tokushoho/ が表示されること
- [x] /contact/ のフォームが表示されること
- [x] /sitemap.xml に全ページのURLが含まれていること
- [x] /robots.txt が正しい内容であること
- [x] /feed.xml がRSSフォーマットで出力されること
- [x] 各ページのHTMLソースにJSON-LD構造化データが含まれていること
- [x] 構造化データ内にguidetech.jpへの参照がないこと

---

### Step 8: 最終仕上げ
**ステータス:** ✅ 完了
**依存:** Step 7 ✅
**参照:** requirements-spec.md セクション11, 14

**やること:**
- [x] GA4のスクリプトタグ埋め込み（next/script, strategy="afterInteractive"）
- [x] GA4カスタムイベント実装（セクション11-1の全イベント）
- [x] 全ページでレスポンシブ確認（375px, 768px, 1440px）
- [x] npm run build で全ページが正常に静的生成されること
- [x] Lighthouse でパフォーマンススコアを確認（目標: 95以上）
- [x] 全ページのmeta情報を最終確認
- [x] セキュリティヘッダーの確認（netlify.toml）
- [x] 不要なconsole.logの削除
- [x] package.jsonのdependenciesに不要なパッケージがないこと

**完了条件:**
- [x] npm run build がエラーなく完了すること
- [x] 全てのページが正常に表示されること
- [x] Lighthouse Performance ≧ 95（モバイル）
- [x] HTML内にguidetech.jpや河原学への参照が一切ないこと
- [x] 全アフィリエイトリンクにrel="sponsored noopener"が付いていること
- [x] GA4のMeasurement IDが環境変数化されていること

---

## 全ステップ完了後

全てのステップが ✅ になったら、以下を報告してください：
1. npm run build の出力（ページ数、ビルド時間）
2. Lighthouseスコア（トップページ）
3. 残っているTODOやWARNING
