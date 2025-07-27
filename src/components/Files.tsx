import { useRef, useState } from "react";
import useFiles from "../hooks/useFiles";
import useFolders from "../hooks/useFolders";
import FolderIcon from "./FolderIcon";
import ButtonModal from "./ButtonModal";
import FolderForm from "./forms/folderForm";
import Options from "./Options";
import RenameFolderForm from "./forms/RenameFolderForm";
import FileIcon from "./FileIcon";
import FileForm from "./forms/FileForm";

export interface Folder {
  id: string;
  name: string;
  ownerId: string;
}

export interface File {
  id: string;
  name: string;
  metadata: { signedUrl: string; mimetype: string; size: number };
  created_at: string;
}

export default function Files() {
  const [selectedFolder, setSelectedFolder] = useState("");
  const [folders, setFolders, isLoadingFolders] = useFolders();
  const [files, setFiles, isLoadingFiles] = useFiles(selectedFolder);
  const [showFilePreview, setShowFilePreview] = useState<null | File>(null);
  const previewRef = useRef<null | HTMLDialogElement>(null);

  async function deleteFolder(folderId: string, folderName: string) {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND}/folders/delete`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ folderId, folderName }),
          credentials: "include",
        },
      );
      const data = await res.json();

      if (data.success) {
        setFolders(folders.filter((f) => f.id !== folderId));
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function shareFile(folderId: string, fileName: string) {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND}/files/share`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ folderId, fileName }),
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      if (data.error) {
        return alert("File already Shared!");
      }
      navigator.clipboard.writeText(data.publicUrl);
      alert(
        `File: ${fileName} shared Correctly! \n the public url has been copy to your clipboard! `,
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteFile(
    fileId: string,
    fileName: string,
    folderId: string,
  ) {
    try {
      if (selectedFolder === "SHARE") {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND}/share/delete`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ fileName }),
            credentials: "include",
          },
        );
        const data = await res.json();

        console.log(data);
        if (data.success) {
          console.log("succsess!!:w");
          setFiles(files.filter((f) => f.id !== fileId));
          console.log(files);
          return;
        }
        return;
      }
      const folderName = folders.find((f) => f.id === folderId)?.name;
      const res = await fetch(`${import.meta.env.VITE_BACKEND}/files/delete`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileId, fileName, folderName }),
        credentials: "include",
      });
      const data = await res.json();

      console.log(data);
      if (data.success) {
        console.log("succsess!!:w");
        setFiles(files.filter((f) => f.id !== fileId));
        console.log(files);
      }
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="border border-white w-full max-w-4xl rounded-md p-7">
      <dialog ref={previewRef} className="z-50 max-w-full">
        <button
          className="bg-red-600 absolute right-0 top-[-40px]"
          onClick={() => {
            setShowFilePreview(null);
            if (previewRef.current) previewRef.current.open = false;
          }}
        >
          X
        </button>
        {showFilePreview &&
        showFilePreview.metadata.mimetype.startsWith("image") ? (
          <img
            className="mx-auto my-0"
            src={showFilePreview?.metadata.signedUrl}
            alt="habibi"
          />
        ) : (
          <FileIcon />
        )}
        {showFilePreview && (
          <div className="p-2">
            <dl className="rounded">
              <dt className="font-semibold">Name</dt>
              <dd className="mb-2 max-w-96 overflow-hidden text-nowrap text-ellipsis">
                {showFilePreview?.name}
              </dd>
              <dt className="font-semibold">Uploaded</dt>
              <dd className="mb-2">
                {showFilePreview?.created_at &&
                  new Date(showFilePreview.created_at).toLocaleString()}
              </dd>
              <dt className="font-semibold">Size</dt>
              <dd>
                {showFilePreview?.metadata.size &&
                  Math.round(showFilePreview?.metadata.size / 1024)}
                mb
              </dd>
            </dl>

            <div className="flex gap-4">
              <a
                href={
                  showFilePreview.metadata.signedUrl &&
                  showFilePreview.metadata.signedUrl
                }
              >
                Download
              </a>
            </div>
          </div>
        )}
      </dialog>
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
              {f.id !== "SHARE" && (
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

                    {
                      <li className="hover:bg-green-500 transition border-b border-b-green-500 cursor-pointer rounded px-4 py-2 text-center font-extrabold">
                        Rename
                      </li>
                    }
                  </ul>
                </Options>
              )}
            </div>
          ))}
      </div>
      <div>
        <div className="flex p-1 items-center justify-between">
          <h2 className="text-xl font-bold">Files</h2>

          <div>
            <ButtonModal buttonText="Upload File">
              <FileForm folders={folders} />
            </ButtonModal>
          </div>
        </div>
        {isLoadingFiles && <div>Loading...</div>}
        {!isLoadingFiles && selectedFolder && !files.length && (
          <span>Empty folder!</span>
        )}
        {!isLoadingFiles &&
          selectedFolder &&
          files.map((f) => (
            <div key={f.id} className="flex ">
              <a
                href="#"
                className="max-w-48 overflow-ellipsis overflow-x-hidden block"
                onClick={() => {
                  setShowFilePreview(f);
                  if (previewRef.current) previewRef.current.open = true;
                }}
              >
                {f.name}
              </a>
              <Options
                className="size-5 text-[.8rem] leading-[.3rem] ml-1 p-0 text-center"
                buttonText="⋮"
              >
                <ul>
                  <li
                    className="hover:bg-red-600 transition border-b border-b-green-500 cursor-pointer rounded px-4 py-2 text-center font-extrabold"
                    onClick={() =>
                      confirm(`you want to delete file: ${f.name}`) &&
                      deleteFile(f.id, f.name, selectedFolder)
                    }
                  >
                    Delete
                  </li>
                  <li className="hover:bg-green-500 transition border-b border-b-green-500 cursor-pointer rounded px-4 py-2 text-center font-extrabold">
                    <a className="text-white" href={f.metadata.signedUrl}>
                      Download
                    </a>
                  </li>

                  <li
                    className="hover:bg-green-500 transition border-b border-b-green-500 cursor-pointer rounded px-4 py-2 text-center font-extrabold"
                    onClick={() => {
                      if (selectedFolder === "SHARE") {
                        navigator.clipboard.writeText(f.metadata.signedUrl);
                        return alert(`URL Copied`);
                      }

                      shareFile(selectedFolder, f.name);
                    }}
                  >
                    {selectedFolder === "SHARE" ? "URL" : "Share"}
                  </li>
                </ul>
              </Options>
            </div>
          ))}
      </div>
    </div>
  );
}
