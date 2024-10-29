import { PageSize, PageDimensions } from '../types/editor';

export const PAGE_SIZES: Record<PageSize, PageDimensions | null> = {
  A3: { width: 842, height: 1191 },
  A4: { width: 595.28, height: 841.89 },
  A5: { width: 420, height: 595 },
  B4: { width: 729, height: 1032 },
  B5: { width: 516, height: 729 },
  Letter: { width: 612, height: 792 },
  Legal: { width: 612, height: 1008 },
  Executive: { width: 522, height: 756 },
  Custom: null
};