import { useState } from "react";
import useFiles from "../hooks/useFiles";
import useFolders from "../hooks/useFolders";
import FolderIcon from "./FolderIcon";
import ButtonModal from "./ButtonModal";

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
    <div className="border border-white w-full max-w-4xl rounded-md p-7">
      <div className="flex justify-between p-1 items-center">
        <h2 className="text-xl font-bold">Folders</h2>
        <ButtonModal buttonText="+">
          <form action="http://localhost:3000/folders/new" method="POST">
            <label htmlFor="folder_name">Name:</label>
            <input
              className="bg-white px-2 rounded-md text-black"
              type="text"
              name="folder_name"
              placeholder="images"
              id="folder_name"
            />
            <button className="bg-green-500 text-sm mt-2">Create</button>
          </form>
        </ButtonModal>
      </div>
      <div className="flex gap-2 max-w-64 flex-wrap">
        {isLoadingFolders && <div>Loading...</div>}
        {!isLoadingFolders &&
          folders.map((f) => (
            <div
              className={`flex p-5 transition rounded-xl cursor-pointer hover:bg-green-400 ${
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
          <ButtonModal buttonText="+">
            <form>
              <fieldset>
                <label htmlFor="file">File:</label>
                <input type="file" name="file" id="file" />
              </fieldset>
              <fieldset className="flex flex-col">
                <label htmlFor="folder">Folder:</label>
                <select
                  name="folder"
                  id="folder"
                  className="bg-gray-700 rounded-md py-1 text-white"
                >
                  {folders.map((f) => (
                    <option value={f.name}>{f.name}</option>
                  ))}
                </select>
                <button className="mt-2">Upload</button>
              </fieldset>
            </form>
          </ButtonModal>
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
