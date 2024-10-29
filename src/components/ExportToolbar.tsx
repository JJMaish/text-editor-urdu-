import React from 'react';
import { FileText, Image, FileDown, Menu, Music, FolderOpen } from 'lucide-react';
import { ExportFormat } from '../types/editor';
import { LyricsDialog } from './LyricsDialog';
import { OpenFileDialog } from './OpenFileDialog';

interface ExportToolbarProps {
  onExport: (format: ExportFormat, metadata?: any) => void;
  onFileOpen?: (content: string) => void;
}

export function ExportToolbar({ onExport, onFileOpen }: ExportToolbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showLyricsDialog, setShowLyricsDialog] = React.useState(false);
  const [showOpenDialog, setShowOpenDialog] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const exportButtons = [
    { format: 'open' as const, icon: FolderOpen, label: 'Open File', onClick: () => setShowOpenDialog(true) },
    { format: 'txt' as const, icon: FileText, label: 'Save Text' },
    { format: 'pdf' as const, icon: FileDown, label: 'Save PDF' },
    { format: 'image' as const, icon: Image, label: 'Save Image' },
    { format: 'lyrics' as const, icon: Music, label: 'Save Lyrics', onClick: () => setShowLyricsDialog(true) },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        <Menu className="h-4 w-4" />
        <span>File</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border py-1 z-50">
          {exportButtons.map(({ format, icon: Icon, label, onClick }) => (
            <button
              key={format}
              onClick={() => {
                if (onClick) {
                  onClick();
                } else {
                  onExport(format as ExportFormat);
                }
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}

      <LyricsDialog
        isOpen={showLyricsDialog}
        onClose={() => setShowLyricsDialog(false)}
        onSave={(metadata) => onExport('lyrics', metadata)}
      />

      <OpenFileDialog
        isOpen={showOpenDialog}
        onClose={() => setShowOpenDialog(false)}
        onFileOpen={onFileOpen}
      />
    </div>
  );
}