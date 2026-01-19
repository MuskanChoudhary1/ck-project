import "./Header.css";
import logo from "../../assets/CloudKeeper_Logo.jpg";

import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { useSidebar } from "../../context/SidebarContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import { useEffect, useState } from "react";
import { getMe } from "../../api/userApi";

function Header() {
  const { toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const { logout, name, role } = useAuth(); // get name from AuthContext

  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");

  useEffect(() => {
    if (role === "CUSTOMER") {
      getMe().then((res) => {
        setAccounts(res.data.accountIds || []);
        if (res.data.accountIds?.length) {
          setSelectedAccount(res.data.accountIds[0]);
          localStorage.setItem("activeAccount", res.data.accountIds[0]);
        }
      });
    }
  }, [role]);

  const handleLogout = () => {
    logout(); // clears token, role, and name
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="logo" className="header-logo" />

        <button className="toggle-btn" onClick={toggleSidebar}>
          &#9776;
        </button>

        {role === "CUSTOMER" && accounts.length > 0 && (
          <select
            className="account-dropdown"
            value={selectedAccount}
            onChange={(e) => {
              setSelectedAccount(e.target.value);
              localStorage.setItem("activeAccount", e.target.value);
            }}
          >
            {accounts.map((acc) => (
              <option key={acc} value={acc}>
                Account {acc}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="header-right">
        <div className="welcome-box">
          <div className="user-icon">
            <GroupOutlinedIcon />
          </div>

          <div className="welcome-text">
            <span className="welcome-label">Welcome,</span>
            <span className="profile-name">{name || "User"}</span>
          </div>

          <InfoOutlinedIcon className="info-icon" />
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <LogoutOutlinedIcon className="logout-icon" />
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
