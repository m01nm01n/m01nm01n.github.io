// Content configと同期したカテゴリ定義
// src/content.config.tsの categories 配列と一致させる必要があります

// カテゴリの定数配列（content.config.tsと同期）
export const categories = [
  "welcome",
  "pwn",
  "rev",
  "web",
  "crypto",
  "osint",
  "forensics",
  "web3",
  "misc",
] as const;

export type Category = (typeof categories)[number];

// プロンプト用の選択肢型
export interface WriteupPromptAnswers {
  contestId: string;
  title: string;
  category: Category | string; // カスタムカテゴリも許可
  author: string;
}

// テンプレート生成用の情報
export interface WriteupTemplateData {
  contestId: string;
  title: string;
  category: string;
  author: string;
  filePath: string;
}
