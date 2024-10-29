import React from 'react';
import { PenTool } from 'lucide-react';

export function Header() {
  return (
    <header className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <PenTool className="h-8 w-8 text-indigo-600" />
        <h1 className="text-3xl font-bold text-gray-900">Text Editor</h1>
      </div>
      <p className="text-gray-600">Create, format, and export text with ease</p>
    </header>
  );
}