// /* eslint-disable react/prop-types */

// import { useState } from "react";

// const SiteInspectionForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     jmStaffEngineer: "",
//     date: "",
//     time: "",
//     clientName: "",
//     architectName: "",
//     siteVisitCheckingDetails: "",
//     sitePhotos: [],
//     checklist: {
//       propsTightAndStraight: false,
//       defectiveMaterialsReplaced: false,
//       formworkCleaned: false,
//       formworkWatertight: false,
//       columnBeamSecured: false,
//       coverProvided: {
//         columnReinforcement: false,
//         beamBottoms: false,
//         beamSlides: false,
//         slabBottom: false,
//         chajjaSlabSlides: false,
//       },
//       chairsProvided: false,
//       spacerBarsProvided: false,
//       columnRingsProvided: false,
//       dowelBarsProvided: {
//         elevationPurdies: false,
//         hangerColumn: false,
//         futureBeamSlabStaircaseFlights: false,
//       },
//       cubeSamplesTaken: false,
//       noChamberInBeamSlab: false,
//       shoringShuttingDone: false,
//       basementHolesPermission: false,
//       reinforcementTested: false,
//       formworkStriking: false,
//       slabUnderPropped: false,
//     },
//     additionalRemarks: "",
//     specificNonCompliances: "",
//     modificationPhoto: [],
//     clientRepresentativeName: "",
//     contractorRepresentativeName: "",
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setFormData((prevData) => {
//       if (type === "checkbox") {
//         return { ...prevData, [name]: checked };
//       }
//       return { ...prevData, [name]: value };
//     });
//   };

//   const handleNestedChange = (parent, key, value) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [parent]: {
//         ...prevData[parent],
//         [key]: value,
//       },
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="p-5 space-y-4 bg-gray-100 rounded shadow"
//     >
//       <h2 className="text-lg font-bold mb-4">Site Inspection Form</h2>

//       <div>
//         <label className="block mb-2">Staff Engineer ID</label>
//         <input
//           type="text"
//           name="jmStaffEngineer"
//           value={formData.jmStaffEngineer}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//       </div>

//       <div>
//         <label className="block mb-2">Date</label>
//         <input
//           type="date"
//           name="date"
//           value={formData.date}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         />
//       </div>

//       <div>
//         <label className="block mb-2">Time</label>
//         <input
//           type="time"
//           name="time"
//           value={formData.time}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//       </div>

//       <div>
//         <label className="block mb-2">Client Name</label>
//         <input
//           type="text"
//           name="clientName"
//           value={formData.clientName}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//       </div>

//       <div>
//         <label className="block mb-2">Architect Name</label>
//         <input
//           type="text"
//           name="architectName"
//           value={formData.architectName}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//       </div>

//       <div>
//         <label className="block mb-2">Site Visit Checking Details</label>
//         <textarea
//           name="siteVisitCheckingDetails"
//           value={formData.siteVisitCheckingDetails}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//       </div>

//       {/* Checklist Section */}
//       <fieldset className="border p-4 rounded">
//         <legend className="text-lg font-semibold">Checklist</legend>
//         <div>
//           <label>
//             <input
//               type="checkbox"
//               name="propsTightAndStraight"
//               checked={formData.checklist.propsTightAndStraight}
//               onChange={(e) =>
//                 handleNestedChange(
//                   "checklist",
//                   "propsTightAndStraight",
//                   e.target.checked
//                 )
//               }
//             />{" "}
//             Props Tight and Straight
//           </label>
//         </div>
//         <div>
//           <label>
//             <input
//               type="checkbox"
//               name="defectiveMaterialsReplaced"
//               checked={formData.checklist.defectiveMaterialsReplaced}
//               onChange={(e) =>
//                 handleNestedChange(
//                   "checklist",
//                   "defectiveMaterialsReplaced",
//                   e.target.checked
//                 )
//               }
//             />{" "}
//             Defective Materials Replaced
//           </label>
//         </div>

//         {/* Nested Cover Provided Section */}
//         <fieldset className="border p-4 mt-4">
//           <legend className="text-md font-semibold">Cover Provided</legend>
//           {Object.keys(formData.checklist.coverProvided).map((key) => (
//             <div key={key}>
//               <label>
//                 <input
//                   type="checkbox"
//                   checked={formData.checklist.coverProvided[key]}
//                   onChange={(e) =>
//                     handleNestedChange("checklist", "coverProvided", {
//                       ...formData.checklist.coverProvided,
//                       [key]: e.target.checked,
//                     })
//                   }
//                 />{" "}
//                 {key}
//               </label>
//             </div>
//           ))}
//         </fieldset>
//       </fieldset>

//       <div>
//         <label className="block mb-2">Additional Remarks</label>
//         <textarea
//           name="additionalRemarks"
//           value={formData.additionalRemarks}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         />
//       </div>

//       <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//         Submit
//       </button>
//     </form>
//   );
// };

// export default SiteInspectionForm;
/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

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
    },
    additionalRemarks: "",
    specificNonCompliances: "",
    modificationPhoto: [],
    clientRepresentativeName: "",
    contractorRepresentativeName: "",
    clientSignature: null, // Store the signature as an image URL
  });

  const sigPadRef = useRef(); // Reference for the signature pad

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

  const clearSignature = () => {
    sigPadRef.current.clear(); // Clear the canvas
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sigPadRef.current) {
      const signatureData = sigPadRef.current.toDataURL(); // Get the signature as a data URL
      setFormData((prevData) => ({
        ...prevData,
        clientSignature: signatureData,
      }));
    }
    onSubmit(formData); // Pass the form data with the signature
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 space-y-6 bg-gray-100 rounded shadow max-w-4xl mx-auto"
    >
      <h2 className="text-xl font-bold mb-4 text-center">
        Site Inspection Form
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-semibold">Staff Engineer ID</label>
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
          <label className="block mb-2 font-semibold">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Time</label>
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
          <label className="block mb-2 font-semibold">Client Name</label>
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 font-semibold">Architect Name</label>
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
        <label className="block mb-2 font-semibold">
          Site Visit Checking Details
        </label>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </fieldset>

      <div>
        <label className="block mb-2 font-semibold">Client Signature</label>
        <SignatureCanvas
          ref={sigPadRef}
          canvasProps={{
            width: 500,
            height: 200,
            className: "border rounded bg-white w-full md:w-auto",
          }}
        />
        <button
          type="button"
          onClick={clearSignature}
          className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
        >
          Clear Signature
        </button>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white p-3 rounded w-full md:w-auto"
      >
        Submit
      </button>
    </form>
  );
};

export default SiteInspectionForm;
