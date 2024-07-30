import React, { useEffect, useRef } from 'react';
import { Chart, LinearScale, LineController, LineElement, PointElement, CategoryScale } from 'chart.js';
import 'chart.js/auto';

Chart.register(LinearScale, LineController, LineElement, PointElement, CategoryScale);

const DataChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((_, index) => index + 1),
        datasets: [
          {
            label: 'Random Data',
            data: data,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'category',
          },
          y: {
            type: 'linear',
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      chartInstanceRef.current.destroy();
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default DataChart;
