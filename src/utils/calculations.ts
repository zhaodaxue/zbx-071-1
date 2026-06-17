import type { DailyData, FieldStats, LowestField } from '@/types';
import { WARNING_THRESHOLD, FIELDS } from '@/types';

export function getFieldAverages(dailyData: DailyData[]): FieldStats[] {
  const fieldSums: Record<string, number> = {};
  const fieldCounts: Record<string, number> = {};

  FIELDS.forEach((field) => {
    fieldSums[field] = 0;
    fieldCounts[field] = 0;
  });

  dailyData.forEach((day) => {
    day.readings.forEach((reading) => {
      fieldSums[reading.fieldName] += reading.value;
      fieldCounts[reading.fieldName] += 1;
    });
  });

  return FIELDS.map((field) => {
    const average = fieldCounts[field] > 0 ? fieldSums[field] / fieldCounts[field] : 0;
    return {
      fieldName: field,
      average: Math.round(average * 10) / 10,
      isWarning: average < WARNING_THRESHOLD,
    };
  });
}

export function getLowestFieldForDate(dailyData: DailyData[], date: string): LowestField | null {
  const dayData = dailyData.find((d) => d.date === date);
  if (!dayData || dayData.readings.length === 0) return null;

  let lowest = dayData.readings[0];
  dayData.readings.forEach((reading) => {
    if (reading.value < lowest.value) {
      lowest = reading;
    }
  });

  return {
    fieldName: lowest.fieldName,
    value: lowest.value,
    date,
  };
}

export function getDayData(dailyData: DailyData[], date: string): DailyData | undefined {
  return dailyData.find((d) => d.date === date);
}

export function formatDateDisplay(dateStr: string): string {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const weekday = weekdays[date.getDay()];
  return `${month}/${day} ${weekday}`;
}

export function isDateWarning(dailyData: DailyData): boolean {
  if (!dailyData) return false;
  return dailyData.readings.some((r) => r.value < WARNING_THRESHOLD);
}
