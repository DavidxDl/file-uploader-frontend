import { useEffect, useState } from "react";

export default function useFiles(selectedFolder: string) {
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    async function getFiles() {
      console.log(selectedFolder);
      if (selectedFolder) {
        setIsLoadingFiles((l) => true);
        const res = await fetch(
          `http://localhost:3000/folders/${selectedFolder}`,
          {
            credentials: "include",
          }
        );

        const data = (await res.json()) as File[];

        console.log(data);

        setIsLoadingFiles((l) => false);
        setFiles(data);
      }
    }
    getFiles();
  }, [selectedFolder]);

  return [files, isLoadingFiles];
}
