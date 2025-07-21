import { useState } from "react";
import useFiles from "../hooks/useFiles";
import useFolders from "../hooks/useFolders";
import FolderIcon from "./FolderIcon";
import ButtonModal from "./ButtonModal";
import FolderForm from "./forms/folderForm";
import Options from "./Options";
import RenameFolderForm from "./forms/RenameFolderForm";

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
  const [folders, setFolders, isLoadingFolders] = useFolders();
  const [files, isLoadingFiles, refreshFiles] = useFiles(selectedFolder);

  async function deleteFolder(folderId: string, folderName: string) {
    try {
      const res = await fetch(`http://localhost:3000/folders/delete`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ folderId, folderName }),
        credentials: "include",
      });
      const data = await res.json();

      if (data.success) {
        setFolders(folders.filter((f) => f.id !== folderId));
      }
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="border border-white w-full max-w-4xl rounded-md p-7">
      <div className="flex justify-between p-1 items-center">
        <h2 className="text-xl font-bold">Folders</h2>
        <div className="flex gap-2">
          <ButtonModal buttonText="Rename Folder">
            <RenameFolderForm folders={folders} setFolders={setFolders} />
          </ButtonModal>

          <ButtonModal buttonText="Create Folder">
            <FolderForm setFolders={setFolders} folders={folders} />
          </ButtonModal>
        </div>
      </div>
      <div className="flex align-middle gap-2 max-w-full max-h-[200px] overflow-y-auto flex-wrap">
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
              <Options
                className="size-5 text-[.8rem] leading-[.3rem] ml-1 p-0 text-center"
                buttonText="⋮"
              >
                <ul>
                  <li
                    className="hover:bg-red-600 transition border-b border-b-green-500 cursor-pointer rounded px-4 py-2 text-center font-extrabold"
                    onClick={() =>
                      confirm(`you want to delete folder: ${f.name}`) &&
                      deleteFolder(f.id, f.name)
                    }
                  >
                    Delete
                  </li>

                  <li className="hover:bg-green-500 transition border-b border-b-green-500 cursor-pointer rounded px-4 py-2 text-center font-extrabold">
                    Rename
                  </li>
                </ul>
              </Options>
            </div>
          ))}
      </div>
      <div>
        <div className="flex p-1 items-center justify-between">
          <h2 className="text-xl font-bold">Files</h2>
          <ButtonModal buttonText="Upload File">
            <form
              method="post"
              action="http://localhost:3000/files/new"
              encType="multipart/form-data"
            >
              <fieldset>
                <label htmlFor="file">File:</label>
                <input type="file" name="file" id="file" required />
              </fieldset>
              <fieldset className="flex flex-col">
                <label htmlFor="folder">Folder:</label>
                <select
                  name="folder"
                  id="folder"
                  className="bg-gray-700 rounded-md py-1 text-white"
                  required
                >
                  {folders.map((f) => (
                    <option key={f.id} value={f.name}>
                      {f.name}
                    </option>
                  ))}
                </select>
                <button className="mt-2">Upload</button>
              </fieldset>
            </form>
          </ButtonModal>
        </div>
        {isLoadingFiles && <div>Loading...</div>}
        {!isLoadingFiles && selectedFolder && !files.length && (
          <span>Empty folder!</span>
        )}
        {!isLoadingFiles &&
          selectedFolder &&
          files.map((f) => (
            <div>
              <a href={f.metadata.signedUrl} key={f.id} target="_blank">
                {f.name}
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}
