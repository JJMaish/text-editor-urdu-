import React from 'react';
import { X, Layout } from 'lucide-react';
import { TextStyle } from '../types/editor';
import { PAGE_SIZES } from '../constants';

interface PageFormatDialogProps {
  isOpen: boolean;
  onClose: () => void;
  style: TextStyle;
  onStyleChange: (style: TextStyle) => void;
}

export function PageFormatDialog({ isOpen, onClose, style, onStyleChange }: PageFormatDialogProps) {
  const [localStyle, setLocalStyle] = React.useState(style);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStyleChange(localStyle);
    onClose();
  };

  const updateStyle = (updates: Partial<TextStyle>) => {
    setLocalStyle({ ...localStyle, ...updates });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-3 border-b sticky top-0 bg-white">
          <div className="flex items-center gap-2">
            <Layout className="h-4 w-4 text-indigo-600" />
            <h2 className="text-base font-semibold text-gray-900">Page Format</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-3 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Page Size
            </label>
            <select
              value={localStyle.pageSize}
              onChange={(e) => updateStyle({ pageSize: e.target.value as any })}
              className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
            >
              {Object.keys(PAGE_SIZES).map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          {localStyle.pageSize === 'Custom' && (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Width (cm)</label>
                <input
                  type="number"
                  value={localStyle.customPageSize?.width || 21}
                  onChange={(e) => updateStyle({
                    customPageSize: {
                      ...localStyle.customPageSize,
                      width: Number(e.target.value)
                    }
                  })}
                  className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                  min="10"
                  max="100"
                  step="0.1"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={localStyle.customPageSize?.height || 29.7}
                  onChange={(e) => updateStyle({
                    customPageSize: {
                      ...localStyle.customPageSize,
                      height: Number(e.target.value)
                    }
                  })}
                  className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                  min="10"
                  max="100"
                  step="0.1"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Left Margin</label>
              <input
                type="number"
                value={localStyle.marginLeft}
                onChange={(e) => updateStyle({ marginLeft: Number(e.target.value) })}
                className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                min="0"
                max="100"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Right Margin</label>
              <input
                type="number"
                value={localStyle.marginRight}
                onChange={(e) => updateStyle({ marginRight: Number(e.target.value) })}
                className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                min="0"
                max="100"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Top Margin</label>
              <input
                type="number"
                value={localStyle.marginTop}
                onChange={(e) => updateStyle({ marginTop: Number(e.target.value) })}
                className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                min="0"
                max="100"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Bottom Margin</label>
              <input
                type="number"
                value={localStyle.marginBottom}
                onChange={(e) => updateStyle({ marginBottom: Number(e.target.value) })}
                className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                min="0"
                max="100"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Page Numbers</label>
              <input
                type="checkbox"
                checked={localStyle.pageNumbers}
                onChange={(e) => updateStyle({ pageNumbers: e.target.checked })}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
            </div>

            {localStyle.pageNumbers && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Position</label>
                <select
                  value={localStyle.pageNumberPosition}
                  onChange={(e) => updateStyle({ pageNumberPosition: e.target.value as any })}
                  className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>
            )}

            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Show Ruler</label>
              <input
                type="checkbox"
                checked={localStyle.showRuler}
                onChange={(e) => updateStyle({ showRuler: e.target.checked })}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}