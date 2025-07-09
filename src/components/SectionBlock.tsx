import React from 'react';

type UploadedFile = {
  file: File;
  content?: string;
};

type SectionBlockProps = {
  label: string;
  color: string;
  files: UploadedFile[];
  texts: string[];
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTextChange: (index: number, value: string) => void;
  onAddText: () => void;
  onRemoveFile: (index: number) => void;
  onRemoveText: (index: number) => void;
};

const SectionBlock: React.FC<SectionBlockProps> = ({
  label,
  color,
  files,
  texts,
  onFileChange,
  onTextChange,
  onAddText,
  onRemoveFile,
  onRemoveText,
}) => {
  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white space-y-4">
      <h2 className={`text-lg font-semibold text-${color}-700`}>{label}</h2>

      {/* Upload */}
      <div>
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.txt"
          onChange={onFileChange}
          className="text-sm mb-2"
        />
        {files.length > 0 && (
          <ul className="text-sm text-gray-600 list-disc ml-5 space-y-1">
            {files.map((uploaded, i) => (
              <li key={i} className="flex items-center justify-between">
                📎 {uploaded.file.name}
                <button
                  onClick={() => onRemoveFile(i)}
                  className="text-red-500 text-xs ml-2 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Manual Text Areas */}
      <div className="space-y-3">
        {texts.map((text, i) => (
          <div key={i} className="relative">
            <textarea
              value={text}
              onChange={(e) => onTextChange(i, e.target.value)}
              placeholder={`Paste or type ${label.toLowerCase()} content...`}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm pr-10"
            />
            <button
              onClick={() => onRemoveText(i)}
              className="absolute top-2 right-2 text-xs text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={onAddText}
          className={`text-${color}-600 hover:underline text-sm`}
        >
          + Add {label} Text
        </button>
      </div>
    </div>
  );
};

export default SectionBlock;
