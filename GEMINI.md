# GEMINI.md (AI専用コンテキスト)

## プロジェクト指示事項
- 統計学学習ツールの開発。
- UIはVanilla CSSでモダンなものにする。
- 数式表示にはMathJaxを使用。
- クイズ生成は「人間が作成した静的な問題データ」を優先。
- Gemini API は将来的な拡張（動的生成、自動解説など）として位置づける。

## 進行状況
- [x] ドキュメントの整備 (README.md, requirements.md, design.md, todo.md)
- [x] データ構造の定義 (`data/items.js`)
- [x] プロトタイプ完成 (一覧、学習、クイズUI)
- [x] モバイル端末での外部サーバー経由の動作確認済み
- [x] 静的なクイズ管理への設計変更

## 次のタスク
- `data/quizzes.js` の作成とサンプルの追加。
- `quiz.html` を `data/quizzes.js` のデータを読み込むように修正。
- `data/items.js` に全確率分布データを入力。
