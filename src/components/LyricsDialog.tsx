import React from 'react';
import { Music, X } from 'lucide-react';
import { LyricsMetadata } from '../types/editor';

interface LyricsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (metadata: LyricsMetadata) => void;
}

export function LyricsDialog({ isOpen, onClose, onSave }: LyricsDialogProps) {
  const [metadata, setMetadata] = React.useState<LyricsMetadata>({
    title: '',
    singer: '',
    raag: '',
    taal: '',
    beat: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(metadata);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Music className="h-5 w-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-900">Save as Lyrics</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Song Title
            </label>
            <input
              type="text"
              value={metadata.title}
              onChange={(e) => setMetadata({ ...metadata, title: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Original Singer
            </label>
            <input
              type="text"
              value={metadata.singer}
              onChange={(e) => setMetadata({ ...metadata, singer: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Raag
            </label>
            <input
              type="text"
              value={metadata.raag}
              onChange={(e) => setMetadata({ ...metadata, raag: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Taal
            </label>
            <input
              type="text"
              value={metadata.taal}
              onChange={(e) => setMetadata({ ...metadata, taal: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Beat
            </label>
            <input
              type="text"
              value={metadata.beat}
              onChange={(e) => setMetadata({ ...metadata, beat: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
            >
              Save Lyrics
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}