/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
function PdfReport() {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    // Fetch the data from API
    axios
      .get("http://127.0.0.1:3000/api/v1/sitereport/673b2c8d3137bd8e4c363e2d")
      .then((response) => {
        setReportData(response.data.data.data);
        console.log(response.data.data.data);
      })
      .catch((error) => {
        console.error("Error fetching the report data:", error);
      });
  }, []);

  if (!reportData) {
    return <div>Loading...</div>;
  }
  const downloadPDF = async () => {
    try {
      console.log("Downloading PDF from API...");

      // Fetch the PDF from the API
      const response = await fetch(
        "http://127.0.0.1:3000/api/v1/sitereport/report",
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch PDF: ${response.statusText}`);
      }

      // Get the PDF blob from the response
      const pdfBlob = await response.blob();

      // Create a temporary URL for the PDF blob
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Create a temporary anchor element to trigger download
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "site_report.pdf";
      document.body.appendChild(link);
      link.click();

      // Clean up the temporary URL and anchor element
      URL.revokeObjectURL(pdfUrl);
      document.body.removeChild(link);

      console.log("PDF downloaded successfully!");
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

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
    clientRepresentativeName,
    contractorRepresentativeName,
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
        .client-architect-table {
          width: 100%;
          margin: 20px 0;
          border-collapse: collapse;
        }
        .client-architect-table th, .client-architect-table td {
          border: 1px solid #000;
          padding: 10px;
          text-align: left;
        }
        .client-architect-table th {
          background-color: #f4f4f4;
        }
      `}</style>
      <div id="report-content">
        <div className="page-container">
          <div className="header">
            <div className="header-text">
              <h1>Jayesh Makwana</h1>
              <p>
                (I.M.E.Structure, A.M.I.E.)
                <br />
                Consulting Structural Engineers & Project Management Consultants
              </p>
            </div>
          </div>

          <div className="site-visit-section">
            <h2>Site Visit Report</h2>
            <div className="details">
              <div>
                <label>Project:</label>
                <span>__________________</span>
              </div>

              <div>
                <label>Job No:</label>
                <span>__________________</span>
              </div>
              <div>
                <label>Date:</label>
                <span>
                  {new Date(date).toLocaleDateString() || "__________________"}
                </span>
              </div>
            </div>
            <div className="details">
              <div>
                <label>Location:</label>
                <span>____________________________</span>
              </div>
              <div>
                <label>Engineer: </label>
                <span>{jmStaffEngineer.name || "__________________"}</span>
              </div>
            </div>
            <table className="client-architect-table">
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Architect Name</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{reportData.clientName || "__________________"}</td>
                  <td>{reportData.architectName || "__________________"}</td>
                </tr>
              </tbody>
            </table>
            <div className="inspection-notes">
              <p>
                <strong>During our inspection the following is noted:</strong>{" "}
                {siteVisitCheckingDetails || "__________________"}
              </p>
            </div>
            <div className="compliance">
              <p>
                <strong>
                  Specific Non-Compliances: The following points must be
                  attended/rectified before concreting
                </strong>
              </p>
              <textarea defaultValue={specificNonCompliances || ""}></textarea>
            </div>
          </div>

          <div className="checklist-section">
            <h2>General Compliance Checklist</h2>
            <p>
              The following points must be ensured to be complied with before
              concreting:
            </p>
            <div className="checklist-container">
              <table className="compliance-table">
                <thead>
                  <tr>
                    <th>√</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="checkbox-cell">
                      <input
                        type="checkbox"
                        checked={reportData.checklist.propsTightAndStraight}
                        readOnly
                      />
                    </td>
                    <td>
                      All props are tight, straight, vertical and adequately
                      braced.
                    </td>
                  </tr>
                  <tr>
                    <td className="checkbox-cell">
                      <input
                        type="checkbox"
                        checked={
                          reportData.checklist.defectiveMaterialsReplaced
                        }
                        readOnly
                      />
                    </td>
                    <td>
                      Twisted, defective, spliced, damaged, decayed props,
                      planks, plates, plywood, etc., are removed/replaced.
                    </td>
                  </tr>
                  <tr>
                    <td className="checkbox-cell">
                      <input
                        type="checkbox"
                        checked={reportData.checklist.formworkCleaned}
                        readOnly
                      />
                    </td>
                    <td>Formwork is cleaned thoroughly.</td>
                  </tr>
                  <tr>
                    <td className="checkbox-cell">
                      <input
                        type="checkbox"
                        checked={reportData.checklist.formworkWatertight}
                        readOnly
                      />
                    </td>
                    <td>Formwork is watertight.</td>
                  </tr>
                  <tr>
                    <td className="checkbox-cell">
                      <input
                        type="checkbox"
                        checked={reportData.checklist.columnBeamSecured}
                        readOnly
                      />
                    </td>
                    <td>
                      Formwork of columns, beams is in line & plumb and
                      appropriately secured in position against loads & thrust.
                    </td>
                  </tr>
                  <tr>
                    <td className="checkbox-cell">
                      <input
                        type="checkbox"
                        checked={reportData.checklist.slabUnderPropped}
                        readOnly
                      />
                    </td>
                    <td>
                      The slabs thicker than 150 mm, the immediate lower slab is
                      also kept under propped condition.
                    </td>
                  </tr>
                  <tr>
                    <td className="checkbox-cell">
                      <input
                        type="checkbox"
                        checked={
                          reportData.checklist.coverProvided
                            .columnReinforcement &&
                          reportData.checklist.coverProvided.beamBottoms &&
                          reportData.checklist.coverProvided.beamSlides &&
                          reportData.checklist.coverProvided.slabBottom &&
                          reportData.checklist.coverProvided.chajjaSlabSlides
                        }
                        readOnly
                      />
                    </td>
                    <td>
                      Adequate & appropriate cover at the following locations
                      provided:
                      <ul className="nested-list">
                        <li>
                          <input
                            type="checkbox"
                            checked={
                              reportData.checklist.coverProvided
                                .columnReinforcement
                            }
                            readOnly
                          />{" "}
                          Column reinforcement
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            checked={
                              reportData.checklist.coverProvided.beamBottoms
                            }
                            readOnly
                          />{" "}
                          Beam bottoms
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            checked={
                              reportData.checklist.coverProvided.beamSlides
                            }
                            readOnly
                          />{" "}
                          Beam sides
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            checked={
                              reportData.checklist.coverProvided.slabBottom
                            }
                            readOnly
                          />{" "}
                          Slab bottom
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            checked={
                              reportData.checklist.coverProvided
                                .chajjaSlabSlides
                            }
                            readOnly
                          />{" "}
                          Chajja, slab sides
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td className="checkbox-cell">
                      <input
                        type="checkbox"
                        checked={reportData.checklist.chairsProvided}
                        readOnly
                      />
                    </td>
                    <td>Adequate & appropriate chairs are provided.</td>
                  </tr>
                  <tr>
                    <td className="checkbox-cell">
                      <input
                        type="checkbox"
                        checked={reportData.checklist.spacerBarsProvided}
                        readOnly
                      />
                    </td>
                    <td>
                      Adequate & appropriate spacer bars are provided between
                      two layers of reinforcement in beams, etc.
                    </td>
                  </tr>
                  <tr>
                    <td className="checkbox-cell">
                      <input
                        type="checkbox"
                        checked={reportData.checklist.columnRingsProvided}
                        readOnly
                      />
                    </td>
                    <td>
                      Column rings/ties are provided at beam junction for full
                      depth of beam.
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="compliance-table">
                <thead>
                  <tr>
                    <th>√</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="checkbox-cell">
                      <input
                        type="checkbox"
                        checked={
                          reportData.checklist.dowelBarsProvided
                            .elevationPurdies &&
                          reportData.checklist.dowelBarsProvided.hangerColumn
                        }
                        readOnly
                      />
                    </td>
                    <td>
                      Appropriate dowel bars are provided at the following
                      locations:
                      <ul className="nested-list">
                        <li>
                          <input
                            type="checkbox"
                            checked={
                              reportData.checklist.dowelBarsProvided
                                .elevationPurdies
                            }
                            readOnly
                          />{" "}
                          Elevation purdies & up stands
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            checked={
                              reportData.checklist.dowelBarsProvided
                                .hangerColumn
                            }
                            readOnly
                          />{" "}
                          Hanger columns, stub columns
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td className="checkbox-cell">
                      <input
                        type="checkbox"
                        checked={
                          reportData.checklist.dowelBarsProvided
                            .futureBeamSlabStaircaseFlights
                        }
                        readOnly
                      />
                    </td>
                    <td>Future beams/slabs/staircase fillings.</td>
                  </tr>
                  <tr>
                    <td className="checkbox-cell">
                      <input
                        type="checkbox"
                        checked={reportData.checklist.cubeSamplesTaken}
                        readOnly
                      />
                    </td>
                    <td>
                      Cube samples shall be taken in accordance with IS:
                      456-2000. Test reports of such cubes shall be submitted to
                      consultants on a regular basis.
                    </td>
                  </tr>
                  <tr>
                    <td className="checkbox-cell">
                      <input
                        type="checkbox"
                        checked={reportData.checklist.noChamberInBeamSlab}
                        readOnly
                      />
                    </td>
                    <td>
                      No camber shall be provided in beams & slabs unless noted
                      otherwise & specifically approved by the consultant in
                      writing.
                    </td>
                  </tr>
                  <tr>
                    <td className="checkbox-cell">
                      <input
                        type="checkbox"
                        checked={reportData.checklist.shoringShuttingDone}
                        readOnly
                      />
                    </td>
                    <td>
                      Proper shoring & strutting to all sides of excavation is
                      done.
                    </td>
                  </tr>
                  <tr>
                    <td className="checkbox-cell">
                      <input
                        type="checkbox"
                        checked={reportData.checklist.basementHolesPermission}
                        readOnly
                      />
                    </td>
                    <td>
                      Necessary holes are provided in the basement raft with
                      prior permission of the consultants.
                    </td>
                  </tr>
                  <tr>
                    <td className="checkbox-cell">
                      <input
                        type="checkbox"
                        checked={reportData.checklist.reinforcementTested}
                        readOnly
                      />
                    </td>
                    <td>
                      The lot of reinforcement in use is tested in the
                      laboratory, and the reports are submitted to the
                      consultant.
                    </td>
                  </tr>
                  <tr>
                    <td className="checkbox-cell">
                      <input
                        type="checkbox"
                        checked={reportData.checklist.formworkStriking}
                        readOnly
                      />
                    </td>
                    <td>
                      Striking of formwork shall only be started after 70% of
                      the characteristic strength of concrete is established.
                    </td>
                  </tr>
                  <tr>
                    <td className="checkbox-cell">
                      <input
                        type="checkbox"
                        checked={reportData.checklist.slabUnderPropped}
                        readOnly
                      />
                    </td>
                    <td>
                      For all slabs thicker than 150 mm, the immediate lower
                      slab shall also be under propped condition.
                    </td>
                  </tr>
                  <tr>
                    <td className="checkbox-cell">
                      <input type="checkbox" readOnly />
                    </td>
                    <td>
                      The dimension and reinforcement of PT beams & slabs are
                      checked & certified by PT Agency.
                    </td>
                  </tr>
                  <tr>
                    <td className="checkbox-cell">
                      <input type="checkbox" readOnly />
                    </td>
                    <td>
                      Centering, shuttering & formwork of PT beams & PT slabs
                      shall not be removed until stressing and grouting is
                      completed by PT agency.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="permission-section">
            <h2>Permission Granted:</h2>
            <p>
              May be concreted after attending the above points and with due
              intimation to the architect.
            </p>
            <p>
              Will not be concreted till the above points are attended and
              re-inspected by us.
            </p>
            <table className="signature-table">
              <thead>
                <tr>
                  <th>Agency</th>
                  <th>for Jayesh Makwana</th>
                  <th>Clients Representative</th>
                  <th>Contractors Representative</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Signature & Time</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td></td>
                  <td>
                    <b>{clientRepresentativeName}</b>
                  </td>
                  <td>
                    <b>{contractorRepresentativeName}</b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="footer">
            <p>
              Shop No : 11, Sant Vanden apartment, Swaminarayan nagar,
              Aurangabad naka, Panchvati, Nashik-422003
            </p>
            <p>Mb: 8087561687 E-Mail: jayeshstrd@gmail.com</p>
          </div>
        </div>
      </div>
      <button onClick={downloadPDF}>PDF</button>
    </>
  );
}

export default PdfReport;
