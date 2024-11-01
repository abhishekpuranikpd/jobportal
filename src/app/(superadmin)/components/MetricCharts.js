"use client";
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MetricsChart = ({ metrics }) => {
  const {
    totalJobs,
    todayJobs,
    approvedJobs,
    rejectedJobs,
    totalApplications,
    rejectedApplications,
    shortlistedApplications,
    todayApplications,
    todayApprovedJobs,
    todayRejectedJobs,
  } = metrics;

  const data = {
    labels: [
      "Total Jobs",
      "Today's Jobs",
      "Approved Jobs",
      "Rejected Jobs",
      "Total Applications",
      "Rejected Applications",
      "Shortlisted Applications",
      "Today's Applications",
      "Today's Approved Jobs",
      "Today's Rejected Jobs",
    ],
    datasets: [
      {
        label: 'Job Metrics',
        data: [
          totalJobs,
          todayJobs,
          approvedJobs,
          rejectedJobs,
          totalApplications,
          rejectedApplications,
          shortlistedApplications,
          todayApplications,
          todayApprovedJobs,
          todayRejectedJobs,
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Job Metrics Overview',
      },
    },
  };

  return (
    <div style={{ height: '300px', width: '80%' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MetricsChart;
