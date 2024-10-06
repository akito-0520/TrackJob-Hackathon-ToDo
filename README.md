# シンプルで使いやすいTODOアプリ

このプロジェクトは、2024年10月5-6日に開催されたハッカソンで制作されたシンプルなTODOアプリです。

## プロダクト概要
日々のちょっとしたタスクを忘れずに管理するためのシンプルで使いやすいTODOアプリです。通学・通勤時間などの暇な時間を有効活用し、SNSをなんとなく眺める時間を減らすことを目的としています。

### ターゲット
- 暇な時間（通学・通勤時間など）を持て余しがちな人

### 解決する課題
- 後回しにしていたことを忘れがち
- 暇な時間を有効活用できず、ぼーっとしたりSNSを見てなんとなく過ごしてしまう

---

## バックエンド

### API Documentation

提供されるAPIの各関数及び実行方法について説明します。各関数は特定のタスクを実行し、JSON形式でデータを受け取って返します。

### 実行方法

1. `back`フォルダに移動します。
2. 以下のコマンドを実行します（Pythonのバージョンは3.12.6を使用）。
    ```bash
    python3 -m venv .venv
    ./.venv/bin/activate
    pip install -r requirements.txt
    python3 api.py
    ```

3. 実行を停止する場合は、`Command + C` を押します。
4. 仮想環境を無効化するには以下のコマンドを実行します。
    ```bash
    deactivate
    ```

---

## フロントエンド

### Frontend Setup

このプロジェクトは [Next.js](https://nextjs.org) で作成されました。

### 必要なパッケージのインストールと環境変数の設定

```bash
npm install
cp .env.local.example .env.local
node generate-vapid-keys.mjs
```

この場合は <https://localhost:3000> を開いてください。

---

`app/page.tsx` を修正することでページの編集を開始できます。ファイルを編集するとページが自動的に更新されます。

このプロジェクトでは [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) を使用して、Vercel の新しいフォントファミリー [Geist](https://vercel.com/font) を自動的に最適化して読み込みます。

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

### 通知機能について

通知機能はService Workerを使用しているため、**HTTPSでのみ動作**します。
通知を受け取るためには、通知の許可を求めるポップアップが表示されます。許可を求めるポップアップが表示されない場合は、ブラウザの設定を確認してください。

## 詳しく学ぶ

Next.js について詳しく学ぶには、以下のリソースを参照してください:

- [Next.js ドキュメント](https://nextjs.org/docs) - Next.js の機能と API について学びます。
- [Learn Next.js](https://nextjs.org/learn) - インタラクティブな Next.js チュートリアル。

[Next.js GitHub リポジトリ](https://github.com/vercel/next.js) をチェックしてみてください - フィードバックや貢献をお待ちしています！

## Vercel へのデプロイ

Next.js アプリをデプロイする最も簡単な方法は、Next.js の作成者による [Vercel プラットフォーム](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) を使用することです。

詳細については、[Next.js デプロイメントドキュメント](https://nextjs.org/docs/app/building-your-application/deploying) をご覧ください。
