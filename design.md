# デザインドキュメント: 統計学学習ツール

## 1. 目的
統計学の公式・定義・導出・注意点を、Webアプリケーションの一覧とフラッシュカードで想起練習する。理解確認とクイズは、同じ学習データから生成した資料をソースとするGemini Notebook（旧NotebookLM）で行う。

## 2. 学習項目の分類
一覧では、項目を以下の初期カテゴリで表示する。カテゴリは表示・検索のための分類であり、データ項目ごとに1つだけ設定する。カテゴリと項目は将来追加でき、一覧画面はJSONのカテゴリ定義から動的に表示するため、同種の項目追加で画面実装を変更しない。

| ID | 表示名 | 主な内容 |
| --- | --- | --- |
| `discrete-distributions` | 離散分布 | 二項分布、ポアソン分布、幾何分布など |
| `continuous-distributions` | 連続分布 | 正規分布、ガンマ分布、t分布など |
| `probability-foundations` | 確率・モーメント・不等式 | 繰り返し期待値、尖度、モーメント母関数、マルコフ・チェビシェフの不等式 |
| `estimation-inference` | 推定・信頼区間・検定 | 標準誤差、不偏性、一致性、信頼区間、尤度比検定 |
| `regression` | 回帰 | 正規方程式、回帰係数の標準誤差 |
| `multivariate-analysis` | 多変量解析 | 因子負荷量、共通性、寄与率、因子回転、独自因子 |
| `model-evaluation` | モデル評価・選択 | バイアス・バリアンス分解、AIC |
| `mathematical-foundations` | 数学的基礎 | 変数変換、ガンマ関数、ベータ関数 |

## 3. データ設計

### 3.1. 正本
学習データの正本は `data/items.json` とする。WebアプリケーションはHTTPサーバー経由でこのファイルを読み込み、Gemini Notebook（旧NotebookLM）用Markdownもこのファイルから生成する。`items.md` は収録範囲を管理する補助文書であり、表示用データの正本にはしない。既存画面で扱える性質の項目を追加する場合は、`categories` または `items` の追記だけで対応する。

### 3.2. ファイル構造
JSONの最上位には `version`、`categories`、`items` を置く。`categories` にはカテゴリの `id`、`name`、`description`、`order` を、`items` には以下を置く。

| フィールド | 必須 | 用途 |
| --- | --- | --- |
| `id` | 必須 | URLと関連項目で使用する不変かつ一意なID |
| `categoryId` | 必須 | `categories` のID |
| `title` | 必須 | 一覧・詳細画面の項目名 |
| `summary` | 必須 | 一覧カードと詳細先頭に表示する要約 |
| `tags` | 必須 | 検索対象となるキーワードの配列 |
| `cards` | 必須 | フラッシュカードの配列 |
| `relatedItemIds` | 任意 | 関連項目への導線となるIDの配列 |

各 `cards` 要素には `id`、`label`、`prompt`、`answer` を必須で置き、必要に応じて `note` を追加する。`answer` と `note` はMathJaxで表示できるLaTexを含むテキストとする。カードは「公式」「定義」「性質」「導出」「注意点」を区別なく表せるため、分布固有の `mean` やモーメント母関数などの固定フィールドは設けない。

### 3.3. 記述例

```json
{
  "id": "factor-analysis-communality",
  "categoryId": "multivariate-analysis",
  "title": "因子分析の共通性",
  "summary": "変数が共通因子で説明される分散の割合。",
  "tags": ["因子分析", "共通性", "因子負荷量"],
  "cards": [
    {
      "id": "definition",
      "label": "定義",
      "prompt": "直交回転における共通性は何か。",
      "answer": "各因子の因子負荷量の二乗和。"
    },
    {
      "id": "oblique-rotation",
      "label": "斜交回転",
      "prompt": "斜交回転での共通性はどのように計算するか。",
      "answer": "\\(\\sum \\lambda_j^2 + 2\\sum_{j<k}\\lambda_j\\lambda_k\\phi_{jk}\\)"
    }
  ],
  "relatedItemIds": ["factor-analysis-loadings", "factor-analysis-unique-variance"]
}
```

## 4. 画面仕様

### 4.1. 一覧画面 (`index.html`)
- 画面上部にキーワード検索欄を置く。タイトル、要約、タグを対象に絞り込む。
- 検索欄の下にカテゴリ選択を置く。「すべて」を初期値とし、カテゴリごとに件数を表示する。
- 選択カテゴリの項目を、カテゴリ見出しと項目カードの一覧で表示する。
- 項目カードにはタイトル、要約、タグ、カード数を表示し、クリックで `study.html?id=<id>` に遷移する。
- クイズへの導線は設けない。

### 4.2. 学習画面 (`study.html`)
- 先頭にカテゴリ名、項目名、要約、一覧へ戻る導線を表示する。
- `cards` を定義した順に表示する。各カードは `label` と `prompt` を先に表示し、`answer` と `note` は初期状態で隠す。
- カード単位で答えを開閉できるようにする。数式を含む答え・補足は開示後にMathJaxで再描画する。
- 末尾に関連項目へのリンクを表示する。存在しないIDは表示せず、データ検証で検出する。
- URLのIDが存在しない場合とJSON読込失敗時には、理由と一覧へ戻る導線を表示する。

### 4.3. 全カード単語帳画面 (`sequential.html`)
- 一度に1枚のカードだけを表示し、カテゴリ名、項目名、カードの問い、進捗を表示する。
- 答えは初期状態で隠し、「答えを表示」ボタンで開示する。開示後の数式はMathJaxで再描画する。
- 「前へ」「次へ」でカードを移動する。先頭では「前へ」、末尾では「次へ」を無効化する。
- `position`クエリパラメーターで現在位置を表し、再読み込み時に同じカード位置を復元する。
- 一覧画面の「全カードを順番に学ぶ」から新規セッションを開始する。新規セッションでは暗号学的乱数から32ビットのシードを作り、URLの`seed`に保存する。
- シードから疑似乱数を生成し、項目グループの順序をシャッフルする。各項目内のカードは`data/study-sequence.json`の順序を維持し、同一項目のカードを連続して表示する。
- 前回セッションと同じ先頭カードになった場合はシードを再生成し、新規セッションの先頭カードが変わるようにする。

### 4.4. 単語帳順序データ (`data/study-sequence.json`)
- `data/items.json`を入力として、カードを`itemId`と`cardId`の組で列挙する。
- `sourceVersion`、生成時刻、生成方式、ビルド時シードをメタデータとして保持する。
- 標準の生成方式はカテゴリ順・項目記述順で、`--shuffle-groups --seed=<整数>`を指定した場合はビルド時に項目グループをシャッフルできる。
- `scripts/validate-study-sequence.mjs`で、正本に存在する各カードが重複なく1回ずつ含まれることを検証する。

## 5. 技術と運用
- HTML、CSS、Vanilla JavaScript、MathJaxで実装する。
- JSON読込のため、ローカル利用を含めHTTPサーバー経由で提供する。
- JSONのID重複、必須フィールド、カテゴリ参照、関連項目参照を検証するスクリプトを用意する。
- `npm run prepare:data`で正本JSONを検証し、単語帳順序データとGemini Notebook用Markdownを生成・検証する。
- 公開時は`index.html`、`study.html`、`sequential.html`、`style.css`、`assets/`、`data/`だけを静的公開先へ配置する。生成スクリプトとGemini Notebook用Markdownは公開先へ配置しない。
- JSONから生成したMarkdownをGemini Notebook（旧NotebookLM）のソースとして追加する。クイズと対話による理解確認はGemini Notebook（旧NotebookLM）で行う。
