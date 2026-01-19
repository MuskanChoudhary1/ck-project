import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser } from "../../../api/userApi";
import { getAccounts } from "../../../api/accountApi";
import { toast } from "react-toastify";

function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  // Dual box state
  const [availableAccounts, setAvailableAccounts] = useState([]);
  const [assignedAccounts, setAssignedAccounts] = useState([]);
  const [accountsLoaded, setAccountsLoaded] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await getUserById(id);
        const user = res.data;

        // Set form fields
        setForm({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        });

        // Only if role is CUSTOMER, load accounts
        if (user.role === "CUSTOMER") {
          const allAccounts = await getAccounts(); // get all accounts from backend
          const assignedIds = user.accountIds || []; // accounts already assigned to user
          console.log("Assigned IDs:", assignedIds);

          // Assigned = accounts matching assignedIds
          const assigned = allAccounts.data.filter((acc) =>
            assignedIds.includes(acc.id)
          );

          // Available = rest
          const available = allAccounts.data.filter(
            (acc) => !assignedIds.includes(acc.id)
          );

          setAssignedAccounts(assigned);
          setAvailableAccounts(available);
          setAccountsLoaded(true);
        }
      } catch (err) {
        toast.error("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  // Form input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // If role changes
    if (name === "role") {
      setForm((prev) => ({ ...prev, role: value }));

      if (value === "CUSTOMER" && !accountsLoaded) {
        getAccounts().then((res) => {
          setAvailableAccounts(res.data);
          setAssignedAccounts([]);
          setAccountsLoaded(true);
        });
      } else if (value !== "CUSTOMER") {
        setAvailableAccounts([]);
        setAssignedAccounts([]);
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Dual box move functions
  const moveToAssigned = (acc) => {
    setAssignedAccounts([...assignedAccounts, acc]);
    setAvailableAccounts(availableAccounts.filter((a) => a.id !== acc.id));
  };

  const moveToAvailable = (acc) => {
    setAvailableAccounts([...availableAccounts, acc]);
    setAssignedAccounts(assignedAccounts.filter((a) => a.id !== acc.id));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Enter a valid email";
    if (!form.role) newErrors.role = "Please select a role";
    if (form.role === "CUSTOMER" && assignedAccounts.length === 0)
      newErrors.accounts = "Please assign at least one account";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...form,
      accountIds:
        form.role === "CUSTOMER" ? assignedAccounts.map((a) => a.id) : [],
    };

    try {
      await updateUser(id, payload);
      toast.success("User updated successfully");
      navigate("/dashboard/user-management");
    } catch (err) {
      toast.error("Failed to update user");
    }
  };

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div className="add-user-page">
      <h2>Edit User</h2>
      <form className="form-card" onSubmit={handleSubmit}>
        {/* Name Fields */}
        <div className="form-row">
          <div className="form-group">
            <label>First Name *</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <p className="error">{errors.firstName}</p>}
          </div>
          <div className="form-group">
            <label>Last Name *</label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <p className="error">{errors.lastName}</p>}
          </div>
        </div>

        {/* Email + Role */}
        <div className="form-row">
          <div className="form-group">
            <label>Email *</label>
            <input name="email" value={form.email} onChange={handleChange} />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label>Role *</label>
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="">Select Role</option>
              <option value="ADMIN">Admin</option>
              <option value="READ_ONLY">Read Only</option>
              <option value="CUSTOMER">Customer</option>
            </select>
            {errors.role && <p className="error">{errors.role}</p>}
          </div>
        </div>

        {/* Accounts dual box (like AddUser) */}
        {form.role === "CUSTOMER" && (
          <div className="account-dualbox">
            {/* Available Accounts */}
            <div className="account-box">
              <div className="box-header">Available Accounts</div>
              <div className="box-list">
                {availableAccounts.map((acc) => (
                  <div key={acc.id} className="account-row">
                    <input
                      type="checkbox"
                      onChange={() => moveToAssigned(acc)}
                    />
                    <div className="text-col">
                      {acc.accountId} ({acc.accountName})
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assigned Accounts */}
            <div className="account-box">
              <div className="box-header">Assigned Accounts</div>
              <div className="box-list">
                {assignedAccounts.map((acc) => (
                  <div key={acc.id} className="account-row">
                    <input
                      type="checkbox"
                      checked
                      onChange={() => moveToAvailable(acc)}
                    />
                    <div className="text-col">
                      {acc.accountId} ({acc.accountName})
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="button-group">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/dashboard/user-management")}
          >
            Cancel
          </button>
          <button type="submit" className="save-btn">
            Update User
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUser;
