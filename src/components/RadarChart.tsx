import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import type { DailyData } from '@/types';
import { FIELDS, WARNING_THRESHOLD } from '@/types';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface RadarChartProps {
  data: DailyData;
  size?: 'small' | 'large';
  onClick?: () => void;
  isSelected?: boolean;
}

export default function RadarChart({
  data,
  size = 'small',
  onClick,
  isSelected = false,
}: RadarChartProps) {
  const chartRef = useRef<ChartJS<'radar'>>(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update();
    }
  }, [data]);

  const hasWarning = data.readings.some((r) => r.value < WARNING_THRESHOLD);

  const values = FIELDS.map((field) => {
    const reading = data.readings.find((r) => r.fieldName === field);
    return reading ? reading.value : 0;
  });

  const chartData = {
    labels: FIELDS.map((f) => `${f}田`),
    datasets: [
      {
        label: '含水率 %',
        data: values,
        backgroundColor: hasWarning
          ? 'rgba(227, 100, 20, 0.25)'
          : 'rgba(95, 168, 211, 0.25)',
        borderColor: hasWarning
          ? 'rgba(227, 100, 20, 0.85)'
          : 'rgba(95, 168, 211, 0.85)',
        borderWidth: size === 'large' ? 2.5 : 1.5,
        pointBackgroundColor: values.map((v) =>
          v < WARNING_THRESHOLD
            ? 'rgba(227, 100, 20, 1)'
            : 'rgba(15, 76, 92, 0.9)'
        ),
        pointBorderColor: '#ffffff',
        pointBorderWidth: size === 'large' ? 2 : 1,
        pointRadius: size === 'large' ? 5 : 3,
        pointHoverRadius: size === 'large' ? 7 : 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    animation: {
      duration: 800,
      easing: 'easeOutQuart' as const,
    },
    plugins: {
      legend: {
        display: size === 'large',
        position: 'bottom' as const,
        labels: {
          font: {
            family: "'Noto Sans SC', sans-serif",
            size: 12,
          },
          color: '#0F4C5C',
        },
      },
      tooltip: {
        enabled: size === 'large',
        backgroundColor: 'rgba(15, 76, 92, 0.95)',
        titleFont: {
          family: "'Noto Sans SC', sans-serif",
          size: 13,
        },
        bodyFont: {
          family: "'Noto Sans SC', sans-serif",
          size: 12,
        },
        padding: 10,
        cornerRadius: 6,
        callbacks: {
          label: function (context: { raw: unknown }) {
            const value = context.raw as number;
            const warning = value < WARNING_THRESHOLD;
            return `含水率: ${value}% ${warning ? '⚠️ 低于警戒线' : ''}`;
          },
        },
      },
    },
    scales: {
      r: {
        min: 0,
        max: 30,
        ticks: {
          stepSize: 5,
          font: {
            size: size === 'large' ? 10 : 8,
          },
          color: '#5a7a85',
          backdropColor: 'transparent',
        },
        grid: {
          color: 'rgba(15, 76, 92, 0.15)',
        },
        angleLines: {
          color: 'rgba(15, 76, 92, 0.15)',
        },
        pointLabels: {
          font: {
            family: "'Noto Sans SC', sans-serif",
            size: size === 'large' ? 14 : 10,
            weight: size === 'large' ? 500 : 400,
          },
          color: '#0F4C5C',
        },
      },
    },
    onClick,
  };

  if (size === 'large') {
    return (
      <div className="w-full h-full flex flex-col">
        <div className="flex-1 min-h-0">
          <Radar ref={chartRef} data={chartData} options={options} />
        </div>
        <div className="mt-4 grid grid-cols-5 gap-2 text-center">
          {FIELDS.map((field, idx) => {
            const value = values[idx];
            const isLow = value < WARNING_THRESHOLD;
            return (
              <div
                key={field}
                className={`p-2 rounded-lg ${
                  isLow
                    ? 'bg-warning-50 border border-warning-200'
                    : 'bg-primary-50 border border-primary-100'
                }`}
              >
                <div
                  className={`text-sm font-medium ${
                    isLow ? 'text-warning-600' : 'text-primary-700'
                  }`}
                >
                  {field}田
                </div>
                <div
                  className={`text-xl font-bold mt-1 ${
                    isLow ? 'text-warning-500' : 'text-primary-800'
                  }`}
                >
                  {value}%
                </div>
                {isLow && (
                  <div className="text-xs text-warning-500 mt-1">
                    低于警戒线
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative p-3 rounded-lg bg-white border-2 transition-all duration-300 cursor-pointer card-shadow hover:card-shadow-hover hover:-translate-y-1 ${
        isSelected
          ? 'border-primary-500 ring-2 ring-primary-200'
          : hasWarning
          ? 'border-warning-300 hover:border-warning-400'
          : 'border-transparent hover:border-primary-300'
      }`}
      onClick={onClick}
    >
      {hasWarning && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-warning-400 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse-soft">
          !
        </div>
      )}
      <div className="aspect-square w-full">
        <Radar data={chartData} options={options} />
      </div>
    </div>
  );
}
