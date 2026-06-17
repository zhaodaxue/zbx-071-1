import { Sprout, Droplets } from 'lucide-react';
import DateNavigator from '@/components/DateNavigator';
import RadarGrid from '@/components/RadarGrid';
import StatsTable from '@/components/StatsTable';
import SidebarInfo from '@/components/SidebarInfo';

export default function Home() {
  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <header className="mb-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary-800 rounded-xl">
            <Sprout className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary-900 font-serif">
              田块含水雷达对比
            </h1>
            <p className="text-primary-600 text-sm">
              春雨期农技站 · 试验田表层含水率监测系统
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-primary-500">
          <div className="flex items-center gap-1">
            <Droplets className="w-3 h-3" />
            <span>监测指标：表层含水率 %</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-warning-500" />
            <span>警戒线：18%</span>
          </div>
        </div>
      </header>

      <DateNavigator />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <aside className="lg:col-span-2 order-2 lg:order-1">
          <SidebarInfo />
        </aside>

        <main className="lg:col-span-7 order-1 lg:order-2">
          <div className="bg-white/80 backdrop-blur-sm card-shadow rounded-xl p-5">
            <RadarGrid />
          </div>
        </main>

        <aside className="lg:col-span-3 order-3">
          <StatsTable />
        </aside>
      </div>

      <footer className="mt-8 pt-4 border-t border-primary-100 text-center text-xs text-primary-500 animate-fade-in">
        <p>数据为模拟演示数据 · 系统支持离线运行 · Docker静态发布</p>
        <p className="mt-1">© 2026 春雨期农技站监测系统</p>
      </footer>
    </div>
  );
}