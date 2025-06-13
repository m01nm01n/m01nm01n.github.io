import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import type { MemberTemplateData, WriteupTemplateData } from "./types";
import {
  validateMemberFrontmatter,
  validateWriteupFrontmatter,
} from "./validation";

/**
 * writeupのMarkdownテンプレートを生成
 */
export function generateWriteupTemplate(data: WriteupTemplateData): string {
  return `---
contest: ${data.contestId}
title: ${data.title}
category: ${data.category}
author: ${data.author}
---

### 問題


### 解法

`;
}

/**
 * writeupファイルを作成
 */
export async function createWriteupFile(
  data: WriteupTemplateData,
): Promise<void> {
  const template = generateWriteupTemplate(data);

  // ディレクトリが存在しない場合は作成
  const dir = dirname(data.filePath);
  await mkdir(dir, { recursive: true });

  // ファイルを作成
  await writeFile(data.filePath, template, "utf-8");

  await validateWriteupFrontmatter(data.filePath);

  console.log(`✅ Writeupファイルを作成しました: ${data.filePath}`);
}

/**
 * imagesディレクトリを作成（.gitkeepファイル付き）
 */
export async function createImagesDirectory(writeupDir: string): Promise<void> {
  const imagesDir = join(writeupDir, "images");
  await mkdir(imagesDir, { recursive: true });

  // .gitkeepファイルを作成
  const gitkeepPath = join(imagesDir, ".gitkeep");
  await writeFile(gitkeepPath, "", "utf-8");

  console.log(`✅ imagesディレクトリを作成しました: ${imagesDir}`);
}

export function generateMemberTemplate(id: string): string {
  return `---
name: ${id}
---
`;
}

export async function createMemberFile(
  data: MemberTemplateData,
): Promise<void> {
  const template = generateMemberTemplate(data.id);

  const dir = dirname(data.filePath);
  await mkdir(dir, { recursive: true });

  await writeFile(data.filePath, template, "utf-8");

  await validateMemberFrontmatter(data.filePath);

  console.log(`✅ Memberファイルを作成しました: ${data.filePath}`);
}
