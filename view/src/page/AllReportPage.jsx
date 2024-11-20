/* eslint-disable no-unused-vars */
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const truncateText = (text, limit) => {
  if (!text) return ""; // Handle cases where text might be undefined
  return text.length > limit ? text.slice(0, limit) + "..." : text;
};

const AllReportPage = () => {
  const [insurances, setInsurances] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(function () {
    async function getInsurances() {
      try {
        setIsLoading(true);
        setError("");
        const response = await axios.get(
          `http://127.0.0.1:3000/api/v1/sitereport`
        );
        console.log("response ", response.data.data); // Handle the response as needed

        if (response.status !== 200)
          throw new Error("Something went wrong with fetchintg crops");

        const cropsData = response.data.data;
        if (cropsData.length === 0) {
          throw new Error("No crops found");
        }
        setInsurances(cropsData);

        setIsLoading(false);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    getInsurances();
  }, []);
  return (
    <>
      <div className=" mx-auto max-w-screen-xl p-6">
        <div className="text-center ">
          <h1 className="text-4xl font-bold text-blue-400 mb-8 ">All Report</h1>
          <hr className="border-t-4 border-blue-600  mx-auto" />
        </div>
        {/* Search Button */}

        <label className="mt-10 mx-auto max-w-xl py-2 px-6 rounded-full bg-gray-50 border flex focus-within:border-gray-300">
          <input
            type="text"
            placeholder="Search anything"
            className="bg-transparent w-full focus:outline-none pr-4 font-semibold border-0 focus:ring-0 px-0 py-0"
            name="topic"
          />
          <button className="flex flex-row items-center justify-center min-w-[130px] px-4 rounded-full font-m tracking-wide border disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out duration-150 text-base bg-black text-white font-medium border-transparent py-1.5 h-[38px] -mr-3">
            Search
          </button>
        </label>

        {/* Report container */}
        <div className="flex flex-col gap-6 p-4 mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            <div
              key=""
              className="bg-white border border-gray-300 rounded-lg shadow-md p-4"
            >
              <div className="p-5 ">
                <h2 className="text-2xl font-semibold text-green-500 mb-4">
                  Report Name
                </h2>
                <p className="text-gray-500">
                  Comprehensive coverage for all crop types, with premium
                  support. Comprehensive coverage for all crop types, with
                  premium support. Comprehensive coverage for all crop types,
                  with premium support. Comprehensive coverage for all crop
                  types, with premium support. Reort Summary in short....
                </p>
                <Link to="">ViewMore</Link>
                <div className="flex justify-end mt-8 ">
                  <button className=" bg-gray-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    View More
                  </button>
                </div>
              </div>
            </div>
            <div
              key=""
              className="bg-white border border-gray-300 rounded-lg shadow-md p-4"
            >
              <div className="p-5 ">
                <h2 className="text-2xl font-semibold text-green-500 mb-4">
                  Report Name
                </h2>
                <p className="text-gray-500">
                  Comprehensive coverage for all crop types, with premium
                  support. Comprehensive coverage for all crop types, with
                  premium support. Comprehensive coverage for all crop types,
                  with premium support. Comprehensive coverage for all crop
                  types, with premium support. Reort Summary in short
                </p>
              </div>
            </div>
            <div
              key=""
              className="bg-white border border-gray-300 rounded-lg shadow-md p-4"
            >
              <div className="p-5 ">
                <h2 className="text-2xl font-semibold text-green-500 mb-4">
                  Report Name
                </h2>
                <p className="text-gray-500">
                  Comprehensive coverage for all crop types, with premium
                  support. Comprehensive coverage for all crop types, with
                  premium support. Comprehensive coverage for all crop types,
                  with premium support. Comprehensive coverage for all crop
                  types, with premium support. Reort Summary in short
                </p>
              </div>
            </div>
            <div
              key=""
              className="bg-white border border-gray-300 rounded-lg shadow-md p-4"
            >
              <div className="p-5 ">
                <h2 className="text-2xl font-semibold text-green-500 mb-4">
                  Report Name
                </h2>
                <p className="text-gray-500">
                  Comprehensive coverage for all crop types, with premium
                  support. Comprehensive coverage for all crop types, with
                  premium support. Comprehensive coverage for all crop types,
                  with premium support. Comprehensive coverage for all crop
                  types, with premium support. Reort Summary in short
                </p>
              </div>
            </div>
            <div
              key=""
              className="bg-white border border-gray-300 rounded-lg shadow-md p-4"
            >
              <div className="p-5 ">
                <h2 className="text-2xl font-semibold text-green-500 mb-4">
                  Report Name
                </h2>
                <p className="text-gray-500">
                  Comprehensive coverage for all crop types, with premium
                  support. Comprehensive coverage for all crop types, with
                  premium support. Comprehensive coverage for all crop types,
                  with premium support. Comprehensive coverage for all crop
                  types, with premium support. Reort Summary in short
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllReportPage;
