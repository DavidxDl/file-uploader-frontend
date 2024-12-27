import { useEffect, useState } from "react";

interface Folder {
  id: string;
  name: string;
  ownerId: string;
}

export default function Files() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState("");

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
            className={`p-5 rounded-xl cursor-pointer hover:bg-gray-950 ${selectedFolder === f.name ? "bg-gray-950" : "bg-gray-900"}`}
            key={f.id}
            onClick={() =>
              setSelectedFolder(selectedFolder === f.name ? "" : f.name)
            }
          >
            <span>{f.name}</span>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-xl font-bold">Files</h2>
        {selectedFolder && <h2>{selectedFolder}</h2>}
      </div>
    </div>
  );
}
