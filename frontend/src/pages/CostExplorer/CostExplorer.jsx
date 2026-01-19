import React, { useEffect, useState } from "react";

import CostFilters from "./components/CostFilters";
import CostChart from "./components/CostChart";
import CostTable from "./components/CostTable";

import FiltersPanel from "./components/FiltersPanel";
import { getCost } from "../../api/costApi";
import "./CostExplorer.css";

export default function CostExplorer() {

  const [showFilters, setShowFilters] = useState(false);
  
  const [groupBy, setGroupBy] = useState("SERVICE");
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-05-31");
  const [data, setData] = useState([]);

  useEffect(() => {
    getCost(groupBy, startDate, endDate).then((data) => {
      // console.log("DATA RECEIVED IN COMPONENT:", data);
      setData(data);
    });
  }, [groupBy, startDate, endDate]);

  return (
    <div className="costexplorer-container">
      <div className="costexplorer-header">
        <h2>Cost Explorer</h2>
        <p>Analyze your AWS cost trends over time</p>
      </div>

      <div className="cost-page">
        <CostFilters
          onToggleFilters={() => setShowFilters(!showFilters)}
          onGroupChange={setGroupBy}
        />

        <div className={`content-layout ${showFilters ? "filters-open" : ""}`}>
          <div className="main-content">
            {/* <CostChart data={data} /> */}
            <CostChart
              data={data}
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />

            <div className="info-banner">
              We are showing up to <b>1000</b> records by cost.
            </div>

            <CostTable data={data} />
          </div>

          {showFilters && <FiltersPanel />}
        </div>
      </div>
    </div>
  );
}
