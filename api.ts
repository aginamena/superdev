import { createTogetherAI } from "@ai-sdk/togetherai";
import { createLangDB } from "@langdb/vercel-provider";

import { Octokit } from "octokit";

const octokit = new Octokit({
  // auth: "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",
  auth: "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"
});
export const togetherai = createTogetherAI({
  apiKey: process.env.TOGETHER_AI_API_KEY
});

export async function githubAPI(method: string, url: string, body: object) {
  const result = await octokit.request(`${method} ${url}`, body);
  return result;
}
