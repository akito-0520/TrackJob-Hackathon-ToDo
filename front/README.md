This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## はじめに

まず、開発サーバーを実行します:

```bash
npm install
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて結果を確認してください。

`app/page.tsx` を修正することでページの編集を開始できます。ファイルを編集するとページが自動的に更新されます。

このプロジェクトでは [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) を使用して、Vercel の新しいフォントファミリー [Geist](https://vercel.com/font) を自動的に最適化して読み込みます。

## 詳しく学ぶ

Next.js について詳しく学ぶには、以下のリソースを参照してください:

- [Next.js ドキュメント](https://nextjs.org/docs) - Next.js の機能と API について学びます。
- [Learn Next.js](https://nextjs.org/learn) - インタラクティブな Next.js チュートリアル。

[Next.js GitHub リポジトリ](https://github.com/vercel/next.js) をチェックしてみてください - フィードバックや貢献をお待ちしています！

## Vercel へのデプロイ

Next.js アプリをデプロイする最も簡単な方法は、Next.js の作成者による [Vercel プラットフォーム](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) を使用することです。

詳細については、[Next.js デプロイメントドキュメント](https://nextjs.org/docs/app/building-your-application/deploying) をご覧ください。

## 開発のヘルプ

このプロジェクトは

- Next.js@14.2.14
- shadcn@2.1.0

を使用しています。shadcnはUIコンポーネントのライブラリです。詳細については <https://ui.shadcn.com/docs/>, <https://ui.shadcn.com/docs/installation/next> を参照してください。

簡単な使い方としては、以下のコマンドを実行することでコンポーネントを追加できます。

```bash
npx shadcn@latest add button
```

すると、`app/components/ui/button.tsx` が作成されます。このファイルを編集することでボタンのデザインを変更できます。（そのままでも問題ありません）
実際に使用する際は、

```tsx
import { Button } from "@/components/ui/button";

...

<Button onClick={addTodo}>追加</Button>
```

のようにして使用できます。
