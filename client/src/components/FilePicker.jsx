import CustomButton from "./CustomButton";

export default function FilePicker({ file, setFile, readFile }) {
  return (
    <div className="filepicker-container">
      <div className="flex flex-1 flex-col">
        <input
          type="file"
          id="fileUpload"
          name="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="fileUpload" className="filepicker-label">
          Upload File
        </label>

        <p className="mt-2 truncate text-xs text-gray-500">
          {file === "" ? "No file selected" : file.name}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <CustomButton
          type="outline"
          title="Logo"
          handleClick={() => readFile("logo")}
          customStyles="text-xs"
        />
        <CustomButton
          type="filled"
          title="Full"
          handleClick={() => readFile("full")}
          customStyles="text-xs"
        />
      </div>
    </div>
  );
}
