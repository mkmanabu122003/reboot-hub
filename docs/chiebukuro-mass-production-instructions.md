# 知恵袋ロングテール記事 量産対応指示書

> 作成日: 2026-03-31
> 根拠: GSC過去28日間データ + 既存17本の知恵袋記事の実績分析
> 目標: 30本追加 → 合計82記事でトピカルオーソリティ確立

---

## 全体戦略（CEO/COO向け）

### なぜ知恵袋ロングテールを量産するのか

1. **競合が弱い**: 「〇〇 知恵袋」は企業メディアが狙いにくいKW。個人メディアの独壇場
2. **検索意図が明確**: 「PwC 年収 知恵袋」→ 転職検討中。CVまでの距離が近い
3. **トピカルオーソリティ**: Googleは「コンサルキャリアならこのサイト」と認識する。1記事ごとにドメイン全体の評価が上がる
4. **複利効果**: 記事数が増えるほど内部リンク網が密になり、既存記事の順位も引き上がる

### 数字で見る期待効果（CEO向け）

| 指標 | 現状（52記事） | 量産後（82記事） | 根拠 |
|------|-------------|-----------------|------|
| 月間表示回数 | 213 | 2,000〜5,000 | 1記事平均60-100imp/月（知恵袋系の実績ベース） |
| 月間クリック数 | 3 | 60〜150 | CTR 3%想定 |
| インデックス済みページ | ~20 | 82 | 全記事インデックス前提 |
| 収益記事PV（エージェント系） | ほぼ0 | 100〜300/月 | 知恵袋記事からの回遊率10%想定 |

### 投資対効果（COO向け）

- 30本 × 2-3時間/本 = **60-90時間の制作工数**
- 週5本ペースなら**6週間で完了**
- 記事テンプレートを統一することで1本あたりの制作時間を短縮
- 外注する場合: 1本15,000〜20,000円 × 30本 = 45〜60万円
- 回収見込み: 月間60クリック × CVR3% × 報酬単価5,000円 = 月9,000円（初期）→ 順位安定後は月3〜5万円

---

## 記事テンプレート（ライター/エンジニア向け）

### frontmatter テンプレート

```yaml
---
title: "【タイトルパターンは後述】"
description: "【120文字以内。KW含む。検索者の疑問に直接回答する形】"
category: "【consul-real or career-change】"
tags: ["【メインKW】", "知恵袋", "【ファーム名 or テーマ】", "【補助KW】"]
publishedAt: "2026-04-XX"
updatedAt: "2026-04-XX"
author: "Kay"
thumbnail: "/images/articles/【slug】.webp"
hasPR: true
affiliates:
  - name: "MyVision"
    url: "https://my-vision.co.jp/"
    description: "コンサル業界特化型転職エージェント"
    type: "career"
  - name: "アクシスコンサルティング"
    url: "https://www.axc.ne.jp/"
    description: "コンサル転職支援の豊富な実績"
    type: "career"
relatedSlugs: ["【MOFU記事slug1】", "【MOFU記事slug2】", "【関連TOFU記事slug】"]
faqs:
  - question: "【検索者が最も知りたい質問1】"
    answer: "【50-100文字で端的に回答】"
  - question: "【検索者が最も知りたい質問2】"
    answer: "【50-100文字で端的に回答】"
  - question: "【検索者が最も知りたい質問3】"
    answer: "【50-100文字で端的に回答】"
---
```

### タイトルパターン（CMO向け）

知恵袋記事で実績のあるタイトル型:

| パターン | 例 | 使う場面 |
|---------|-----|---------|
| 「KW」知恵袋の声を元Big4が検証 | 「PwCは激務」知恵袋の声を元Big4が検証 | ファーム評判系 |
| KWは本当？知恵袋の評判を業界経験者が分析 | ベイカレントの年収は高い？知恵袋の評判を業界経験者が分析 | 年収・待遇系 |
| 「KW」知恵袋で多いN個の理由と元Big4の処方箋 | 「コンサル辞めたい」知恵袋で多い5つの理由と元Big4の処方箋 | 悩み・不安系 |
| KW｜知恵袋のリアルな声とBig4経験者の実体験比較 | PwCの年収｜知恵袋のリアルな声とBig4経験者の実体験比較 | 比較・データ系 |

### 本文構成テンプレート（ライター向け）

```
## 導入（200-300字）
- 検索者の不安・疑問に共感する書き出し
- 「この記事では〜を解説する」の宣言
- 筆者の立場を明示（元Big4、業界12年等）

## 知恵袋の声を分類（500-800字）
- 知恵袋の典型的な投稿を3-5パターンに分類
- 各パターンに対して「これは事実」「これは誇張」のジャッジ
- :::point で要点まとめ

## テーマの深掘り（1,000-1,500字）
- H3で3-5項目に分けて詳述
- 筆者の実体験を交える（「僕の場合は〜」）
- 比較表やデータを入れる

## 結局どうすればいいのか（500-800字）
- 検索者の状況別にアクションを提示
- 転職エージェントへの誘導（自然な文脈で）
- :::balloon で筆者の見解

## まとめ + 内部リンク（200-300字）
- 3-5行の要点まとめ
- MOFU記事（キャリア5パターン、年収リアル等）へのリンク
- BOFU記事（エージェント比較）へのリンク
```

### 文字数目安

- 本文: **3,000〜5,000字**（知恵袋系は長すぎると離脱する。既存記事の実績では3,500字前後が最適）
- FAQ: **3問以上**（構造化データでリッチリザルト獲得）

---

## 内部リンク設計（CMO/アフィリエイター向け）

### ファネル構造の徹底

全ての知恵袋記事（TOFU）は、以下のファネルに乗せる:

```
[TOFU: 集客]        [MOFU: 検討]           [BOFU: 収益]
知恵袋記事      →   キャリア戦略記事    →   エージェント比較記事
─────────────────────────────────────────────────────────
PwC 年収          → コンサル辞めた後5パターン → 転職エージェント5選
アクセンチュア辞めたい → 3年以内に辞めるリアル  → 転職エージェント推薦
コンサル 残業      → ポストコンサル年収     → フリーコンサルエージェント比較
コンサル パワハラ   → うつ記事 → キャリア5パターン → エージェント5選
```

### relatedSlugs の設計ルール

| 記事タイプ | relatedSlugs の構成 |
|-----------|-------------------|
| ファーム評判系（やばい/評判/年収） | MOFU記事1 + MOFU記事1 + 同ファーム別切り口 |
| 悩み系（辞めたい/ついていけない/パワハラ） | MOFU記事1 + MOFU記事1 + 同テーマ別切り口 |
| 比較系（vs商社/vs投資銀行） | キャリア5パターン + 関連テーマ2本 |

### 本文末尾の内部リンクテンプレート

```markdown
【ファーム評判系の場合】
コンサルを辞めた後の具体的なキャリアパスは[辞めた後のキャリア5パターン](/career-change/consul-career-5patterns/)で、
年収の変化については[ポストコンサルの年収リアルデータ](/career-change/post-consul-salary-reality/)で解説している。

【悩み・不安系の場合】
同じ悩みを抱えている人は[「コンサル辞めたい」知恵袋の声](/career-change/consul-quit-chiebukuro/)も読んでほしい。
辞めた後の選択肢は[キャリア5パターン](/career-change/consul-career-5patterns/)にまとめている。

【年収・待遇系の場合】
他のBig4の年収と比較したい人は[KPMG年収](/consul-real/kpmg-salary-chiebukuro/)、
[デロイト年収](/consul-real/deloitte-salary-chiebukuro/)も参考になる。
フリーランスという選択肢の年収は[フリーコンサル年収のリアル](/freelance/freelance-consul-income-reality/)で公開している。
```

---

## アフィリエイト設計（アフィリエイター向け）

### CTAの配置ルール

| 配置位置 | 形式 | 対象 |
|---------|------|------|
| 記事中盤（「結局どうすればいいか」セクション） | テキストリンク | 転職検討層 → エージェント |
| 記事末尾（まとめの直前） | 既存記事へのリンク `[転職エージェント5選](/career-change/consul-agent-top5/)` | 全読者 |
| relatedSlugs | 自動表示の関連記事 | 回遊促進 |

### CTA文言テンプレート

```markdown
【転職検討層向け（ファーム評判・辞めたい系）】
匿名掲示板の情報だけで判断するのは危険だ。コンサル業界に特化した
エージェントなら、各ファームの内部事情に基づいた客観的なアドバイスをもらえる。

[コンサル出身者が本当に使うべき転職エージェント5選](/career-change/consul-agent-top5/)

【年収・待遇系向け】
自分の市場価値が正当に評価されているか確認するなら、
コンサル特化のエージェントに相談するのが最も効率的だ。

[コンサル出身者が本当に使うべき転職エージェント5選](/career-change/consul-agent-top5/)
```

### アフィリエイトリンクの統一

全知恵袋記事で以下の2社をfrontmatter affiliatesに設定:

```yaml
affiliates:
  - name: "MyVision"
    url: "https://my-vision.co.jp/"
    description: "コンサル業界特化型転職エージェント"
    type: "career"
  - name: "アクシスコンサルティング"
    url: "https://www.axc.ne.jp/"
    description: "コンサル転職支援の豊富な実績"
    type: "career"
```

フリーランス系の記事の場合は追加:

```yaml
  - name: "フリーコンサルタント.jp"
    url: "https://www.freeconsultant.jp/"
    description: "フリーランスコンサルマッチング"
    type: "freelance"
```

---

## Priority A: 10本の個別仕様書

### A-1: PwC 年収 知恵袋

- **ファイル**: `content/articles/consul-real/pwc-salary-chiebukuro.md`
- **タイトル**: `PwCコンサルティングの年収｜知恵袋の声とBig4経験者の実体験比較`
- **description**: `PwCコンサルティングの年収を職位別に解説。知恵袋の口コミとBig4経験者の内部情報をもとに、アクセンチュア・デロイトとの比較や昇給ペースのリアルを公開。`
- **tags**: `["PwC", "年収", "知恵袋", "Big4", "コンサル"]`
- **relatedSlugs**: `["consul-career-5patterns", "post-consul-salary-reality", "pwc-reputation-chiebukuro"]`
- **H2構成**:
  1. PwCの年収、知恵袋で見かける数字は本当か
  2. 職位別の年収テーブル（アナリスト〜パートナー）
  3. Big4横並び年収比較表（デロイト/EY/KPMG/アクセンチュア）
  4. PwCの年収が「高い」と言われる理由と「低い」と言われる理由
  5. 年収を上げるための3つの戦略
  6. まとめ + 内部リンク
- **FAQ例**:
  - Q: PwCの新卒年収は？ → A: アナリスト職で年収550〜600万円程度
  - Q: PwCのマネージャーの年収は？ → A: 1,100〜1,400万円が目安
  - Q: PwCとデロイトの年収差は？ → A: ランクにより異なるがマネージャー以上でPwCがやや高い傾向
- **内部リンク先**: `/consul-real/deloitte-salary-chiebukuro/`, `/consul-real/kpmg-salary-chiebukuro/`, `/consul-real/accenture-salary-chiebukuro/`, `/career-change/post-consul-salary-reality/`

### A-2: PwC 評判 知恵袋

- **ファイル**: `content/articles/consul-real/pwc-reputation-chiebukuro.md`
- **タイトル**: `PwCコンサルティングの評判｜知恵袋の声をBig4経験者が徹底分析`
- **description**: `PwCコンサルティングの評判を知恵袋の口コミから分析。社風・激務度・成長環境をBig4経験者が本音で解説。PwCに向いている人・向いていない人の特徴も。`
- **tags**: `["PwC", "評判", "知恵袋", "Big4", "転職"]`
- **relatedSlugs**: `["pwc-salary-chiebukuro", "consul-career-5patterns", "big4-which-best-chiebukuro"]`
- **H2構成**:
  1. PwCの評判、知恵袋で見える3つのパターン
  2. 「激務」の実態 — 部門とランクで全く違う
  3. PwCの社風 — Big4の中での立ち位置
  4. PwCに向いている人・向いていない人
  5. PwCへの転職を検討するなら
  6. まとめ + 内部リンク
- **内部リンク先**: `/consul-real/ey-reputation-chiebukuro/`, `/consul-real/abeam-reputation-chiebukuro/`, `/consul-real/pwc-gekimu-2ch/`

### A-3: コンサル 新卒 後悔 知恵袋

- **ファイル**: `content/articles/career-change/consul-new-grad-regret-chiebukuro.md`
- **タイトル**: `新卒でコンサルに入って後悔？知恵袋の声にBig4出身者が本音回答`
- **description**: `新卒でコンサルファームに入社して後悔している人の知恵袋の声を分析。Big4経験者が「後悔すべき状況」と「踏みとどまるべき状況」を判断基準付きで解説。`
- **tags**: `["新卒", "コンサル", "後悔", "知恵袋", "キャリア"]`
- **relatedSlugs**: `["consul-quit-chiebukuro", "consul-3year-quit", "consul-career-5patterns"]`
- **H2構成**:
  1. 「新卒コンサル 後悔」で検索しているあなたへ
  2. 知恵袋で多い「新卒コンサル後悔」の5パターン
  3. 後悔の正体 — 本当にコンサルが合わないのか、適応期の辛さなのか
  4. 新卒1年目で辞めた場合のキャリアへの影響
  5. 後悔を転機に変える3つのアクション
  6. まとめ + 内部リンク
- **内部リンク先**: `/career-change/consul-3year-quit/`, `/consul-real/consul-first-year-hard-chiebukuro/`, `/career-change/consul-cant-keep-up-chiebukuro/`

### A-4: ベイカレント 年収 知恵袋

- **ファイル**: `content/articles/consul-real/baycurrent-salary-chiebukuro.md`
- **タイトル**: `ベイカレントの年収は高い？知恵袋のリアルな声と業界経験者の分析`
- **description**: `ベイカレントコンサルティングの年収を職位別に解説。知恵袋の口コミとBig4経験者の分析で、急成長ファームの待遇のリアルに迫る。`
- **tags**: `["ベイカレント", "年収", "知恵袋", "コンサル", "転職"]`
- **relatedSlugs**: `["baycurrent-yabai-chiebukuro", "post-consul-salary-reality", "consul-career-5patterns"]`
- **H2構成**:
  1. ベイカレントの年収、知恵袋の数字は正しいのか
  2. 職位別の年収テーブル
  3. Big4・アクセンチュアとの年収比較
  4. ベイカレントの年収が高い理由と落とし穴
  5. ベイカレントへの転職を検討するなら
  6. まとめ + 内部リンク
- **内部リンク先**: `/consul-real/baycurrent-yabai-chiebukuro/`, `/consul-real/accenture-salary-chiebukuro/`

### A-5: コンサル 残業 知恵袋

- **ファイル**: `content/articles/consul-real/consul-overtime-chiebukuro.md`
- **タイトル**: `コンサルの残業時間のリアル｜知恵袋の声とBig4経験者の実態比較`
- **description**: `コンサルタントの残業時間は月何時間か。知恵袋の口コミをBig4経験者が検証。ファーム別・ランク別の残業実態と、激務を乗り越える方法を解説。`
- **tags**: `["コンサル", "残業", "知恵袋", "激務", "働き方"]`
- **relatedSlugs**: `["consul-depression-chiebukuro", "consul-quit-chiebukuro", "consul-routine-burnout"]`
- **H2構成**:
  1. コンサルの残業、知恵袋の「月100時間」は本当か
  2. ファーム別・ランク別の残業時間マップ
  3. 残業が多いプロジェクトの特徴3つ
  4. 残業を減らすために僕がやった3つのこと
  5. 残業が限界なら — 環境を変える選択肢
  6. まとめ + 内部リンク
- **内部リンク先**: `/consul-real/pwc-gekimu-2ch/`, `/consul-real/consul-depression-chiebukuro/`, `/career-change/consul-career-5patterns/`

### A-6: アクセンチュア 辞めたい 知恵袋

- **ファイル**: `content/articles/career-change/accenture-quit-chiebukuro.md`
- **タイトル**: `アクセンチュアを辞めたい人の知恵袋の声｜元Big4が本音で解説`
- **description**: `アクセンチュアを辞めたいと悩む人の知恵袋の声を分類。辞めるべきサイン、残るべきサイン、辞めた後のキャリアパスをBig4経験者が本音で解説。`
- **tags**: `["アクセンチュア", "辞めたい", "知恵袋", "転職", "キャリア"]`
- **relatedSlugs**: `["accenture-yabai-chiebukuro", "consul-career-5patterns", "consul-3year-quit"]`
- **H2構成**:
  1. 「アクセンチュア辞めたい」知恵袋の声を分類する
  2. 辞めたい理由Top5とその真偽
  3. 辞めるべきサインと残るべきサイン
  4. アクセンチュアを辞めた後のキャリア3パターン
  5. 辞める前にやるべき3つの準備
  6. まとめ + 内部リンク
- **内部リンク先**: `/consul-real/accenture-yabai-chiebukuro/`, `/career-change/consul-quit-chiebukuro/`, `/consul-real/deloitte-quit-chiebukuro/`

### A-7: コンサル パワハラ 知恵袋

- **ファイル**: `content/articles/consul-real/consul-power-harassment-chiebukuro.md`
- **タイトル**: `コンサルのパワハラは日常？知恵袋の体験談を元Big4が検証`
- **description**: `コンサルファームのパワハラ体験談を知恵袋から収集・分析。詰め文化とパワハラの境界線、対処法、社内相談窓口の使い方をBig4経験者が解説。`
- **tags**: `["コンサル", "パワハラ", "知恵袋", "詰め文化", "メンタルヘルス"]`
- **relatedSlugs**: `["consul-depression-chiebukuro", "consul-quit-chiebukuro", "consul-career-5patterns"]`
- **H2構成**:
  1. コンサルの「詰め」は パワハラなのか
  2. 知恵袋の体験談を3パターンに分類
  3. パワハラの境界線 — 指導と暴力の違い
  4. パワハラを受けたときの対処法
  5. 環境を変えるという選択肢
  6. まとめ + 相談窓口一覧 + 内部リンク
- **注意**: うつ記事と同様、相談窓口（こころの健康相談統一ダイヤル等）を末尾に記載
- **内部リンク先**: `/consul-real/consul-depression-chiebukuro/`, `/career-change/consul-quit-chiebukuro/`

### A-8: コンサル 転職 後悔 知恵袋

- **ファイル**: `content/articles/career-change/consul-career-change-regret-chiebukuro.md`
- **タイトル**: `事業会社からコンサルに転職して後悔？知恵袋の声に元Big4が回答`
- **description**: `事業会社からコンサルファームに転職して後悔した人の知恵袋の声を分析。中途ならではの壁と乗り越え方、後悔を回避するための事前チェックリストを解説。`
- **tags**: `["コンサル", "転職", "後悔", "知恵袋", "中途"]`
- **relatedSlugs**: `["consul-cant-keep-up-chiebukuro", "consul-career-5patterns", "consul-3year-quit"]`
- **H2構成**:
  1. 「コンサル 転職 後悔」で検索するあなたは正常だ
  2. 知恵袋で多い「転職後悔」の4パターン
  3. 中途コンサルが陥りやすい3つの罠
  4. 後悔を乗り越えた人がやっていたこと
  5. 本当に合わないなら — 撤退も戦略
  6. まとめ + 内部リンク
- **内部リンク先**: `/career-change/consul-cant-keep-up-chiebukuro/`, `/consul-real/consul-first-year-hard-chiebukuro/`

### A-9: デロイト 評判 知恵袋

- **ファイル**: `content/articles/consul-real/deloitte-reputation-chiebukuro.md`
- **タイトル**: `デロイトトーマツの評判｜知恵袋の声をBig4経験者が徹底分析`
- **description**: `デロイトトーマツコンサルティングの評判を知恵袋の口コミから分析。社風・成長環境・ワークライフバランスをBig4経験者が本音で解説。向いている人の特徴も。`
- **tags**: `["デロイト", "評判", "知恵袋", "Big4", "転職"]`
- **relatedSlugs**: `["deloitte-salary-chiebukuro", "deloitte-quit-chiebukuro", "big4-which-best-chiebukuro"]`
- **H2構成**:
  1. デロイトの評判、知恵袋に見える3つの傾向
  2. 「規模が大きい」は良いこと？悪いこと？
  3. デロイトの社風 — Big4の中での特徴
  4. デロイトに向いている人・向いていない人
  5. デロイトへの転職を検討するなら
  6. まとめ + 内部リンク
- **内部リンク先**: `/consul-real/ey-reputation-chiebukuro/`, `/consul-real/abeam-reputation-chiebukuro/`, `/consul-real/deloitte-mass-quit-2ch/`

### A-10: コンサル 向いてる人 知恵袋

- **ファイル**: `content/articles/career-change/consul-suited-person-chiebukuro.md`
- **タイトル**: `コンサルに向いている人の特徴5つ｜知恵袋の声と元Big4の本音`
- **description**: `コンサルに向いている人の特徴を知恵袋の声とBig4経験者の視点から分析。向いている人・向いていない人の違い、適性チェックリスト付きで解説。`
- **tags**: `["コンサル", "向いている人", "知恵袋", "適性", "就活"]`
- **relatedSlugs**: `["consul-not-suited-chiebukuro", "consul-career-5patterns", "consul-new-grad-regret-chiebukuro"]`
- **H2構成**:
  1. 「コンサルに向いているか」を知恵袋で聞く前に
  2. 知恵袋で挙がる「向いている人の特徴」を検証
  3. 僕が見てきた「活躍するコンサルタント」の共通点5つ
  4. 向いていなくても成功する人の特徴
  5. 適性チェックリスト（10問）
  6. まとめ + 内部リンク
- **内部リンク先**: `/career-change/consul-not-suited-chiebukuro/`, `/career-change/consul-cant-keep-up-chiebukuro/`

---

## Priority B: 12本の概要仕様

| # | slug | タイトル案 | カテゴリ |
|---|------|-----------|---------|
| B-1 | `consul-30s-career-chiebukuro` | コンサルから30代で転職は遅い？知恵袋の声と元Big4の回答 | career-change |
| B-2 | `consul-academic-background-chiebukuro` | コンサルに学歴は必要？知恵袋の声にBig4出身者が本音回答 | consul-real |
| B-3 | `abeam-salary-chiebukuro` | アビームの年収は低い？知恵袋のリアルな声とBig4経験者の比較分析 | consul-real |
| B-4 | `consul-vs-trading-company-chiebukuro` | コンサルvs商社どっち？知恵袋の意見を両業界経験者が分析 | career-change |
| B-5 | `consul-women-chiebukuro` | 女性コンサルの働き方｜知恵袋の声とBig4経験者が語るリアル | consul-real |
| B-6 | `consul-mid-career-struggle-chiebukuro` | コンサル中途でついていけない？知恵袋の声に元Big4が処方箋 | career-change |
| B-7 | `consul-qualifications-chiebukuro` | コンサルに有利な資格は？知恵袋の声にBig4出身者が本音回答 | consul-real |
| B-8 | `sigmaxis-reputation-chiebukuro` | シグマクシスの評判｜知恵袋の声を業界経験者が分析 | consul-real |
| B-9 | `consul-english-chiebukuro` | コンサルに英語力は必須？知恵袋の声にBig4出身者が本音回答 | global |
| B-10 | `accenture-reputation-chiebukuro` | アクセンチュアの評判｜知恵袋のリアルな声をBig4経験者が分析 | consul-real |
| B-11 | `consul-40s-career-chiebukuro` | コンサルから40代で転職は厳しい？知恵袋の声と現実的な選択肢 | career-change |
| B-12 | `consul-vs-investment-bank-chiebukuro` | コンサルvs投資銀行どっち？知恵袋の意見を業界経験者が比較 | career-change |

---

## サムネイル画像（エンジニア向け）

### 命名規則

`/public/images/articles/{slug}.webp`

### 画像仕様

- サイズ: 1200x675px（OGP兼用）
- 形式: WebP
- ファイルサイズ: 100KB以下
- デザイン: 既存記事のトーン&マナーに合わせる

### 既存画像の流用可否

既存の知恵袋記事のサムネイルから同系統のデザインで量産する。
画像がない場合は共通のプレースホルダー画像を使用し、後日差し替え。

---

## 制作スケジュール（COO向け）

### Phase 1: Priority A（Week 1-2）

| 日程 | 制作記事 | 本数 |
|------|---------|------|
| Week 1 前半 | A-1 PwC年収, A-2 PwC評判 | 2本 |
| Week 1 後半 | A-3 新卒後悔, A-4 ベイカレント年収, A-5 残業 | 3本 |
| Week 2 前半 | A-6 アクセンチュア辞めたい, A-7 パワハラ | 2本 |
| Week 2 後半 | A-8 転職後悔, A-9 デロイト評判, A-10 向いてる人 | 3本 |
| Week 2 末 | A全10本をインデックス送信 | - |

### Phase 2: Priority B（Week 3-5）

| 日程 | 制作記事 | 本数 |
|------|---------|------|
| Week 3 | B-1〜B-4 | 4本 |
| Week 4 | B-5〜B-8 | 4本 |
| Week 5 | B-9〜B-12 | 4本 |
| Week 5 末 | B全12本をインデックス送信 | - |

### Phase 3: Priority C（Week 6）

残り8本を制作。Priority AとBのGSCデータを確認し、検索ボリュームの大きいテーマを優先。

### 各Phaseの完了時アクション

1. `npm run build` でビルド確認
2. デプロイ
3. `node scripts/submit-indexing.mjs` でインデックス送信
4. 1週間後にGSCで表示回数・順位を確認

---

## KPI（CEO向け）

### Phase 1完了時（2週間後）

| 指標 | 現状 | 目標 |
|------|------|------|
| 総記事数 | 52 | 62 |
| 月間表示回数 | 213 | 500+ |
| 知恵袋記事の平均順位 | 30位 | 25位以内 |

### 全Phase完了時（6週間後）

| 指標 | 現状 | 目標 |
|------|------|------|
| 総記事数 | 52 | 82 |
| 月間表示回数 | 213 | 2,000〜5,000 |
| 月間クリック数 | 3 | 60〜150 |
| 収益記事（エージェント系）月間PV | ~0 | 100〜300 |
| 月間アフィリエイトCV | 0 | 2〜5件 |

### 3ヶ月後（量産完了 + 順位安定後）

| 指標 | 目標 | CEO注目点 |
|------|------|----------|
| 月間表示回数 | 10,000+ | トピカルオーソリティ確立 |
| 月間クリック数 | 300+ | オーガニック集客基盤の完成 |
| 月間アフィリエイト収益 | 3〜5万円 | 初期マネタイズの実現 |
| ドメインオーソリティ | 10+ | 被リンク施策と併せて |

---

## リスク管理（COO向け）

### 品質リスク: 量産による質の低下

- **対策**: 全記事でテンプレートを統一。公開前に「知恵袋の声の分類は3パターン以上あるか」「筆者の実体験が1つ以上あるか」「FAQ3問以上あるか」のチェックリストを適用
- **NGライン**: テンプレをそのまま埋めただけの薄い記事。Googleは「低品質コンテンツの量産」をペナルティ対象にする

### カニバリゼーションリスク: 類似記事の共食い

- **対策**: 各記事のターゲットKWを明確に分離。「PwC 年収」と「PwC 評判」は検索意図が異なるので問題なし。「コンサル 辞めたい」と「アクセンチュア 辞めたい」はファーム特化 vs 汎用で差別化
- **監視**: GSC上で同じクエリに複数ページが表示されていないか月1回チェック

### インデックスリスク: 大量追加でクロールバジェット不足

- **対策**: Phase完了ごとに `submit-indexing.mjs` で能動的にインデックス申請。sitemap.xmlは自動更新される
