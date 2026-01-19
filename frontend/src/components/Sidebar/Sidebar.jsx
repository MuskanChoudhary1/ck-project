import { NavLink } from "react-router-dom";
import "./Sidebar.css";

import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloudIcon from '@mui/icons-material/Cloud';

import { useSidebar } from "../../context/SidebarContext";
import { useAuth } from "../../context/AuthContext";


function Sidebar() {
  const { isSidebarOpen } = useSidebar();
  const { role } = useAuth();
  return (
    
    <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>

      <h3 className="sidebar-title"><span>CloudBalance</span></h3>

      <nav className="sidebar-nav">                                                                                                                                                                                                                                                                                                                                                                                                           
        <ul>                                                                                                                                                                                                                                                
          {/* Dashboard */}
          <li>
            <NavLink to="/dashboard" end   // THIS FIXES THE ALWAYS-ACTIVE ISSUE
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <DashboardIcon className="sidebar-icon" />
              <span>Dashboard</span>                                                                                                                                                                                                                                                             
            </NavLink>
          </li>

          {/* User Management */}
          {(role === "ADMIN" || role === "READ_ONLY") && (
            <li>
            <NavLink to="/dashboard/user-management" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <PeopleIcon className="sidebar-icon" />
              <span>User Management</span>
            </NavLink>
          </li>
          )}

          {/* Onboarding */}
        
          {(role === "ADMIN" || role === "READ_ONLY") && (
            <li>
            <NavLink to="/dashboard/onboarding" className={({ isActive }) => isActive ? "nav-link active" : "nav-link" }>
                <AddBoxIcon className="sidebar-icon" />
              <span>Onboarding</span>
            </NavLink>
          </li>
          )}

        

          {/* Cost Explorer */}
          <li>
            <NavLink to="/dashboard/cost-explorer" className={({ isActive }) => isActive ? "nav-link active" : "nav-link" }>
                <AttachMoneyIcon className="sidebar-icon" />
              <span>Cost Explorer</span>
            </NavLink>
          </li>

          {/* AWS Services */}
          <li>
            <NavLink to="/dashboard/aws-services" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                <CloudIcon className="sidebar-icon" />
              <span>AWS Services</span>
            </NavLink>
          </li>

        </ul>
      </nav>

    </aside>
  );
}

export default Sidebar;
