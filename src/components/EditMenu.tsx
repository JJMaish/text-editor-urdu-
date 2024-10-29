import React from 'react';
import { Menu } from '@headlessui/react';
import { 
  Copy, 
  Scissors, 
  ClipboardPaste, 
  MousePointer2, 
  Type, 
  MoveHorizontal, 
  TextSelect,
  WrapText,
  Palette,
} from 'lucide-react';
import { TextStyle } from '../types/editor';
import { ColorPicker } from './ColorPicker';

interface EditMenuProps {
  style: TextStyle;
  onStyleChange: (style: TextStyle) => void;
}

export function EditMenu({ style, onStyleChange }: EditMenuProps) {
  const handleCopy = () => {
    const selection = window.getSelection();
    if (selection) {
      navigator.clipboard.writeText(selection.toString());
    }
  };

  const handleCut = () => {
    const selection = window.getSelection();
    if (selection) {
      navigator.clipboard.writeText(selection.toString());
      const range = selection.getRangeAt(0);
      range.deleteContents();
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const selection = window.getSelection();
      if (selection) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(text));
      }
    } catch (err) {
      console.error('Failed to paste:', err);
    }
  };

  const handleSelectAll = () => {
    const textArea = document.querySelector('textarea');
    if (textArea) {
      textArea.select();
    }
  };

  const updateStyle = (updates: Partial<TextStyle>) => {
    onStyleChange({ ...style, ...updates });
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
        Edit
      </Menu.Button>
      <Menu.Items className="absolute left-0 mt-1 w-72 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
        <div className="py-1">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handleCopy}
                className={`${
                  active ? 'bg-gray-100' : ''
                } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handleCut}
                className={`${
                  active ? 'bg-gray-100' : ''
                } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
              >
                <Scissors className="w-4 h-4 mr-2" />
                Cut
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handlePaste}
                className={`${
                  active ? 'bg-gray-100' : ''
                } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
              >
                <ClipboardPaste className="w-4 h-4 mr-2" />
                Paste
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handleSelectAll}
                className={`${
                  active ? 'bg-gray-100' : ''
                } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
              >
                <MousePointer2 className="w-4 h-4 mr-2" />
                Select All
              </button>
            )}
          </Menu.Item>
          
          <div className="border-t my-1" />
          
          <div className="px-4 py-2">
            <div className="flex items-center gap-2 mb-2">
              <ColorPicker
                color={style.color}
                onChange={(color) => updateStyle({ color })}
                title="Text Color"
              />
              <ColorPicker
                color={style.backgroundColor}
                onChange={(color) => updateStyle({ backgroundColor: color })}
                title="Background"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <MoveHorizontal className="w-4 h-4 text-gray-600" />
                <input
                  type="number"
                  value={style.letterSpacing}
                  onChange={(e) => updateStyle({ letterSpacing: Number(e.target.value) })}
                  className="w-12 text-sm border rounded px-1 py-0.5"
                  min="0"
                  max="20"
                  title="Letter Spacing"
                />
              </div>

              <div className="flex items-center gap-1">
                <TextSelect className="w-4 h-4 text-gray-600" />
                <input
                  type="number"
                  value={style.wordSpacing}
                  onChange={(e) => updateStyle({ wordSpacing: Number(e.target.value) })}
                  className="w-12 text-sm border rounded px-1 py-0.5"
                  min="0"
                  max="20"
                  title="Word Spacing"
                />
              </div>

              <div className="flex items-center gap-1">
                <WrapText className="w-4 h-4 text-gray-600" />
                <input
                  type="number"
                  value={style.lineHeight}
                  onChange={(e) => updateStyle({ lineHeight: Number(e.target.value) })}
                  className="w-12 text-sm border rounded px-1 py-0.5"
                  min="1"
                  max="3"
                  step="0.1"
                  title="Line Height"
                />
              </div>
            </div>
          </div>
        </div>
      </Menu.Items>
    </Menu>
  );
}