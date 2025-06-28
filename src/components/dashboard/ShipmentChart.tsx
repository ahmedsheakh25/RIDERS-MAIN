import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);
interface ShipmentChartProps {
  dateRange: string;
}
const ShipmentChart: React.FC<ShipmentChartProps> = ({
  dateRange
}) => {
  // Generate labels based on the selected date range
  const getLabels = () => {
    if (dateRange === 'week') {
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    } else if (dateRange === 'month') {
      return ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    } else {
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    }
  };
  // Generate random data for demonstration
  const generateData = (min: number, max: number, count: number) => {
    return Array.from({
      length: count
    }, () => Math.floor(Math.random() * (max - min + 1)) + min);
  };
  const labels = getLabels();
  const dataCount = labels.length;
  const data = {
    labels,
    datasets: [{
      label: 'Deliveries',
      data: generateData(10, 35, dataCount),
      borderColor: '#0076db',
      backgroundColor: 'rgba(0, 118, 219, 0.1)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#0076db',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6
    }, {
      label: 'Pickups',
      data: generateData(5, 25, dataCount),
      borderColor: '#5db2d3',
      backgroundColor: 'rgba(93, 178, 211, 0.1)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#5db2d3',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6
    }]
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#333',
        bodyColor: '#666',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        padding: 10,
        boxPadding: 4,
        usePointStyle: true,
        callbacks: {
          labelPointStyle: function () {
            return {
              pointStyle: 'circle',
              rotation: 0
            };
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#94a3b8'
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(226, 232, 240, 0.6)'
        },
        ticks: {
          color: '#94a3b8',
          callback: function (value: any) {
            return value;
          }
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false
    }
  };
  return <div className="w-full h-72">
      <Line data={data} options={options as any} />
    </div>;
};
export default ShipmentChart;