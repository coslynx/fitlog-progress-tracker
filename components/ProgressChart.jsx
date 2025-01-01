import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'chart.js/auto';

/**
 * ProgressChart component renders a chart visualizing fitness progress data.
 * @param {object} props - The props object.
 * @param {Array<object>} props.progressData - An array of progress data objects,
 *                                            each containing a date and a value.
 * @returns {JSX.Element} The ProgressChart element.
 */
const ProgressChart = ({ progressData }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!progressData || progressData.length === 0) {
      // Destroy existing chart if no data is present and return early
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
      return;
    }


    const dates = progressData.map((item) => item.date);
    const values = progressData.map((item) => item.value);


    const chartConfig = {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Progress',
            data: values,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
      options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                title: {
                    display: true,
                    text: 'Date',
                },
                ticks: {
                     autoSkip: true,
                    maxRotation: 45,
                    minRotation: 45,
                }
              },
              y: {
                  title: {
                    display: true,
                    text: 'Value',
                },
                beginAtZero: true,
              },
            },
          plugins: {
              legend: {
                display: false,
              },
              title: {
                display: false,
              }
          }
      },
    };




    const createChart = () => {
        const ctx = chartRef.current.getContext('2d');
        if (!ctx) {
           console.error('Could not get chart context. Canvas might be null.');
            return null;
        }
        try {
            chartInstance.current = new Chart(ctx, chartConfig);
            return chartInstance.current;
         } catch (error) {
            console.error('Error creating chart:', error);
            return null;
        }
    };
    // Destroy the old chart before creating a new one to prevent conflicts
     if (chartInstance.current) {
        chartInstance.current.destroy();
      }

     createChart();



    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [progressData]);



    if (!progressData || progressData.length === 0) {
        return <div className="text-center py-4">No progress data available</div>;
    }

  return (
      <div className="w-full h-64 relative">
          <canvas ref={chartRef} role="img" aria-label="Progress Chart" />
      </div>
  );
};


ProgressChart.propTypes = {
    progressData: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired,
        })
    ),
};

export default ProgressChart;