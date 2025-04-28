"use client";

import { Button } from "@/components/ui/button";
import MDEditor, {
  commands,
  ICommand,
  TextAreaTextApi,
  TextState,
} from "@uiw/react-md-editor";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import rehypeSanitize from "rehype-sanitize";

export function DisplayOptimzedReadme({
  optimizedReadme,
  data,
}: {
  optimizedReadme: string;
  data: { owner: string; repo: string; sha: string };
}) {
  // console.log(data);
  const [isLoading, setIsLoading] = useState(false);
  const pushChanges: ICommand = {
    name: "Push chanages",
    keyCommand: "Push chanages",
    buttonProps: { "aria-label": "Push changes to repository" },
    icon: (
      // should be green button not white
      <Button variant="secondary" disabled={isLoading}>
        {isLoading && <Loader2 className="animate-spin" />}
        Push Changes
      </Button>
    ),
    execute: async (state: TextState, api: TextAreaTextApi) => {
      setIsLoading(true);
      await fetch("/api/update-readme", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          owner: data.owner,
          repo: data.repo,
          sha: data.sha,
          newContent: optimizedReadme,
        }),
      });
      setIsLoading(false);
    },
  };
  const [value, setValue] = useState(optimizedReadme);
  return (
    <div>
      {/* also making sure the markdown is sanitized */}

      <MDEditor
        value={value}
        onChange={setValue}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        commands={[...commands.getCommands(), commands.divider, pushChanges]}
        fullscreen
        textareaProps={{
          placeholder: "Describe the repository here...",
        }}
      />
      <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} />

      <button>Save</button>
    </div>
  );
}
