import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";
import {
  categories,
  categoriesSchema,
  memberFrontmatterSchema,
  writeupFrontmatterSchema,
} from "./content/schemas";
const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

const contestTags = ["writeup"] as const;
const contestTagsSchema = z.enum(contestTags);
export type ContestTag = z.infer<typeof contestTagsSchema>;

const contests = defineCollection({
  loader: glob({
    base: "./src/content/contests",
    pattern: "{*/index.{md,mdx},*.{md,mdx}}",
    generateId: ({ entry }) => {
      if (entry.includes("/")) {
        return entry.split("/")[0];
      }
      return entry.replace(/\.mdx?$/, "");
    },
  }),
  schema: ({ image }) =>
    z.object({
      // 大会タイトル
      title: z.string(),
      // 開催された日時 (JST)
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      // 順位
      result: z.string(),
      // 順位を目立たせるかどうか
      highlighted: z.boolean().optional(),
      // タグ
      tags: z.array(
        contestTagsSchema.or(z.string().startsWith("+")).transform((t) => {
          if (t.startsWith("+")) {
            return t.slice(1);
          }
          return t;
        }),
      ),
      members: z.array(reference("member")),
      // 投稿日時 (JST)
      pubDate: z.coerce.date(),
      // heroImage
      heroImage: image().optional(),
      // 大会公式などのURL
      externalUrl: z.string().url().optional(),
      ctfTimeUrl: z.string().url().optional(),
    }),
});

// 表記揺れ防止

const writeup = defineCollection({
  loader: glob({
    base: "./src/content/contests",
    pattern: "*/writeup/*.{md,mdx}",
  }),
  schema: () =>
    writeupFrontmatterSchema.extend({
      contest: reference("contests"),
      author: reference("member"),
    }),
});

const member = defineCollection({
  loader: glob({ base: "./src/content/members", pattern: "*.{md,mdx}" }),
  schema: ({ image }) =>
    memberFrontmatterSchema.extend({
      image: image().optional(),
    }),
});

export const collections = { blog, member, contests, writeup };
