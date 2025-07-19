import { useEffect, useState } from "react";
import { Folder } from "../components/Files";

export default function useFolders(): [Folder[], boolean, () => void] {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isLoadingFolders, setIsLoadingFolders] = useState(false);

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
  async function refreshFolders() {
    getFolders();
  }

  useEffect(() => {
    getFolders();
  }, []);
  return [folders, isLoadingFolders, refreshFolders];
}
