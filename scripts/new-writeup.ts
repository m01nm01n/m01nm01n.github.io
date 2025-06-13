#!/usr/bin/env tsx

import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  confirmCreation,
  promptWriteupDetails,
} from "./writeup-generator/prompts";
import {
  createImagesDirectory,
  createMemberFile,
  createWriteupFile,
} from "./writeup-generator/template";
import type {
  MemberTemplateData,
  WriteupTemplateData,
} from "./writeup-generator/types";
import {
  ensureWriteupDirectory,
  generateFileName,
  getExistingContests,
  getExistingMembers,
} from "./writeup-generator/utils";

const CONTENT_DIR = join(process.cwd(), "src/content");

async function main() {
  try {
    console.log("🔍 既存のコンテストとメンバーを読み込んでいます...\n");

    // 既存のコンテストとメンバーを取得
    const [contests, members] = await Promise.all([
      getExistingContests(),
      getExistingMembers(),
    ]);

    console.log(`📚 ${contests.length} 個のコンテストが見つかりました`);
    console.log(`👥 ${members.length} 人のメンバーが見つかりました\n`);

    // プロンプトでwriteupの詳細を入力
    const answers = await promptWriteupDetails(contests, members);

    // ファイルパスを生成（ディレクトリはまだ作成しない）
    const fileName = generateFileName(answers.title, answers.category);
    const writeupDir = join(
      CONTENT_DIR,
      "contests",
      answers.contestId,
      "writeup",
    );
    const filePath = join(writeupDir, fileName);

    // ファイルが既に存在するかチェック
    if (existsSync(filePath)) {
      console.log(`❌ ファイルが既に存在します: ${filePath}`);
      console.log("別のタイトルまたはカテゴリを使用してください。");
      process.exit(1);
    }

    // 作成確認
    const shouldCreate = await confirmCreation(filePath, answers);
    if (!shouldCreate) {
      console.log("❌ writeupの作成をキャンセルしました。");
      process.exit(0);
    }

    const isNewAuthor = !members.some((m) => m.id === answers.author);
    const memberFilePath = join(
      CONTENT_DIR,
      "members",
      `${answers.author}.mdx`,
    );
    if (isNewAuthor && !existsSync(memberFilePath)) {
      const memberData: MemberTemplateData = {
        id: answers.author,
        filePath: memberFilePath,
      };
      await createMemberFile(memberData);
    }

    // 確認後にwriteupディレクトリを確保（必要に応じてコンテスト構造を変換）
    const actualWriteupDir = await ensureWriteupDirectory(answers.contestId);

    // writeupファイルを作成
    const templateData: WriteupTemplateData = {
      ...answers,
      filePath: join(actualWriteupDir, fileName),
    };

    await createWriteupFile(templateData);
    await createImagesDirectory(actualWriteupDir);

    console.log("\n🎉 writeupの作成が完了しました!");
    console.log(
      `📝 エディタでファイルを開いて編集を開始してください: ${templateData.filePath}`,
    );
  } catch (error) {
    console.error("❌ エラーが発生しました:", error);
    process.exit(1);
  }
}

// スクリプトが直接実行された場合のみ main() を実行
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { main };
