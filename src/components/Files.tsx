import { useEffect, useState } from "react";

interface Folder {
  id: string;
  name: string;
  ownerId: string;
}

interface File {
  id: string;
  name: string;
  created_at: string;
}

export default function Files() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    async function getFiles() {
      console.log(selectedFolder);
      if (selectedFolder) {
        const res = await fetch(
          `http://localhost:3000/folders/${selectedFolder}`,
          {
            credentials: "include",
          },
        );

        const data = (await res.json()) as File[];

        console.log(data);

        setFiles(data);
      }
    }
    getFiles();
  }, [selectedFolder]);

  useEffect(() => {
    async function getFolders() {
      try {
        const res = await fetch("http://localhost:3000/folders", {
          credentials: "include",
        });

        const data = (await res.json()) as Folder[];
        console.log(data);

        setFolders(data);
      } catch (err) {
        console.error("Error trying to fetch for folders", err);
      }
    }

    getFolders();
  }, []);
  return (
    <div className="border border-white min-w-80 p-7">
      <div className="flex justify-between p-2 items-center">
        <h2 className="text-xl font-bold">Folders</h2>
        <button>+</button>
      </div>
      <div className="flex gap-2">
        {folders.map((f) => (
          <div
            className={`p-5 rounded-xl cursor-pointer hover:bg-gray-950 ${selectedFolder === f.id ? "bg-gray-950" : "bg-gray-900"}`}
            key={f.id}
            onClick={() =>
              setSelectedFolder(selectedFolder === f.id ? "" : f.id)
            }
          >
            <span>{f.name}</span>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-xl font-bold">Files</h2>
        {selectedFolder &&
          files &&
          files.map((f) => <div key={f.id}>{f.name}</div>)}
        {selectedFolder && !files.length && <span>Empty folder!</span>}
      </div>
    </div>
  );
}
