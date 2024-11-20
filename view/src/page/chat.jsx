/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Title,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register required components in Chart.js
ChartJS.register(BarElement, Tooltip, Title, CategoryScale, LinearScale);

const Chart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:3000/api/v1/sitereport/employeeperformance"
        );
        const result = await response.json();

        if (result.status === "success" && Array.isArray(result.data)) {
          // Process data for Chart.js
          const labels = result.data.map((item) => item.name); // Employee names
          const data = result.data.map((item) => item.inspectionCount); // Inspection counts

          // Generate unique colors for each bar
          const backgroundColors = labels.map(
            (_, index) => `hsl(${(index * 360) / labels.length}, 70%, 50%)`
          );

          setChartData({
            labels,
            datasets: [
              {
                label: "Inspections Done by Employees",
                data,
                backgroundColor: backgroundColors,
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!chartData) {
    return <p>No data available</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        width: "100%",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          color: "#333",
          textAlign: "center",
          fontSize: "1.5rem",
        }}
      >
        Employee Performance Report
      </h2>
      <div
        style={{
          width: "90%",
          maxWidth: "800px",
        }}
      >
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false, // Allows scaling for smaller screens
            plugins: {
              title: {
                display: true,
                text: "Inspection Done by Each Employee",
                font: {
                  size: 16,
                  weight: "bold",
                },
                color: "#444",
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const name = chartData.labels[context.dataIndex];
                    const count = context.raw;
                    return `Name: ${name}, Inspections: ${count}`;
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Employees",
                  color: "#666",
                  font: {
                    size: 14,
                    weight: "bold",
                  },
                },
                ticks: {
                  font: {
                    size: window.innerWidth < 600 ? 10 : 12, // Adjust font size for mobile
                  },
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Inspection Count",
                  color: "#666",
                  font: {
                    size: 14,
                    weight: "bold",
                  },
                },
                ticks: {
                  font: {
                    size: window.innerWidth < 600 ? 10 : 12, // Adjust font size for mobile
                  },
                },
                beginAtZero: true,
              },
            },
          }}
          style={{
            height: window.innerWidth < 600 ? "300px" : "400px", // Chart height adjusts based on screen size
          }}
        />
      </div>
    </div>
  );
};

export default Chart;
