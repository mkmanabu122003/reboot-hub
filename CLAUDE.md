# CLAUDE.md

## プロジェクト概要
コンサル出身者向けキャリア戦略メディア「Reboot Hub」。
Next.js + TypeScript + Tailwind CSS + Markdown（SSG）。Netlifyでホスティング。

## サイト情報
- ドメイン: reboot-hub.jp
- サイト名: Reboot Hub
- タグライン: Big4出身者が語る、コンサルの先のキャリア戦略
- 著者名: Manabu（姓は出さない。イラストアバター使用。顔写真なし）

## 技術スタック
- Next.js 14+ (App Router)
- TypeScript 5+
- Tailwind CSS 3+
- gray-matter + remark + rehype（Markdown処理）
- Netlify でホスティング
- Google Analytics 4

## コード規約
- コンポーネントは関数コンポーネント（FC）で書く
- CSS-in-JS は使わない。Tailwind のユーティリティクラスのみ
- フォントは system-ui。外部フォント読み込み禁止
- 画像は全て next/image で配信。WebP形式
- 環境変数は NEXT_PUBLIC_ プレフィックスで管理
- 色はCSS変数で管理（将来のダークモード対応のため）

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

## 重要なビジネスルール
- アフィリエイトリンク: rel="sponsored noopener" target="_blank"
- 自社商品CTA（ProductCTA）は ai-career カテゴリの記事でのみ表示
- PRバッジは hasPR: true の記事のみ表示。控えめなデザイン
- guidetech.jp へのリンクは一切張らない（ブランド分離）
- 著者のフルネーム（河原学）はサイト内に一切記載しない

## やってはいけないこと
- Webフォントの読み込み
- CSS-in-JS ライブラリの導入
- クライアントサイドのデータフェッチ（全て SSG）
- localStorage / sessionStorage の使用
- 不要な npm パッケージの追加
- guidetech.jp へのリンクやsameAs参照
