// src/components/AvatarDropzone.tsx
import React, { useRef, useState, useCallback } from 'react';

type Props = {
  onFileSelect: (file: File) => void;
  preview?: string | null;
  size?: number;
};

export default function AvatarDropzone({ onFileSelect, preview, size = 144 }: Props) {
  const [highlight, setHighlight] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setHighlight(false);
    const f = e.dataTransfer.files?.[0];
    if (f) onFileSelect(f);
  }, [onFileSelect]);

  return (
    <div className="flex flex-col items-center">
      <div
        onDragOver={(e) => { e.preventDefault(); setHighlight(true); }}
        onDragLeave={() => setHighlight(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`rounded-full overflow-hidden border ${highlight ? 'border-brand-400' : 'border-white/10'}`}
        style={{ width: size, height: size, cursor: 'pointer' }}
      >
        <img
          src={preview || '/avatar-default.png'}
          alt="avatar"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files && onFileSelect(e.target.files[0])}
      />
    </div>
  );
}
