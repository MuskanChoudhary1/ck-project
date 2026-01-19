import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import "../Onboarding.css";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Step1Account({onNext}) {
    // const navigate = useNavigate();

  return (

    <div className="accounts-page">
      <div className="accounts-header">
        <h2>Accounts</h2>
      </div>

      <div className="link-accounts">
        <FolderOutlinedIcon className="folder-icon" style={{ fontSize: 80, color: "#4292cc", marginBottom: "20px" }} />

        <h3>No Accounts are linked</h3>
        <p>Click below to start linking your Accounts.</p>

        <button
          className="primary-btn"
        //   onClick={() => navigate("add")}
        onClick={onNext}
        >
          Link Account
        </button>
      </div>
    </div>

  );
}

export default Step1Account;
