import { useState } from "react";
import TuneIcon from "@mui/icons-material/Tune";

export default function CostFilters({ onToggleFilters, onGroupChange }) {
  const allFilters = [
    "Service",
    "Instance Type",
    "Account ID",
    "Usage Type",
    "Platform",
    "Region",
    "Tenancy",
    "Usage Type Group",
    "Purchase Option",
    "API Operation",
    "Resource",
    "Availability Zone",
    "Legal Entity",
    "Billing Entity"
  ];

  const GROUP_MAP = {
    "Service": "SERVICE",
    "Instance Type": "INSTANCE_TYPE",
    "Account ID": "ACCOUNT_ID",
    "Usage Type": "USAGE_TYPE",
    "Platform": "PLATFORM",
    "Region": "REGION",
    "Tenancy": "TENANCY",
    "Usage Type Group": "USAGE_TYPE_GROUP",
    "Purchase Option": "PURCHASE_OPTION",
    "API Operation": "API_OPERATION",
    "Resource": "RESOURCE",
    "Availability Zone": "AVAILABILITY_ZONE",
    "Legal Entity": "LEGAL_ENTITY",
    "Billing Entity": "BILLING_ENTITY"
  };

  // first 6 shown
  const [visible, setVisible] = useState(allFilters.slice(0, 6));
  // rest in more
  const [hidden, setHidden] = useState(allFilters.slice(6));

  const [selected, setSelected] = useState("Service");
  const [showMore, setShowMore] = useState(false);

  function handleSelect(item) {
    setSelected(item);

    // send backend column to CostExplorer
    onGroupChange(GROUP_MAP[item]);
  }

  function handleMoreClick(item) {
    // remove clicked item from hidden
    const newHidden = hidden.filter((f) => f !== item);

    // remove last visible
    const removed = visible[visible.length - 1];

    // put removed into hidden
    newHidden.push(removed);

    // add clicked item into visible
    const newVisible = [...visible.slice(0, 5), item];

    setVisible(newVisible);
    setHidden(newHidden);
    setSelected(item);
    setShowMore(false);

    // notify backend
    onGroupChange(GROUP_MAP[item]);
  }

  return (
    <div className="filters-bar">
      <div className="filters-left">
        <span style={{ fontSize: "13px", fontWeight: "bold" }}>Group By:</span>

        {visible.map((f) => (
          <button
            key={f}
            className={`filter-btn ${selected === f ? "active" : ""}`}
            onClick={() => handleSelect(f)}
          >
            {f}
          </button>
        ))}

        <div style={{ position: "relative" }}>
          <button className="filter-btn" onClick={() => setShowMore(!showMore)}>
            More 
          </button>

          {showMore && (
            <div className="more-dropdown">
              {hidden.map((f) => (
                <div
                  key={f}
                  className="more-item"
                  onClick={() => handleMoreClick(f)}
                >
                  {f}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="filters-right">
        <button className="filter-btn" onClick={onToggleFilters}>
          <TuneIcon style={{ fontSize: 18 }} />
        </button>
      </div>
    </div>
  );
}
