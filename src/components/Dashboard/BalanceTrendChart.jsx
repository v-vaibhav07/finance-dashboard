// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";
// import { useApp } from "../../context/AppContext";
// import { getMonthlyData, formatCurrency } from "../../utils/helpers";
// import "./Charts.css";

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="chart-tooltip">
//         <p className="tooltip-label">{label}</p>
//         {payload.map((entry, index) => (
//           <p key={index} className="tooltip-value" style={{ color: entry.color }}>
//             {entry.name}: {formatCurrency(entry.value)}
//           </p>
//         ))}
//       </div>
//     );
//   }
//   return null;
// };

// const BalanceTrendChart = () => {
//   const { transactions } = useApp();
//   const monthlyData = getMonthlyData(transactions);

//   if (monthlyData.length === 0) {
//     return (
//       <div className="chart-container">
//         <h3 className="chart-title">📈 Monthly Overview</h3>
//         <div className="chart-empty">
//           <p>No data available to display chart</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="chart-container">
//       <div className="chart-header">
//         <h3 className="chart-title">📈 Monthly Overview</h3>
//         <p className="chart-subtitle">Income vs Expenses trend</p>
//       </div>

//       <div className="chart-wrapper">
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart
//             data={monthlyData}
//             margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
//           >
//             <CartesianGrid
//               strokeDasharray="3 3"
//               stroke="var(--border)"
//               vertical={false}
//             />
//             <XAxis
//               dataKey="month"
//               tick={{ fontSize: 12, fill: "var(--text-secondary)" }}
//               axisLine={{ stroke: "var(--border)" }}
//               tickLine={false}
//             />
//             <YAxis
//               tick={{ fontSize: 12, fill: "var(--text-secondary)" }}
//               axisLine={false}
//               tickLine={false}
//               tickFormatter={(value) =>
//                 value >= 1000 ? `₹${(value / 1000).toFixed(0)}k` : `₹${value}`
//               }
//             />
//             <Tooltip content={<CustomTooltip />} />
//             <Legend
//               wrapperStyle={{ fontSize: "13px", paddingTop: "10px" }}
//             />
//             <Bar
//               dataKey="income"
//               name="Income"
//               fill="#22c55e"
//               radius={[6, 6, 0, 0]}
//               barSize={32}
//             />
//             <Bar
//               dataKey="expenses"
//               name="Expenses"
//               fill="#ef4444"
//               radius={[6, 6, 0, 0]}
//               barSize={32}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default BalanceTrendChart;

