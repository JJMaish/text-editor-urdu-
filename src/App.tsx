import React, { useState } from 'react';
import { MainToolbar } from './components/MainToolbar';
import { TextArea } from './components/TextArea';
import { SaveDialog } from './components/SaveDialog';
import { TextStyle, ExportFormat } from './types/editor';
import { exportText } from './utils/export';

function App() {
  const [text, setText] = useState('');
  const [zoom, setZoom] = useState(100);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [exportFormat, setExportFormat] = useState<ExportFormat>('txt');
  const [style, setStyle] = useState<TextStyle>({
    fontFamily: 'Jameel Noori Nastaleeq',
    fontSize: 16,
    lineHeight: 1.5,
    letterSpacing: 0,
    wordSpacing: 1,
    color: '#000000',
    backgroundColor: '#ffffff',
    bold: false,
    italic: false,
    underline: false,
    textAlign: 'right',
    pageSize: 'A4',
    marginTop: 72,
    marginRight: 72,
    marginBottom: 72,
    marginLeft: 72,
    firstLineIndent: 0,
    indentLeft: 0,
    indentRight: 0,
    pageNumbers: false,
    pageNumberPosition: 'center',
    showRuler: false,
    customPageSize: { width: 21, height: 29.7 },
    tabSize: 4
  });

  const handleExport = async (format: ExportFormat) => {
    setExportFormat(format);
    setShowSaveDialog(true);
  };

  const handleSave = async (fileName: string) => {
    try {
      await exportText(text, exportFormat, style, fileName);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4">
        <MainToolbar
          style={style}
          onStyleChange={setStyle}
          onExport={handleExport}
          onPrint={handlePrint}
          zoom={zoom}
          onZoomChange={setZoom}
        />
        <main className="py-4">
          <TextArea
            text={text}
            onChange={setText}
            style={style}
            zoom={zoom}
          />
        </main>
      </div>

      <SaveDialog
        isOpen={showSaveDialog}
        onClose={() => setShowSaveDialog(false)}
        onSave={handleSave}
        format={exportFormat}
      />
    </div>
  );
}

export default App;