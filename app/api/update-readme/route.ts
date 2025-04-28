// pages/api/update-readme.js
import { NextResponse } from "next/server";
import { githubAPI } from "../../../api";

export  async function PUT(req, res) {

  const {owner, repo, newContent, sha} = await req.json();

  try {
    await githubAPI("PUT" ,"/repos/{owner}/{repo}/contents/{path}", {
      owner,
      repo,
      path: "README.md",
      message: "Updated README.md",
      committer: {
        name: "first lastname",
        email: "loggedinuser@gmail.com",
      },
      content: Buffer.from(newContent).toString('base64'),
      ...(sha ? { sha } : {}),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
