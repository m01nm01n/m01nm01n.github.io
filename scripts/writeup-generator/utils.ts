import { mkdir, readFile, readdir, rename, stat } from "node:fs/promises";
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
    const entries = await readdir(contestsDir);
    const contests: ContestInfo[] = [];

    for (const entry of entries) {
      const fullPath = join(contestsDir, entry);
      const isDirectory = (await stat(fullPath)).isDirectory();

      if (isDirectory) {
        // ディレクトリの場合、index.mdを探す
        const indexPath = join(fullPath, "index.md");
        try {
          const content = await readFile(indexPath, "utf-8");
          const { data } = matter(content);
          contests.push({
            id: entry,
            title: data.title || entry,
            date: data.startDate
              ? new Date(data.startDate).toLocaleDateString()
              : "不明",
          });
        } catch {
          // index.mdが見つからない場合はスキップ
        }
      } else if (entry.endsWith(".md") || entry.endsWith(".mdx")) {
        // ファイルの場合
        const content = await readFile(fullPath, "utf-8");
        const { data } = matter(content);
        const id = entry.replace(/\.(md|mdx)$/, "");
        contests.push({
          id,
          title: data.title || id,
          date: data.startDate
            ? new Date(data.startDate).toLocaleDateString()
            : "不明",
        });
      }
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
    const files = await readdir(membersDir);
    const members: MemberInfo[] = [];

    for (const file of files) {
      if (file.endsWith(".md") || file.endsWith(".mdx")) {
        const filePath = join(membersDir, file);
        const content = await readFile(filePath, "utf-8");
        const { data } = matter(content);
        const id = file.replace(/\.(md|mdx)$/, "");

        members.push({
          id,
          name: data.name || id,
        });
      }
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
    .replace(/[^a-z0-9\s-_]/g, "")
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
  const contestFile = join(contestsDir, `${contestId}.md`);
  const contestMdxFile = join(contestsDir, `${contestId}.mdx`);

  let sourceFile: string | null = null;
  let fileExtension = "";

  // .md または .mdx ファイルが存在するかチェック
  try {
    await stat(contestFile);
    sourceFile = contestFile;
    fileExtension = ".md";
  } catch {
    try {
      await stat(contestMdxFile);
      sourceFile = contestMdxFile;
      fileExtension = ".mdx";
    } catch {
      // ファイルが存在しない場合は何もしない
      return;
    }
  }

  if (!sourceFile) return;

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
