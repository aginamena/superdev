import Link from "next/link";
import { githubAPI } from "../api";

export default async function Home() {
  // only public repos are expected to be displayed
  const repos = await githubAPI("GET", "/users/{username}/repos", {
    username: "aginamena",
  });
  // console.log(repos);
  // file sizes that are above 100mb can't be optimized therefore that repo can't be optimized.
  return (
    <div className="grid grid-cols-4 gap-4">
      {repos.data.map((repo) => (
        <div key={repo.id} className="border p-4">
          <Link href={`optimize/${repo.full_name}`}>{repo.name}</Link>
          <div className="mt-8">size {repo.size}</div>
        </div>
      ))}
    </div>
  );
}
