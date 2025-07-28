import { useState, FormEvent } from "react";
import { Folder } from "../Files";

interface Props {
  folders: Folder[];
}

export default function FileForm({ folders }: Props) {
  const [selectedFolder, setSelectedFolder] = useState("Folder");
  const [isUploading, setIsUploading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsUploading(true);

    const formData = new FormData(e.currentTarget);

    const endpoint =
      selectedFolder === "SHARE"
        ? `${import.meta.env.VITE_BACKEND}/share/new`
        : `${import.meta.env.VITE_BACKEND}/files/new`;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
        credentials: "include", // This is the key part!
      });

      if (res.ok) {
        // Handle success - maybe refresh the file list or show success message
        console.log("File uploaded successfully");
        // Reset form
        e.currentTarget.reset();
        setSelectedFolder("Folder");
      } else {
        console.error("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
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
        <button className="mt-2" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </fieldset>
    </form>
  );
}
