import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Folder } from "../components/Files";

export default function useFolders(): [
  Folder[],
  Dispatch<SetStateAction<Folder[]>>,
  boolean,
] {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isLoadingFolders, setIsLoadingFolders] = useState(false);

  async function getFolders() {
    try {
      setIsLoadingFolders(true);
      const res = await fetch(`${import.meta.env.VITE_BACKEND}/folders`, {
        credentials: "include",
      });

      const data = (await res.json()) as Folder[];
      console.log(data);

      setIsLoadingFolders(false);
      setFolders([...data, { id: "SHARE", name: "SHARE", ownerId: "" }]);
    } catch (err) {
      setIsLoadingFolders(false);
      console.error("Error trying to fetch for folders", err);
    }
  }

  useEffect(() => {
    getFolders();
  }, []);
  return [folders, setFolders, isLoadingFolders];
}
