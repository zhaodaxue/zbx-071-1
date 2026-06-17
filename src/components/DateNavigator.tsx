import { Calendar } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { DATES } from '@/types';
import { formatDateDisplay, isDateWarning } from '@/utils/calculations';

export default function DateNavigator() {
  const { selectedDate, setSelectedDate, dailyData } = useAppStore();

  return (
    <div className="bg-white/80 backdrop-blur-sm card-shadow rounded-xl p-4 mb-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="w-5 h-5 text-primary-600" />
        <h2 className="text-lg font-semibold text-primary-800 font-serif">
          选择查看日期
        </h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {DATES.map((date, index) => {
          const dayData = dailyData.find((d) => d.date === date);
          const hasWarning = dayData ? isDateWarning(dayData, date) : false;
          const isSelected = selectedDate === date;
          const isLatest = index === DATES.length - 1;

          return (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`
                relative px-4 py-2 rounded-full text-sm font-medium
                transition-all duration-300 min-w-[100px]
                ${isSelected
                  ? 'bg-primary-800 text-white shadow-lg scale-105'
                  : hasWarning
                  ? 'bg-warning-50 text-warning-700 border border-warning-300 hover:bg-warning-100 hover:scale-102'
                  : 'bg-primary-50 text-primary-700 border border-primary-200 hover:bg-primary-100 hover:scale-102'
                }
              `}
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: 'both',
              }}
            >
              <div className="flex items-center justify-center gap-1">
                <span>{formatDateDisplay(date)}</span>
                {isLatest && (
                  <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-full">
                    最新
                  </span>
                )}
              </div>
              {hasWarning && !isSelected && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-warning-500 rounded-full animate-pulse-soft" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
