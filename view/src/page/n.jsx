import React, { useEffect, useState } from "react";
import axios from "axios";

function PdfReport() {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    // Fetch the data from API
    axios
      .get("http://127.0.0.1:3000/api/v1/sitereport/673b2c8d3137bd8e4c363e2d")
      .then((response) => {
        setReportData(response.data.data.data);
      })
      .catch((error) => {
        console.error("Error fetching the report data:", error);
      });
  }, []);

  if (!reportData) {
    return <div>Loading...</div>;
  }

  const {
    clientName,
    architectName,
    date,
    time,
    siteVisitCheckingDetails,
    checklist,
    specificNonCompliances,
    additionalRemarks,
    jmStaffEngineer,
    sitePhotos,
  } = reportData;

  return (
    <>
      <style>{`
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        font-size: 14px;
        line-height: 1.5;
      }

      .page-container {
        width: 210mm;
        margin: 0 auto;
        background: white;
      }

      /* Header Section */
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding: 10px 0;
        border-bottom: 1px solid #000;
      }

      .header-text {
        text-align: left;
      }

      .header-text h1 {
        font-size: 20px;
        margin: 0;
      }

      .header-text p {
        margin: 5px 0;
      }

      .logo {
        width: 80px;
        height: 80px;
      }

      /* Site Visit Report Section */
      .site-visit-section {
        margin-bottom: 30px;
      }

      .site-visit-section h2 {
        text-align: center;
        text-decoration: underline;
        margin: 20px 0;
      }

      .details {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        margin-bottom: 20px;
      }

      .details div {
        display: flex;
        gap: 10px;
      }

      .details label {
        font-weight: bold;
        min-width: 70px;
      }

      .location-details {
        margin-bottom: 20px;
      }

      .inspection-notes {
        margin-bottom: 20px;
      }

      .compliance textarea {
        width: 100%;
        height: 150px;
        margin: 10px 0;
        padding: 10px;
        border: 1px solid #000;
      }

      /* Checklist Section */
      .checklist-section {
        margin: 30px 0;
      }

      .checklist-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
      }

      .compliance-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
      }

      .compliance-table th,
      .compliance-table td {
        border: 1px solid #000;
        padding: 8px;
        text-align: left;
      }

      .compliance-table th {
        background-color: #f2f2f2;
      }

      .checkbox-cell {
        width: 30px;
        text-align: center;
      }

      .checkbox-cell input[type="checkbox"] {
        transform: scale(1.1);
      }

      .nested-list {
        margin: 5px 0;
        padding-left: 20px;
        list-style-type: none;
      }

      .nested-list li {
        display: flex;
        align-items: center;
        margin: 3px 0;
      }

      .nested-list input[type="checkbox"] {
        margin-right: 8px;
      }

      /* Permission Section */
      .permission-section {
        margin: 30px 0;
      }

      .permission-section h2 {
        font-size: 18px;
        text-decoration: underline;
        margin-bottom: 15px;
      }

      .signature-table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
      }

      .signature-table th,
      .signature-table td {
        border: 1px solid #000;
        padding: 10px;
        text-align: left;
      }

      /* Footer */
      .footer {
        margin-top: 30px;
        text-align: center;
        font-size: 12px;
        border-top: 1px solid #000;
        padding-top: 15px;
      }

      .footer p {
        margin: 5px 0;
      }

      @media print {
        body {
          margin: 0;
          padding: 0;
        }

        .page-container {
          width: 100%;
        }
      }
      `}</style>
      <div className="page-container">
        <div className="header">
          <div className="header-text">
            <img
              src="https://res.cloudinary.com/dkppo2ktq/image/upload/v1732040103/epy7aps0wg1rs7faaspt.jpg"
              alt="Logo"
              className="logo"
            />
            <h1>{jmStaffEngineer.name || "Engineer Name"}</h1>
            <p>
              Consulting Structural Engineers & Project Management Consultants
            </p>
          </div>
        </div>

        <div className="site-visit-section">
          <h2>Site Visit Report</h2>
          <div className="details">
            <div>
              <label>Client:</label>
              <span>{clientName || "__________________"}</span>
            </div>
            <div>
              <label>Architect:</label>
              <span>{architectName || "__________________"}</span>
            </div>
            <div>
              <label>Date:</label>
              <span>
                {new Date(date).toLocaleDateString() || "__________________"}
              </span>
            </div>
          </div>
          <div className="inspection-notes">
            <p>
              <strong>Site Visit Notes:</strong>{" "}
              {siteVisitCheckingDetails || "__________________"}
            </p>
          </div>
          <div className="compliance">
            <p>
              <strong>Specific Non-Compliances:</strong>
            </p>
            <textarea defaultValue={specificNonCompliances || ""}></textarea>
          </div>
        </div>

        <div className="checklist-section">
          <h2>General Compliance Checklist</h2>
          <div className="checklist-container">
            {checklist &&
              Object.entries(checklist).map(([key, value]) => (
                <div key={key} className="checklist-item">
                  <input type="checkbox" checked={value} readOnly />
                  <label>{key.replace(/([A-Z])/g, " $1")}</label>
                </div>
              ))}
          </div>
        </div>

        <div className="footer">
          <p>Contact Information Here</p>
        </div>
      </div>
    </>
  );
}

export default PdfReport;
