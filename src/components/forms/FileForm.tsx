import { useState } from "react";
import { Folder } from "../Files";

interface Props {
  folders: Folder[];
}
export default function FileForm({ folders }: Props) {
  const [selectedFolder, setSelectedFolder] = useState("Folder");

  return (
    <form
      method="post"
      action={
        selectedFolder === "SHARE"
          ? `${process.env.BACKEND}/share/new`
          : `${process.env.BACKEND}/files/new`
      }
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
          value={selectedFolder}
          className="bg-gray-700 rounded-md py-1 text-white"
          required
          onChange={(e) => setSelectedFolder(e.target.value)}
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
  );
}
