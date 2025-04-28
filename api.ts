import { createTogetherAI } from "@ai-sdk/togetherai";

import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN_API_KEY
});
export const togetherai = createTogetherAI({
  apiKey: process.env.TOGETHER_AI_API_KEY
});

export async function githubAPI(method: string, url: string, body: object) {
  const result = await octokit.request(`${method} ${url}`, body);
  return result;
}
