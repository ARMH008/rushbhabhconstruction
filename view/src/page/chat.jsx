/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";

const SiteInspectionForm = () => {
  const [formData, setFormData] = useState({
    jmStaffEngineer: "",
    date: "",
    time: "",
    clientName: "",
    architectName: "",
    siteVisitCheckingDetails: "",
    additionalRemarks: "",
    specificNonCompliances: "",
    clientRepresentativeName: "",
    contractorRepresentativeName: "",
  });

  const [checklist, setChecklist] = useState({
    propsTightAndStraight: false,
    defectiveMaterialsReplaced: false,
    formworkCleaned: false,
    formworkWatertight: false,
    formworkslabchhajja: false,
    columnBeamSecured: false,
    coverProvided: {
      columnReinforcement: false,
      beamBottoms: false,
      beamSlides: false,
      slabBottom: false,
      chajjaSlabSlides: false,
    },
    chairsProvided: false,
    spacerBarsProvided: false,
    columnRingsProvided: false,
    dowelBarsProvided: {
      elevationPurdies: false,
      hangerColumn: false,
      futureBeamSlabStaircaseFlights: false,
    },
    cubeSamplesTaken: false,
    noChamberInBeamSlab: false,
    shoringShuttingDone: false,
    basementHolesPermission: false,
    reinforcementTested: false,
    formworkStriking: false,
    slabUnderPropped: false,
    ptBeamsFormwork: false,
    ptBeamsDimensions: false,
    slabThicknessUnderpropped: false,
  });

  const [files, setFiles] = useState({
    sitePhotos: [],
    modificationPhoto: [],
    clientsign: null,
    employeesign: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChecklistChange = (e) => {
    const { name, checked } = e.target;
    const keys = name.split(".");
    if (keys.length > 1) {
      setChecklist((prevChecklist) => ({
        ...prevChecklist,
        [keys[0]]: {
          ...prevChecklist[keys[0]],
          [keys[1]]: checked,
        },
      }));
    } else {
      setChecklist({ ...checklist, [name]: checked });
    }
  };

  const handleFileChange = (e) => {
    const { name, files: uploadedFiles } = e.target;
    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]:
        name === "clientsign" || name === "employeesign"
          ? uploadedFiles[0]
          : [...uploadedFiles],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    // Append form data
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    // Append checklist data
    data.append("checklist", JSON.stringify(checklist));

    // Append files
    Object.keys(files).forEach((key) => {
      if (Array.isArray(files[key])) {
        files[key].forEach((file) => data.append(key, file));
      } else if (files[key]) {
        data.append(key, files[key]);
      }
    });

    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/sitereport",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Site report submitted successfully!");
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting the site report.");
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>Site Inspection Report</h2>

      {/* JM Staff Engineer */}
      <div>
        <label>JM Staff Engineer ID:</label>
        <input
          type="text"
          name="jmStaffEngineer"
          value={formData.jmStaffEngineer}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Date */}
      <div>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
        />
      </div>

      {/* Time */}
      <div>
        <label>Time:</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Client Name */}
      <div>
        <label>Client Name:</label>
        <input
          type="text"
          name="clientName"
          value={formData.clientName}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Architect Name */}
      <div>
        <label>Architect Name:</label>
        <input
          type="text"
          name="architectName"
          value={formData.architectName}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Site Visit Checking Details */}
      <div>
        <label>Site Visit Checking Details:</label>
        <textarea
          name="siteVisitCheckingDetails"
          value={formData.siteVisitCheckingDetails}
          onChange={handleInputChange}
          required
        ></textarea>
      </div>

      {/* Checklist */}
      <fieldset>
        <legend>Checklist</legend>
        {Object.entries(checklist).map(([key, value]) =>
          typeof value === "object" ? (
            <fieldset key={key}>
              <legend>{key}</legend>
              {Object.entries(value).map(([subKey, subValue]) => (
                <div key={subKey}>
                  <label>
                    <input
                      type="checkbox"
                      name={`${key}.${subKey}`}
                      checked={subValue}
                      onChange={handleChecklistChange}
                    />
                    {subKey}
                  </label>
                </div>
              ))}
            </fieldset>
          ) : (
            <div key={key}>
              <label>
                <input
                  type="checkbox"
                  name={key}
                  checked={value}
                  onChange={handleChecklistChange}
                />
                {key}
              </label>
            </div>
          )
        )}
      </fieldset>

      {/* Additional Remarks */}
      <div>
        <label>Additional Remarks:</label>
        <textarea
          name="additionalRemarks"
          value={formData.additionalRemarks}
          onChange={handleInputChange}
        ></textarea>
      </div>

      {/* Specific Non-Compliances */}
      <div>
        <label>Specific Non-Compliances:</label>
        <textarea
          name="specificNonCompliances"
          value={formData.specificNonCompliances}
          onChange={handleInputChange}
          required
        ></textarea>
      </div>

      {/* File Uploads */}
      <div>
        <label>Site Photos:</label>
        <input
          type="file"
          name="sitePhotos"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <div>
        <label>Modification Photos:</label>
        <input
          type="file"
          name="modificationPhoto"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <div>
        <label>Client Signature:</label>
        <input
          type="file"
          name="clientsign"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <div>
        <label>Employee Signature:</label>
        <input
          type="file"
          name="employeesign"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <button type="submit">Submit Report</button>
    </form>
  );
};

export default SiteInspectionForm;
