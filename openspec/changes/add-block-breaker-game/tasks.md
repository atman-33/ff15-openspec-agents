# Tasks: ブロック崩しゲームの実装

## 実装タスク

### 1. プロジェクトのセットアップ

- [ ] Vite + TypeScript + React テンプレートでプロジェクトを初期化
- [ ] React Router v7 (または v6) をインストール
- [ ] 必要な型定義をインストール (`@types/node` 等)
- [ ] `vite.config.ts` に GitHub Pages 用の `base` 設定を追加
- [ ] `tsconfig.json` の設定を確認・調整

### 2. プロジェクト構造の作成

- [ ] `src/pages/` ディレクトリを作成
- [ ] `src/components/` ディレクトリを作成
- [ ] `src/game/` ディレクトリを作成
- [ ] `src/styles/` ディレクトリを作成

### 3. ルーティングの実装

- [ ] `src/routes.tsx` を作成し、React Router の基本設定を実装
- [ ] `src/App.tsx` でルーターを設定
- [ ] `src/main.tsx` を更新してルーターを組み込む
- [ ] `/` ルートを `GamePage` にマッピング

### 4. ゲーム定数と型定義の実装

- [ ] `src/game/types.ts` を作成
  - Paddle、Ball、Block、GameState の型を定義
- [ ] `src/game/constants.ts` を作成
  - Canvas サイズ、パドル/ボール/ブロックの初期値を定義

### 5. ゲームロジックの実装

- [ ] `src/game/gameLogic.ts` を作成
  - パドル移動ロジック
  - ボール移動ロジック
  - 衝突判定（壁・パドル・ブロック）
  - ブロック破壊ロジック
  - ゲームオーバー・クリア判定

### 6. ゲームコンポーネントの実装

- [ ] `src/components/Game.tsx` を作成
  - Canvas 要素の作成
  - ゲームループの実装（requestAnimationFrame）
  - キーボードイベントのハンドリング
  - Canvas への描画処理
  - ゲーム状態管理（playing / gameover / clear）

### 7. ゲームページの実装

- [ ] `src/pages/GamePage.tsx` を作成
  - Game コンポーネントを配置
  - タイトルと簡単な説明を表示

### 8. スタイリング

- [ ] `src/styles/game.css` を作成
  - Canvas のセンタリング
  - 基本的なレイアウトスタイル
  - ゲームオーバー・クリア表示のスタイル

### 9. デプロイ設定

- [ ] `.github/workflows/deploy.yml` を作成
  - GitHub Actions でビルド・デプロイを自動化
- [ ] `package.json` に `homepage` フィールドを追加（必要に応じて）

### 10. ドキュメント

- [ ] `block-breaker/README.md` を作成
  - プロジェクト概要
  - セットアップ手順
  - 実行方法
  - ビルド方法
  - GitHub Pages デプロイ手順
  - 操作方法

### 11. テストと検証

- [ ] ローカル環境でゲームが正常に動作することを確認
- [ ] ビルドが正常に完了することを確認 (`npm run build`)
- [ ] ビルド成果物をプレビューで確認 (`npm run preview`)
- [ ] キーボード操作が正常に動作することを確認
- [ ] 衝突判定が正しく機能することを確認
- [ ] ゲームオーバー・クリア判定が正しく機能することを確認

## 実装順序

1. プロジェクトセットアップ → 構造作成 → ルーティング
2. 型定義・定数 → ゲームロジック
3. コンポーネント実装 → スタイリング
4. テスト・検証 → デプロイ設定 → ドキュメント

## 検証方法

各タスク完了時に以下を確認：

- TypeScript のコンパイルエラーがない
- ESLint の警告がない（重大なもののみ）
- ブラウザのコンソールにエラーが出ていない
- 期待した動作をすることを手動で確認
