import { readFile, writeFile } from "fs/promises";
export const read = async (path) => {
  const data = await readFile(path, "utf8");
  return JSON.parse(data);
};

export const write = async (path, data) => {
  await writeFile(path, JSON.stringify(data, null, 2));
};
