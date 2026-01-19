
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CloseIcon from "@mui/icons-material/Close";

export default function FiltersPanel({ onClose }) {
  const filters = [
    // "Service", "Instance Type", "Account ID", "Usage Type",
    // "Platform", "Region", "Usage Type Group", "Purchase Option",
    // "API Operation", "Resource", "Charge Type",
    // "Availability Zone", "Tenancy", "Legal Entity"
  ];

  // store checkbox state
  const [checked, setChecked] = useState({});

  const handleToggle = (name) => {
    setChecked((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleReset = () => {
    setChecked({});   // clears all checkboxes
  };

  return (
    <div className="filters-panel">
      
      {/* HEADER */}
      <div className="filters-header">
        <span className="filters-title">Filters</span>

        <div className="filters-actions">
          <button className="reset-btn" onClick={handleReset}>
            <RestartAltIcon sx={{ fontSize: 18 }} />
            Reset all
          </button>

          {/* <IconButton size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton> */}
        </div>
      </div>

      {/* FILTER LIST */}
      {filters.map((f) => (
        <div className="filter-row" key={f}>
          <div className="filter-left">
            <Checkbox
              size="small"
              checked={!!checked[f]}
              onChange={() => handleToggle(f)}
            />
            <span className="filter-text">{f}</span>
          </div>

          <span className="include-only">Include only</span>
        </div>
      ))}
    </div>
  );
}

