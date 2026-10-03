/**
 * Apology.exe Types & Configuration
 * 
 * Edit this file if you wish to adjust page metadata, IDs, or sequence order.
 */

export type PageId = 'boot' | 'incident' | 'apology' | 'shoe' | 'final';

export interface PageMeta {
  index: number;
  id: PageId;
  numberString: string; // e.g. "01 / 05"
  navLabel: string;     // e.g. "BOOT"
  title: string;
}

export const PAGES: PageMeta[] = [
  {
    index: 0,
    id: 'boot',
    numberString: '01 / 05',
    navLabel: 'BOOT',
    title: 'APOLOGY.EXE',
  },
  {
    index: 1,
    id: 'incident',
    numberString: '02 / 05',
    navLabel: 'WHAT I DID',
    title: 'Incident Report',
  },
  {
    index: 2,
    id: 'apology',
    numberString: '03 / 05',
    navLabel: 'APOLOGY',
    title: "Lithi, I'm genuinely sorry.",
  },
  {
    index: 3,
    id: 'shoe',
    numberString: '04 / 05',
    navLabel: 'SHOE.EXE',
    title: "⚠️ Tomorrow's Scheduled Incident",
  },
  {
    index: 4,
    id: 'final',
    numberString: '05 / 05',
    navLabel: 'FINAL',
    title: 'One last thing.',
  },
];
