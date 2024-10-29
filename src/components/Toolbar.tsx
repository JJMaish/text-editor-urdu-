import React from 'react';
import { Copy, Download } from 'lucide-react';

interface ToolbarProps {
  onCopy: () => void;
  onDownload: () => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
}

export function Toolbar({ onCopy, onDownload, fontSize, onFontSizeChange }: ToolbarProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-4">
        <button
          onClick={onCopy}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-colors"
        >
          <Copy className="h-4 w-4" />
          <span>Copy</span>
        </button>
        <button
          onClick={onDownload}
          className="flex items-center gap-2 px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors"
        >
          <Download className="h-4 w-4" />
          <span>Download</span>
        </button>
      </div>
      <div className="flex items-center gap-2">
        <label className="text-gray-700">Font Size:</label>
        <input
          type="range"
          min="16"
          max="48"
          value={fontSize}
          onChange={(e) => onFontSizeChange(Number(e.target.value))}
          className="w-32"
        />
        <span className="text-gray-700 w-8">{fontSize}</span>
      </div>
    </div>
  );
}