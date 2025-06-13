import { z } from "astro:content";

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

export const categoriesSchema = z.enum(categories);

export const writeupFrontmatterSchema = z.object({
  contest: z.string(),
  title: z.string(),
  category: categoriesSchema
    .or(z.string().startsWith("+"))
    .transform((t) => (t.startsWith("+") ? t.slice(1) : t)),
  author: z.string(),
});

export const memberFrontmatterSchema = z.object({
  name: z.string(),
  realName: z.string().optional(),
  description: z.string().optional(),
  skills: z.array(z.string()).optional(),
  image: z.string().optional(),
  x_twitter: z.string().url().optional(),
  github: z.string().url().optional(),
  website: z.string().url().optional(),
});
