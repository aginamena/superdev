import { generateText } from "ai";
import { githubAPI, togetherai } from "../../../api";
import { DisplayOptimzedReadme } from "./DisplayOptimizedReadme";
import { shouldIgnoreFileOrFolder, timeout } from "./util";

export default async function Optimize({
  params,
}: {
  params: Promise<{ full_name: string[] }>;
}) {
  const { full_name } = await params;

  async function summarizeFile(code: string) {
    // we wait 1 second as the free model only talkes 1 request per second. once we move from the free plan to a paid
    // plain with a higher request per second, we'll remove this line
    await timeout(1000);

    const { text } = await generateText({
      model: togetherai("meta-llama/Llama-3.2-3B-Instruct-Turbo"),
      system:
        "You are very good at reading code and summarizing what it's doing",
      prompt: `summarize the code below in english language no more than 5 sentences. If you can describe what the code is doing
      in less than 5 sentences then that would be better.\n\n: ${code}`,
    });

    return text;
    // return `This is a JSON file representing a Node.js project's configuration. It specifies the`;
  }

  const mainBranch = await githubAPI(
    `GET`,
    `/repos/{owner}/{repo}/branches/{branch}`,
    {
      owner: full_name[0],
      repo: full_name[1],
      default_branch: "main",
    }
  );
  const treeStructure = await githubAPI(
    `GET`,
    `/repos/{owner}/{repo}/git/trees/{tree_sha}?recursive=1`,
    {
      owner: full_name[0],
      repo: full_name[1],
      tree_sha: mainBranch.data[0].commit.sha,
    }
  );

  const filteredFilesAndFolders = treeStructure.data.tree.filter(
    (file) => !shouldIgnoreFileOrFolder(file.path)
  );

  const summarizedFiles: string[] = await Promise.all(
    filteredFilesAndFolders.map(async (file) => {
      const content = await githubAPI(
        `GET`,
        `/repos/{owner}/{repo}/contents/{path}`,
        {
          owner: full_name[0],
          repo: full_name[1],
          path: file.path,
          headers: {
            // to accept files between 1mb-100mb only
            Accept: "application/vnd.github.v3.raw",
          },
        }
      );
      return summarizeFile(content.data);
    })
  );

  const { text } = await generateText({
    model: togetherai("meta-llama/Llama-3.2-3B-Instruct-Turbo"),
    system: `You are very good at writing professional README for a repository in a markdown editor. You will be given an array where each index
    is a summary of a file in 5 sentences maximum. Write a professional README out of it. You can make the text bold, or use
    italics or horizontal rule for demarcation of sections or a code block or add a table or unorderedlist or orderedlists or add a
    checked list`,
    prompt: `Write a professional README for this array of summaries ${summarizedFiles}`,
  });

  // console.log(JSON.stringify(summarizedFiles));

  // const text = "";

  // get the content of each file, make sure the size is <= 100MB
  return (
    <div>
      {/* handle the case where the user doesn't have a readme file */}
      <h3>Current readme</h3>
      <h2>Optimized readme</h2>
      <DisplayOptimzedReadme optimizedReadme={text} />
      {/* <div>{text}</div> */}
      {/* <div>{text}</div> */}
    </div>
  );
}
