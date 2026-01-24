import { useRef, useState } from 'react';

interface FileDropZoneProps {
  label: string;
  accept?: string;
  file: File | null;
  onChange: (file: File | null) => void;
}

export default function FileDropZone({ label, accept, file, onChange }: FileDropZoneProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (selected: File) => {
    onChange(selected);
    if (selected.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(selected));
    } else {
      setPreview(null);
    }
  };

  return (
    <div>
      <label className="block text-sm text-white/70">{label}</label>
      <div
        className="w-full h-32 border border-white/20 rounded-md flex items-center justify-center bg-white/5 cursor-pointer"
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onClick={() => inputRef.current?.click()}
      >
        {preview ? (
          <img src={preview} className="h-full object-contain" alt="preview" />
        ) : file ? (
          file.name
        ) : (
          'Перетащите файл или нажмите'
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => e.target.files && handleFile(e.target.files[0])}
      />
    </div>
  );
}
