import { useEffect, useState } from "react";
import { File } from "../components/Files";

export default function useFiles(
  selectedFolder: string,
): [File[], boolean, () => void] {
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  async function getFiles() {
    console.log("[Selecter folder]");
    console.log(selectedFolder);
    if (selectedFolder) {
      setIsLoadingFiles((l) => true);
      const res = await fetch(
        `http://localhost:3000/folders/${selectedFolder}`,
        {
          credentials: "include",
        },
      );

      const data = (await res.json()) as File[];

      console.log(data);

      setIsLoadingFiles((l) => false);
      setFiles(data);
    }
  }
  useEffect(() => {
    getFiles();
  }, [selectedFolder]);

  return [files, isLoadingFiles, () => getFiles()];
}
