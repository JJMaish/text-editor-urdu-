import React from 'react';

interface StatsProps {
  text: string;
}

export function Stats({ text }: StatsProps) {
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const charCount = text.length;

  return (
    <div className="flex gap-4 text-sm text-gray-600">
      <div>Words: {wordCount}</div>
      <div>Characters: {charCount}</div>
    </div>
  );
}