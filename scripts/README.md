# Writeup Generator

新しいwriteupを対話形式で作成するTUIツールです。

## 使用方法

```bash
pnpm new
# または
pnpm new:writeup
```

## 機能

- 📚 既存のコンテストから選択、または新しいコンテストIDを入力
- 🔍 **検索機能**: コンテストが多い場合（10個超）、タイトル・ID・日付で検索可能
- 🔄 **自動構造変換**: 単体ファイルのコンテスト（.md/.mdx）を自動的にディレクトリ構造に変換
- 🏷️ 定義済みカテゴリから選択、またはカスタムカテゴリを入力
- 👥 既存のメンバーから選択、または新しい作者IDを入力
- 🔍 **検索機能**: メンバーが多い場合（5人超）、名前・IDで検索可能
- 📁 自動的にwriteupファイルとimagesディレクトリを作成
- ✅ 作成前の確認プロンプト

## 検索機能

### コンテスト検索（10個超の場合）
- タイトル、ID、日付で検索可能
- 例: "tsuku"、"2025"、"ctf" などで絞り込み

### メンバー検索（5人超の場合）
- 名前、IDで検索可能
- 例: "nao" で "naotiki" を検索
- 部分一致で検索結果をリアルタイム表示

## 自動構造変換

ツールは単体ファイルとして存在するコンテスト（例：`202503_picoctf2025.mdx`）を自動的に適切なディレクトリ構造に変換します：

```
変換前:
contests/202503_picoctf2025.mdx

変換後:
contests/202503_picoctf2025/
├── index.mdx              # 元のコンテストファイル
└── writeup/               # writeup用ディレクトリ
    ├── {category}_{title}.md
    └── images/
```

この変換は初回writeup作成時に自動的に実行されます。

## 生成されるファイル

```
src/content/contests/{contest_id}/writeup/
├── {category}_{title}.md  # writeupファイル
└── images/                # 画像用ディレクトリ
```

## カテゴリ

利用可能な定義済みカテゴリ:
- welcome
- pwn
- rev
- web
- crypto
- osint
- forensics
- web3
- misc

カスタムカテゴリも使用可能です（`+` プレフィックスで content.config.ts に記録されます）。

## テンプレート

生成されるwriteupテンプレート:

```markdown
---
contest: {contest_id}
title: {title}
category: {category}
author: {author}
---

### 問題


### 解法

```
