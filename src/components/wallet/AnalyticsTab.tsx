import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { ChartBarIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon, CurrencyDollarIcon, CalendarIcon } from '@heroicons/react/24/outline';
// Using the Chart.js components already imported in the project
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler);
type TimeRange = 'week' | 'month' | 'quarter' | 'year';
const AnalyticsTab: React.FC = () => {
  const {
    t,
    language
  } = useLanguage();
  const [timeRange, setTimeRange] = useState<TimeRange>('month');
  // Get labels based on the selected time range
  const getLabels = () => {
    if (timeRange === 'week') {
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    } else if (timeRange === 'month') {
      return ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    } else if (timeRange === 'quarter') {
      return ['Jan', 'Feb', 'Mar'];
    } else {
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    }
  };
  // Generate mock data for charts
  const generateData = (min: number, max: number, count: number) => {
    return Array.from({
      length: count
    }, () => Math.floor(Math.random() * (max - min + 1)) + min);
  };
  const labels = getLabels();
  const dataCount = labels.length;
  // Spending overview data
  const spendingData = {
    labels,
    datasets: [{
      label: t('wallet.income'),
      data: generateData(50, 150, dataCount),
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#10b981',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6
    }, {
      label: t('wallet.expenses'),
      data: generateData(30, 100, dataCount),
      borderColor: '#ef4444',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#ef4444',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6
    }]
  };
  // Category breakdown data
  const categoryData = {
    labels: [t('wallet.categories.delivery'), t('wallet.categories.deposit'), t('wallet.categories.refund'), t('wallet.categories.other')],
    datasets: [{
      label: t('wallet.spending'),
      data: [45, 25, 15, 15],
      backgroundColor: ['rgba(0, 118, 219, 0.7)', 'rgba(93, 178, 211, 0.7)', 'rgba(248, 255, 35, 0.7)', 'rgba(209, 213, 219, 0.7)' // gray-300
      ],
      borderColor: ['rgba(0, 118, 219, 1)', 'rgba(93, 178, 211, 1)', 'rgba(248, 255, 35, 1)', 'rgba(209, 213, 219, 1)'],
      borderWidth: 1
    }]
  };
  // Chart options
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(226, 232, 240, 0.6)'
        }
      }
    }
  };
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
  // Stats for the summary cards
  const stats = {
    totalSpent: 235.75,
    totalIncome: 350.0,
    balance: 114.25,
    transactions: 12
  };
  return <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {t('wallet.financialOverview')}
        </h3>
        <div className="flex space-x-2">
          <TimeRangeButton active={timeRange === 'week'} onClick={() => setTimeRange('week')} label={t('reports.thisWeek')} />
          <TimeRangeButton active={timeRange === 'month'} onClick={() => setTimeRange('month')} label={t('reports.thisMonth')} />
          <TimeRangeButton active={timeRange === 'quarter'} onClick={() => setTimeRange('quarter')} label={t('reports.thisQuarter')} />
          <TimeRangeButton active={timeRange === 'year'} onClick={() => setTimeRange('year')} label={t('reports.thisYear')} />
        </div>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title={t('wallet.totalSpent')} value={`${stats.totalSpent.toFixed(3)} ${language === 'en' ? 'KWD' : 'د.ك'}`} icon={<ArrowTrendingDownIcon className="w-5 h-5 text-red-500" />} color="bg-red-50" />
        <StatCard title={t('wallet.totalIncome')} value={`${stats.totalIncome.toFixed(3)} ${language === 'en' ? 'KWD' : 'د.ك'}`} icon={<ArrowTrendingUpIcon className="w-5 h-5 text-green-500" />} color="bg-green-50" />
        <StatCard title={t('wallet.netBalance')} value={`${stats.balance.toFixed(3)} ${language === 'en' ? 'KWD' : 'د.ك'}`} icon={<CurrencyDollarIcon className="w-5 h-5 text-congress-blue-500" />} color="bg-congress-blue-50" />
        <StatCard title={t('wallet.transactions')} value={stats.transactions.toString()} icon={<CalendarIcon className="w-5 h-5 text-regent-st-blue-500" />} color="bg-regent-st-blue-50" />
      </div>
      {/* Spending Overview Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <h4 className="text-md font-medium text-gray-700 mb-4">
          {t('wallet.spendingOverview')}
        </h4>
        <div className="h-72">
          <Line data={spendingData} options={lineOptions} />
        </div>
      </div>
      {/* Category Breakdown Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h4 className="text-md font-medium text-gray-700 mb-4">
          {t('wallet.categoryBreakdown')}
        </h4>
        <div className="h-72">
          <Bar data={categoryData} options={barOptions} />
        </div>
      </div>
    </div>;
};
// Time range button component
const TimeRangeButton: React.FC<{
  active: boolean;
  onClick: () => void;
  label: string;
}> = ({
  active,
  onClick,
  label
}) => {
  return <motion.button onClick={onClick} className={`px-2 py-1 text-xs rounded ${active ? 'bg-congress-blue-100 text-congress-blue-700 font-medium' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`} whileHover={{
    scale: 1.05
  }} whileTap={{
    scale: 0.95
  }}>
      {label}
    </motion.button>;
};
// Stat card component
const StatCard: React.FC<{
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}> = ({
  title,
  value,
  icon,
  color
}) => {
  return <motion.div className="bg-white rounded-lg border border-gray-200 p-4" whileHover={{
    y: -5,
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  }} initial={{
    opacity: 0,
    y: 10
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.3
  }}>
      <div className="flex items-center mb-2">
        <div className={`p-2 rounded-full ${color}`}>{icon}</div>
      </div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      <div className="text-sm text-gray-500">{title}</div>
    </motion.div>;
};
export default AnalyticsTab;