

const filesAndFoldersToIgnore = [
  ".jpg",
  ".png",
  ".css",
  ".scss",
  ".svg",
  ".jpeg",
  ".webp",
  ".ttf",
  ".ico",
  ".gitignore",
  "node_modules/",
  "package-lock.json",
  ".env",
  "build/",
  ".vscode/",
  ".DS_Store",
  ".log",
  ".vscode",
  ".pyc",
  ".pyo",
  "__pycache__/",
  "dist/",
];

export function shouldIgnoreFileOrFolder(path: string): boolean {
  if(!path.split("/").pop().includes("."))
      return true;
  return filesAndFoldersToIgnore.some(
    (ignoreItem) => path.endsWith(ignoreItem) || path.includes(ignoreItem)
  );
}

export function timeout(milliseconds:number){
    return new Promise((resolve) => setTimeout(resolve, milliseconds)); 
}
