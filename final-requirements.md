# コンサルキャリアメディア — 要件定義書
## Claude Code 実装指示書 v1.0

---

## 1. プロジェクト概要

### 1-1. プロジェクト名
コンサル出身キャリア戦略メディア（仮称：Reboot Hub）

### 1-2. 目的
コンサルティングファーム出身者向けのキャリア戦略メディアを構築する。
以下の3つの収益源を1つのサイト内で統合的に運営する：

1. **アフィリエイト収益**：転職エージェント・フリーランスエージェント等の紹介
2. **自社デジタル商品販売**：AI業務自動化テンプレート・スターターキット等
3. **オンライン講座販売**：AI活用講座のLP・誘導

### 1-3. 技術スタック

| レイヤー | 技術 | バージョン |
|---------|------|-----------|
| フレームワーク | Next.js (App Router) | 14.x 以上 |
| 言語 | TypeScript | 5.x |
| スタイリング | Tailwind CSS | 3.x |
| コンテンツ管理 | Markdown + frontmatter (gray-matter) | — |
| Markdown処理 | remark + rehype | — |
| ホスティング | Netlify | — |
| バージョン管理 | GitHub | — |
| アナリティクス | Google Analytics 4 | — |
| サイト内検索 | Pagefind | — |

### 1-4. 非機能要件

| 要件 | 基準 |
|-----|------|
| Lighthouse Performance | 95以上 |
| LCP | 2.5秒以下 |
| FID / INP | 100ms以下 |
| CLS | 0.1以下 |
| SSL | 必須（Netlifyが自動発行） |
| レスポンシブ | モバイルファースト。375px〜1440px |
| ブラウザ対応 | Chrome, Safari, Firefox, Edge（最新2バージョン） |
| アクセシビリティ | WCAG 2.1 AA準拠（見出し階層、alt属性、コントラスト比） |

---

## 2. サイト構造（URL設計）

### 2-1. ルーティング

```
/                           → トップページ
/[category]/                → カテゴリ別記事一覧（動的ルート）
/[category]/[slug]/         → 個別記事ページ（動的ルート）
/products/                  → 商品一覧ページ
/products/[slug]/           → 個別商品LP（動的ルート）
/about/                     → 著者プロフィール
/disclosure/                → 広告掲載ポリシー
/privacy/                   → プライバシーポリシー
/tokushoho/                 → 特定商取引法に基づく表記
/contact/                   → お問い合わせフォーム
/sitemap.xml                → XMLサイトマップ（自動生成）
/robots.txt                 → robots.txt（自動生成）
```

### 2-2. カテゴリ定義（constants.ts）

```typescript
export const CATEGORIES = {
  'consul-real': {
    name: 'コンサルのリアル',
    description: 'Big4・コンサルファームの内部事情を経験者が語る',
    color: '#1B4F72', // ブランドカラー
  },
  'career-change': {
    name: 'コンサルからの転職',
    description: 'コンサル出身者の転職戦略とエージェント比較',
    color: '#2E75B6',
  },
  'freelance': {
    name: 'コンサルからの独立',
    description: 'フリーランスコンサルへの転身ガイド',
    color: '#27AE60',
  },
  'ai-career': {
    name: 'AI×コンサルキャリア',
    description: 'AIスキルでキャリアを加速させる方法',
    color: '#8E44AD',
  },
  'global': {
    name: 'グローバルキャリア',
    description: '英語×コンサルで外資・海外キャリアを目指す',
    color: '#E67E22',
  },
} as const;
```

---

## 3. ディレクトリ構造

```
consul-career-media/
├── app/
│   ├── layout.tsx                 # グローバルレイアウト
│   ├── page.tsx                   # トップページ
│   ├── not-found.tsx              # 404ページ
│   ├── about/page.tsx             # 著者プロフィール
│   ├── disclosure/page.tsx        # 広告掲載ポリシー
│   ├── privacy/page.tsx           # プライバシーポリシー
│   ├── tokushoho/page.tsx         # 特商法表記
│   ├── contact/page.tsx           # お問い合わせ
│   ├── products/
│   │   ├── page.tsx               # 商品一覧
│   │   └── [slug]/page.tsx        # 個別商品LP
│   ├── [category]/
│   │   ├── page.tsx               # カテゴリ記事一覧
│   │   └── [slug]/page.tsx        # 個別記事
│   ├── sitemap.ts                 # XMLサイトマップ
│   └── robots.ts                  # robots.txt
├── content/
│   ├── articles/                  # ブログ記事（Markdown）
│   │   ├── consul-real/
│   │   ├── career-change/
│   │   ├── freelance/
│   │   ├── ai-career/
│   │   └── global/
│   └── products/                  # 商品データ（Markdown）
│       ├── ai-templates.md
│       ├── api-kit.md
│       ├── proposal.md
│       └── course.md
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── Breadcrumb.tsx
│   ├── article/
│   │   ├── ArticleCard.tsx        # 記事一覧のカード
│   │   ├── ArticleBody.tsx        # 記事本文レンダリング
│   │   ├── TOC.tsx                # 目次（自動生成）
│   │   ├── AuthorBox.tsx          # 著者情報ボックス
│   │   ├── PRBadge.tsx            # PR表記バッジ
│   │   ├── AffiliateCard.tsx      # アフィリリンクカード
│   │   └── RelatedArticles.tsx    # 関連記事
│   ├── product/
│   │   ├── ProductCard.tsx        # 商品一覧のカード
│   │   ├── ProductCTA.tsx         # 記事内の商品CTA
│   │   └── ProductLP.tsx          # 商品LP共通レイアウト
│   ├── common/
│   │   ├── CategoryTabs.tsx       # カテゴリタブ
│   │   ├── Pagination.tsx         # ページネーション
│   │   ├── ShareButtons.tsx       # SNSシェアボタン
│   │   └── SearchBox.tsx          # サイト内検索（Pagefind）
│   └── seo/
│       └── SchemaOrg.tsx          # 構造化データ出力
├── lib/
│   ├── markdown.ts                # Markdownパーサー
│   ├── articles.ts                # 記事データ取得・ソート・フィルター
│   ├── products.ts                # 商品データ取得
│   ├── constants.ts               # カテゴリ定義・サイト設定
│   └── types.ts                   # 型定義
├── public/
│   ├── images/
│   │   ├── articles/              # 記事サムネイル
│   │   ├── products/              # 商品画像
│   │   ├── author/                # 著者写真
│   │   └── ogp/                   # OGP画像
│   └── favicon.ico
├── styles/
│   └── globals.css                # Tailwindベース + カスタムスタイル
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── netlify.toml
```

---

## 4. データモデル（型定義）

### 4-1. 記事データ（types.ts）

```typescript
export interface ArticleFrontmatter {
  title: string;
  description: string;
  category: keyof typeof CATEGORIES;
  tags: string[];
  publishedAt: string;        // YYYY-MM-DD
  updatedAt: string;           // YYYY-MM-DD
  author: string;
  thumbnail: string;           // /images/articles/xxx.webp
  hasPR: boolean;              // PR表記を表示するか
  affiliates?: Affiliate[];    // アフィリエイトリンク（任意）
  relatedSlugs?: string[];     // 関連記事のスラッグ（任意）
  productSlug?: string;        // 関連する自社商品のスラッグ（任意）
}

export interface Affiliate {
  name: string;
  url: string;
  description: string;
  type: 'career' | 'freelance' | 'ai' | 'english' | 'accounting';
}

export interface Article extends ArticleFrontmatter {
  slug: string;
  content: string;             // Markdown本文
  readingTime: number;         // 推定読了時間（分）
}
```

### 4-2. 商品データ

```typescript
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
  relatedArticles?: string[];  // 関連記事のスラッグ
  publishedAt: string;
}

export interface Product extends ProductFrontmatter {
  content: string;             // LP本文（Markdown）
}
```

### 4-3. 著者データ

```typescript
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
    website?: string;          // 将来的な外部サイトリンク（現時点では不使用）
  };
}
```

---

## 5. ページ別仕様

### 5-1. トップページ（/）

**レイアウト：**
1. ヒーローセクション
   - サイト名 + タグライン「Big4出身者が語る、コンサルの先のキャリア戦略」
   - AuthorBox（コンパクト版）
2. 人気記事セクション（3〜4記事をカード型で）
   - 表示ロジック：全カテゴリからPVが最も高い記事を表示（初期は手動でpinned指定）
3. おすすめ商品セクション（1〜2商品をカード型で）
   - /ai-career/ カテゴリの記事と関連する商品のみ表示
4. カテゴリ別新着（各カテゴリから最新2記事をタブ切り替えで）
5. フッター

**SEO：**
- title: "Reboot Hub | {タグライン}"
- h1: サイト名
- Schema.org: WebSite + Organization

### 5-2. カテゴリ記事一覧（/[category]/）

**レイアウト：**
1. カテゴリ名（h1） + カテゴリ説明文
2. 記事一覧（カード型、新着順）
   - 各カードに：サムネイル、タイトル、公開日、読了時間、タグ
3. ページネーション（10記事/ページ）

**バリデーション：**
- categoryがCATEGORIES定義に存在しない場合 → 404

**SEO：**
- title: "{カテゴリ名} | Reboot Hub"
- h1: カテゴリ名
- canonical: /[category]/
- Schema.org: CollectionPage

### 5-3. 個別記事ページ（/[category]/[slug]/）

**レイアウト：**
```
[PRBadge]              ← hasPR: true の場合のみ表示
[h1: タイトル]
[公開日 | 更新日 | カテゴリタグ | 読了時間]
[AuthorBox コンパクト版]
[TOC（目次）]           ← h2/h3から自動生成。スティッキーサイドバー（PC）
[記事本文]              ← Markdown→HTML変換
[AffiliateCard]         ← affiliatesが存在する場合のみ表示
[AuthorBox 詳細版]      ← /about/へのリンク付き
[RelatedArticles]       ← relatedSlugsから3記事表示
[ProductCTA]            ← productSlugが存在する場合のみ表示（ai-careerカテゴリ限定）
```

**記事本文のレンダリング仕様：**
- h2, h3に自動でidを付与（TOCのアンカー用）
- コードブロックにシンタックスハイライト（rehype-highlight）
- 画像はnext/imageで最適化
- 外部リンクはrel="noopener noreferrer" target="_blank"を自動付与
- アフィリエイトリンク（affiliates配列のURL）にはrel="sponsored noopener"を付与

**SEO：**
- title: "{記事タイトル} | Reboot Hub"
- meta description: frontmatterのdescription
- canonical: /[category]/[slug]/
- OGP: og:title, og:description, og:image（サムネイル）, og:type=article
- Twitter Card: summary_large_image
- Schema.org: Article（author, publisher, datePublished, dateModified）
- パンくずリスト: Home > カテゴリ名 > 記事タイトル（BreadcrumbList）

### 5-4. 商品一覧（/products/）

**レイアウト：**
1. ページタイトル「AI業務自動化ツール」（h1）
2. カテゴリフィルター（template / course / tool のタブ）
3. 商品カード一覧
   - 各カードに：サムネイル、商品名、価格、概要、CTAボタン

### 5-5. 個別商品LP（/products/[slug]/）

**レイアウト：**
```
[ヒーロー: 商品名 + キャッチコピー + 価格 + CTAボタン]
[問題提起: こんな悩みありませんか？]
[解決策: この商品を使うとこうなります]
[収録内容一覧: features配列から自動生成]
[著者の権威性: 「AIコンサルとして実際にクライアントに提供しているテンプレート」]
[CTAボタン（2回目）]
[関連ブログ記事: relatedArticlesから表示]
```

**CTAボタンの挙動：**
- purchaseUrl（外部サイト：note, Brain等）への遷移
- rel="noopener" target="_blank"
- クリックイベントをGA4に送信（event: product_cta_click, product_name, product_price）

### 5-6. 著者プロフィール（/about/）

**レイアウト：**
1. 著者写真 + 名前 + 肩書き
2. 経歴タイムライン
3. スキル・資格一覧
4. SNSリンク（X, LinkedIn, note）

**重要：** guidetech.jpへのリンクは一切張らない（ブランド完全分離）。

**重要：** このページのSchema.org Personに、sameAsプロパティでSNSのURLを列挙する。

### 5-7. 固定ページ（disclosure, privacy, tokushoho, contact）

**disclosure（/disclosure/）：**
- 広告掲載ポリシーの文面をハードコード
- 「本サイトの一部記事にはアフィリエイトリンクが含まれています」等

**privacy（/privacy/）：**
- プライバシーポリシーの文面をハードコード
- GA4の使用、Cookie等に言及

**tokushoho（/tokushoho/）：**
- 特定商取引法に基づく表記
- 販売業者名、所在地（請求があれば開示）、連絡先、販売価格、支払方法、引渡時期、返品ポリシー

**contact（/contact/）：**
- フォーム項目：名前（必須）、メールアドレス（必須）、会社名（任意）、種別（広告掲載/その他）、本文（必須）
- 送信先：外部フォームサービス（Formspree or Google Forms）にPOST
- 送信成功時：サンクスメッセージを表示

---

## 6. コンポーネント仕様

### 6-1. Header.tsx

```
[ロゴ] [コンサルのリアル] [転職] [独立] [AI×キャリア] [グローバル] [商品] [プロフィール]
```

- モバイル：ハンバーガーメニュー（シートで開く）
- 現在のカテゴリにアクティブ状態（下線 or 太字）
- スクロール時にヘッダーを固定（sticky）
- 高さ：64px（デスクトップ）、56px（モバイル）

### 6-2. ArticleCard.tsx

- props: article: Article
- 表示要素：サムネイル（16:9）、カテゴリバッジ、タイトル、公開日、読了時間
- hover: カード全体にシャドウ + タイトルの色変化
- サムネイルはnext/image（width=400, quality=80, format=webp）

### 6-3. AuthorBox.tsx

**コンパクト版（記事冒頭）：**
- アバター（40px丸）+ 名前 + 一行の肩書き

**詳細版（記事末尾）：**
- アバター（80px丸）+ 名前 + 経歴3行 + 資格バッジ + /about/ リンク + SNSリンク

### 6-4. AffiliateCard.tsx

- props: affiliates: Affiliate[]
- 見出し：「この記事で紹介したサービス」
- 各カード：サービス名、説明文、CTAボタン（「無料で相談する」等）
- CTAボタンのリンクにrel="sponsored noopener"
- GA4イベント：affiliate_click（service_name, article_slug）

### 6-5. ProductCTA.tsx

- props: product: Product
- 表示条件：記事のcategoryが'ai-career'、かつproductSlugが存在する場合のみ
- デザイン：記事本文と明確に区別されたカード型
- 見出し：「この記事のプロンプトをまとめたパッケージ」的な文言
- CTAボタン → /products/[slug]/ へ遷移

### 6-6. TOC.tsx

- 記事のh2, h3からリストを自動生成
- デスクトップ：右サイドバーにスティッキー配置
- モバイル：記事冒頭に折りたたみ式で表示
- 現在読んでいるセクションをハイライト（Intersection Observer）

### 6-7. PRBadge.tsx

- props: hasPR: boolean
- hasPR=true の場合のみ表示
- テキスト：「PR 本記事にはアフィリエイトリンクが含まれています」
- デザイン：記事冒頭の控えめなバッジ（グレー背景）

### 6-8. SchemaOrg.tsx

記事ページに以下のJSON-LDを埋め込み：

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{title}",
  "description": "{description}",
  "image": "{thumbnail}",
  "datePublished": "{publishedAt}",
  "dateModified": "{updatedAt}",
  "author": {
    "@type": "Person",
    "name": "Kay",
    "url": "https://reboot-hub.jp/about/",
    "sameAs": [
      "https://twitter.com/xxxxx",
      "https://linkedin.com/in/xxxxx"
    ]
  },
  "publisher": {
    "@type": "Organization",
    "name": "Reboot Hub",
    "url": "https://reboot-hub.jp/"
  }
}
```

著者プロフィールページには Person スキーマ：
```json
{
  "@type": "Person",
  "name": "Kay",
  "jobTitle": "AI・ITコンサルタント",
  "knowsAbout": ["AI", "IT Consulting", "Career Development"],
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "通訳案内士"
  },
  "sameAs": ["https://twitter.com/xxxxx", "https://linkedin.com/in/xxxxx"]
}
```

トップページには WebSite + Organization スキーマ。

---

## 7. Markdown処理パイプライン

### 7-1. パーサー構成（markdown.ts）

```
Markdownファイル
  → gray-matter（frontmatter抽出）
  → remark-parse（Markdownパース）
  → remark-gfm（GitHub Flavored Markdown対応）
  → remark-rehype（HTML変換）
  → rehype-highlight（シンタックスハイライト）
  → rehype-slug（h2/h3にid自動付与）
  → rehype-autolink-headings（見出しにアンカーリンク）
  → rehype-external-links（外部リンクにtarget="_blank"付与）
  → rehype-stringify（HTML文字列出力）
```

### 7-2. 記事取得ロジック（articles.ts）

```typescript
// 全記事取得
getArticles(): Article[]

// カテゴリ別取得
getArticlesByCategory(category: string): Article[]

// スラッグで1件取得
getArticleBySlug(category: string, slug: string): Article | null

// 関連記事取得
getRelatedArticles(slugs: string[]): Article[]

// 読了時間計算（日本語: 500文字/分）
calculateReadingTime(content: string): number
```

### 7-3. 商品取得ロジック（products.ts）

```typescript
getProducts(): Product[]
getProductBySlug(slug: string): Product | null
```

---

## 8. 静的サイト生成（SSG）

### 8-1. generateStaticParams

全ての記事ページと商品ページを、ビルド時に静的生成する。

```typescript
// app/[category]/[slug]/page.tsx
export async function generateStaticParams() {
  const articles = getArticles();
  return articles.map(article => ({
    category: article.category,
    slug: article.slug,
  }));
}

// app/products/[slug]/page.tsx
export async function generateStaticParams() {
  const products = getProducts();
  return products.map(product => ({
    slug: product.slug,
  }));
}
```

### 8-2. generateMetadata

各ページでNext.jsのMetadata APIを使用し、title, description, OGP, canonical等を動的生成。

---

## 9. デザイン仕様

### 9-1. カラーパレット

| 用途 | カラー | 変数名 |
|-----|--------|--------|
| プライマリ | #1B4F72 | --color-primary |
| セカンダリ | #2E75B6 | --color-secondary |
| アクセント | #E67E22 | --color-accent |
| テキスト | #1A1A1A | --color-text |
| テキスト（サブ） | #6B7280 | --color-text-muted |
| 背景 | #FFFFFF | --color-bg |
| 背景（セカンダリ） | #F9FAFB | --color-bg-secondary |
| ボーダー | #E5E7EB | --color-border |
| 成功 | #059669 | --color-success |
| 警告 | #D97706 | --color-warning |

### 9-2. タイポグラフィ

| 要素 | フォント | サイズ | ウェイト |
|-----|---------|--------|---------|
| h1 | system-ui | 32px (mobile: 24px) | 700 |
| h2 | system-ui | 24px (mobile: 20px) | 700 |
| h3 | system-ui | 20px (mobile: 18px) | 600 |
| 本文 | system-ui | 16px | 400 |
| 本文（小） | system-ui | 14px | 400 |
| コード | monospace | 14px | 400 |

フォントはsystem-uiフォントスタック（Webフォント読み込みゼロ → LCP最適化）。

### 9-3. レイアウト

| 要素 | 幅 |
|-----|-----|
| メインコンテンツ最大幅 | 1200px |
| 記事本文最大幅 | 720px |
| サイドバー幅 | 280px |
| カード最小幅 | 280px |
| グリッドギャップ | 24px |
| セクション間マージン | 48px |

### 9-4. ダークモード

初期リリースでは実装しない。将来的にmedia query (prefers-color-scheme: dark) で対応する余地を残すため、色はCSS変数で管理すること。

---

## 10. SEO実装チェックリスト

### 10-1. 必須meta要素（全ページ）
- [ ] title タグ（60文字以内）
- [ ] meta description（120文字以内）
- [ ] canonical URL
- [ ] OGP（og:title, og:description, og:image, og:url, og:type, og:site_name）
- [ ] Twitter Card（twitter:card, twitter:title, twitter:description, twitter:image）
- [ ] viewport meta

### 10-2. 構造化データ
- [ ] トップページ：WebSite + Organization
- [ ] 著者ページ：Person
- [ ] 各記事：Article + BreadcrumbList
- [ ] 各商品：Product
- [ ] Google Search Console で構造化データのエラーがないことを確認

### 10-3. サイトマップ
- [ ] /sitemap.xml を自動生成（全記事+全商品+固定ページ）
- [ ] 各URLにlastmod（更新日）を含める
- [ ] Google Search Console に送信

### 10-4. robots.txt
```
User-agent: *
Allow: /
Sitemap: https://reboot-hub.jp/sitemap.xml
```

### 10-5. パフォーマンス
- [ ] 画像は全てWebP形式（next/imageで自動変換）
- [ ] サムネイルはwidth=400（一覧）、width=1200（記事ページOGP用）
- [ ] フォントはsystem-ui（外部フォント読み込みなし）
- [ ] Tailwind CSSのpurge有効化
- [ ] next/dynamic で非重要コンポーネントを遅延ロード（TOC, ShareButtons等）

### 10-6. リンク属性
- [ ] アフィリエイトリンク：rel="sponsored noopener" target="_blank"
- [ ] 外部リンク（一般）：rel="noopener noreferrer" target="_blank"
- [ ] 内部リンク：next/link（プリフェッチ有効）

---

## 11. アナリティクス・トラッキング

### 11-1. GA4イベント

| イベント名 | トリガー | パラメータ |
|-----------|---------|-----------|
| page_view | 各ページ閲覧 | page_title, page_location |
| article_read | 記事ページ閲覧 | article_title, category, author |
| affiliate_click | アフィリCTAクリック | service_name, article_slug |
| product_cta_click | 商品CTAクリック | product_name, product_price, source_article |
| product_purchase_click | 商品購入ボタンクリック | product_name, product_price, platform |
| contact_submit | 問い合わせ送信 | contact_type |
| toc_click | 目次クリック | heading_text |
| share_click | SNSシェアボタンクリック | platform, article_title |

### 11-2. GA4設定
- GA4のMeasurement IDは環境変数（NEXT_PUBLIC_GA_ID）で管理
- next/script で gtag.js を読み込み（strategy="afterInteractive"）

---

## 12. Netlifyデプロイ設定

### 12-1. netlify.toml

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "20"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; img-src 'self' data: https:; style-src 'self' 'unsafe-inline';"

[[headers]]
  for = "/_next/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[redirects]]
  from = "/author/*"
  to = "/about/"
  status = 301
```

### 12-2. 環境変数（Netlify管理画面で設定）

| 変数名 | 用途 |
|--------|------|
| NEXT_PUBLIC_GA_ID | GA4 Measurement ID |
| NEXT_PUBLIC_SITE_URL | サイトのベースURL |
| NEXT_PUBLIC_SITE_NAME | サイト名 |
| FORMSPREE_ID | お問い合わせフォームのID |

---

## 13. コンテンツワークフロー

### 13-1. 記事追加フロー

```
1. content/articles/{category}/{slug}.md を作成
2. frontmatterを記入（title, description, category, tags, affiliates等）
3. Markdown本文を執筆
4. git add → git commit → git push
5. Netlifyが自動ビルド（1〜2分）
6. サイトマップも自動更新
```

### 13-2. 商品追加フロー

```
1. content/products/{slug}.md を作成
2. frontmatterを記入（title, price, purchaseUrl, features等）
3. LP本文をMarkdownで記述
4. git push → 自動デプロイ
```

### 13-3. アフィリリンク更新フロー

```
記事本文を編集する必要なし。
frontmatterのaffiliates配列のurlを書き換えて git push するだけ。
全記事のリンクはfrontmatterから動的に生成されるため、一括更新が容易。
```

---

## 14. テスト要件

### 14-1. ビルドテスト
- [ ] `npm run build` がエラーなく完了すること
- [ ] 全ての動的ルートが正しく静的生成されること

### 14-2. SEOテスト
- [ ] 全ページのtitle, descriptionが正しく設定されていること
- [ ] 全ページのcanonical URLが正しいこと
- [ ] OGP画像が正しく表示されること（Twitterカード検証ツール等）
- [ ] 構造化データがGoogle Rich Results Testでエラーなしであること
- [ ] sitemap.xmlに全ページが含まれていること

### 14-3. パフォーマンステスト
- [ ] Lighthouse Performance ≧ 95（モバイル）
- [ ] LCP ≦ 2.5秒
- [ ] CLS ≦ 0.1

### 14-4. 機能テスト
- [ ] 全カテゴリの記事一覧が正しく表示されること
- [ ] ページネーションが正しく動作すること
- [ ] 目次のアンカーリンクが正しく動作すること
- [ ] アフィリエイトリンクのrel属性が正しいこと
- [ ] 商品CTAがai-careerカテゴリの記事でのみ表示されること
- [ ] お問い合わせフォームが送信できること
- [ ] 404ページが正しく表示されること
- [ ] モバイルでハンバーガーメニューが動作すること

---

## 15. 初期コンテンツ（ビルド確認用のサンプル）

ビルド確認のため、以下のダミーコンテンツを最低1本ずつ作成すること：

- content/articles/consul-real/big4-quit-story.md（サンプル記事）
- content/articles/career-change/consul-agent-review.md（アフィリあり記事）
- content/articles/ai-career/claude-api-automation.md（商品CTA付き記事）
- content/products/ai-templates.md（商品サンプル）

各ファイルには正しいfrontmatterとダミーの本文（Lorem ipsum的な日本語テキスト500文字程度）を含めること。

---

## 16. 将来的な拡張（Phase 2以降。初期実装には含めない）

以下は初期実装に含めないが、アーキテクチャ設計時に拡張性を考慮すること：

- [ ] ダークモード対応（CSS変数で色管理していれば容易）
- [ ] メールマガジン登録フォーム（Mailchimp or ConvertKit連携）
- [ ] 有料コミュニティ募集ページ
- [ ] Stripe決済統合（自社サイト内での直接販売）
- [ ] Pagefindによるサイト内検索
- [ ] 多言語対応（英語版）
- [ ] PWA対応
- [ ] 記事のPV数表示（Analytics APIまたはカウンター）

---

*要件定義書 v1.0 | 2026年3月17日*

---

# C-Suite レビュー & 改善提案

---

## CEO視点（事業戦略・全体最適）

### 指摘事項

1. **サイト名が未確定のまま開発に入るのはリスク**
   ドメイン名とサイト名は開発前に確定すべき。constants.tsにハードコードされるため、後から変えると全ページに影響する。サイト名候補を3つ出し、ドメイン取得可否を確認してから着手すること。

2. **guidetech.jpとの関係が技術仕様に反映されていない**
   著者プロフィールから削除（ブランド分離）へリンクする設計だが、「guidetech.jpからメディアへのリンクは張らない」というルールが要件に明記されていない。開発者が誤って双方向リンクにする可能性がある。

3. **収益目標とKPIのトラッキング手段がない**
   月30万→月100万というロードマップがあるが、GA4のイベント設定だけではアフィリエイトの実際の収益（ASP管理画面の数字）とサイトデータを紐付けられない。ASP管理画面のデータとGA4を突合する運用フローも定義すべき。

4. **撤退基準がない**
   6ヶ月後にPV/収益が想定以下だった場合の判断基準を事前に決めておくべき。

### 改善提案

要件定義書に以下を追加：

```
## 1-5. 前提条件
- ドメイン名：開発着手前に確定すること。候補：[3つ]
- guidetech.jpとの関係：reboot-hub.jpからguidetech.jpへのリンクは一切張らない。逆方向も不可。完全分離。
- 撤退基準：6ヶ月後にPV月間1,000未満かつ収益¥0の場合は戦略を見直す。
```

---

## CTO視点（技術・アーキテクチャ）

### 指摘事項

1. **Pagefindの導入タイミングが曖昧**
   技術スタックにPagefindが含まれているが、セクション16では「将来的な拡張」にも記載されており矛盾。記事数が少ない初期（〜30記事）ではサイト内検索は不要。Phase 2以降に明確に移すべき。

2. **画像最適化の戦略が不十分**
   next/imageの使用は記載されているが、OGP画像の自動生成については触れていない。各記事のOGP画像を手動で作るのは非効率。@vercel/ogまたはsatoriによるOGP画像の動的生成を検討すべき。

3. **エラーハンドリングの仕様がない**
   存在しないカテゴリやスラッグにアクセスした場合の挙動がnot-found.tsx以外に定義されていない。frontmatterのバリデーション（必須フィールドの欠落等）も必要。

4. **ビルド時間の見積もりがない**
   記事100本+商品10点のSSGビルドがNetlify無料枠の月間300分に収まるかの検証が必要。ISR（Incremental Static Regeneration）への移行オプションも記載すべき。

5. **Content Security Policyが厳しすぎる**
   現在のCSPではGA4のスクリプトは許可されているが、Formspree（お問い合わせ）やPagefind（将来）のスクリプトが動かない可能性。使用する外部ドメインを明示的にリストアップすべき。

6. **RSS/Atomフィードがない**
   SEO的にもSNS連携的にもRSSフィードは有用。note等への転載時にも使える。

### 改善提案

```
## 技術スタックの修正
- Pagefind → Phase 2に移動（初期実装から除外）
- OGP画像 → @vercel/og による動的生成を追加
- RSSフィード → /feed.xml を自動生成（app/feed.xml/route.ts）

## 追加セクション：エラーハンドリング
- frontmatter必須フィールドが欠落 → ビルド時にエラー出力して中断
- 存在しないカテゴリ → 404
- 存在しないスラッグ → 404
- 画像ファイルが見つからない → プレースホルダー画像を表示

## 追加セクション：ビルド最適化
- 記事100本での推定ビルド時間：2〜3分（Netlify無料枠内）
- 記事200本超でビルド時間が5分を超える場合 → ISRへの移行を検討
- キャッシュ戦略：Netlifyのビルドキャッシュを有効化
```

---

## CMO視点（マーケティング・集客・CVR）

### 指摘事項

1. **CTAの設計が甘い**
   アフィリエイトカードは記事末尾のみだが、記事本文が4,000〜6,000文字の場合、末尾まで読まない読者が多い。記事途中（h2の切れ目）にもインラインCTAを配置する仕組みが必要。

2. **メールマガジン（リスト構築）が初期から必要**
   「Phase 2以降」に分類されているが、初日からメルマガ登録フォームを設置すべき。記事を読んだ人のメールアドレスを取得できれば、新商品のリリース時にプッシュ通知的にリーチできる。メールリストは最も価値の高い資産。ConvertKitの無料プラン（1,000人まで）で初期コストゼロ。

3. **シェア導線が弱い**
   ShareButtonsコンポーネントは定義されているが、配置場所の仕様がない。記事タイトル直下と記事末尾の2箇所に配置すべき。特にXへのシェアはSEO外のトラフィック獲得に直結する。

4. **記事内CTAの出し分けロジックがない**
   転職カテゴリの記事にはエージェントCTA、独立カテゴリにはフリーランスエージェントCTA、AIカテゴリには商品CTAと、カテゴリ別にCTAの種類を変える必要がある。現在はfrontmatterのaffiliatesで個別管理だが、「カテゴリのデフォルトCTA」を設定できると効率的。

5. **「人気記事」の定義が不明確**
   トップページの「人気記事」を「PVが最も高い記事」としているが、初期はPVデータがない。pinnedフラグで手動指定する仕組みは記載されているが、将来的にGA4のAPIからPVデータを取得して自動ソートする拡張への道筋も記載すべき。

6. **出口ページ対策がない**
   検索から個別記事に直接ランディングした読者が、その1記事だけ読んで離脱するのを防ぐ仕組みが弱い。記事下の関連記事だけでなく、記事途中の「あわせて読みたい」インラインリンクの仕組みも必要。

### 改善提案

```
## コンポーネント追加
- InlineCTA.tsx：記事途中（h2の切れ目）に挿入するCTAボックス
  - カテゴリに応じて表示する内容を自動切替
  - career-change → 転職エージェントCTA
  - freelance → フリーランスエージェントCTA
  - ai-career → 自社商品CTA
  - consul-real, global → 関連カテゴリの記事へのリンク（CTAなし）

- NewsletterForm.tsx：メルマガ登録フォーム
  - 配置：記事末尾（AuthorBoxの直後）+ フッター
  - CTA文言：「コンサルキャリアの最新情報を受け取る」
  - ConvertKit無料プランで初期実装
  - 環境変数：NEXT_PUBLIC_CONVERTKIT_FORM_ID

- InlineRelated.tsx：記事途中の「あわせて読みたい」ボックス
  - frontmatterのrelatedSlugsから1記事をピックアップ
  - h2の切れ目（2つ目のh2の前）に自動挿入

## ShareButtons配置仕様
- 記事タイトル直下（公開日の右）：X, はてなブックマーク
- 記事末尾（AuthorBox直前）：X, はてなブックマーク, LINE, コピー

## frontmatter拡張
- pinned: boolean（トップページの人気記事に手動で指定）
```

---

## CFO視点（コスト・収益性・リスク管理）

### 指摘事項

1. **ランニングコストの明示が不十分**
   要件定義書にコスト情報がない。クライアント（＝Kayさん自身）がいくら支出するかを明確にすべき。

2. **ASP登録の優先順位がない**
   5社のASPに一度に登録するのは非効率。サイトが10記事未満で審査に落ちるASPもある。優先順位を付けるべき。

3. **特商法表記の法的リスク**
   デジタル商品をnote等のプラットフォーム経由で販売する場合、プラットフォームが特商法表記を代行するケースがある。自サイトの/tokushoho/に個人住所を記載するリスクを検討すべき。

4. **アフィリエイト収益の確定申告準備がない**
   アフィリ収益とデジタル商品の売上は事業所得として確定申告が必要。ASP別・商品別の売上管理の仕組み（スプレッドシート等）を運用フローに含めるべき。

### 改善提案

```
## 追加セクション：コスト計画

### 初期コスト
- ドメイン取得：約¥1,500/年
- 開発工数：自社開発（Claude Codeで実装）= ¥0
- 合計：約¥1,500

### 月間ランニングコスト
- Netlifyホスティング：¥0（無料枠）
- ドメイン：約¥125/月（年¥1,500÷12）
- GA4：¥0
- ConvertKit：¥0（1,000人まで無料）
- 合計：約¥125/月

### ASP登録優先順位
1. もしもアフィリエイト（審査が通りやすい。初期はここから）
2. A8.net（案件数最多。10記事程度で申請）
3. afb（承認率が開示される。20記事程度で申請）
4. アクセストレード（コンサル系案件が充実。30記事で申請）
5. バリューコマース（大手案件。PVが増えてから）
6. 海外直接アフィリ（Zapier, Notion等）はPhase 2以降

### 特商法表記の対応方針
- note/Brain経由の販売：プラットフォームが特商法表記を代行
- 自サイトの/tokushoho/：「請求があれば遅滞なく開示します」と記載
  → 個人住所の公開を避けつつ法的要件を満たす
- 将来的にStripe直接販売に移行する場合は、バーチャルオフィス住所の利用を検討
```

---

## カスタマーサクセス視点（読者体験・信頼構築）

### 指摘事項

1. **読者の「次のアクション」が各ページで明確でない**
   各ページを読み終えた読者が次に何をすべきかが設計されていない。記事を読んだ→次は？商品LPを見た→次は？この「次の一歩」を全ページで明確にする必要がある。

2. **信頼性の可視化が足りない**
   著者の経歴は記載されているが、「この情報は信頼できる」と読者が感じるためのソーシャルプルーフ（実績数字、メディア掲載、読者の声等）が設計に含まれていない。

3. **更新頻度の可視化がない**
   記事の「更新日」は表示されるが、サイト全体として「活発に更新されている」という印象を与える仕組みがない。最終更新日が半年前の記事ばかりだと信頼性が下がる。

4. **コンタクト導線が弱い**
   /contact/ は広告掲載・特単交渉の窓口だが、読者向けの気軽な質問手段がない。Xへの誘導（DMやリプ）を強化すべき。

5. **PR表記のネガティブインパクト**
   PRバッジを記事冒頭に置くと、一部の読者は「広告記事か」と離脱する可能性がある。ステマ規制への対応は必須だが、見せ方を工夫すべき。

### 改善提案

```
## コンポーネント追加・改修

### NextActionBox.tsx
各ページ種別ごとに「次にやること」を明示するコンポーネント：

- 集客記事（consul-real）読了後：
  「あなたの状況に近い記事を読む」→ 転職/独立/AIの3択を提示

- 収益記事（career-change, freelance）読了後：
  「まずは市場価値を確認してみる」→ アフィリエイトCTA

- AI記事（ai-career）読了後：
  「今日から使えるテンプレートを手に入れる」→ 商品CTA

- 商品LP読了後：
  「購入する」→ CTAボタン + 「まずは関連記事を読む」→ 記事リンク

### CredibilityBar.tsx（著者信頼性バー）
記事冒頭のAuthorBoxに追加：
- 「IT業界10年」「コンサルファーム（Big4）出身」「国家資格保有」
  をバッジ形式で横並び表示
- 数字はハードコードだが、将来的に動的にする余地を残す

### PRBadge改修
- 「PR」の文字を目立たせすぎない。小さなテキストリンク型に変更
- クリックすると /disclosure/ に遷移する仕組み
- 記事冒頭ではなく、タイトルと本文の間の控えめな位置に配置

### X誘導の強化
- AuthorBox詳細版にXアカウントへのフォローボタンを配置
- 「質問や感想はXでお気軽に」のメッセージを追加
- 記事末尾に「この記事についてXで話す」ボタン（プリフィルドツイート）
```

---

## レビューを反映した要件定義書の修正サマリー

### 追加するセクション
1. **1-5. 前提条件**（CEO：ドメイン確定、guidetech.jpとの関係、撤退基準）
2. **コスト計画**（CFO：初期コスト、ランニングコスト、ASP登録優先順位）
3. **エラーハンドリング仕様**（CTO：frontmatterバリデーション、404処理）

### 修正するセクション
4. **技術スタック**（CTO：Pagefindを除外、OGP動的生成を追加、RSSフィードを追加）
5. **CSP設定**（CTO：FormspreeとConvertKitのドメインを追加）
6. **将来的な拡張**（CTO：ISR移行オプション、ビルド時間見積もり）

### 追加するコンポーネント
7. **InlineCTA.tsx**（CMO：記事途中のカテゴリ別CTA）
8. **NewsletterForm.tsx**（CMO：メルマガ登録フォーム）
9. **InlineRelated.tsx**（CMO：記事途中の関連記事リンク）
10. **NextActionBox.tsx**（CS：ページ種別ごとの次のアクション）
11. **CredibilityBar.tsx**（CS：著者信頼性バッジ）

### 修正するコンポーネント
12. **PRBadge.tsx**（CS：控えめなデザインに変更）
13. **AuthorBox.tsx**（CS：X誘導ボタン追加）
14. **ShareButtons.tsx**（CMO：配置場所の明確化、Xプリフィルド対応）

### 追加するfrontmatterフィールド
15. **pinned: boolean**（CMO：トップページの人気記事手動指定）
