import { Droplets, AlertTriangle, TrendingDown } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { formatDateDisplay } from '@/utils/calculations';
import { WARNING_THRESHOLD } from '@/types';

export default function SidebarInfo() {
  const { getLowestField, selectedDate } = useAppStore();
  const lowestField = getLowestField();

  if (!lowestField) return null;

  const isWarning = lowestField.value < WARNING_THRESHOLD;

  return (
    <div className="bg-white/90 backdrop-blur-sm card-shadow rounded-xl p-5 animate-slide-up">
      <div className="flex items-center gap-2 mb-4">
        <Droplets className="w-5 h-5 text-primary-600" />
        <h2 className="text-lg font-semibold text-primary-800 font-serif">
          当日最低含水
        </h2>
      </div>

      <div className="text-sm text-primary-500 mb-2">
        {formatDateDisplay(selectedDate)}
      </div>

      <div
        className={`
          rounded-xl p-5 text-center mb-4
          ${isWarning
            ? 'bg-gradient-to-br from-warning-50 to-warning-100 border border-warning-200'
            : 'bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200'
          }
        `}
      >
        <div
          className={`
            text-5xl font-bold mb-2 font-serif
            ${isWarning ? 'text-warning-600' : 'text-primary-700'}
          `}
        >
          {lowestField.value}%
        </div>
        <div
          className={`
            text-xl font-semibold mb-2
            ${isWarning ? 'text-warning-700' : 'text-primary-800'}
          `}
        >
          {lowestField.fieldName}田
        </div>
        {isWarning ? (
          <div className="flex items-center justify-center gap-1 text-warning-600">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">低于警戒线</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-1 text-primary-600">
            <TrendingDown className="w-4 h-4" />
            <span className="text-sm font-medium">当日最低值</span>
          </div>
        )}
      </div>

      {isWarning && (
        <div className="bg-warning-50 border border-warning-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-warning-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-warning-800">
                需重点关注
              </p>
              <p className="text-xs text-warning-600 mt-1">
                {lowestField.fieldName}田含水率已跌破{WARNING_THRESHOLD}%警戒线，建议及时采取灌溉措施。
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-primary-100">
        <div className="text-xs text-primary-500 space-y-1">
          <div className="flex justify-between">
            <span>警戒线</span>
            <span className="font-medium text-warning-600">
              {WARNING_THRESHOLD}%
            </span>
          </div>
          <div className="flex justify-between">
            <span>差值</span>
            <span
              className={`font-medium ${
                isWarning ? 'text-warning-600' : 'text-primary-600'
              }`}
            >
              {isWarning ? '-' : '+'}
              {Math.abs(lowestField.value - WARNING_THRESHOLD).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
