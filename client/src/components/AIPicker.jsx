import CustomButton from "./CustomButton";

export default function AIPicker({
  prompt,
  setPrompt,
  generatingImg,
  handleSubmit,
}) {
  return (
    <div className="aipicker-container">
      <textarea
        className="aipicker-textarea"
        rows={5}
        placeholder="Ask AI... Try `generate a smooth gradient pattern for a shirt`"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className="flex flex-wrap gap-3">
        {generatingImg ? (
          <CustomButton
            type="outline"
            title="Asking AI..."
            customStyles="text-xs"
          />
        ) : (
          <>
            <CustomButton
              type="outline"
              title="AI Logo"
              handleClick={() => handleSubmit("logo")}
              customStyles="text-xs"
            />

            <CustomButton
              type="filled"
              title="AI Full"
              handleClick={() => handleSubmit("full")}
              customStyles="text-xs"
            />
          </>
        )}
      </div>
    </div>
  );
}
