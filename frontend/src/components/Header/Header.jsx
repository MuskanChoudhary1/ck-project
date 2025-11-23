import "./Header.css";
import logo from "../../assets/CloudKeeper_Logo.jpg";  

import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

function Header() {
  return (
    <header className="header">

      <div className="header-left">
        <img src={logo} alt="logo" className="header-logo" />

        <button className="toggle-btn">
          &#9776;
        </button>
      </div>

      <div className="header-right">
        
         <div className="welcome-box">
          <div className="user-icon">
            <GroupOutlinedIcon />
          </div>

          <div className="welcome-text">
            <span className="welcome-label">Welcome,</span>
            <span className="profile-name">Muskan</span>
          </div>

          <InfoOutlinedIcon className="info-icon" />
        </div>

        <button className="logout-btn">
          <LogoutOutlinedIcon className="logout-icon" />
          Logout
        </button>
        
      </div>

    </header>
  );
}

export default Header;
