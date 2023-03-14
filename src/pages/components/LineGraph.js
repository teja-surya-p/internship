import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineGraph = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Line Graph',
            data: data.values,
            fill: false,
            borderColor: 'rgb(130, 210, 146)',
            borderWidth: 4,
          },
        ],
      },
      options: {
        // responsive: true,
        // maintainAspectRatio: false,
        scales: {
          x: {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 20,
            },
          },
          y: {
            ticks: {
              beginAtZero: true,
            },
          },
        },
      },
    });

    return () => chart.destroy();
  }, [data]);

  return (
    <div className="graphMain"
    // style={
    //   { height: '30vh', width: '65%' }}
      >
      <canvas ref={chartRef} />
    </div>
  );
};

export default LineGraph;