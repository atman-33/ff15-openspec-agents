# Spec: ブロック崩しゲーム

## 概要

TypeScript、React、React Router v7 を使用したシンプルなブロック崩しゲーム。初学者が理解しやすいコード構成で、GitHub Pages へのデプロイが可能。

## ADDED Requirements

### Requirement: プロジェクトセットアップ

プロジェクトは Vite + TypeScript + React の構成で初期化され、必要な依存関係がインストールされていなければならない (MUST)。

#### Scenario: プロジェクトの初期化

**Given:** 空のディレクトリ `block-breaker/` が存在する  
**When:** `npm create vite@latest block-breaker -- --template react-ts` を実行する  
**Then:** React + TypeScript プロジェクトが作成される

#### Scenario: React Router のインストール

**Given:** プロジェクトが初期化されている  
**When:** `npm install react-router-dom@7` を実行する  
**Then:** React Router v7 がインストールされる

#### Scenario: GitHub Pages 用の設定

**Given:** `vite.config.ts` が存在する  
**When:** `base` オプションを設定する  
**Then:** GitHub Pages でのデプロイ時に正しいパスが使用される

### Requirement: ルーティング設定

React Router v7 を使用してルーティングが設定されていなければならない (MUST)。

#### Scenario: ルートの定義

**Given:** React Router がインストールされている  
**When:** `routes.tsx` でルートを定義する  
**Then:** `/` パスが `GamePage` コンポーネントにマッピングされる

#### Scenario: Router の組み込み

**Given:** ルートが定義されている  
**When:** `App.tsx` で `RouterProvider` を使用する  
**Then:** アプリケーションにルーティングが適用される

### Requirement: ゲーム画面の表示

Canvas 要素を使用してゲーム画面が描画されなければならない (MUST)。

#### Scenario: Canvas の作成

**Given:** `GamePage` が表示されている  
**When:** `Game` コンポーネントがマウントされる  
**Then:** 800x600 の Canvas 要素が画面に表示される

#### Scenario: ゲーム要素の初期描画

**Given:** Canvas が作成されている  
**When:** ゲームが初期化される  
**Then:** パドル、ボール、ブロックが Canvas に描画される

### Requirement: パドルの操作

ユーザーはキーボードでパドルを左右に移動できなければならない (MUST)。

#### Scenario: 左矢印キーでパドルを左に移動

**Given:** ゲームが実行中である  
**When:** ユーザーが左矢印キーを押す  
**Then:** パドルが左方向に移動する  
**And:** パドルが Canvas の左端を超えない

#### Scenario: 右矢印キーでパドルを右に移動

**Given:** ゲームが実行中である  
**When:** ユーザーが右矢印キーを押す  
**Then:** パドルが右方向に移動する  
**And:** パドルが Canvas の右端を超えない

#### Scenario: キーを離すとパドルが停止

**Given:** パドルが移動中である  
**When:** ユーザーが矢印キーを離す  
**Then:** パドルの移動が停止する

### Requirement: ボールの動き

ボールは自動的に移動し、壁やパドル、ブロックに反射しなければならない (MUST)。

#### Scenario: ボールの自動移動

**Given:** ゲームが開始されている  
**When:** ゲームループが実行される  
**Then:** ボールが一定速度で移動する

#### Scenario: 壁での反射

**Given:** ボールが移動中である  
**When:** ボールが Canvas の上端、左端、または右端に到達する  
**Then:** ボールが反射して方向を変える

#### Scenario: パドルでの反射

**Given:** ボールが下方向に移動している  
**When:** ボールがパドルに衝突する  
**Then:** ボールが上方向に反射する

### Requirement: ブロックの破壊

ボールがブロックに当たるとブロックが破壊されなければならない (MUST)。

#### Scenario: ブロックの初期配置

**Given:** ゲームが開始されている  
**When:** ブロックが初期化される  
**Then:** 5行 × 10列 のブロックが Canvas 上部に配置される

#### Scenario: ブロックとの衝突

**Given:** ボールが移動中である  
**When:** ボールがブロックに衝突する  
**Then:** ブロックが破壊される（非表示になる）  
**And:** ボールが反射する

#### Scenario: 破壊されたブロックは表示されない

**Given:** ブロックが破壊されている  
**When:** 描画処理が実行される  
**Then:** 破壊されたブロックは描画されない

### Requirement: ゲームオーバー判定

ボールが画面下部に落ちるとゲームオーバーになるべきである (SHALL)。

#### Scenario: ボールの落下

**Given:** ゲームが実行中である  
**When:** ボールが Canvas の下端を超える  
**Then:** ゲームステートが "gameover" に変更される  
**And:** ゲームループが停止する

#### Scenario: ゲームオーバー表示

**Given:** ゲームステートが "gameover" である  
**When:** 描画処理が実行される  
**Then:** "Game Over" のメッセージが Canvas に表示される

### Requirement: ゲームクリア判定

すべてのブロックを破壊するとゲームクリアになるべきである (SHALL)。

#### Scenario: 全ブロック破壊

**Given:** 残り1つのブロックが存在する  
**When:** 最後のブロックが破壊される  
**Then:** ゲームステートが "clear" に変更される  
**And:** ゲームループが停止する

#### Scenario: クリア表示

**Given:** ゲームステートが "clear" である  
**When:** 描画処理が実行される  
**Then:** "Clear!" のメッセージが Canvas に表示される

### Requirement: ゲームのリセット

ゲームオーバーまたはクリア後、ゲームを再開できなければならない (MUST)。

#### Scenario: リセット機能

**Given:** ゲームがゲームオーバーまたはクリア状態である  
**When:** ユーザーがスペースキーを押す  
**Then:** ゲームが初期状態にリセットされる  
**And:** ゲームが再開される

### Requirement: ビルドとデプロイ

プロジェクトがビルド可能で、GitHub Pages にデプロイできなければならない (MUST)。

#### Scenario: ビルドの実行

**Given:** プロジェクトのルートディレクトリにいる  
**When:** `npm run build` を実行する  
**Then:** `dist/` ディレクトリにビルド成果物が生成される  
**And:** ビルドエラーが発生しない

#### Scenario: プレビューの実行

**Given:** ビルドが完了している  
**When:** `npm run preview` を実行する  
**Then:** ローカルサーバーでビルド成果物をプレビューできる  
**And:** ゲームが正常に動作する

#### Scenario: GitHub Actions でのデプロイ

**Given:** `.github/workflows/deploy.yml` が存在する  
**When:** main ブランチにコミットがプッシュされる  
**Then:** GitHub Actions が自動的にビルドを実行する  
**And:** ビルド成果物が `gh-pages` ブランチにデプロイされる  
**And:** GitHub Pages でゲームがアクセス可能になる

### Requirement: ドキュメント

プロジェクトに README.md が含まれ、セットアップとデプロイの手順が記載されていなければならない (MUST)。

#### Scenario: README の存在

**Given:** プロジェクトのルートディレクトリ  
**When:** ディレクトリ内を確認する  
**Then:** `README.md` ファイルが存在する

#### Scenario: セットアップ手順の記載

**Given:** README.md を開く  
**When:** セットアップセクションを確認する  
**Then:** 依存関係のインストール方法が記載されている  
**And:** 開発サーバーの起動方法が記載されている

#### Scenario: デプロイ手順の記載

**Given:** README.md を開く  
**When:** デプロイセクションを確認する  
**Then:** ビルド方法が記載されている  
**And:** GitHub Pages へのデプロイ方法が記載されている  
**And:** `base` 設定の注意点が記載されている

#### Scenario: 操作方法の記載

**Given:** README.md を開く  
**When:** 操作方法セクションを確認する  
**Then:** パドルの操作方法（矢印キー）が記載されている  
**And:** ゲームのリセット方法（スペースキー）が記載されている

## 非機能要件

### パフォーマンス

- ゲームは 60FPS で動作する
- ビルド時間は 30 秒以内

### 互換性

- 最新のモダンブラウザ（Chrome、Firefox、Safari、Edge）で動作する
- レスポンシブ対応は不要（デスクトップ向け）

### 保守性

- コードは TypeScript の厳格モードでコンパイルされる
- コンポーネントは単一責任の原則に従う
- ゲームロジックは UI から分離されている

### ユーザビリティ

- ゲームの操作方法が直感的である
- ゲームオーバー/クリア時のメッセージが明確である
