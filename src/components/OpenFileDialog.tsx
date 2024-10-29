import React, { useRef } from 'react';
import { FolderOpen, X, AlertCircle } from 'lucide-react';

interface OpenFileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onFileOpen?: (content: string) => void;
}

export function OpenFileDialog({ isOpen, onClose, onFileOpen }: OpenFileDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = React.useState<string>('');

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Check file type
      const validTypes = [
        'text/plain',
        'text/rtf',
        'application/rtf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/x-iwork-pages-sffpages',
        '.txt',
        '.rtf',
        '.doc',
        '.docx'
      ];

      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      const isValidType = validTypes.some(type => 
        file.type === type || `.${fileExtension}` === type
      );

      if (!isValidType) {
        setError('Unsupported file format. Please use TXT, RTF, DOC, or DOCX files.');
        return;
      }

      const reader = new FileReader();
      
      reader.onload = async (event) => {
        const content = event.target?.result as string;
        
        try {
          // Try to detect and handle UTF-8 BOM
          let cleanContent = content;
          if (content.charCodeAt(0) === 0xFEFF) {
            cleanContent = content.slice(1);
          }
          
          if (onFileOpen) {
            onFileOpen(cleanContent);
            onClose();
          }
        } catch (err) {
          setError('Error processing file. Please ensure it contains valid text.');
        }
      };

      reader.onerror = () => {
        setError('Error reading file. Please try again.');
      };

      reader.readAsText(file, 'UTF-8');
    } catch (err) {
      setError('Error opening file. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-900">Open File</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md flex items-start gap-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
              <FolderOpen className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Supported formats: TXT, RTF, DOC, DOCX
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Choose File
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.rtf,.doc,.docx,text/plain,application/rtf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <div className="text-xs text-gray-500">
              <p>• Files will be opened with UTF-8 encoding</p>
              <p>• Maximum file size: 10MB</p>
              <p>• Text formatting may vary depending on file type</p>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}