import { readFile } from "node:fs/promises";
import matter from "gray-matter";
import {
  memberFrontmatterSchema,
  writeupFrontmatterSchema,
} from "../../src/content/schemas";

export async function validateWriteupFrontmatter(
  filePath: string,
): Promise<void> {
  const content = await readFile(filePath, "utf-8");
  const { data } = matter(content);
  writeupFrontmatterSchema.parse(data);
}

export async function validateMemberFrontmatter(
  filePath: string,
): Promise<void> {
  const content = await readFile(filePath, "utf-8");
  const { data } = matter(content);
  memberFrontmatterSchema.parse(data);
}
