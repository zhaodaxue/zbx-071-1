export interface FieldReading {
  fieldName: string;
  value: number;
}

export interface DailyData {
  date: string;
  readings: FieldReading[];
}

export interface FieldStats {
  fieldName: string;
  average: number;
  isWarning: boolean;
}

export interface LowestField {
  fieldName: string;
  value: number;
  date: string;
}

export const WARNING_THRESHOLD = 18;
export const FIELDS = ['甲', '乙', '丙', '丁', '戊'] as const;
export const DATES = [
  '2026-06-11',
  '2026-06-12',
  '2026-06-13',
  '2026-06-14',
  '2026-06-15',
  '2026-06-16',
  '2026-06-17',
] as const;
