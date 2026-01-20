# Design: ブロック崩しゲームの技術設計

## アーキテクチャ概要

```
┌─────────────────────────────────────┐
│         main.tsx (Entry)            │
│  - React Router 初期化              │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│        App.tsx (Router)             │
│  - ルート定義                       │
│  - RouterProvider                   │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│    pages/GamePage.tsx               │
│  - タイトル表示                     │
│  - Game コンポーネント配置          │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│   components/Game.tsx               │
│  - Canvas 管理                      │
│  - ゲームループ                     │
│  - イベントハンドラ                 │
│  - 描画処理                         │
└─────────────┬───────────────────────┘
              │
    ┌─────────┴─────────┐
    │                   │
┌───▼──────┐    ┌───────▼───────┐
│ game/    │    │  game/        │
│ types.ts │    │  constants.ts │
└──────────┘    └───────────────┘
    │
┌───▼────────────────┐
│ game/gameLogic.ts  │
│ - 移動計算         │
│ - 衝突判定         │
│ - ステート更新     │
└────────────────────┘
```

## コンポーネント設計

### Game.tsx (メインゲームコンポーネント)

**責務:**
- Canvas 要素の管理
- ゲームループの実行
- ユーザー入力の受付
- ゲーム状態の管理

**ステート:**
```typescript
type GameState = 'playing' | 'gameover' | 'clear';

interface GameData {
  paddle: Paddle;
  ball: Ball;
  blocks: Block[];
  gameState: GameState;
}
```

**主要メソッド:**
- `gameLoop()`: requestAnimationFrame を使用したメインループ
- `update()`: ゲーム状態の更新（物理演算・衝突判定）
- `draw()`: Canvas への描画
- `handleKeyDown()` / `handleKeyUp()`: キーボード入力処理
- `resetGame()`: ゲームの初期化

### GamePage.tsx (ページコンポーネント)

**責務:**
- ゲームのレイアウト
- タイトル表示
- Game コンポーネントの配置

## データモデル

### 型定義 (game/types.ts)

```typescript
export interface Paddle {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  moveLeft: boolean;
  moveRight: boolean;
}

export interface Ball {
  x: number;
  y: number;
  radius: number;
  dx: number;  // x方向の速度
  dy: number;  // y方向の速度
  speed: number;
}

export interface Block {
  x: number;
  y: number;
  width: number;
  height: number;
  destroyed: boolean;
}

export type GameState = 'playing' | 'gameover' | 'clear';
```

### 定数 (game/constants.ts)

```typescript
export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;

export const PADDLE_WIDTH = 100;
export const PADDLE_HEIGHT = 20;
export const PADDLE_SPEED = 6;

export const BALL_RADIUS = 8;
export const BALL_SPEED = 4;

export const BLOCK_WIDTH = 75;
export const BLOCK_HEIGHT = 20;
export const BLOCK_ROWS = 5;
export const BLOCK_COLS = 10;
export const BLOCK_PADDING = 5;
export const BLOCK_OFFSET_TOP = 50;
export const BLOCK_OFFSET_LEFT = 10;
```

## ゲームロジック設計

### gameLogic.ts の主要関数

```typescript
// パドル移動
export function updatePaddle(paddle: Paddle, canvasWidth: number): void

// ボール移動
export function updateBall(ball: Ball): void

// 壁との衝突
export function checkWallCollision(ball: Ball, canvasWidth: number): void

// パドルとの衝突
export function checkPaddleCollision(ball: Ball, paddle: Paddle): boolean

// ブロックとの衝突
export function checkBlocksCollision(ball: Ball, blocks: Block[]): boolean

// ゲームオーバー判定
export function isGameOver(ball: Ball, canvasHeight: number): boolean

// クリア判定
export function isGameClear(blocks: Block[]): boolean

// ブロック初期化
export function initBlocks(): Block[]
```

### 衝突判定アルゴリズム

#### パドルとボールの衝突
```
if (ボールの下端 >= パドルの上端 &&
    ボールの上端 <= パドルの下端 &&
    ボールの右端 >= パドルの左端 &&
    ボールの左端 <= パドルの右端) {
  // 衝突
  ボールのY速度を反転
}
```

#### ブロックとボールの衝突
```
for each block in blocks:
  if (!block.destroyed && 
      ボールがブロック内にある) {
    block.destroyed = true
    ボールのY速度を反転
    break
  }
```

## React Router 統合

### routes.tsx
```typescript
import { createBrowserRouter } from 'react-router-dom';
import GamePage from './pages/GamePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <GamePage />
  }
], {
  basename: import.meta.env.BASE_URL  // GitHub Pages 対応
});
```

### App.tsx
```typescript
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

function App() {
  return <RouterProvider router={router} />;
}
```

## Canvas 描画処理

### 描画順序
1. Canvas をクリア
2. パドルを描画
3. ボールを描画
4. ブロックを描画（未破壊のもののみ）
5. ゲームステート表示（ゲームオーバー/クリア）

### 最適化
- 基本的な最適化のみ（過度な最適化は避ける）
- requestAnimationFrame で 60FPS を目指す
- 破壊されたブロックは描画をスキップ

## イベント処理

### キーボードイベント
```typescript
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') paddle.moveLeft = true;
    if (e.key === 'ArrowRight') paddle.moveRight = true;
  };
  
  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') paddle.moveLeft = false;
    if (e.key === 'ArrowRight') paddle.moveRight = false;
  };
  
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);
  
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
  };
}, []);
```

## ビルドとデプロイ

### Vite 設定 (vite.config.ts)
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/ff15-openspec-agents/',  // リポジトリ名に合わせる
});
```

### GitHub Actions ワークフロー
1. Node.js 環境のセットアップ
2. 依存関係のインストール
3. ビルド実行 (`npm run build`)
4. GitHub Pages へのデプロイ (`gh-pages` ブランチ)

## スタイリング方針

- CSS は最小限
- Flexbox でセンタリング
- Canvas は固定サイズ
- レスポンシブ対応は不要（デスクトップ向け）

## パフォーマンス考慮事項

- ゲームループは requestAnimationFrame を使用
- 不要な再レンダリングを避ける（useRef で Canvas 参照）
- 衝突判定は O(n) で十分（ブロック数が少ないため）

## エラーハンドリング

- Canvas の取得失敗時のフォールバック
- TypeScript の厳格な型チェックで実行時エラーを最小化
- ブラウザ互換性エラーは考慮しない（モダンブラウザのみ対象）

## テスト戦略

- 手動テスト中心（ユニットテストは不要）
- 動作確認項目:
  - パドルの移動
  - ボールの反射
  - ブロックの破壊
  - ゲームオーバー/クリア判定
  - ビルド成功
  - GitHub Pages での動作

## 拡張性

将来的に追加可能な機能：
- スコアシステム
- 複数ステージ
- サウンドエフェクト
- パワーアップアイテム
- ハイスコア記録

ただし、現時点ではこれらは実装しない（要件がシンプルさを優先）。
