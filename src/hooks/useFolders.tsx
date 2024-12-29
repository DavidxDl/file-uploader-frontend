import { useEffect, useState } from "react";

export default function useFolders() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isLoadingFolders, setIsLoadingFolders] = useState(false);

  useEffect(() => {
    async function getFolders() {
      try {
        setIsLoadingFolders((l) => true);
        const res = await fetch("http://localhost:3000/folders", {
          credentials: "include",
        });

        const data = (await res.json()) as Folder[];
        console.log(data);

        setIsLoadingFolders((l) => false);
        setFolders(data);
      } catch (err) {
        setIsLoadingFolders((l) => false);
        console.error("Error trying to fetch for folders", err);
      }
    }

    getFolders();
  }, []);
  return [folders, isLoadingFolders];
}
