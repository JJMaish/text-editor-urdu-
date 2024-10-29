import React, { useState, useRef, useEffect } from 'react';
import { Check } from 'lucide-react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  title: string;
}

export function ColorPicker({ color, onChange, title }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const colors = [
    '#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc', '#d9d9d9', '#efefef', '#f3f3f3', '#ffffff',
    '#980000', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#4a86e8', '#0000ff', '#9900ff', '#ff00ff',
    '#e6b8af', '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#c9daf8', '#cfe2f3', '#d9d2e9', '#ead1dc',
    '#dd7e6b', '#ea9999', '#f9cb9c', '#ffe599', '#b6d7a8', '#a2c4c9', '#a4c2f4', '#9fc5e8', '#b4a7d6', '#d5a6bd'
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={pickerRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
        title={title}
      >
        <div className="w-4 h-4 rounded border" style={{ backgroundColor: color }} />
        <span>{title}</span>
      </button>

      {isOpen && (
        <div className="absolute left-full top-0 ml-1 p-2 bg-white rounded-lg shadow-xl border z-50 w-64">
          <div className="grid grid-cols-10 gap-1">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => {
                  onChange(c);
                  setIsOpen(false);
                }}
                className="w-5 h-5 rounded relative hover:scale-125 transition-transform"
                style={{ backgroundColor: c }}
              >
                {color === c && (
                  <Check 
                    className={`absolute inset-0 m-auto h-3 w-3 ${
                      c === '#ffffff' ? 'text-gray-800' : 'text-white'
                    }`}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="mt-2 pt-2 border-t">
            <input
              type="text"
              value={color}
              onChange={(e) => onChange(e.target.value)}
              className="w-full px-2 py-1 text-sm border rounded"
              placeholder="#000000"
            />
          </div>
        </div>
      )}
    </div>
  );
}