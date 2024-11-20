/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import axios from "axios";

const SiteReport = () => {
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // "all", "checked", "unchecked"
  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:3000/api/v1/sitereport/673dd0454b905bf6321e4e81"
        );
        setReportData(response.data.data.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch report data");
        setIsLoading(false);
      }
    };

    fetchReportData();
  }, []);
  const handleFilterChange = (e) => setFilter(e.target.value);

  const filterChecklist = (checklist) => {
    return checklist.filter((item) => {
      const isChecked = item.subItems
        ? Object.values(reportData?.checklist[item.key] || {}).every(Boolean)
        : reportData?.checklist[item.key];

      if (filter === "checked") return isChecked;
      if (filter === "unchecked") return !isChecked;
      return true; // "all"
    });
  };
  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  const leftColumnChecklist = [
    {
      key: "propsTightAndStraight",
      description:
        "All props are tight, straight, vertical, and adequately braced.",
    },
    {
      key: "defectiveMaterialsReplaced",
      description:
        "Twisted, defective, spliced, damaged, decayed props, planks, plates, plywood, etc., are removed/replaced.",
    },
    {
      key: "formworkCleaned",
      description: "Formwork is cleaned thoroughly.",
    },
    {
      key: "formworkWatertight",
      description: "Formwork is watertight.",
    },
    {
      key: "columnBeamSecured",
      description:
        "Formwork of columns and beams is in line, plumb, and secured against loads and thrust.",
    },
    {
      key: "formworkslabchhajja",
      description:
        "Formwork of slabs, chhajja etc is in level and ensured strong enough to take the loads and thrusts",
    },
    {
      key: "slabUnderPropped",
      description:
        "For slabs thicker than 150 mm, the immediate lower slab is also kept under propped condition.",
    },
    {
      key: "coverProvided",
      description:
        "Adequate & appropriate cover at the following locations provided:",
      subItems: [
        { key: "columnReinforcement", label: "Column reinforcement" },
        { key: "beamBottoms", label: "Beam bottoms" },
        { key: "beamSides", label: "Beam sides" },
        { key: "slabBottom", label: "Slab bottom" },
        { key: "chajjaSlabSlides", label: "Chajja, slab sides" },
      ],
    },
    {
      key: "chairsProvided",
      description: "Adequate & appropriate chairs are provided.",
    },
    {
      key: "spacerBarsProvided",
      description:
        "Adequate & appropriate spacer bars are provided between two layers of reinforcement in beams.",
    },
    {
      key: "columnRingsProvided",
      description:
        "Column rings/ties are provided at beam junctions for full depth of the beam.",
    },
    {
      key: "cubeSamplesTaken",
      description:
        "Cube samples shall be taken as per IS: 456-2000. Test reports are submitted to consultants.",
    },
  ];

  const rightColumnChecklist = [
    {
      key: "dowelBarsProvided",
      description:
        "Appropriate dowel bars are provided at the following locations:",
      subItems: [
        { key: "elevationPurdies", label: "Elevation purdies & up stands" },
        { key: "hangerColumn", label: "Hanger columns, stub columns" },
        {
          key: "futureBeamSlabStaircaseFlights",
          label: "Future beams/slabs/staircase fillings.",
        },
      ],
    },
    {
      key: "noChamberInBeamSlab",
      description:
        "No camber shall be provided in beams & slabs unless noted otherwise & specifically approved by the consultant in writing.",
    },
    {
      key: "shoringShuttingDone",
      description:
        "Proper shoring & strutting to all sides of excavation is done.",
    },
    {
      key: "basementHolesPermission",
      description:
        "Necessary holes are provided in the basement raft with prior permission of the consultants.",
    },
    {
      key: "reinforcementTested",
      description:
        "The lot of reinforcement in use is tested in the laboratory, and the reports are submitted to the consultant.",
    },
    {
      key: "formworkStriking",
      description:
        "Striking of formwork shall only be started after 70% of the characteristic strength of concrete is established.",
    },
    {
      key: "slabThicknessUnderpropped",
      description:
        "For all slabs thicker than 150 mm, the immediate lower slab shall also be under propped condition.",
    },
    {
      key: "ptBeamsDimensions",
      description:
        "The dimension and reinforcement of PT beams & slabs are checked & certified by PT Agency.",
    },
    {
      key: "ptBeamsFormwork",
      description:
        "Centering, shuttering & formwork of PT beams & PT slabs shall not be removed until stressing and grouting is completed by PT agency.",
    },
  ];

  const renderChecklistItem = (item, index, isRightColumn = false) => (
    <tr key={item.key} className="border-t hover:bg-gray-50 transition-colors">
      <td className="border-r p-3 text-center align-top w-12">
        <input
          type="checkbox"
          checked={
            item.subItems
              ? Object.values(reportData?.checklist[item.key] || {}).every(
                  Boolean
                )
              : reportData?.checklist[item.key]
          }
          readOnly
          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      </td>
      <td className="border-r p-3 text-center align-top w-12 font-medium text-gray-700">
        {isRightColumn ? index + leftColumnChecklist.length + 1 : index + 1}
      </td>
      <td className="p-3">
        <div className="text-sm md:text-base text-gray-700">
          {item.description}
        </div>
        {item.subItems && (
          <ul className="list-none pl-4 mt-3 space-y-2">
            {item.subItems.map((subItem, subIndex) => (
              <li key={subItem.key} className="flex items-center text-gray-600">
                <input
                  type="checkbox"
                  checked={reportData?.checklist[item.key]?.[subItem.key]}
                  readOnly
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
                />
                <span className="text-sm">{`${subIndex + 1}. ${
                  subItem.label
                }`}</span>
              </li>
            ))}
          </ul>
        )}
      </td>
    </tr>
  );
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          {/* Header Section */}
          <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
            <div className="px-6 py-4">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Site Inspection Report
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Side - Info and Details */}
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                    <div className="space-y-3">
                      <p className="flex items-center">
                        <span className="font-semibold text-gray-700 w-32">
                          Engineer:
                        </span>
                        <span className="text-gray-600">
                          {reportData.jmStaffEngineer.name}
                        </span>
                      </p>
                      <p className="flex items-center">
                        <span className="font-semibold text-gray-700 w-32">
                          Client:
                        </span>
                        <span className="text-gray-600">
                          {reportData.clientName}
                        </span>
                      </p>
                      <p className="flex items-center">
                        <span className="font-semibold text-gray-700 w-32">
                          Architect:
                        </span>
                        <span className="text-gray-600">
                          {reportData.architectName}
                        </span>
                      </p>
                      <p className="flex items-center">
                        <span className="font-semibold text-gray-700 w-32">
                          Date:
                        </span>
                        <span className="text-gray-600">
                          {new Date(reportData.date).toLocaleDateString()}
                        </span>
                      </p>
                    </div>
                  </div>
                  {/* Site Visit Details */}
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">
                      Site Visit Details
                    </h2>
                    <div className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                      {reportData.siteVisitCheckingDetails}
                    </div>
                  </div>

                  {/* <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">
                      Non-Compliance Issues
                    </h2>
                    <div className="text-gray-600 bg-red-50 p-4 rounded-lg">
                      {reportData.specificNonCompliances}
                    </div>
                  </div> */}
                </div>

                {/* Right Side - Site Photos */}
                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Site Photos
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {reportData.sitePhotos.map((photo, index) => (
                        <div
                          key={`site-${index}`}
                          className="aspect-square relative group"
                        >
                          <img
                            src={photo}
                            alt={`Site ${index + 1}`}
                            className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Non-Compliance Issues
              </h2>
              <div className="text-gray-600 bg-red-50 p-4 rounded-lg">
                {reportData.specificNonCompliances}
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center mt-4 ml-4 mr-5 space-x-2">
            <label htmlFor="filter" className="text-gray-700 font-medium">
              Filter:
            </label>
            <select
              id="filter"
              value={filter}
              onChange={handleFilterChange}
              className="rounded-md border border-gray-300 text-gray-700 p-2"
            >
              <option value="all">All Items</option>
              <option value="checked">Checked Items</option>
              <option value="unchecked">Unchecked Items</option>
            </select>
          </div>

          {/* Checklist Section */}
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  General Compliance Checklist
                </h2>
                <p className="text-gray-600 mb-6">
                  Ensure the following items are compliant before concreting:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="overflow-hidden rounded-lg border border-gray-200">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="w-12 p-3 border-r text-center font-semibold text-gray-700">
                            ✓
                          </th>
                          <th className="w-12 p-3 border-r text-center font-semibold text-gray-700">
                            No.
                          </th>
                          <th className="p-3 text-left font-semibold text-gray-700">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filterChecklist(leftColumnChecklist).map(
                          (item, index) => renderChecklistItem(item, index)
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Right Column */}
                  <div className="overflow-hidden rounded-lg border border-gray-200">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="w-12 p-3 border-r text-center font-semibold text-gray-700">
                            ✓
                          </th>
                          <th className="w-12 p-3 border-r text-center font-semibold text-gray-700">
                            No.
                          </th>
                          <th className="p-3 text-left font-semibold text-gray-700">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filterChecklist(rightColumnChecklist).map(
                          (item, index) =>
                            renderChecklistItem(item, index, true)
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modification Photos */}
          <div className="px-6 pb-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Modification Photos
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {reportData.modificationPhoto.map((photo, index) => (
                  <div
                    key={`mod-${index}`}
                    className="aspect-square relative group"
                  >
                    <img
                      src={photo}
                      alt={`Modification ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Permission Section */}
          <div className="bg-gray-50 px-6 py-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Permission Status
              </h2>
              <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="space-y-2">
                  <p className="flex items-center text-green-700">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    May be concreted after attending the above points and with
                    due intimation to the architect.
                  </p>
                  <p className="flex items-center text-red-700">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Will not be concreted before attending all points and
                    checking/permission from the engineer.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto px-4 py-6">
            <table className="w-full border-collapse text-sm md:text-base bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left font-medium text-gray-700">
                    Agency
                  </th>
                  <th className="border p-3 text-left font-medium text-gray-700">
                    For Jayesh Makwana
                  </th>
                  <th className="border p-3 text-left font-medium text-gray-700">
                    Clients Representative
                  </th>
                  <th className="border p-3 text-left font-medium text-gray-700">
                    Contractors Representative
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3 text-gray-600">Signature & Time</td>
                  <td className="border p-3"></td>
                  <td className="border p-3"></td>
                  <td className="border p-3"></td>
                </tr>
                <tr>
                  <td className="border p-3 text-gray-600">Name</td>
                  <td className="border p-3"></td>
                  <td className="border p-3 font-semibold text-gray-900">
                    {reportData.clientRepresentativeName}
                  </td>
                  <td className="border p-3 font-semibold text-gray-900">
                    {reportData.contractorRepresentativeName}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteReport;
