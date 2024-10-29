import React from 'react';
import { Menu } from '@headlessui/react';
import { FileText, Printer } from 'lucide-react';
import { ExportFormat } from '../types/editor';

interface FileMenuProps {
  onExport: (format: ExportFormat) => void;
  onPrint: () => void;
}

export function FileMenu({ onExport, onPrint }: FileMenuProps) {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
        <FileText className="w-4 h-4 mr-2" />
        File
      </Menu.Button>
      <Menu.Items className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
        <div className="py-1">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => onExport('txt')}
                className={`${
                  active ? 'bg-gray-100' : ''
                } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
              >
                <FileText className="w-4 h-4 mr-2" />
                Save as TXT
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={onPrint}
                className={`${
                  active ? 'bg-gray-100' : ''
                } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
              >
                <Printer className="w-4 h-4 mr-2" />
                Print
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
}