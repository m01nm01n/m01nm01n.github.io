import { glob, mkdir, readFile, rename, stat } from "node:fs/promises";
import { join } from "node:path";
// @ts-ignore
import matter from "gray-matter";

const CONTENT_DIR = join(process.cwd(), "src/content");

export interface ContestInfo {
  id: string;
  title: string;
  date: string;
}

export interface MemberInfo {
  id: string;
  name: string;
}

/**
 * 既存のコンテストを取得
 */
export async function getExistingContests(): Promise<ContestInfo[]> {
  try {
    const contestsDir = join(CONTENT_DIR, "contests");
    const contests: ContestInfo[] = [];

    for await (const path of glob("*/index.{md,mdx}", { cwd: contestsDir })) {
      const fullPath = join(contestsDir, path);
      const content = await readFile(fullPath, "utf-8");
      const { data } = matter(content);
      const id = path.split("/")[0];
      contests.push({
        id,
        title: data.title || id,
        date: data.startDate
          ? new Date(data.startDate).toLocaleDateString()
          : "不明",
      });
    }

    for await (const file of glob("*.{md,mdx}", { cwd: contestsDir })) {
      const fullPath = join(contestsDir, file);
      const content = await readFile(fullPath, "utf-8");
      const { data } = matter(content);
      const id = file.replace(/\.mdx?$/, "");
      contests.push({
        id,
        title: data.title || id,
        date: data.startDate
          ? new Date(data.startDate).toLocaleDateString()
          : "不明",
      });
    }

    return contests.sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    console.warn("コンテストの取得に失敗しました:", error);
    return [];
  }
}

/**
 * 既存のメンバーを取得
 */
export async function getExistingMembers(): Promise<MemberInfo[]> {
  try {
    const membersDir = join(CONTENT_DIR, "members");
    const members: MemberInfo[] = [];

    for await (const file of glob("*.{md,mdx}", { cwd: membersDir })) {
      const filePath = join(membersDir, file);
      const content = await readFile(filePath, "utf-8");
      const { data } = matter(content);
      const id = file.replace(/\.(md|mdx)$/, "");

      members.push({
        id,
        name: data.name || id,
      });
    }

    return members.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.warn("メンバーの取得に失敗しました:", error);
    return [];
  }
}

/**
 * コンテストIDのバリデーション
 */
export function validateContestId(contestId: string): boolean {
  return /^[a-zA-Z0-9_-]+$/.test(contestId);
}

/**
 * ファイル名からコンテストIDを生成
 */
export function generateFileName(title: string, category: string): string {
  const cleanTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9\s_-]/g, "")
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");

  return `${category}_${cleanTitle}.md`;
}

/**
 * 単体ファイルのコンテストをディレクトリ構造に変換
 */
export async function convertContestToDirectory(
  contestId: string,
): Promise<void> {
  const contestsDir = join(CONTENT_DIR, "contests");
  let sourceFile: string | null = null;
  let fileExtension = "";

  for await (const file of glob(`${contestId}.{md,mdx}`, {
    cwd: contestsDir,
  })) {
    sourceFile = join(contestsDir, file);
    fileExtension = file.endsWith(".mdx") ? ".mdx" : ".md";
    break;
  }

  if (!sourceFile) {
    // ファイルが存在しない場合は何もしない
    return;
  }

  console.log(
    `📁 コンテスト "${contestId}" をディレクトリ構造に変換しています...`,
  );

  // 新しいディレクトリを作成
  const contestDir = join(contestsDir, contestId);
  await mkdir(contestDir, { recursive: true });

  // ファイルを移動してindex.mdに変更
  const newIndexFile = join(contestDir, `index${fileExtension}`);
  await rename(sourceFile, newIndexFile);

  console.log(`✅ ${sourceFile} -> ${newIndexFile} に移動しました`);
}

/**
 * writeupディレクトリが存在するかチェックし、必要に応じて作成
 */
export async function ensureWriteupDirectory(
  contestId: string,
): Promise<string> {
  const contestsDir = join(CONTENT_DIR, "contests");
  const contestDir = join(contestsDir, contestId);
  const writeupDir = join(contestDir, "writeup");

  // コンテストディレクトリが存在しない場合、単体ファイルから変換を試行
  try {
    await stat(contestDir);
  } catch {
    await convertContestToDirectory(contestId);
  }

  // writeupディレクトリを作成
  await mkdir(writeupDir, { recursive: true });

  return writeupDir;
}
