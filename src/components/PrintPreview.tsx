import React, { useState } from 'react';
import { TextStyle } from '../types/editor';
import { Printer, X, ZoomIn, ZoomOut } from 'lucide-react';

interface PrintPreviewProps {
  text: string;
  style: TextStyle;
  onClose: () => void;
}

export function PrintPreview({ text, style, onClose }: PrintPreviewProps) {
  const [previewZoom, setPreviewZoom] = useState(100);

  const handlePrint = () => {
    window.print();
  };

  const handleZoomIn = () => {
    if (previewZoom < 200) {
      setPreviewZoom(Math.min(200, previewZoom + 25));
    }
  };

  const handleZoomOut = () => {
    if (previewZoom > 25) {
      setPreviewZoom(Math.max(25, previewZoom - 25));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Printer className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Print Preview</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 mr-4">
              <button
                onClick={handleZoomOut}
                className="p-1.5 rounded hover:bg-gray-100"
                title="Zoom Out"
                disabled={previewZoom <= 25}
              >
                <ZoomOut size={16} className={previewZoom <= 25 ? 'text-gray-400' : 'text-gray-600'} />
              </button>
              <span className="text-sm text-gray-600 w-16 text-center">{previewZoom}%</span>
              <button
                onClick={handleZoomIn}
                className="p-1.5 rounded hover:bg-gray-100"
                title="Zoom In"
                disabled={previewZoom >= 200}
              >
                <ZoomIn size={16} className={previewZoom >= 200 ? 'text-gray-400' : 'text-gray-600'} />
              </button>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto p-8 bg-gray-100">
          <div
            className="mx-auto bg-white shadow-lg p-8 min-h-[29.7cm] w-[21cm] origin-top transition-transform duration-200"
            style={{
              fontFamily: style.fontFamily,
              fontSize: `${style.fontSize}px`,
              fontWeight: style.bold ? 'bold' : 'normal',
              fontStyle: style.italic ? 'italic' : 'normal',
              textDecoration: style.underline ? 'underline' : 'none',
              color: style.color,
              backgroundColor: style.backgroundColor,
              lineHeight: style.lineHeight,
              letterSpacing: `${style.letterSpacing}px`,
              wordSpacing: `${style.wordSpacing}px`,
              textAlign: style.textAlign,
              direction: 'rtl',
              whiteSpace: 'pre-wrap',
              transform: `scale(${previewZoom / 100})`,
              transformOrigin: 'top center',
              margin: '0 auto',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
            }}
          >
            {text}
          </div>
        </div>
        
        <div className="p-4 border-t flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 flex items-center gap-2"
          >
            <Printer className="h-4 w-4" />
            Print
          </button>
        </div>
      </div>
    </div>
  );
}