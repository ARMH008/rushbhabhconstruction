/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  Tooltip,
  Title,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

// Register required Chart.js components
ChartJS.register(
  BarElement,
  LineElement,
  Tooltip,
  Title,
  CategoryScale,
  LinearScale,
  PointElement
);

const OverallChart = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [weekly, setWeekly] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/api/v1/sitereport/trends?year=${year}&weekly=${weekly}`
      );
      const result = await response.json();
      if (result.status === "success" && Array.isArray(result.data)) {
        const labels = result.data.map(
          (item) =>
            weekly ? `Week ${item._id.week}` : monthNames[item._id.month - 1] // Map month number to month name
        );
        const data = result.data.map((item) => item.inspectionsCount);
        setChartData({
          labels,
          datasets: [
            {
              label: `Inspections in ${year} (${
                weekly ? "Weekly" : "Monthly"
              })`,
              data,
              backgroundColor: weekly
                ? "rgba(75, 192, 192, 0.4)" // Line chart color
                : labels.map(
                    (_, index) =>
                      `hsl(${(index * 360) / labels.length}, 70%, 50%)`
                  ), // Bar chart colors
              borderColor: weekly ? "rgba(75, 192, 192, 1)" : null, // Border for Line chart
              tension: weekly ? 0.4 : 0, // Curved line for Line chart
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

  useEffect(() => {
    fetchData();
  }, [year, weekly]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        minHeight: "100vh",
        background: "#f9f9f9",
      }}
    >
      <h2 style={{ marginBottom: "20px", fontWeight: "600", color: "#333" }}>
        Inspection Trends
      </h2>
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ddd",
          }}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={new Date().getFullYear() - i}>
              {new Date().getFullYear() - i}
            </option>
          ))}
        </select>
        <select
          value={weekly ? "weekly" : "monthly"}
          onChange={(e) => setWeekly(e.target.value === "weekly")}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ddd",
          }}
        >
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {loading ? (
          <p style={{ textAlign: "center", color: "#666" }}>Loading...</p>
        ) : chartData ? (
          weekly ? (
            // Render Line chart for weekly data
            <Line
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: "Weekly Inspection Trends",
                    position: "bottom", // Title at the bottom
                    font: {
                      size: 16,
                    },
                  },
                },
                scales: {
                  x: {
                    title: { display: true, text: "Week" },
                  },
                  y: {
                    title: { display: true, text: "Inspections" },
                  },
                },
              }}
            />
          ) : (
            // Render Bar chart for monthly data
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: "Monthly Inspection Trends",
                    position: "bottom", // Title at the bottom
                    font: {
                      size: 16,
                    },
                  },
                },
                scales: {
                  x: {
                    title: { display: true, text: "Month" },
                  },
                  y: {
                    title: { display: true, text: "Inspections" },
                  },
                },
              }}
            />
          )
        ) : (
          <p style={{ textAlign: "center", color: "#666" }}>
            No data available
          </p>
        )}
      </div>
    </div>
  );
};

export default OverallChart;
