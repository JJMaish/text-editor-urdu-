import React from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';

interface ZoomControlsProps {
  zoom: number;
  onZoomChange: (zoom: number) => void;
}

export function ZoomControls({ zoom, onZoomChange }: ZoomControlsProps) {
  const handleZoomIn = () => {
    if (zoom < 200) {
      onZoomChange(Math.min(200, zoom + 10));
    }
  };

  const handleZoomOut = () => {
    if (zoom > 50) {
      onZoomChange(Math.max(50, zoom - 10));
    }
  };

  const handleZoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onZoomChange(Number(e.target.value));
  };

  const zoomLevels = [50, 75, 100, 125, 150, 175, 200];
  const closestZoom = zoomLevels.reduce((prev, curr) => {
    return Math.abs(curr - zoom) < Math.abs(prev - zoom) ? curr : prev;
  });

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={handleZoomOut}
        className="p-1.5 rounded hover:bg-gray-100"
        title="Zoom Out"
        disabled={zoom <= 50}
      >
        <ZoomOut size={16} className={zoom <= 50 ? 'text-gray-400' : 'text-gray-600'} />
      </button>

      <select
        value={closestZoom}
        onChange={handleZoomChange}
        className="px-2 py-1 text-sm border rounded bg-white w-20"
      >
        {zoomLevels.map(level => (
          <option key={level} value={level}>{level}%</option>
        ))}
      </select>

      <button
        onClick={handleZoomIn}
        className="p-1.5 rounded hover:bg-gray-100"
        title="Zoom In"
        disabled={zoom >= 200}
      >
        <ZoomIn size={16} className={zoom >= 200 ? 'text-gray-400' : 'text-gray-600'} />
      </button>
    </div>
  );
}