import "./AddUser.css";

function AddUser() {
  return (
    <div className="add-user-page">

      <h2>Add New User</h2>

      <div className="form-card">

        <div className="form-row">
          <div className="form-group">
            <label>First Name *</label>
            <input type="text" placeholder="Enter First Name" />
          </div>

          <div className="form-group">
            <label>Last Name *</label>
            <input type="text" placeholder="Enter Last Name" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email ID *</label>
            <input type="email" placeholder="Enter Email ID" />
          </div>

          <div className="form-group">
            <label>Select Roles</label>
            <select>
              <option>Select Roles</option>
              <option>Admin</option>
              <option>Read Only</option>
            </select>
          </div>
        </div>

        <button className="save-btn">Save User</button>

      </div>

    </div>
  );
}

export default AddUser;
