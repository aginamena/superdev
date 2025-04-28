"use client";

import { useState } from "react";
import MDEditor, {
  commands,
  ICommand,
  TextState,
  TextAreaTextApi,
} from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

export function DisplayOptimzedReadme({
  optimizedReadme,
}: {
  optimizedReadme: string;
}) {
  // const pushChanges : ICommand = {
  //   name: "test name",
  //   keyCommand :"te",
  //   buttonProps:{},
  //   icon: (),
  //   execute: (state:TextState, api: TextAreaTextApi) => {

  //   }
  // }
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
        extraCommands={[...commands.getCommands(), pushChanges]}
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
