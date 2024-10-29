import React from 'react';
import { FileMenu } from './FileMenu';
import { EditMenu } from './EditMenu';
import { FormatToolbar } from './FormatToolbar';
import { ZoomControls } from './ZoomControls';
import { TextStyle, ExportFormat } from '../types/editor';

interface MainToolbarProps {
  style: TextStyle;
  onStyleChange: (style: TextStyle) => void;
  onExport: (format: ExportFormat) => void;
  onPrint: () => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
}

export function MainToolbar({
  style,
  onStyleChange,
  onExport,
  onPrint,
  zoom,
  onZoomChange
}: MainToolbarProps) {
  return (
    <div className="border-b bg-white sticky top-0 z-10">
      <div className="flex items-center gap-1 p-1">
        <FileMenu onExport={onExport} onPrint={onPrint} />
        <EditMenu style={style} onStyleChange={onStyleChange} />
        <div className="h-4 w-px bg-gray-300" />
        <FormatToolbar style={style} onStyleChange={onStyleChange} />
        <div className="h-4 w-px bg-gray-300" />
        <ZoomControls zoom={zoom} onZoomChange={onZoomChange} />
      </div>
    </div>
  );
}