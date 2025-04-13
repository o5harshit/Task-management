import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-[18%] h-screen border-r border-gray-300 flex flex-col pt-10 gap-3">
      {/* Add Items */}
      <NavLink
        to="/AddProject"
        className={({ isActive }) =>
          `px-4 py-2 text-sm font-medium rounded-r-md border-l-4 transition-all ${
            isActive
              ? "bg-[#fff0ed] border-[tomato] text-[tomato]"
              : "hover:bg-gray-100 border-transparent"
          }`
        }
      >
        Add Project
      </NavLink>

      {/* List Items */}
      <NavLink
        to="/AllProjects"
        className={({ isActive }) =>
          `px-4 py-2 text-sm font-medium rounded-r-md border-l-4 transition-all ${
            isActive
              ? "bg-[#fff0ed] border-[tomato] text-[tomato]"
              : "hover:bg-gray-100 border-transparent"
          }`
        }
      >
        All Projects
      </NavLink>

      {/* Orders */}
      <NavLink
        to="/AllMembers"
        className={({ isActive }) =>
          `px-4 py-2 text-sm font-medium rounded-r-md border-l-4 transition-all ${
            isActive
              ? "bg-[#fff0ed] border-[tomato] text-[tomato]"
              : "hover:bg-gray-100 border-transparent"
          }`
        }
      >
        All Members
      </NavLink>
    </div>
  );
}
