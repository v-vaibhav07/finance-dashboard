















import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useApp } from "../../context/AppContext";
import { getMonthlyData, formatCurrency } from "../../utils/helpers";
import { BarChart2, Calendar } from "lucide-react";
import "./Charts.css";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="tooltip-label">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="tooltip-row">
            <span className="tooltip-name">
              <span
                className="tooltip-dot"
                style={{ background: entry.fill }}
              />
              {entry.name}
            </span>
            <p
              className="tooltip-value"
              style={{ color: entry.fill }}
            >
              {formatCurrency(entry.value)}
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const BalanceTrendChart = () => {
  const { transactions } = useApp();
  const monthlyData = getMonthlyData(transactions);

  if (monthlyData.length === 0) {
    return (
      <div className="chart-container">
        <div className="chart-header">
          <div className="chart-header-left">
            <h3 className="chart-title">
              <div className="chart-title-icon">
                <BarChart2 size={15} />
              </div>
              Monthly Overview
            </h3>
            <p className="chart-subtitle">Income vs Expenses</p>
          </div>
        </div>
        <div className="chart-empty">
          <div className="chart-empty-icon">📊</div>
          <p>No data available yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <div className="chart-header">
        <div className="chart-header-left">
          <h3 className="chart-title">
            <div className="chart-title-icon">
              <BarChart2 size={15} />
            </div>
            Monthly Overview
          </h3>
          <p className="chart-subtitle">Income vs Expenses trend</p>
        </div>
        <div className="chart-badge">
          <Calendar size={12} />
          Last 6 months
        </div>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={monthlyData}
            margin={{ top: 8, right: 4, left: -14, bottom: 0 }}
            barGap={4}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{
                fontSize: 11.5,
                fill: "var(--text-muted)",
                fontFamily: "var(--font-body)",
              }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
            />
            <YAxis
              tick={{
                fontSize: 11,
                fill: "var(--text-muted)",
                fontFamily: "var(--font-body)",
              }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) =>
                v >= 1000 ? `₹${(v / 1000).toFixed(0)}k` : `₹${v}`
              }
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--hover-bg)", radius: 4 }} />
            <Bar
              dataKey="income"
              name="Income"
              fill="var(--green)"
              radius={[5, 5, 0, 0]}
              barSize={26}
              opacity={0.9}
            />
            <Bar
              dataKey="expenses"
              name="Expenses"
              fill="var(--red)"
              radius={[5, 5, 0, 0]}
              barSize={26}
              opacity={0.85}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Custom inline legend */}
      <div className="pie-legend" style={{ marginTop: "12px" }}>
        <div className="pie-legend-item">
          <span className="pie-legend-dot" style={{ background: "var(--green)" }} />
          <span className="pie-legend-text">Income</span>
        </div>
        <div className="pie-legend-item">
          <span className="pie-legend-dot" style={{ background: "var(--red)" }} />
          <span className="pie-legend-text">Expenses</span>
        </div>
      </div>
    </div>
  );
};

export default BalanceTrendChart;