# Reboot Hub SEO改善 対応指示書

> 作成日: 2026-03-30
> 根拠データ: Google Search Console 過去28日間（3/16〜3/28）
> 現状: 3クリック / 213表示 / CTR 1.41% / 平均順位30位

---

## 指示書 #1: trailingSlash 正規化（URL重複解消）

### ステータス: 実装済み

### 背景（CEO/COO向け）

GSCデータで**同一記事がスラッシュあり/なしの2つのURLでインデックス**されている。
Googleは別ページと認識し、評価シグナル（被リンク・クリック・滞在時間）が分散している。

| 記事 | スラッシュなし imp | スラッシュあり imp | 評価ロス |
|------|-------------------|-------------------|---------|
| consul-3year-quit | 31 (順位18) | 9 (順位13) | 40→分散 |
| foreign-consul-english-level | 21 (順位16) | 17 (順位52) | 38→分散 |
| ey-reputation-chiebukuro | 10 (順位40) | 9 (順位37) | 19→分散 |

**これは「広告費を2つの口座に分けて払っている」のと同じ。統合するだけで順位が上がる。**

### 対応内容（エンジニア向け）

`next.config.js` に `trailingSlash: true` を追加済み。

```js
const nextConfig = {
  ...(process.env.NODE_ENV === 'production' ? { output: 'export' } : {}),
  trailingSlash: true,  // ← 追加
  images: { unoptimized: true },
};
```

**効果:**
- static exportで全ページが `/slug/index.html` 形式で生成される
- canonical URL（既にスラッシュあり）と実URLが一致し、重複が解消
- Googleが評価を1つのURLに統合→順位改善

### デプロイ後の確認

1. `npm run build` → `out/` 内のHTMLが全て `index.html` 形式であること
2. Netlifyデプロイ後、`/consul-real/accenture-yabai-chiebukuro`（スラッシュなし）にアクセス → `/consul-real/accenture-yabai-chiebukuro/` にリダイレクトされること
3. 1〜2週間後にGSCで重複URLが減少していることを確認

---

## 指示書 #2: 全記事インデックス登録（API自動化）

### 背景（CEO/COO向け）

51記事を公開しているが、GSCに表示されているページは約20件。
**残り30記事以上がGoogleに認識されていない可能性がある。**
記事を書いても検索に出なければ存在しないのと同じ。APIで能動的にインデックス登録を申請する。

### 対応内容（エンジニア向け）

既存スクリプト `scripts/submit-indexing.mjs` を使用する。3つのチャネルで同時申請:

| チャネル | 対象 | 準備 |
|---------|------|------|
| Google Indexing API | Google検索 | `service-account.json` が必要 |
| IndexNow | Bing/Yandex | `public/reboot-hub-indexnow-key.txt` が必要 |
| Sitemap Ping | Google/Bing | 準備不要 |

### セットアップ手順

#### A. Google Indexing API

1. [Google Cloud Console](https://console.cloud.google.com/) でプロジェクト作成
2. 「Indexing API」を有効化
3. サービスアカウントを作成 → JSONキーをダウンロード
4. `service-account.json` としてプロジェクトルートに配置（.gitignoreに追加済みか確認）
5. [Google Search Console](https://search.google.com/search-console) → 設定 → ユーザーと権限 → サービスアカウントのメールを「オーナー」として追加

#### B. IndexNow

1. `public/reboot-hub-indexnow-key.txt` を作成:
   ```
   reboot-hub-indexnow-key
   ```
2. デプロイ後 `https://reboot-hub.jp/reboot-hub-indexnow-key.txt` でアクセスできることを確認

#### C. 実行

```bash
# 全URLを一括送信
node scripts/submit-indexing.mjs

# 特定URLのみ
node scripts/submit-indexing.mjs --urls https://reboot-hub.jp/consul-real/accenture-yabai-chiebukuro/
```

### 運用ルール（COO向け）

- **新規記事公開時**: デプロイ後に必ず実行する（CI/CDに組み込むのが理想）
- **リライト時**: 更新した記事のURLを `--urls` で指定して実行
- **頻度制限**: Google Indexing APIは1日200リクエスト上限。51記事なら1回で完了

### KPI（CEO向け）

| 指標 | 現状 | 2週間後目標 |
|------|------|------------|
| インデックス済みページ数 | 約20 | 51（全記事） |
| 月間表示回数 | 213 | 500+ |

---

## 指示書 #3: 「フリーコンサル エージェント比較」記事リライト

### 背景（CMO/アフィリエイター向け）

**「フリーコンサル エージェント」は表示回数12で全クエリ中トップだが、順位83位。**
これはサイト内で最も検索需要があるキーワードであり、かつ**エージェント紹介のアフィリエイト収益に直結する**最重要記事。

順位83位→20位以内に引き上げれば、月間クリック数10-30件、CVR3%でも月1件の成約が見込める。

### 現状の記事

- ファイル: `content/articles/freelance/freelance-consul-agent-comparison.md`
- タイトル: 現在のタイトルを確認し、検索KWを含むものに変更
- hasPR: true（アフィリエイト記事）
- relatedSlugs: freelance系3記事にリンク

### リライト方針

#### タイトル・description改善

```
現: （現行タイトル）
案: フリーランスコンサル向けエージェント比較｜おすすめ5社を現役フリーコンサルが厳選【2026年版】
```

description:
```
フリーランスコンサルタント向けエージェントを徹底比較。案件単価・手数料・サポート体制で5社を評価。Big4出身の現役フリーコンサルが実体験をもとにおすすめを解説。
```

#### コンテンツ構成（H2レベル）

検索上位サイトが網羅している要素を全てカバーする:

```
H2: フリーコンサル向けエージェントとは？（定義・仕組み）
H2: エージェント選びで失敗しないための5つの基準
  - 案件単価の相場
  - マージン率の透明性
  - コンサル案件の専門性
  - 稼働率（週3・週4対応可か）
  - サポート体制（契約・税務）
H2: フリーコンサル向けエージェントおすすめ5社比較表
  - 比較表（HTML table推奨）
  - 各社の詳細レビュー（H3で個別展開）
H2: 目的別おすすめエージェント
  - 高単価を狙うなら → ○○
  - 初めてのフリーランスなら → ○○
  - 週3稼働したいなら → ○○
H2: フリーコンサルエージェントの登録〜案件獲得の流れ
H2: よくある質問（FAQ）← 構造化データ対応
```

#### SEO観点（CMO向け）

- **主要KW**: 「フリーコンサル エージェント」「フリーランスコンサル エージェント 比較」「フリーコンサル エージェント おすすめ」
- **共起語**: 案件単価、マージン、週3、独立、Big4、高単価
- **文字数目標**: 5,000〜8,000字（現在の競合上位は6,000字前後）
- **比較表**: テーブル形式で一目で比較可能に（Googleのリッチリザルト候補にもなる）

#### アフィリエイト導線（アフィリエイター向け）

- 各エージェントのレビュー末尾にCTAボタン（`rel="sponsored noopener" target="_blank"`）
- 比較表内にも申込リンク
- 「まずは2-3社に登録」という複数登録の推奨（1記事で複数CV）
- 記事末尾に「登録後の流れ」セクションで行動を促す

#### 内部リンク（CMO向け）

記事内に以下への自然なリンクを埋め込む:
- `/freelance/freelance-consul-income-reality/` — 収入のリアルな数字
- `/freelance/freelance-first-year/` — 独立1年目の体験
- `/freelance/freelance-consul-get-projects/` — 案件の取り方
- `/career-change/consul-career-5patterns/` — フリーランス以外の選択肢

---

## 指示書 #4: 「コンサル 英語できない」新規記事作成

### 背景（CMO向け）

GSCで以下の英語関連クエリが合計**表示17回**を記録:

| クエリ | 表示 | 順位 |
|--------|------|------|
| コンサル toeic | 6 | 10 |
| big4 英語 できない | 3 | 29 |
| 外資系コンサル 英語 できない | 3 | 47 |
| コンサル 英語 できない | 3 | 57 |
| コンサル 英語力 | 2 | 56 |
| コンサル 転職 英語 | 2 | 69 |

既存記事 `foreign-consul-english-level.md` は「外資コンサルの英語力」全般を扱うが、
**「英語できない」という不安・悩み系の検索意図に正面から応えていない。**

### 記事仕様

- ファイル: `content/articles/global/consul-english-not-good-enough.md`
- カテゴリ: global
- ターゲットKW: 「コンサル 英語 できない」「外資コンサル 英語 できない」「big4 英語 できない」

#### タイトル案

```
外資コンサルは英語できないと無理？Big4出身者が語る「本当に必要な英語力」と現実的な対策
```

#### description案

```
外資系コンサルに英語力は必須？Big4出身の筆者が、英語ができなくて苦労した実体験と、TOEIC以上に重要な実務英語スキル、入社後の現実的な対策を解説。
```

#### コンテンツ構成

```
H2: 外資コンサルに英語できないと入れない？→実態を解説
  - 選考での英語の位置付け（ファーム別）
  - TOEIC何点なら足切りされるか
H2: Big4各社の英語使用頻度のリアル
  - デロイト / PwC / EY / KPMG の違い
  - 国内案件 vs グローバル案件
H2: 英語ができなくて実際に困った場面（体験談）
  - グローバルコール
  - 英語の議事録
  - 海外メンバーとのやり取り
H2: コンサルで必要な英語力はTOEICで測れない
  - ビジネス英語 vs アカデミック英語
  - 「読める」と「会議で発言できる」の差
H2: 英語力を効率的に伸ばす5つの方法
  - 実務直結の勉強法
H2: 英語不要のコンサルキャリアもある
  - 国内ファーム / ITコンサル
H2: FAQ（構造化データ対応）
```

#### 内部リンク設計

- `/global/foreign-consul-english-level/` — 英語力の全体像（上位互換の既存記事）
- `/global/bilingual-big4-pros-cons/` — バイリンガルの実態
- `/consul-real/ey-reputation-chiebukuro/` — EYの評判
- `/career-change/consul-career-5patterns/` — 英語不要のキャリアパスへの誘導

#### 相互リンク（既存記事の更新）

`foreign-consul-english-level.md` に以下を追記:
```markdown
英語に不安がある方は「[外資コンサルは英語できないと無理？](/global/consul-english-not-good-enough/)」も参考にしてください。
```

### ビジネスインパクト（CEO向け）

- 英語系クエリは**情報収集フェーズの転職検討層**と直結
- 記事末尾で英語学習サービスのアフィリエイト or 転職エージェント（英語不要案件あり）への送客が可能
- 検索ボリュームは中〜大。「コンサル 英語」の月間検索vol推定: 500-1,000

---

## 指示書 #5: 集客記事→収益記事の内部リンク導線整備

### 背景（CEO/アフィリエイター向け）

現在、最も表示回数が多いのは**「やばい」「知恵袋」「2ch」系の集客記事**。
しかし、これらの記事から**収益記事（エージェント比較・転職）への導線が弱い。**

ユーザーの検索行動ファネル:

```
[TOFU: 認知]  「アクセンチュア やばい」→ 不安を感じて検索
      ↓
[MOFU: 検討]  「コンサル 辞めた後」→ 転職先を考え始める
      ↓
[BOFU: 行動]  「フリーコンサル エージェント」→ 具体的なサービスを探す
```

**各ステージの記事間を内部リンクで繋ぐことで、PVを収益に転換する。**

### 対応する記事と追加リンク

#### パターンA: 集客記事(TOFU) → 検討記事(MOFU)

以下の集客記事の**本文末尾または関連セクション**に、検討記事へのリンクを追加:

| 集客記事（編集対象） | 追加するリンク先 | アンカーテキスト例 |
|---------------------|-----------------|-------------------|
| `accenture-yabai-chiebukuro` | `/career-change/consul-career-5patterns/` | コンサルを辞めた後のキャリア5パターン |
| `accenture-yabai-chiebukuro` | `/career-change/consul-3year-quit/` | コンサル3年で辞めるのはもったいない？ |
| `ey-reputation-chiebukuro` | `/career-change/post-consul-salary-reality/` | コンサルを辞めた後の年収リアル |
| `deloitte-quit-chiebukuro` | `/career-change/consul-career-5patterns/` | コンサルを辞めた後のキャリア5パターン |
| `consul-depression-chiebukuro` | `/consul-real/why-i-left-big4/` | 筆者がBig4を辞めた理由 |
| `it-consul-vs-se-difference` | `/career-change/it-consul-to-se-career-path/` | ITコンサルからSEへの転職パス |

#### パターンB: 検討記事(MOFU) → 収益記事(BOFU)

| 検討記事（編集対象） | 追加するリンク先 | アンカーテキスト例 |
|---------------------|-----------------|-------------------|
| `consul-career-5patterns` | `/freelance/freelance-consul-agent-comparison/` | フリーコンサル向けエージェント比較 |
| `consul-3year-quit` | `/freelance/freelance-first-year/` | フリーランス1年目のリアル |
| `consul-to-startup` | `/career-change/consul-agent-recommendation/` | コンサル出身者向け転職エージェント |
| `post-consul-salary-reality` | `/freelance/freelance-consul-income-reality/` | フリーコンサルの年収事情 |
| `why-i-left-big4` | `/career-change/consul-career-5patterns/` | 辞めた後のキャリア選択肢 |

#### パターンC: relatedSlugs の最適化

以下の記事の `relatedSlugs` を更新し、ファネル導線を強化:

```yaml
# accenture-yabai-chiebukuro.md
relatedSlugs:
  - consul-career-5patterns        # MOFU: 辞めた後の選択肢
  - consul-3year-quit               # MOFU: 退職タイミング
  - why-i-left-big4                 # 共感記事

# consul-career-5patterns.md
relatedSlugs:
  - freelance-consul-agent-comparison  # BOFU: エージェント比較
  - consul-to-startup                  # MOFU: スタートアップ転職
  - post-consul-salary-reality         # MOFU: 年収のリアル

# consul-3year-quit.md
relatedSlugs:
  - consul-career-5patterns           # MOFU: 辞めた後の道
  - freelance-first-year              # BOFU: フリーランス体験
  - consul-agent-recommendation       # BOFU: 転職エージェント
```

### 実装ルール

- リンクは**文脈に自然に溶け込む形**で挿入（「〜については[こちらの記事](/path/)で詳しく解説しています」は避ける。本文の流れの中でリンク）
- 1記事あたり**追加リンクは2-3本**まで（詰め込みすぎない）
- CTA色の強いリンクは記事末尾にまとめる

### 期待効果（CEO向け）

- 直帰率低下（現状は集客記事で離脱している可能性大）
- 回遊率向上 → GA4の「エンゲージメント」指標改善
- 収益記事のPV増 → アフィリエイトCV機会の増加
- Googleの内部リンク評価 → 収益記事の順位改善

---

## 指示書 #6: 上位表示記事のtitle/description CTR最適化

### 背景（CMO向け）

順位10位以内に入っているのに**CTR 0%の記事**がある。
検索結果に表示されているのにクリックされていない = タイトルとdescriptionが検索意図に合っていない。

### 対象記事と改善案

#### 1. consul-ai-market-value（順位1.4、表示5、CTR 0%）

**最も上位に表示されている記事なのにクリックゼロ。最優先で改善。**

```yaml
# 現行を確認の上、以下の方針で改善
title案: コンサルタントのAI市場価値｜AI時代に生き残るコンサルの条件とは
description案: AI時代にコンサルタントの市場価値はどう変わる？ChatGPT・生成AIがコンサル業界に与える影響と、今から準備すべきスキルシフトを現役コンサルが解説。
```

- 改善ポイント: 「AI市場価値」だけでは何の記事か不明。検索者の不安（仕事なくなる？）に応える文言に

#### 2. consul-depression-chiebukuro（順位3-4.4、表示7、CTR 0%）

```yaml
title案: コンサルのうつ病体験談まとめ｜知恵袋の声と現役コンサルの本音
description案: コンサルタントのうつ病・メンタル不調に関する知恵袋の体験談を整理。激務の実態、休職の判断基準、回復のプロセスを当事者目線で解説。
```

- 改善ポイント: 「知恵袋」「体験談」を明示し、リアルな情報を求める検索者の意図にマッチ

#### 3. freelance-first-year（順位5-6.7、表示5、CTR 0%）

```yaml
title案: フリーランスコンサル1年目のリアル｜年収・案件・後悔したことを全公開
description案: Big4を辞めてフリーランスコンサルタントになった1年目の収入、案件獲得、働き方のリアルを公開。独立前に知りたかった失敗談と成功のコツ。
```

- 改善ポイント: 「全公開」「リアル」で具体性を訴求。数字への期待を持たせる

#### 4. consul-to-startup（順位10.8、表示13、CTR 0%）

```yaml
title案: コンサルからスタートアップ転職｜年収・やりがい・後悔を経験者が語る
description案: コンサルからスタートアップへ転職した筆者の実体験。年収の変化、カルチャーギャップ、転職のベストタイミングを本音で解説。
```

- 改善ポイント: 表示13回と多いが順位10位台。タイトルで「経験者の本音」を強調しCTRで順位を押し上げる

### 実装方法（エンジニア向け）

各記事の frontmatter を更新:

```yaml
---
title: "新しいタイトル"
description: "新しいdescription"
---
```

Next.jsの `generateMetadata()` が自動的にOGP・Twitter Cardにも反映する。

### CTR改善のテンプレート（CMO向け）

効果的なtitleの型:

| パターン | 例 | 効果 |
|---------|-----|------|
| 数字 + リアル | 「年収800万→1200万のリアル」 | 具体性でクリック誘発 |
| 疑問 + 回答 | 「本当に必要？→結論は○○」 | 検索意図への直接回答 |
| 体験談 + 網羅 | 「まとめ｜経験者が語る」 | 信頼性 + 情報量の訴求 |
| 年号 | 「【2026年版】」 | 鮮度の担保 |

description（120文字以内）には必ず:
- **誰が**書いているか（Big4出身、現役フリーコンサル等）
- **何がわかるか**（年収、体験談、比較等）
- **行動を促すワード**（徹底解説、全公開、本音等）

---

## 全体ロードマップ（CEO/COO向け）

### Week 1（3/31〜4/6）

| 日 | タスク | 担当 | 指示書 |
|----|--------|------|--------|
| 3/31 | trailingSlash デプロイ | エンジニア | #1 (済) |
| 3/31 | IndexNowキー設置 + service-account.json 準備 | エンジニア | #2 |
| 4/1 | `submit-indexing.mjs` 実行（全URL送信） | エンジニア | #2 |
| 4/1-2 | title/description 改善（4記事） | CMO/ライター | #6 |
| 4/3-4 | 内部リンク導線整備（10記事） | CMO/ライター | #5 |

### Week 2（4/7〜4/13）

| 日 | タスク | 担当 | 指示書 |
|----|--------|------|--------|
| 4/7-9 | エージェント比較記事リライト | ライター | #3 |
| 4/10-11 | 「コンサル英語できない」記事作成 | ライター | #4 |
| 4/12 | 全更新記事のインデックス再送信 | エンジニア | #2 |
| 4/13 | GSCデータ確認・効果測定 | CMO | - |

### Month 1 KPI（4/30時点）

| 指標 | 現状（3/30） | 目標 |
|------|-------------|------|
| インデックス済みページ | ~20 | 51+ |
| 月間表示回数 | 213 | 1,000+ |
| 月間クリック数 | 3 | 30+ |
| 平均CTR | 1.41% | 3%+ |
| 平均掲載順位 | 30位 | 20位以内 |
| 「フリーコンサル エージェント」順位 | 83位 | 30位以内 |

### Month 3 KPI（6/30時点）

| 指標 | 目標 | CEO注目点 |
|------|------|----------|
| 月間クリック数 | 300+ | オーガニック流入の基盤 |
| 月間表示回数 | 10,000+ | ブランド認知の拡大 |
| エージェント記事順位 | 10位以内 | 収益化の本格始動 |
| アフィリエイトCV | 月5件+ | 初期収益の確立 |
