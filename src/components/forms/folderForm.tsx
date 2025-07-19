import { useState } from "react";

interface Props {
  refreshFolders: () => void;
}

export default function FolderForm({ closeForm, refreshFolders }: Props) {
  const [folderName, setFolderName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function createFolder(e: React.FormEvent) {
    try {
      e.preventDefault();
      setIsLoading(true);
      const res = await fetch("http://localhost:3000/folders/new", {
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
        refreshFolders();
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
      <button className="bg-green-500 text-sm mt-2">Create</button>
    </form>
  );
}
