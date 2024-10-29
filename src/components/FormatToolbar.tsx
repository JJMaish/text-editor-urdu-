import React from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  MoveHorizontal,
  TextSelect,
  WrapText
} from 'lucide-react';
import { TextStyle } from '../types/editor';

interface FormatToolbarProps {
  style: TextStyle;
  onStyleChange: (style: TextStyle) => void;
}

export function FormatToolbar({ style, onStyleChange }: FormatToolbarProps) {
  const updateStyle = (updates: Partial<TextStyle>) => {
    onStyleChange({ ...style, ...updates });
  };

  const fonts = [
    'Jameel Noori Nastaleeq',
    'Mehr Nastaleeq',
    'Nafees Nastaleeq',
    'Faiz Lahori Nastaleeq',
    'Noori Nastaleeq',
    'Alvi Nastaleeq',
    'Aslam Lashkari Nastaleeq',
    'Pak Nastaleeq',
    'Khadim Quranic',
    'Amna',
    'Qalam Quran Majeed',
    'Fajer Noori Nastaleeq',
    'Hussaini Nastaleeq',
    'Urdu Typesetting',
    'Awami Nastaleeq'
  ];

  const fontSizes = Array.from({ length: 33 }, (_, i) => i + 12);

  return (
    <div className="flex items-center gap-1">
      <select
        value={style.fontFamily}
        onChange={(e) => updateStyle({ fontFamily: e.target.value })}
        className="w-24 text-xs border rounded px-1 py-0.5"
      >
        {fonts.map(font => (
          <option key={font} value={font}>{font.split(' ')[0]}</option>
        ))}
      </select>

      <select
        value={style.fontSize}
        onChange={(e) => updateStyle({ fontSize: Number(e.target.value) })}
        className="w-12 text-xs border rounded px-1 py-0.5"
      >
        {fontSizes.map(size => (
          <option key={size} value={size}>{size}</option>
        ))}
      </select>

      <button
        onClick={() => updateStyle({ bold: !style.bold })}
        className={`p-0.5 rounded hover:bg-gray-100 ${style.bold ? 'bg-gray-100' : ''}`}
        title="Bold"
      >
        <Bold className="w-3 h-3 text-gray-600" />
      </button>

      <button
        onClick={() => updateStyle({ italic: !style.italic })}
        className={`p-0.5 rounded hover:bg-gray-100 ${style.italic ? 'bg-gray-100' : ''}`}
        title="Italic"
      >
        <Italic className="w-3 h-3 text-gray-600" />
      </button>

      <button
        onClick={() => updateStyle({ underline: !style.underline })}
        className={`p-0.5 rounded hover:bg-gray-100 ${style.underline ? 'bg-gray-100' : ''}`}
        title="Underline"
      >
        <Underline className="w-3 h-3 text-gray-600" />
      </button>

      <div className="h-4 w-px bg-gray-300" />

      <button
        onClick={() => updateStyle({ textAlign: 'left' })}
        className={`p-0.5 rounded hover:bg-gray-100 ${style.textAlign === 'left' ? 'bg-gray-100' : ''}`}
        title="Align Left"
      >
        <AlignLeft className="w-3 h-3 text-gray-600" />
      </button>

      <button
        onClick={() => updateStyle({ textAlign: 'center' })}
        className={`p-0.5 rounded hover:bg-gray-100 ${style.textAlign === 'center' ? 'bg-gray-100' : ''}`}
        title="Align Center"
      >
        <AlignCenter className="w-3 h-3 text-gray-600" />
      </button>

      <button
        onClick={() => updateStyle({ textAlign: 'right' })}
        className={`p-0.5 rounded hover:bg-gray-100 ${style.textAlign === 'right' ? 'bg-gray-100' : ''}`}
        title="Align Right"
      >
        <AlignRight className="w-3 h-3 text-gray-600" />
      </button>

      <div className="h-4 w-px bg-gray-300" />

      <div className="flex items-center gap-0.5">
        <MoveHorizontal className="w-3 h-3 text-gray-600" />
        <input
          type="number"
          value={style.letterSpacing}
          onChange={(e) => updateStyle({ letterSpacing: Number(e.target.value) })}
          className="w-10 text-xs border rounded px-1 py-0.5"
          min="0"
          max="20"
          title="Letter Spacing"
        />
      </div>

      <div className="flex items-center gap-0.5">
        <TextSelect className="w-3 h-3 text-gray-600" />
        <input
          type="number"
          value={style.wordSpacing}
          onChange={(e) => updateStyle({ wordSpacing: Number(e.target.value) })}
          className="w-10 text-xs border rounded px-1 py-0.5"
          min="0"
          max="20"
          title="Word Spacing"
        />
      </div>

      <div className="flex items-center gap-0.5">
        <WrapText className="w-3 h-3 text-gray-600" />
        <input
          type="number"
          value={style.lineHeight}
          onChange={(e) => updateStyle({ lineHeight: Number(e.target.value) })}
          className="w-10 text-xs border rounded px-1 py-0.5"
          min="1"
          max="3"
          step="0.1"
          title="Line Height"
        />
      </div>
    </div>
  );
}