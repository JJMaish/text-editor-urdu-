import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { TextStyle, ExportFormat, LyricsMetadata } from '../types/editor';

export async function exportText(
  text: string,
  format: ExportFormat,
  style: TextStyle,
  fileName: string,
  metadata?: LyricsMetadata
) {
  try {
    switch (format) {
      case 'pdf':
        return await exportPdf(text, style, fileName, metadata);
      case 'docx':
        return await exportDocx(text, style, fileName, metadata);
      case 'txt':
        return exportTxt(text, fileName, metadata);
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
  } catch (error) {
    console.error('Export failed:', error);
    throw error;
  }
}

function exportTxt(text: string, fileName: string, metadata?: LyricsMetadata) {
  let content = '';
  
  if (metadata) {
    content += `Title: ${metadata.title}\n`;
    content += `Singer: ${metadata.singer}\n`;
    if (metadata.raag) content += `Raag: ${metadata.raag}\n`;
    if (metadata.taal) content += `Taal: ${metadata.taal}\n`;
    if (metadata.beat) content += `Beat: ${metadata.beat}\n`;
    content += '\n';
  }
  
  content += text;
  
  const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), content], { 
    type: 'text/plain;charset=utf-8' 
  });
  saveAs(blob, `${fileName}.txt`);
}

async function exportPdf(
  text: string, 
  style: TextStyle, 
  fileName: string, 
  metadata?: LyricsMetadata
) {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: style.pageSize.toLowerCase(),
      putOnlyUsedFonts: true,
      compress: true,
      hotfixes: ['px_scaling'],
      floatPrecision: 16
    });

    // Use Arial for better Unicode support
    doc.setFont('arial', 'normal');
    doc.setR2L(true);

    // Set basic styles
    doc.setFontSize(style.fontSize);
    doc.setTextColor(style.color);

    // Calculate page dimensions
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const textWidth = pageWidth - style.marginLeft - style.marginRight;
    let yPosition = style.marginTop;

    // Add metadata if present
    if (metadata) {
      const metadataStyle = { ...style, fontSize: 12 };
      doc.setFontSize(metadataStyle.fontSize);
      
      const metadataEntries = [
        `Title: ${metadata.title}`,
        `Singer: ${metadata.singer}`,
        metadata.raag && `Raag: ${metadata.raag}`,
        metadata.taal && `Taal: ${metadata.taal}`,
        metadata.beat && `Beat: ${metadata.beat}`
      ].filter(Boolean);

      for (const entry of metadataEntries) {
        doc.text(entry, pageWidth - style.marginRight, yPosition, {
          align: 'right'
        });
        yPosition += metadataStyle.fontSize * 1.5;
      }
      
      yPosition += style.fontSize;
      doc.setFontSize(style.fontSize);
    }

    // Process text content
    const lines = text.split('\n');
    const lineHeight = style.fontSize * style.lineHeight;

    for (const line of lines) {
      if (yPosition > pageHeight - style.marginBottom) {
        doc.addPage();
        yPosition = style.marginTop;
      }

      // Split long lines
      const wrappedText = doc.splitTextToSize(line, textWidth);
      
      for (const textLine of wrappedText) {
        doc.text(textLine, pageWidth - style.marginRight, yPosition, {
          align: 'right',
          renderingMode: 'fill'
        });
        yPosition += lineHeight;

        if (yPosition > pageHeight - style.marginBottom) {
          doc.addPage();
          yPosition = style.marginTop;
        }
      }
    }

    doc.save(`${fileName}.pdf`);
  } catch (error) {
    console.error('PDF export failed:', error);
    throw error;
  }
}

async function exportDocx(
  text: string,
  style: TextStyle,
  fileName: string,
  metadata?: LyricsMetadata
) {
  try {
    const doc = new Document({
      sections: [{
        properties: {
          page: {
            size: {
              width: style.pageSize === 'Custom' ? 
                style.customPageSize.width * 28.35 : 
                undefined,
              height: style.pageSize === 'Custom' ? 
                style.customPageSize.height * 28.35 : 
                undefined,
            },
            margin: {
              top: style.marginTop,
              right: style.marginRight,
              bottom: style.marginBottom,
              left: style.marginLeft,
            },
          },
        },
        children: [
          ...(metadata ? [
            new Paragraph({
              children: [
                new TextRun({ text: `Title: ${metadata.title}`, size: 24 }),
                new TextRun({ text: `\nSinger: ${metadata.singer}`, size: 24 }),
                ...(metadata.raag ? [new TextRun({ text: `\nRaag: ${metadata.raag}`, size: 24 })] : []),
                ...(metadata.taal ? [new TextRun({ text: `\nTaal: ${metadata.taal}`, size: 24 })] : []),
                ...(metadata.beat ? [new TextRun({ text: `\nBeat: ${metadata.beat}`, size: 24 })] : []),
                new TextRun({ text: '\n\n', size: 24 }),
              ],
              spacing: { line: 360 },
              bidirectional: true,
            }),
          ] : []),
          new Paragraph({
            children: [
              new TextRun({
                text,
                size: style.fontSize * 2,
                bold: style.bold,
                italic: style.italic,
                underline: style.underline ? {} : undefined,
              }),
            ],
            spacing: { line: style.lineHeight * 240 },
            alignment: style.textAlign,
            bidirectional: true,
          }),
        ],
      }],
    });

    const buffer = await Packer.toBuffer(doc);
    const blob = new Blob([buffer], { 
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
    });
    saveAs(blob, `${fileName}.docx`);
  } catch (error) {
    console.error('DOCX export failed:', error);
    throw error;
  }
}