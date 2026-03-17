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
    "name": "Manabu",
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
  "name": "Manabu",
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
