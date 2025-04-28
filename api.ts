import { createTogetherAI } from "@ai-sdk/togetherai";
import { createLangDB } from "@langdb/vercel-provider";

import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: "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",
});
export const togetherai = createTogetherAI({
  apiKey: process.env.TOGETHER_AI_API_KEY
});

export async function githubAPI(method: string, url: string, body: object) {
  const result = await octokit.request(`${method} ${url}`, body);
  return result;
}
