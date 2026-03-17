# Claude Code への投げ方 — ベストプラクティス
## 大規模要件定義書を精度高く実装させる方法

---

## 核心：一度に全部投げない

要件定義書が1,000行以上ある場合、全体を一度に投げると以下の問題が起きる：

- コンテキストウィンドウの後半の指示が優先度低く扱われる
- 「全体を理解している風」で実装するが、細部を落とす
- 特にコンポーネント間の依存関係が崩れやすい

**解決策：フェーズに分けて、1フェーズずつ投げる。**

---

## 推奨ワークフロー

### ステップ1：プロジェクト初期化（1回目）

最初の投入で「骨格だけ」を作らせる。

```
以下の要件定義書の「セクション1〜3」を読んで、
Next.js + TypeScript + Tailwind CSSのプロジェクトを初期化してください。

やること：
- プロジェクトの初期化（npx create-next-app）
- ディレクトリ構造の作成（セクション3の通り）
- constants.ts にカテゴリ定義を書く
- types.ts に型定義を書く（セクション4の通り）
- tailwind.config.js にカラーパレットを設定（セクション9-1の通り）
- globals.css にタイポグラフィを設定（セクション9-2の通り）
- netlify.toml を作成（セクション12の通り）

やらないこと：
- ページの実装はまだしない
- コンポーネントの実装もまだしない
- コンテンツ（Markdown）もまだ不要

[ここに要件定義書のセクション1〜4と9と12を貼る]
```

### ステップ2：Markdownパイプライン（2回目）

コンテンツ管理の基盤を作らせる。

```
前のステップで作成したプロジェクトに、
Markdown処理パイプラインを実装してください。

やること：
- lib/markdown.ts（セクション7-1の通り）
- lib/articles.ts（セクション7-2の通り）
- lib/products.ts（セクション7-3の通り）
- content/ にサンプル記事を4本作成（セクション15の通り）
- content/products/ にサンプル商品を1本作成

確認方法：
- npm run build がエラーなく通ること
- getArticles() で4本の記事が取得できること
- getProducts() で1本の商品が取得できること

[ここにセクション4（型定義）と7と15を貼る]
```

### ステップ3：レイアウト + ナビゲーション（3回目）

```
レイアウトとナビゲーションを実装してください。

やること：
- app/layout.tsx（グローバルレイアウト）
- components/layout/Header.tsx（セクション6-1の通り）
- components/layout/Footer.tsx
- components/layout/Navigation.tsx
- components/layout/Breadcrumb.tsx
- モバイル対応（ハンバーガーメニュー）
- スティッキーヘッダー

デザイン仕様：
[ここにセクション6とセクション9を貼る]
```

### ステップ4：トップページ + カテゴリ一覧（4回目）

```
トップページとカテゴリ一覧ページを実装してください。

やること：
- app/page.tsx（セクション5-1の通り）
- app/[category]/page.tsx（セクション5-2の通り）
- components/article/ArticleCard.tsx（セクション6-2の通り）
- components/common/CategoryTabs.tsx
- components/common/Pagination.tsx

表示確認：
- / にアクセスしてトップページが表示されること
- /consul-real/ にアクセスしてカテゴリ一覧が表示されること
- 存在しないカテゴリ（/xxx/）で404が表示されること

[ここにセクション5-1, 5-2, 6-2を貼る]
```

### ステップ5：記事ページ（5回目）

```
個別記事ページを実装してください。

やること：
- app/[category]/[slug]/page.tsx（セクション5-3の通り）
- components/article/ArticleBody.tsx
- components/article/TOC.tsx（セクション6-6の通り）
- components/article/AuthorBox.tsx（セクション6-3の通り）
- components/article/PRBadge.tsx（セクション6-7の通り）
- components/article/AffiliateCard.tsx（セクション6-4の通り）
- components/article/RelatedArticles.tsx
- generateStaticParams（セクション8の通り）
- generateMetadata（OGP, canonical等）

確認ポイント：
- /consul-real/big4-quit-story/ でサンプル記事が表示されること
- 目次が自動生成されていること
- hasPR: true の記事にPRバッジが表示されること
- affiliates がある記事にAffiliateCardが表示されること
- OGPタグがHTMLに正しく出力されていること

[ここにセクション5-3, 6-3〜6-7, 8, 10を貼る]
```

### ステップ6：商品ページ（6回目）

```
商品一覧ページと個別商品LPを実装してください。

やること：
- app/products/page.tsx（セクション5-4の通り）
- app/products/[slug]/page.tsx（セクション5-5の通り）
- components/product/ProductCard.tsx
- components/product/ProductCTA.tsx（セクション6-5の通り）
- components/product/ProductLP.tsx

確認ポイント：
- /products/ にアクセスして商品一覧が表示されること
- /products/ai-templates/ でサンプル商品LPが表示されること
- CTAボタンが purchaseUrl にリンクしていること
- ProductCTA が ai-career カテゴリの記事でのみ表示されること

[ここにセクション5-4, 5-5, 6-5を貼る]
```

### ステップ7：固定ページ + SEO + サイトマップ（7回目）

```
固定ページ、SEO、サイトマップを実装してください。

やること：
- app/about/page.tsx（セクション5-6の通り）
- app/disclosure/page.tsx
- app/privacy/page.tsx
- app/tokushoho/page.tsx
- app/contact/page.tsx（セクション5-7の通り）
- app/sitemap.ts（XMLサイトマップ自動生成）
- app/robots.ts
- components/seo/SchemaOrg.tsx（セクション6-8の通り）
- 全ページでSchemaOrgを正しく出力

[ここにセクション5-6, 5-7, 6-8, 10を貼る]
```

### ステップ8：最終仕上げ（8回目）

```
以下の仕上げを行ってください：

1. GA4のスクリプトタグ埋め込み（セクション11の通り）
2. ShareButtons コンポーネント実装
3. 404ページのデザイン
4. 全ページのレスポンシブ確認（375px, 768px, 1440px）
5. Lighthouse でパフォーマンススコアを確認
6. npm run build が正常に完了することを確認
7. セキュリティヘッダーの確認（netlify.toml）

[ここにセクション11, 12, 14を貼る]
```

---

## 各ステップで守るべきルール

### 「やること」と「やらないこと」を明示する

Claude Codeは指示がないと「ついでにこれも作っておきました」と余計なことをやりがち。
各ステップで「やること」を明示するのと同じくらい「やらないこと」を明示する。

### 確認ポイントを具体的に書く

「正しく動作すること」ではなく「/consul-real/ にアクセスしてカテゴリ一覧が表示されること」
のように、何をどう確認するかを具体的に書く。
Claude Codeはこの確認ポイントを使って自己検証できる。

### 型定義は毎回含める

types.ts の内容は複数のステップで参照される。
各ステップの投入時に型定義を含めると、コンポーネントの型の整合性が保たれる。

### 前のステップの成果物を参照させる

ステップ2以降では「前のステップで作成したプロジェクトに」と明示する。
Claude Codeはプロジェクトのファイル構造を見て、既存コードとの整合性を取る。

---

## CLAUDE.md を活用する

プロジェクトのルートに CLAUDE.md ファイルを置くと、
Claude Code が毎回参照するプロジェクト全体の指示書になる。

```markdown
# CLAUDE.md

## プロジェクト概要
コンサル出身者向けキャリア戦略メディア。Next.js + TypeScript + Tailwind CSS + Markdown。

## 技術スタック
- Next.js 14+ (App Router)
- TypeScript 5+
- Tailwind CSS 3+
- gray-matter + remark + rehype
- Netlify でホスティング

## コード規約
- コンポーネントは関数コンポーネント（FC）で書く
- CSS-in-JS は使わない。Tailwind のユーティリティクラスのみ
- フォントは system-ui。外部フォント読み込み禁止
- 画像は全て next/image で配信。WebP形式
- 環境変数は NEXT_PUBLIC_ プレフィックスで管理

## ディレクトリ規約
- app/ : ページコンポーネント
- components/ : UIコンポーネント（layout/, article/, product/, common/, seo/）
- lib/ : ユーティリティ関数
- content/ : Markdownコンテンツ（articles/, products/）
- public/ : 静的ファイル

## パフォーマンス目標
- Lighthouse Performance ≧ 95
- LCP ≦ 2.5秒
- CLS ≦ 0.1

## やってはいけないこと
- Webフォントの読み込み
- CSS-in-JS ライブラリの導入
- クライアントサイドのデータフェッチ（全て SSG）
- localStorage / sessionStorage の使用
- 不要な npm パッケージの追加
```

---

## よくある失敗と対策

### 失敗1：「全部一気にお願い」→ 中途半端な実装

**対策：** 8ステップに分割。1ステップ = 1会話。

### 失敗2：デザインがダサい

**対策：** ステップ3で参考サイトのURLを貼る。
「デザインの参考にしてください：https://consul-career.com/」
のように競合サイトのURLを渡すと、そのテイストに寄せてくれる。

### 失敗3：型エラーが大量に出る

**対策：** ステップ2で型定義を確実に実装させ、以降のステップでは
「types.ts の型定義に従ってください」と毎回指示する。

### 失敗4：ビルドが通らない

**対策：** 各ステップの最後に「npm run build を実行して、
エラーがないことを確認してください。エラーがあれば修正してください」
と必ず書く。

### 失敗5：コンポーネント間の依存関係が壊れる

**対策：** ステップ5（記事ページ）以降では、既存コンポーネントの
インポートパスを明示的に指定する。
「components/article/AuthorBox.tsx を使用してください」のように。

---

## ファイルの渡し方

### 方法1：CLAUDE.md + 分割投入（推奨）

1. プロジェクトルートに CLAUDE.md を置く
2. requirements-spec.md をプロジェクトルートに置く
3. writing-guidelines.md をプロジェクトルートに置く
4. 各ステップで該当セクションを指示文に含めて投入

### 方法2：全文を1回で投入（非推奨だがシンプル）

requirements-spec.md と csuite-review.md を結合した
final-requirements.md を1回で投入し、
「この要件定義書を読んで、フェーズ1（プロジェクト初期化）から始めてください」
と指示する。ただし後半セクションの実装精度は落ちる可能性がある。

---

*Claude Code ベストプラクティス v1.0 | 2026年3月17日*
