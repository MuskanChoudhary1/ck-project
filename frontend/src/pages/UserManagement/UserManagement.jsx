import { useEffect, useState } from "react";
import "./UserManagement.css";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../api/userApi";   // Axios API
import { useAuth } from "../../context/AuthContext"; // RBAC Context

function UserManagement() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // check if user is read-only
  const { isReadOnly } = useAuth();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await getUsers();     
        setUsers(res.data);               
      } catch (error) {
        console.error("Failed to load users:", error);
      }
    };

    loadUsers();
  }, []);

  return (
    <div className="user-page">
      <div className="top">
        <h2>Users</h2>
      </div>

      <div className="user-management-container">
        <div className="btn-section">
          {/* Add User button disabled for Read Only */}
          <button
            className="add-btn"
            onClick={() => navigate("add-user")}
            disabled={isReadOnly}
            title={isReadOnly ? "Read Only cannot add users" : ""}
          >
            + Add New User
          </button>
        </div>

        <div className="table-wrapper">
          <table className="user-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email ID</th>
                <th>Role</th>
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
                    <span className="role-tag">{user.role}</span>
                  </td>
                  <td className="action-icons">
                    {/* Edit Icon disabled for Read Only */}
                    <EditIcon
                      className={`icon edit-icon ${isReadOnly ? "disabled-icon" : ""}`}
                      onClick={() => !isReadOnly && navigate(`edit-user/${user.id}`)}
                      style={{ cursor: isReadOnly ? "not-allowed" : "pointer" }}
                      title={isReadOnly ? "Read Only cannot edit" : "Edit User"}
                    />

                    {/* Resend Link button disabled for Read Only */}
                    <button
                      className="resend-btn"
                      disabled={isReadOnly}
                      title={isReadOnly ? "Read Only cannot resend link" : "Resend Link"}
                    >
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
