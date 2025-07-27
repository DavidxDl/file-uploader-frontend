import { Dispatch, SetStateAction, useState } from "react";
import { Folder } from "../Files";

interface Props {
  folders: Folder[];
  setFolders: Dispatch<SetStateAction<Folder[]>>;
}

export default function RenameFolderForm({ folders, setFolders }: Props) {
  const [folderName, setFolderName] = useState("");
  const [newFolderName, setNewFolderName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function createFolder(e: React.FormEvent) {
    try {
      e.preventDefault();
      setIsLoading(true);
      const folderId = folders.find((f) => f.name === folderName)?.id;
      console.log(`folderId = ${folderId} folderName = ${folderName}`);
      if (!folderId) return;
      setIsLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND}/folders/rename`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            folderName,
            folderId: folderId,
            newFolderName,
          }),
          credentials: "include",
        },
      );

      const data = await res.json();

      console.log(data);

      if (data?.success) {
        setIsLoading(false);

        setFolders(
          folders.map((f) => {
            if (f.id === folderId) {
              f.name = newFolderName;
              return f;
            }
            return f;
          }),
        );
        setFolderName("");
        setNewFolderName("");
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={createFolder}>
      <label htmlFor="folderName">Folder:</label>
      <select
        name="folderName"
        className=""
        id="folderName"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        required
      >
        <option value="" disabled>
          Folders
        </option>
        {folders.map((f) => (
          <option key={f.id} value={f.name}>
            {f.name}
          </option>
        ))}
      </select>
      <label htmlFor="newFolderName">New Folder Name</label>
      <input
        type="text"
        id="newFolderName"
        value={newFolderName}
        onChange={(e) => setNewFolderName(e.target.value)}
      />
      <button disabled={isLoading} className="bg-green-500">
        Rename
      </button>
    </form>
  );
}
