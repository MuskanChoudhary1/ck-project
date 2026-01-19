import { useState, useMemo } from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
import IconButton from "@mui/material/IconButton";

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";


Charts(FusionCharts);

// export default function CostChart({ data }) {
export default function CostChart({ data, startDate, endDate, setStartDate, setEndDate }) {

  const [chartType, setChartType] = useState("mscolumn2d");



  const { categories, dataset } = useMemo(() => {
    if (!data || data.length === 0) {
      return { categories: [], dataset: [] };
    }

    // Collect all months
    const months = [
      ...new Set(
        data.flatMap(s => s.monthlyCost.map(m => m.month))
      ),
    ];

    // X-axis
    const categories = [
      {
        category: months.map(m => ({ label: m })),
      },
    ];

    // Each service becomes one line/bar
    const dataset = data.map(service => ({
      seriesname: service.name,
      data: months.map(month => {
        const found = service.monthlyCost.find(m => m.month === month);
        return { value: found ? found.cost : 0 };
      }),
    }));

    return { categories, dataset };
  }, [data]);

  const chartConfigs = {
    type: chartType,
    width: "100%",
    height: "420",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Cost Trend",
        xAxisName: "Month",
        yAxisName: "Cost ($)",
        theme: "fusion",
        showValues: "0",
      },
      categories,
      dataset,
    },
  };

  return (
    <div className="chart-wrapper">

      {/* HEADER */}
      <div className="chart-header">
        <div className="chart-title">Cost Trend</div>

        <div className="chart-controls">
          {/* Date selectors (UI only for now) */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
  <div className="date-selector">
    
    <DatePicker
      label="Start Date"
      value={dayjs(startDate)}
      onChange={(newValue) => {
        setStartDate(newValue.format("YYYY-MM-DD"));
      }}
      slotProps={{ textField: { size: "small" } }}
    />

    <DatePicker
      label="End Date"
      value={dayjs(endDate)}
      onChange={(newValue) => {
        setEndDate(newValue.format("YYYY-MM-DD"));
      }}
      slotProps={{ textField: { size: "small" } }}
    />

  </div>
</LocalizationProvider>


          {/* Chart type buttons */}
          <div className="chart-icons">
            <IconButton
              size="small"
              color={chartType === "mscolumn2d" ? "primary" : "default"}
              onClick={() => setChartType("mscolumn2d")}
            >
              <BarChartIcon />
            </IconButton>

            <IconButton
              size="small"
              color={chartType === "msline" ? "primary" : "default"}
              onClick={() => setChartType("msline")}
            >
              <ShowChartIcon />
            </IconButton>

            <IconButton
              size="small"
              color={chartType === "stackedcolumn2d" ? "primary" : "default"}
              onClick={() => setChartType("stackedcolumn2d")}
            >
              <StackedBarChartIcon />
            </IconButton>
          </div>
        </div>
      </div>

      <div className="chart-container">
        <ReactFusioncharts {...chartConfigs} />
      </div>
    </div>
  );
}