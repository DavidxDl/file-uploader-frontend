import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { File } from "../components/Files";

export default function useFiles(
  selectedFolder: string,
): [File[], Dispatch<SetStateAction<File[]>>, boolean] {
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  async function getFiles() {
    console.log("[Selecter folder]");
    console.log(selectedFolder);
    if (selectedFolder) {
      setIsLoadingFiles(true);
      if (selectedFolder !== "SHARE") {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND}/folders/${selectedFolder}`,
          {
            credentials: "include",
          },
        );

        const data = (await res.json()) as File[];

        console.log(data);

        setIsLoadingFiles(false);
        setFiles(data);
      } else {
        //getting shared files
        const res = await fetch(`${import.meta.env.VITE_BACKEND}/share`, {
          credentials: "include",
        });

        const data = (await res.json()) as File[];

        console.log(data);

        setIsLoadingFiles(false);
        setFiles(data);
      }
    }
  }
  useEffect(() => {
    getFiles();
  }, [selectedFolder]);

  return [files, setFiles, isLoadingFiles];
}
