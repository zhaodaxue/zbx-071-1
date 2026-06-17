import { create } from 'zustand';
import { moistureData } from '@/data/moistureData';
import type { DailyData, FieldStats, LowestField } from '@/types';
import { DATES } from '@/types';
import { getFieldAverages, getLowestFieldForDate, getDayData } from '@/utils/calculations';

interface AppStore {
  selectedDate: string;
  zoomedDate: string | null;
  dailyData: DailyData[];
  setSelectedDate: (date: string) => void;
  setZoomedDate: (date: string | null) => void;
  getSelectedDayData: () => DailyData | undefined;
  getFieldAverages: () => FieldStats[];
  getLowestField: () => LowestField | null;
}

export const useAppStore = create<AppStore>((set, get) => ({
  selectedDate: DATES[DATES.length - 1],
  zoomedDate: null,
  dailyData: moistureData,

  setSelectedDate: (date: string) => set({ selectedDate: date }),

  setZoomedDate: (date: string | null) => set({ zoomedDate: date }),

  getSelectedDayData: () => {
    const { selectedDate, dailyData } = get();
    return getDayData(dailyData, selectedDate);
  },

  getFieldAverages: () => {
    const { dailyData } = get();
    return getFieldAverages(dailyData);
  },

  getLowestField: () => {
    const { selectedDate, dailyData } = get();
    return getLowestFieldForDate(dailyData, selectedDate);
  },
}));
