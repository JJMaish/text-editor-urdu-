export type ExportFormat = 'txt' | 'pdf' | 'docx' | 'lyrics';

export type PageSize = 'A3' | 'A4' | 'A5' | 'B4' | 'B5' | 'Letter' | 'Legal' | 'Executive' | 'Custom';

export interface PageDimensions {
  width: number;
  height: number;
}

export interface TextStyle {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  wordSpacing: number;
  color: string;
  backgroundColor: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  textAlign: 'left' | 'center' | 'right';
  pageSize: PageSize;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
  firstLineIndent: number;
  indentLeft: number;
  indentRight: number;
  pageNumbers: boolean;
  pageNumberPosition: 'left' | 'center' | 'right';
  showRuler: boolean;
  customPageSize: { width: number; height: number };
  tabSize: number;
}

export interface LyricsMetadata {
  title: string;
  singer: string;
  raag?: string;
  taal?: string;
  beat?: string;
}