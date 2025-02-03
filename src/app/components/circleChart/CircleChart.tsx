import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  Title
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, Title, ChartDataLabels);

const CircleChart = ( {stats, legend} ) => {
  const data = {
    labels: legend,
    datasets: [
      {
        data: stats,
        backgroundColor: [
          'rgba(220, 20, 60, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
        ],
        borderColor: [
          'rgba(220, 20, 60, 0.8)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Calorie Count",
        position: "top" as const,
      },
      legend: {
        position: 'right' as const,
      },
      tooltip: {
        enabled: true
      },
      datalabels: {
        color: "white",
      },


    },
  };

  return (
    <div style={{ width: '350px', height: '350px' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default CircleChart;