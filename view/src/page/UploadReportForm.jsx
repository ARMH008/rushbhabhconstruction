/* eslint-disable react/prop-types */
/* function UploadReportForm() {
  return (
    <div className=" mx-auto max-w-screen-xl p-6">
      <div className="text-center ">
        <h1 className="text-4xl font-bold text-blue-400 mb-8 ">
          Create New Report
        </h1>
        <hr className="border-t-4 border-blue-600  mx-auto" />
      </div>
    </div>
  );
}

export default UploadReportForm; */
import { useState } from "react";

const SiteInspectionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    jmStaffEngineer: "",
    date: "",
    time: "",
    clientName: "",
    architectName: "",
    siteVisitCheckingDetails: "",
    sitePhotos: [],
    checklist: {
      propsTightAndStraight: false,
      defectiveMaterialsReplaced: false,
      formworkCleaned: false,
      formworkWatertight: false,
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
    },
    additionalRemarks: "",
    specificNonCompliances: "",
    modificationPhoto: [],
    clientRepresentativeName: "",
    contractorRepresentativeName: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => {
      if (type === "checkbox") {
        return { ...prevData, [name]: checked };
      }
      return { ...prevData, [name]: value };
    });
  };

  const handleNestedChange = (parent, key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [parent]: {
        ...prevData[parent],
        [key]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 space-y-4 bg-gray-100 rounded shadow"
    >
      <h2 className="text-lg font-bold mb-4">Site Inspection Form</h2>

      <div>
        <label className="block mb-2">Staff Engineer ID</label>
        <input
          type="text"
          name="jmStaffEngineer"
          value={formData.jmStaffEngineer}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-2">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-2">Time</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-2">Client Name</label>
        <input
          type="text"
          name="clientName"
          value={formData.clientName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-2">Architect Name</label>
        <input
          type="text"
          name="architectName"
          value={formData.architectName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-2">Site Visit Checking Details</label>
        <textarea
          name="siteVisitCheckingDetails"
          value={formData.siteVisitCheckingDetails}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Checklist Section */}
      <fieldset className="border p-4 rounded">
        <legend className="text-lg font-semibold">Checklist</legend>
        <div>
          <label>
            <input
              type="checkbox"
              name="propsTightAndStraight"
              checked={formData.checklist.propsTightAndStraight}
              onChange={(e) =>
                handleNestedChange(
                  "checklist",
                  "propsTightAndStraight",
                  e.target.checked
                )
              }
            />{" "}
            Props Tight and Straight
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="defectiveMaterialsReplaced"
              checked={formData.checklist.defectiveMaterialsReplaced}
              onChange={(e) =>
                handleNestedChange(
                  "checklist",
                  "defectiveMaterialsReplaced",
                  e.target.checked
                )
              }
            />{" "}
            Defective Materials Replaced
          </label>
        </div>

        {/* Nested Cover Provided Section */}
        <fieldset className="border p-4 mt-4">
          <legend className="text-md font-semibold">Cover Provided</legend>
          {Object.keys(formData.checklist.coverProvided).map((key) => (
            <div key={key}>
              <label>
                <input
                  type="checkbox"
                  checked={formData.checklist.coverProvided[key]}
                  onChange={(e) =>
                    handleNestedChange("checklist", "coverProvided", {
                      ...formData.checklist.coverProvided,
                      [key]: e.target.checked,
                    })
                  }
                />{" "}
                {key}
              </label>
            </div>
          ))}
        </fieldset>
      </fieldset>

      <div>
        <label className="block mb-2">Additional Remarks</label>
        <textarea
          name="additionalRemarks"
          value={formData.additionalRemarks}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default SiteInspectionForm;
