import { useState } from "react";

/* import Users from "./Users";

import Demo from "./demo"; */
import { NavLink, Outlet } from "react-router-dom";
import AllReportPage from "./AllReportPage";

const Dashboard = () => {
  // State to keep track of the active page
  const [activePage, setActivePage] = useState("profile");

  // Content for each page
  const pagesContent = {
    profile: "Prfoile Users EMail and othe containt will come here ",
    settings: "Here are your Settings.".repeat(40),
    reports: <AllReportPage />,
  };

  return (
    <div className="flex h-screen">
      {/* Left Div: Sidebar */}
      <div className="w-1/5 bg-gray-200 p-4 sticky top-0 h-screen">
        <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
        <ul className="space-y-2">
          {Object.keys(pagesContent).map((page) => (
            <NavLink to={`/profile/${page}`} key={page}>
              <li
                className={`cursor-pointer p-2 rounded-md ${
                  activePage === page
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-300"
                }`}
                onClick={() => setActivePage(page)}
              >
                {page}
              </li>
            </NavLink>
          ))}
        </ul>
      </div>

      {/* Right Div: Page Content */}
      <div className="w-3/4 p-4 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">{activePage}</h2>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
