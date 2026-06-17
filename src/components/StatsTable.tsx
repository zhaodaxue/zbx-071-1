import { BarChart3, AlertTriangle } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { WARNING_THRESHOLD } from '@/types';

export default function StatsTable() {
  const { getFieldAverages } = useAppStore();
  const averages = getFieldAverages();

  const warningCount = averages.filter((a) => a.isWarning).length;

  return (
    <div className="bg-white/90 backdrop-blur-sm card-shadow rounded-xl p-5 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary-600" />
          <h2 className="text-lg font-semibold text-primary-800 font-serif">
            7日均值统计
          </h2>
        </div>
        {warningCount > 0 && (
          <div className="flex items-center gap-1 text-warning-600 text-sm bg-warning-50 px-2 py-1 rounded-full">
            <AlertTriangle className="w-4 h-4" />
            <span>{warningCount}块田低于警戒线</span>
          </div>
        )}
      </div>

      <div className="overflow-hidden rounded-lg border border-primary-100">
        <table className="w-full">
          <thead>
            <tr className="bg-primary-800 text-white">
              <th className="px-4 py-3 text-left text-sm font-medium">田块</th>
              <th className="px-4 py-3 text-right text-sm font-medium">
                7日均值 (%)
              </th>
              <th className="px-4 py-3 text-center text-sm font-medium">
                状态
              </th>
            </tr>
          </thead>
          <tbody>
            {averages.map((stat, index) => (
              <tr
                key={stat.fieldName}
                className={`
                  transition-colors duration-200
                  ${index % 2 === 0 ? 'bg-white' : 'bg-primary-50/50'}
                  ${stat.isWarning ? 'bg-warning-50 hover:bg-warning-100' : 'hover:bg-primary-50'}
                `}
              >
                <td className="px-4 py-3">
                  <span
                    className={`font-medium ${
                      stat.isWarning ? 'text-warning-700' : 'text-primary-800'
                    }`}
                  >
                    {stat.fieldName}田
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span
                    className={`
                      font-bold text-lg tabular-nums
                      ${stat.isWarning ? 'text-warning-500' : 'text-primary-700'}
                    `}
                  >
                    {stat.average.toFixed(1)}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  {stat.isWarning ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-warning-100 text-warning-700 text-xs font-medium">
                      <AlertTriangle className="w-3 h-3" />
                      低于{WARNING_THRESHOLD}%
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-medium">
                      正常
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 pt-4 border-t border-primary-100">
        <div className="text-xs text-primary-600">
          <p>
            <span className="font-medium">警戒线：</span>
            含水率低于 {WARNING_THRESHOLD}% 时需重点关注
          </p>
          <p className="mt-1">
            <span className="font-medium">数据范围：</span>
            2026-06-11 至 2026-06-17
          </p>
        </div>
      </div>
    </div>
  );
}
