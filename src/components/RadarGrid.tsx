import { X, Maximize2 } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import RadarChart from './RadarChart';
import { formatDateDisplay } from '@/utils/calculations';

export default function RadarGrid() {
  const { dailyData, zoomedDate, setZoomedDate, selectedDate, setSelectedDate } = useAppStore();

  const zoomedData = zoomedDate
    ? dailyData.find((d) => d.date === zoomedDate)
    : null;

  return (
    <div className="animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Maximize2 className="w-5 h-5 text-primary-600" />
          <h2 className="text-lg font-semibold text-primary-800 font-serif">
            {zoomedDate ? '放大视图' : '7日雷达图对比'}
          </h2>
        </div>
        {zoomedDate && (
          <button
            onClick={() => setZoomedDate(null)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm hover:bg-primary-200 transition-colors"
          >
            <X className="w-4 h-4" />
            返回对比视图
          </button>
        )}
      </div>

      {zoomedData ? (
        <div className="bg-white/90 backdrop-blur-sm card-shadow rounded-xl p-6">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-primary-800 font-serif">
              {formatDateDisplay(zoomedData.date)} 含水率分布
            </h3>
            <p className="text-sm text-primary-500 mt-1">
              5块试验田表层含水率对比
            </p>
          </div>
          <div className="w-full max-w-2xl mx-auto aspect-square">
            <RadarChart data={zoomedData} size="large" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {dailyData.map((dayData, index) => (
            <div
              key={dayData.date}
              className="flex flex-col"
              style={{
                animationDelay: `${index * 80}ms`,
                animationFillMode: 'both',
              }}
            >
              <div className="text-center mb-2">
                <div
                  className={`text-sm font-medium ${
                    dayData.date === selectedDate
                      ? 'text-primary-800'
                      : 'text-primary-600'
                  }`}
                >
                  {formatDateDisplay(dayData.date)}
                </div>
              </div>
              <RadarChart
                data={dayData}
                size="small"
                onClick={() => {
                  setZoomedDate(dayData.date);
                  setSelectedDate(dayData.date);
                }}
                isSelected={dayData.date === selectedDate}
              />
            </div>
          ))}
        </div>
      )}

      {!zoomedDate && (
        <div className="mt-4 text-center text-xs text-primary-500">
          <p>点击雷达图可放大查看详情 · 当前查看日：
            <span className="font-medium text-primary-700">
              {formatDateDisplay(selectedDate)}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
