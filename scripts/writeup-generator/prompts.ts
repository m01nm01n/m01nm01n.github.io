import { confirm, input, search, select } from "@inquirer/prompts";
import { categories } from "./types";
import type { WriteupPromptAnswers } from "./types";
import type { ContestInfo, MemberInfo } from "./utils";

/**
 * writeup作成のためのプロンプトを実行
 */
export async function promptWriteupDetails(
  contests: ContestInfo[],
  members: MemberInfo[],
): Promise<WriteupPromptAnswers> {
  console.log("🚀 新しいwriteupを作成します\n");

  // コンテスト選択
  let contestId: string;
  if (contests.length === 0) {
    contestId = await input({
      message: "コンテストID を入力してください:",
      validate: (input) => {
        if (!input.trim()) return "コンテストIDは必須です";
        if (!/^[a-zA-Z0-9_-]+$/.test(input)) {
          return "コンテストIDは英数字、ハイフン、アンダースコアのみ使用できます";
        }
        return true;
      },
    });
  } else if (contests.length <= 10) {
    // コンテストが少ない場合は従来の選択方式
    const contestChoices = [
      ...contests.map((contest) => ({
        name: `${contest.title} (${contest.date})`,
        value: contest.id,
        description: contest.id,
      })),
      {
        name: "📝 新しいコンテストを入力",
        value: "__new__",
        description: "新しいコンテストIDを入力します",
      },
    ];

    const selectedContest = await select({
      message: "コンテストを選択してください:",
      choices: contestChoices,
    });

    if (selectedContest === "__new__") {
      contestId = await input({
        message: "新しいコンテストID を入力してください:",
        validate: (input) => {
          if (!input.trim()) return "コンテストIDは必須です";
          if (!/^[a-zA-Z0-9_-]+$/.test(input)) {
            return "コンテストIDは英数字、ハイフン、アンダースコアのみ使用できます";
          }
          return true;
        },
      });
    } else {
      contestId = selectedContest;
    }
  } else {
    // コンテストが多い場合は検索機能付きの選択
    const searchResult = await search({
      message: "コンテストを検索してください (タイトルまたはIDで検索):",
      source: async (input) => {
        const searchTerm = input?.toLowerCase() || "";

        const filteredContests = contests.filter(
          (contest) =>
            contest.title.toLowerCase().includes(searchTerm) ||
            contest.id.toLowerCase().includes(searchTerm) ||
            contest.date.toLowerCase().includes(searchTerm),
        );

        const choices = [
          ...filteredContests.map((contest) => ({
            name: `${contest.title} (${contest.date})`,
            value: contest.id,
            description: `ID: ${contest.id}`,
          })),
        ];

        // 検索結果が少ない場合は「新しいコンテストを入力」オプションを追加
        if (searchTerm && filteredContests.length === 0) {
          choices.push({
            name: `📝 新しいコンテストとして "${searchTerm}" を追加`,
            value: searchTerm,
            description: "新しいコンテストIDとして使用",
          });
        }

        // 常に手動入力オプションを追加
        choices.push({
          name: "📝 新しいコンテストを手動入力",
          value: "__new__",
          description: "新しいコンテストIDを入力",
        });

        return choices;
      },
    });

    if (searchResult === "__new__") {
      contestId = await input({
        message: "新しいコンテストID を入力してください:",
        validate: (input) => {
          if (!input.trim()) return "コンテストIDは必須です";
          if (!/^[a-zA-Z0-9_-]+$/.test(input)) {
            return "コンテストIDは英数字、ハイフン、アンダースコアのみ使用できます";
          }
          return true;
        },
      });
    } else {
      contestId = searchResult;
    }
  }

  // タイトル入力
  const title = await input({
    message: "writeupのタイトルを入力してください:",
    validate: (input) => {
      if (!input.trim()) return "タイトルは必須です";
      return true;
    },
  });

  // カテゴリ選択
  const categoryChoices = [
    ...categories.map((cat) => ({
      name: cat,
      value: cat,
    })),
    {
      name: "🔧 カスタムカテゴリを入力",
      value: "__custom__",
    },
  ];

  let category: string;
  const selectedCategory = await select({
    message: "カテゴリを選択してください:",
    choices: categoryChoices,
  });

  if (selectedCategory === "__custom__") {
    category = await input({
      message: "カスタムカテゴリを入力してください:",
      validate: (input) => {
        if (!input.trim()) return "カテゴリは必須です";
        return true;
      },
    });
  } else {
    category = selectedCategory;
  }

  // 作者選択
  let author: string;
  if (members.length === 0) {
    author = await input({
      message: "作者ID を入力してください:",
      validate: (input) => {
        if (!input.trim()) return "作者IDは必須です";
        return true;
      },
    });
  } else if (members.length <= 5) {
    // メンバーが少ない場合は従来の選択方式
    const authorChoices = [
      ...members.map((member) => ({
        name: `${member.name} (${member.id})`,
        value: member.id,
        description: member.id,
      })),
      {
        name: "👤 新しい作者を入力",
        value: "__new__",
      },
    ];

    const selectedAuthor = await select({
      message: "作者を選択してください:",
      choices: authorChoices,
    });

    if (selectedAuthor === "__new__") {
      author = await input({
        message: "新しい作者ID を入力してください:",
        validate: (input) => {
          if (!input.trim()) return "作者IDは必須です";
          return true;
        },
      });
    } else {
      author = selectedAuthor;
    }
  } else {
    // メンバーが多い場合は検索機能付きの選択
    const searchResult = await search({
      message: "作者を検索してください (名前またはIDで検索):",
      source: async (input) => {
        const searchTerm = input?.toLowerCase() || "";

        const filteredMembers = members.filter(
          (member) =>
            member.name.toLowerCase().includes(searchTerm) ||
            member.id.toLowerCase().includes(searchTerm),
        );

        const choices = [
          ...filteredMembers.map((member) => ({
            name: `${member.name} (${member.id})`,
            value: member.id,
            description: `ID: ${member.id}`,
          })),
        ];

        // 検索結果が少ない場合は「新しい作者を入力」オプションを追加
        if (searchTerm && filteredMembers.length === 0) {
          choices.push({
            name: `👤 新しい作者として "${searchTerm}" を追加`,
            value: searchTerm,
            description: "新しい作者IDとして使用",
          });
        }

        // 常に手動入力オプションを追加
        choices.push({
          name: "👤 新しい作者を手動入力",
          value: "__new__",
          description: "新しい作者IDを入力",
        });

        return choices;
      },
    });

    if (searchResult === "__new__") {
      author = await input({
        message: "新しい作者ID を入力してください:",
        validate: (input) => {
          if (!input.trim()) return "作者IDは必須です";
          return true;
        },
      });
    } else {
      author = searchResult;
    }
  }

  return {
    contestId,
    title,
    category,
    author,
  };
}

/**
 * 作成確認プロンプト
 */
export async function confirmCreation(
  filePath: string,
  data: WriteupPromptAnswers,
): Promise<boolean> {
  console.log("\n📋 作成するwriteupの詳細:");
  console.log(`   コンテスト: ${data.contestId}`);
  console.log(`   タイトル: ${data.title}`);
  console.log(`   カテゴリ: ${data.category}`);
  console.log(`   作者: ${data.author}`);
  console.log(`   ファイルパス: ${filePath}\n`);

  return await confirm({
    message: "このwriteupを作成しますか?",
    default: true,
  });
}
