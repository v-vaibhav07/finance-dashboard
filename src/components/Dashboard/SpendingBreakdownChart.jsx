import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useApp } from "../../context/AppContext";
import { getCategoryBreakdown, formatCurrency } from "../../utils/helpers";
import { COLORS } from "../../data/mockData";
import { PieChart as PieIcon, TrendingDown } from "lucide-react";
import "./Charts.css";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    const pct = data.payload.percent
      ? (data.payload.percent * 100).toFixed(1)
      : null;
    return (
      <div className="chart-tooltip">
        <p className="tooltip-label">{data.name}</p>
        <div className="tooltip-row">
          <span className="tooltip-name">
            <span
              className="tooltip-dot"
              style={{ background: data.payload.fill }}
            />
            Amount
          </span>
          <p
            className="tooltip-value"
            style={{ color: data.payload.fill }}
          >
            {formatCurrency(data.value)}
          </p>
        </div>
        {pct && (
          <div className="tooltip-row">
            <span className="tooltip-name">Share</span>
            <p className="tooltip-value" style={{ color: "var(--text-secondary)" }}>
              {pct}%
            </p>
          </div>
        )}
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ data }) => (
  <div className="pie-legend">
    {data.map((entry, index) => (
      <div key={index} className="pie-legend-item">
        <span
          className="pie-legend-dot"
          style={{ background: COLORS[index % COLORS.length] }}
        />
        <span className="pie-legend-text">{entry.name}</span>
      </div>
    ))}
  </div>
);

const SpendingBreakdownChart = () => {
  const { transactions } = useApp();
  const categoryData = getCategoryBreakdown(transactions);

  if (categoryData.length === 0) {
    return (
      <div className="chart-container">
        <div className="chart-header">
          <div className="chart-header-left">
            <h3 className="chart-title">
              <div className="chart-title-icon">
                <PieIcon size={15} />
              </div>
              Spending Breakdown
            </h3>
            <p className="chart-subtitle">By category</p>
          </div>
        </div>
        <div className="chart-empty">
          <div className="chart-empty-icon">🍩</div>
          <p>No expense data available</p>
        </div>
      </div>
    );
  }

  const total = categoryData.reduce((sum, item) => sum + item.value, 0);

  // Add percent to each entry for tooltip
  const dataWithPercent = categoryData.map((item) => ({
    ...item,
    percent: item.value / total,
  }));

  return (
    <div className="chart-container">
      <div className="chart-header">
        <div className="chart-header-left">
          <h3 className="chart-title">
            <div className="chart-title-icon">
              <PieIcon size={15} />
            </div>
            Spending Breakdown
          </h3>
          <p className="chart-subtitle">Expenses by category</p>
        </div>
        <div className="chart-badge">
          <TrendingDown size={12} />
          {categoryData.length} categories
        </div>
      </div>

      <div className="chart-wrapper pie-wrapper">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={dataWithPercent}
              cx="50%"
              cy="48%"
              innerRadius={62}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {dataWithPercent.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <div className="donut-center">
          <p className="donut-label">Total Spent</p>
          <p className="donut-value">{formatCurrency(total)}</p>
        </div>
      </div>

      <CustomLegend data={categoryData} />
    </div>
  );
};

export default SpendingBreakdownChart;