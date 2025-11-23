import React, { useState } from "react";
import "./UserManagement.css";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";

function UserManagement() {

    const navigate = useNavigate();

  const users = [
    {
      id: 1,
      firstName: "Muskan",
      lastName: "Choudhary",
      email: "muskan@gmail.com",
      roles: ["Admin", "Read Only"],
      lastLogin: "30/01/2025 11:34",
    },
    {
      id: 2,
      firstName: "Alexa",
      lastName: "Choudhary",
      email: "alexa@gmail.com",
      roles: ["Admin"],
      lastLogin: "28/01/2025 09:11",
    },
    {
      id: 3,
      firstName: "Siri",
      lastName: "Choudhary",
      email: "siri@gmail.com",
      roles: ["Read Only"],
      lastLogin: "26/01/2025 14:52",
    },
    {
      id: 4,
      firstName: "Test",
      lastName: "Admin",
      email: "test@gmail.com",
      roles: ["Admin", "Read Only"],
      lastLogin: "15/01/2025 12:12",
    },
    {
      id: 5,
      firstName: "ck",
      lastName: "Bootcamp",
      email: "ck@gmail.com",
      roles: ["Admin"],
      lastLogin: "14/01/2025 10:10",
    },
  ];

  return (
    <div className="user-page">

      <div className="top">
        <h2>Users</h2>
      </div>

    <div className="user-management-container">

  <div className="btn-section">
    <button className="add-btn" onClick={() => navigate("add-user")}>+ Add New User</button>
    <button className="reset-btn">Reset Filters</button>
  </div>

  <div className="table-wrapper">
    <table className="user-table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email ID</th>
          <th>Roles</th>
          <th>Last Login</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>

            <td>
              <div className="roles-box">
                {user.roles.map((role, index) => (
                  <span key={index} className="role-tag">
                    {role}
                  </span>
                ))}
              </div>
            </td>

            <td>{user.lastLogin}</td>

            <td className="action-icons">
              <EditIcon className="icon edit-icon" />

              <button className="resend-btn">
                <SendIcon style={{ fontSize: "16px", marginRight: "5px" }} />
                Resend Link
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

</div>


      
    </div>
  );
}

export default UserManagement;
