import { Dispatch, SetStateAction, useState } from "react";
import { Folder } from "../Files";

interface Props {
  setFolders: Dispatch<SetStateAction<Folder[]>>;
  folders: Folder[];
}

export default function FolderForm({ setFolders, folders }: Props) {
  const [folderName, setFolderName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function createFolder(e: React.FormEvent) {
    try {
      e.preventDefault();
      setIsLoading(true);
      const res = await fetch(`${process.env.BACKEND}/folders/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ folder_name: folderName }),
        credentials: "include",
      });

      const data = await res.json();

      console.log(data);

      if (data?.success) {
        setIsLoading(false);
        setFolders([...folders, data.folder]);
        setFolderName("");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={createFolder}>
      <label htmlFor="folder_name">Name:</label>
      <input
        className="bg-white px-2 rounded-md text-black"
        type="text"
        name="folder_name"
        placeholder="images"
        id="folder_name"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
      />
      <button disabled={isLoading} className="bg-green-500 text-sm mt-2">
        Create
      </button>
    </form>
  );
}
