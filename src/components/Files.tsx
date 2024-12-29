import { useState } from "react";
import useFiles from "../hooks/useFiles";
import useFolders from "../hooks/useFolders";
import FolderIcon from "./FolderIcon";

export interface Folder {
  id: string;
  name: string;
  ownerId: string;
}

export interface File {
  id: string;
  name: string;
  metadata: { signedUrl: string };
  created_at: string;
}

export default function Files() {
  const [selectedFolder, setSelectedFolder] = useState("");
  const [folders, isLoadingFolders] = useFolders();
  const [files, isLoadingFiles] = useFiles(selectedFolder);

  return (
    <div className="border border-white min-w-80 p-7">
      <div className="flex justify-between p-1 items-center">
        <h2 className="text-xl font-bold">Folders</h2>
        <button>+</button>
      </div>
      <div className="flex gap-2">
        {isLoadingFolders && <div>Loading...</div>}
        {!isLoadingFolders &&
          folders.map((f) => (
            <div
              className={`flex p-5 rounded-xl cursor-pointer hover:bg-green-400 ${
                selectedFolder === f.id ? "bg-green-500" : "bg-gray-700"
              }`}
              key={f.id}
              onClick={() =>
                setSelectedFolder(selectedFolder === f.id ? "" : f.id)
              }
            >
              <FolderIcon />
              <span>{f.name}</span>
            </div>
          ))}
      </div>
      <div>
        <div className="flex p-1 items-center justify-between">
          <h2 className="text-xl font-bold">Files</h2>
          <button>+</button>
        </div>
        {isLoadingFiles && <div>Loading...</div>}
        {!isLoadingFiles &&
          selectedFolder &&
          files.map((f) => (
            <div>
              <a href={f.metadata.signedUrl} key={f.id} target="_blank">
                {f.name}
              </a>
            </div>
          ))}
        {!isLoadingFiles && selectedFolder && !files.length && (
          <span>Empty folder!</span>
        )}
      </div>
    </div>
  );
}
