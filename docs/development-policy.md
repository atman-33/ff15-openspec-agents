# 開発ポリシー

## コーディング規約

- ファイル名: kebab-case（例: `user-handler.ts`）
- 関数: アロー関数を優先
- 型注釈: 明示的に記述

### TypeScript推奨事項

- コンポーネントの戻り値の型注釈や `children` プロップスの型定義には、`JSX.Element` ではなく `ReactNode` を使用することを推奨します。

```typescript
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const MyComponent = ({ children }: Props): ReactNode => {
  return <div>{children}</div>;
};
```

## 実装の基本方針

- TDD原則に従う（テストファースト）
- OpenSpec仕様に準拠
- コードは自己説明的に記述