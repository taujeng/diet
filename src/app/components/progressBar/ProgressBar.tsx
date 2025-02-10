import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProgressBar = ({ value=25, maxValue=25, label="Protein" }) => {
  const data = {
    labels: [label],
    datasets: [
      {
        data: [value],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        barThickness: 20, // Fixed bar thickness
      },
      // {
      //   // Background bar to show total capacity
      //   data: [maxValue],
      //   backgroundColor: 'rgba(200, 200, 200, 0.3)',
      //   borderWidth: 0,
      //   barThickness: 20,
      // }
    ]
  };

  const options = {
    indexAxis: 'y', // Horizontal bar
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true, // Hide legend
      },
      tooltip: {
        enabled: true
      }
    },
    scales: {
      x: {
        stacked: true,
        display: true, // Hide x-axis
        max: maxValue
      },
      y: {
        stacked: true,
        display: true // Hide y-axis
      }
    }
  };

  return (
    <div style={{ width: '50%', height: '150px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};
export default ProgressBar