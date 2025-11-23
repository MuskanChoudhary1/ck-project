import { NavLink } from "react-router-dom";
import "./Sidebar.css";

import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloudIcon from '@mui/icons-material/Cloud';


function Sidebar() {
  return (
    <aside className="sidebar">

      <h3 className="sidebar-title">CloudBalance</h3>

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
              Dashboard                                                                                                                                                                                                                                                             
            </NavLink>
          </li>

          {/* User Management */}
          <li>
            <NavLink to="/dashboard/user-management" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <PeopleIcon className="sidebar-icon" />
              User Management
            </NavLink>
          </li>

          {/* Onboarding */}
          <li>
            <NavLink to="/dashboard/onboarding" className={({ isActive }) => isActive ? "nav-link active" : "nav-link" }>
                <AddBoxIcon className="sidebar-icon" />
              Onboarding
            </NavLink>
          </li>

          {/* Cost Explorer */}
          <li>
            <NavLink to="/dashboard/cost-explorer" className={({ isActive }) => isActive ? "nav-link active" : "nav-link" }>
                <AttachMoneyIcon className="sidebar-icon" />
              Cost Explorer
            </NavLink>
          </li>

          {/* AWS Services */}
          <li>
            <NavLink to="/dashboard/aws-services" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                <CloudIcon className="sidebar-icon" />
              AWS Services
            </NavLink>
          </li>

        </ul>
      </nav>

    </aside>
  );
}

export default Sidebar;
