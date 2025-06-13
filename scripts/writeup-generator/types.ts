// Content configと同期したカテゴリ定義
// src/content.config.tsの categories 配列と一致させる必要があります

export { categories } from "../../src/content/schemas";

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

export interface MemberTemplateData {
  id: string;
  filePath: string;
}
