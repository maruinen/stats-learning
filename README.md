# 統計学学習ツール (Stats Learning Tool)

統計学の定義、公式、性質、導出の想起練習を支援するWebアプリケーションです。

## 概要
HTMLベースの静的Webアプリとして動作します。学習項目を検索・カテゴリ絞り込みし、フラッシュカードで公式や性質を思い出す練習ができます。理解確認とクイズは、同じ学習データから生成した資料をソースとするGemini Notebook（旧NotebookLM）で行います。

## 特徴
- **項目一覧**: カテゴリとキーワードで、確率分布、推定、回帰、因子分析などを探せます。
- **フラッシュカード**: 問いを見てから、公式・説明・導出・注意点をカード単位で開示できます。
- **共通データ**: [data/items.json](data/items.json) を唯一の正本とし、WebとGemini Notebook（旧NotebookLM）用資料を同じ内容から作成します。
- **数式表示**: MathJaxでLaTex数式を表示します。

## ディレクトリ構成
```text
/
├── index.html         # 学習項目一覧（トップ画面）
├── study.html         # 学習画面（フラッシュカード形式）
├── sequential.html    # 全カード単語帳モード
├── style.css          # 共通スタイルシート
├── data/
│   └── items.json     # 学習項目の正本
├── assets/js/         # 一覧・学習画面のJavaScriptモジュール
├── scripts/           # データ検証と資料生成のスクリプト
├── generated/         # Gemini Notebook（旧NotebookLM）用の生成資料
├── design.md          # 技術的設計・データ構造
├── requirements.md    # 要件・制約
├── todo.md            # タスク進捗管理
├── items.md           # 学習対象の項目リスト
├── README.md          # 本ファイル
└── GEMINI.md          # AI専用コンテキスト（進捗・命令）
```

## 使い方
1. 学習データを検証し、Gemini Notebook（旧NotebookLM）用資料を生成する。

	```sh
	npm run prepare:data
	```

2. HTTPサーバーを起動する。

	```sh
	python3 -m http.server 8000
	```

3. ブラウザで `http://localhost:8000` を開き、学習項目を選択してフラッシュカードで学習する。
	一覧の「全カードを順番に学ぶ」から、全カード単語帳モードも利用できる。
4. [generated/gemini-notebook-source.md](generated/gemini-notebook-source.md) をGemini Notebook（旧NotebookLM）のソースへ追加し、理解確認やクイズに使う。

## 学習データの更新

1. [data/items.json](data/items.json) のカテゴリまたは項目を更新する。
2. `npm run prepare:data` を実行する。
3. 生成された資料をGemini Notebook（旧NotebookLM）のソースとして更新する。

## 本番環境へのデプロイ

本番Webサーバーの公開ディレクトリは `/Volumes/share/stats_learning/` とする。配置先ディレクトリはあらかじめサーバー側で用意し、学習データを検証してから公開に必要な静的ファイルだけを配置する。

```sh
npm run prepare:data
cp -R index.html study.html sequential.html style.css data assets /Volumes/share/stats_learning/
```

`npm run prepare:data` により、`data/study-sequence.json`を含む公開用データを生成・検証する。`cp`では一覧、項目別学習、全カード単語帳、共通JavaScript、CSS、`data/`を配置する。`scripts/`、`generated/`、`.trash/` は本番公開ディレクトリへ配置しない。`cp` は指定した同名ファイルを上書きするが、配置先にある不要ファイルを削除しない。

詳細は `[design.md](design.md)` および `[requirements.md](requirements.md)` を参照してください。
