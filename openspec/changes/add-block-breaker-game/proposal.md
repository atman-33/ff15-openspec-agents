# Proposal: ブロック崩しゲームの追加

## 概要

TypeScript + React + React Router v7 を使用したシンプルなブロック崩しゲームを実装する。初学者が理解できるコード構成で、GitHub Pages へのデプロイを前提とした設定を含める。

## 背景・動機

- シンプルなゲーム実装の学習教材として活用できる
- React Router v7 の基本的な使い方を示す実例となる
- GitHub Pages でのデプロイ手順を含めることで、公開方法も学べる

## 提案する変更

### 新規プロジェクトの作成

- Vite + TypeScript + React の構成で新規プロジェクトを作成
- React Router v7 をインストールして設定
- ブロック崩しゲームのコア機能を実装
  - Canvas を使用したゲーム画面
  - パドルの左右移動（キーボード/マウス対応）
  - ボールの物理挙動（反射・衝突判定）
  - ブロックの配置と破壊
  - ゲームオーバー・クリア判定

### ディレクトリ構造

```
block-breaker/
├── public/
│   └── vite.svg
├── src/
│   ├── main.tsx          # エントリーポイント
│   ├── App.tsx           # ルート設定
│   ├── routes.tsx        # React Router 設定
│   ├── pages/
│   │   └── GamePage.tsx  # ゲーム画面
│   ├── components/
│   │   └── Game.tsx      # Canvas ゲームコンポーネント
│   ├── game/
│   │   ├── types.ts      # ゲーム用の型定義
│   │   ├── constants.ts  # ゲーム定数
│   │   └── gameLogic.ts  # ゲームロジック
│   └── styles/
│       └── game.css      # 最小限のスタイル
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 影響範囲

### 追加されるファイル

- 新規プロジェクト全体（`block-breaker/` ディレクトリ）
- GitHub Pages デプロイ用の設定ファイル（`.github/workflows/deploy.yml`）

### 影響を受けるシステム

- なし（完全に独立した新規プロジェクト）

## 技術的考慮事項

### 選択した技術

- **Vite**: 高速な開発サーバーとシンプルなビルド設定
- **TypeScript**: 型安全性による開発効率の向上
- **React**: コンポーネントベースの UI 構築
- **React Router v7**: 最新のルーティングライブラリ（要件）
- **Canvas API**: ゲーム描画のためのブラウザ標準 API

### アーキテクチャ上の決定

- **シンプル第一**: 複雑な設計パターンやライブラリは使用しない
- **単一ページ構成**: `/` にゲーム画面を配置（React Router は構成に含める）
- **ゲームロジックの分離**: Canvas 描画とゲームロジックを分離して可読性を向上
- **ステート管理**: React の useState/useEffect のみを使用（Redux 等は不要）

### GitHub Pages デプロイ

- `vite.config.ts` に `base` 設定を追加
- GitHub Actions でビルド・デプロイを自動化
- `gh-pages` ブランチへの自動デプロイ

## リスクと制約

### リスク

- React Router v7 の公式リリース前の場合、Beta 版を使用する必要がある
  - 対策: 安定版の v6 系を使用する選択肢も検討

### 制約

- 見た目は簡素（CSS は最小限）
- 高度なゲーム機能（スコアシステム、複数ステージ等）は含めない
- ブラウザ互換性は最新のモダンブラウザのみを対象

## 代替案

### 代替案1: Vue.js を使用

- メリット: よりシンプルな構文
- デメリット: 要件が React を指定している

### 代替案2: 純粋な TypeScript（フレームワークなし）

- メリット: 依存関係が最小限
- デメリット: 要件が React + React Router を指定している

## 実装計画

詳細は `tasks.md` を参照

## 受け入れ基準

- [ ] Vite + TypeScript + React のプロジェクトが正常に動作する
- [ ] React Router v7 が設定され、`/` ルートが機能する
- [ ] Canvas にゲーム画面が描画される
- [ ] パドルがキーボード（←→キー）で左右に移動できる
- [ ] ボールがパドルとブロックに反射する
- [ ] すべてのブロックを破壊するとクリア表示される
- [ ] ボールを落とすとゲームオーバー表示される
- [ ] `npm run build` でビルドが成功する
- [ ] ビルド成果物が GitHub Pages で動作する
- [ ] README.md にセットアップ・実行・デプロイ手順が記載されている

## 参考資料

- [Vite 公式ドキュメント](https://vitejs.dev/)
- [React Router v7 ドキュメント](https://reactrouter.com/)
- [Canvas API - MDN](https://developer.mozilla.org/ja/docs/Web/API/Canvas_API)
