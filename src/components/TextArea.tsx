import React, { useRef } from 'react';
import { PAGE_SIZES } from '../constants';
import { TextStyle } from '../types/editor';

interface TextAreaProps {
  text: string;
  onChange: (text: string) => void;
  style: TextStyle;
  zoom: number;
}

export function TextArea({ text, onChange, style, zoom }: TextAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const pageSize = style.pageSize === 'Custom' && style.customPageSize
    ? { 
        width: style.customPageSize.width * 28.35,
        height: style.customPageSize.height * 28.35 
      }
    : PAGE_SIZES[style.pageSize];

  if (!pageSize) return null;

  const scaledWidth = pageSize.width * (zoom / 100);
  const scaledHeight = pageSize.height * (zoom / 100);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const spaces = ' '.repeat(style.tabSize || 4);
      const newText = text.substring(0, start) + spaces + text.substring(end);
      onChange(newText);
      
      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + spaces.length;
        }
      });
    }
  };

  return (
    <div className="h-full overflow-auto px-4 py-8 bg-gray-100 custom-scrollbar">
      <div className="flex flex-col items-center gap-8">
        <div
          className="relative bg-white shadow-lg transition-shadow hover:shadow-xl"
          style={{
            width: `${scaledWidth}px`,
            height: `${scaledHeight}px`,
            pageBreakAfter: 'always'
          }}
        >
          <div className="absolute inset-0">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
              className="absolute inset-0 w-full h-full resize-none outline-none border-none p-0"
              style={{
                fontFamily: style.fontFamily,
                fontSize: `${style.fontSize * (zoom / 100)}px`,
                lineHeight: style.lineHeight,
                letterSpacing: `${style.letterSpacing}px`,
                wordSpacing: `${style.wordSpacing}px`,
                textAlign: style.textAlign,
                direction: 'rtl',
                padding: `${style.marginTop}px ${style.marginRight}px ${style.marginBottom}px ${style.marginLeft}px`,
                color: style.color,
                backgroundColor: style.backgroundColor,
                fontWeight: style.bold ? 'bold' : 'normal',
                fontStyle: style.italic ? 'italic' : 'normal',
                textDecoration: style.underline ? 'underline' : 'none',
              }}
              dir="rtl"
              lang="ur"
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
            />
          </div>
        </div>
      </div>
    </div>
  );
}