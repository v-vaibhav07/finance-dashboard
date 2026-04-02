// import { useApp } from "../../context/AppContext";
// import {
//   formatCurrency,
//   getCategoryBreakdown,
//   getMonthlyComparison,
//   getMonthlyData,
//   calculateTotals,
// } from "../../utils/helpers";
// import {
//   TrendingUp,
//   TrendingDown,
//   AlertTriangle,
//   Award,
//   PiggyBank,
//   BarChart3,
//   ArrowUpRight,
//   ArrowDownRight,
//   Target,
//   Flame,
//   ShieldCheck,
//   CircleDollarSign,
// } from "lucide-react";
// import "./Insights.css";

// const InsightsPanel = () => {
//   const { transactions } = useApp();

//   const totals = calculateTotals(transactions);
//   const categoryBreakdown = getCategoryBreakdown(transactions);
//   const monthlyComparison = getMonthlyComparison(transactions);
//   const monthlyData = getMonthlyData(transactions);

//   // ---- Calculate insights ----

//   // 1. Highest spending category
//   const highestCategory = categoryBreakdown.length > 0 ? categoryBreakdown[0] : null;

//   // 2. Lowest spending category
//   const lowestCategory =
//     categoryBreakdown.length > 1
//       ? categoryBreakdown[categoryBreakdown.length - 1]
//       : null;

//   // 3. Savings rate
//   const savingsRate =
//     totals.income > 0
//       ? (((totals.income - totals.expenses) / totals.income) * 100).toFixed(1)
//       : 0;

//   // 4. Average transaction amount
//   const expenseTransactions = transactions.filter((t) => t.type === "expense");
//   const avgExpense =
//     expenseTransactions.length > 0
//       ? expenseTransactions.reduce((sum, t) => sum + t.amount, 0) /
//         expenseTransactions.length
//       : 0;

//   // 5. Largest single transaction
//   const largestExpense =
//     expenseTransactions.length > 0
//       ? expenseTransactions.reduce((max, t) => (t.amount > max.amount ? t : max))
//       : null;

//   const largestIncome =
//     transactions.filter((t) => t.type === "income").length > 0
//       ? transactions
//           .filter((t) => t.type === "income")
//           .reduce((max, t) => (t.amount > max.amount ? t : max))
//       : null;

//   // 6. Best month (highest savings)
//   const bestMonth =
//     monthlyData.length > 0
//       ? monthlyData.reduce((best, m) =>
//           m.balance > best.balance ? m : best
//         )
//       : null;

//   // 7. Worst month (lowest savings)
//   const worstMonth =
//     monthlyData.length > 0
//       ? monthlyData.reduce((worst, m) =>
//           m.balance < worst.balance ? m : worst
//         )
//       : null;

//   // 8. Total transaction count
//   const totalCount = transactions.length;
//   const incomeCount = transactions.filter((t) => t.type === "income").length;
//   const expenseCount = expenseTransactions.length;

//   // 9. Category count
//   const categoryCount = categoryBreakdown.length;

//   // ---- No data check ----
//   if (transactions.length === 0) {
//     return (
//       <div className="insights-empty">
//         <div className="empty-icon">📊</div>
//         <h3>No insights yet</h3>
//         <p>Add some transactions to see your financial insights</p>
//       </div>
//     );
//   }

//   return (
//     <div className="insights-container">
//       {/* ---- Quick Stats Row ---- */}
//       <div className="quick-stats">
//         <div className="quick-stat">
//           <CircleDollarSign size={20} className="qs-icon blue" />
//           <div>
//             <p className="qs-value">{totalCount}</p>
//             <p className="qs-label">Total Transactions</p>
//           </div>
//         </div>
//         <div className="quick-stat">
//           <TrendingUp size={20} className="qs-icon green" />
//           <div>
//             <p className="qs-value">{incomeCount}</p>
//             <p className="qs-label">Income Entries</p>
//           </div>
//         </div>
//         <div className="quick-stat">
//           <TrendingDown size={20} className="qs-icon red" />
//           <div>
//             <p className="qs-value">{expenseCount}</p>
//             <p className="qs-label">Expense Entries</p>
//           </div>
//         </div>
//         <div className="quick-stat">
//           <BarChart3 size={20} className="qs-icon purple" />
//           <div>
//             <p className="qs-value">{categoryCount}</p>
//             <p className="qs-label">Categories</p>
//           </div>
//         </div>
//       </div>

//       {/* ---- Insight Cards Grid ---- */}
//       <div className="insights-grid">
//         {/* Savings Rate */}
//         <div className="insight-card highlight">
//           <div className="insight-icon-wrap savings">
//             <PiggyBank size={24} />
//           </div>
//           <div className="insight-content">
//             <h4 className="insight-title">Savings Rate</h4>
//             <p className={`insight-value ${parseFloat(savingsRate) >= 20 ? "green" : "red"}`}>
//               {savingsRate}%
//             </p>
//             <p className="insight-desc">
//               {parseFloat(savingsRate) >= 30
//                 ? "🎉 Excellent! You're saving well"
//                 : parseFloat(savingsRate) >= 20
//                   ? "👍 Good saving habits"
//                   : parseFloat(savingsRate) >= 10
//                     ? "⚠️ Try to save more"
//                     : "🚨 Your expenses are too high"}
//             </p>
//           </div>
//         </div>

//         {/* Highest Spending Category */}
//         {highestCategory && (
//           <div className="insight-card">
//             <div className="insight-icon-wrap danger">
//               <Flame size={24} />
//             </div>
//             <div className="insight-content">
//               <h4 className="insight-title">Highest Spending</h4>
//               <p className="insight-value red">{highestCategory.name}</p>
//               <p className="insight-desc">
//                 {formatCurrency(highestCategory.value)} spent in this category
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Lowest Spending Category */}
//         {lowestCategory && (
//           <div className="insight-card">
//             <div className="insight-icon-wrap success">
//               <ShieldCheck size={24} />
//             </div>
//             <div className="insight-content">
//               <h4 className="insight-title">Lowest Spending</h4>
//               <p className="insight-value green">{lowestCategory.name}</p>
//               <p className="insight-desc">
//                 Only {formatCurrency(lowestCategory.value)} spent here
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Average Expense */}
//         <div className="insight-card">
//           <div className="insight-icon-wrap warning">
//             <Target size={24} />
//           </div>
//           <div className="insight-content">
//             <h4 className="insight-title">Avg. Expense</h4>
//             <p className="insight-value orange">
//               {formatCurrency(Math.round(avgExpense))}
//             </p>
//             <p className="insight-desc">Average per expense transaction</p>
//           </div>
//         </div>

//         {/* Largest Single Expense */}
//         {largestExpense && (
//           <div className="insight-card">
//             <div className="insight-icon-wrap danger">
//               <AlertTriangle size={24} />
//             </div>
//             <div className="insight-content">
//               <h4 className="insight-title">Largest Expense</h4>
//               <p className="insight-value red">
//                 {formatCurrency(largestExpense.amount)}
//               </p>
//               <p className="insight-desc">
//                 {largestExpense.description} ({largestExpense.category})
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Largest Income */}
//         {largestIncome && (
//           <div className="insight-card">
//             <div className="insight-icon-wrap success">
//               <Award size={24} />
//             </div>
//             <div className="insight-content">
//               <h4 className="insight-title">Largest Income</h4>
//               <p className="insight-value green">
//                 {formatCurrency(largestIncome.amount)}
//               </p>
//               <p className="insight-desc">
//                 {largestIncome.description} ({largestIncome.category})
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Best Month */}
//         {bestMonth && (
//           <div className="insight-card">
//             <div className="insight-icon-wrap success">
//               <ArrowUpRight size={24} />
//             </div>
//             <div className="insight-content">
//               <h4 className="insight-title">Best Month</h4>
//               <p className="insight-value green">{bestMonth.month}</p>
//               <p className="insight-desc">
//                 Saved {formatCurrency(bestMonth.balance)} this month
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Worst Month */}
//         {worstMonth && (
//           <div className="insight-card">
//             <div className="insight-icon-wrap danger">
//               <ArrowDownRight size={24} />
//             </div>
//             <div className="insight-content">
//               <h4 className="insight-title">Worst Month</h4>
//               <p className="insight-value red">{worstMonth.month}</p>
//               <p className="insight-desc">
//                 {worstMonth.balance >= 0
//                   ? `Only saved ${formatCurrency(worstMonth.balance)}`
//                   : `Overspent by ${formatCurrency(Math.abs(worstMonth.balance))}`}
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* ---- Monthly Comparison Section ---- */}
//       {monthlyComparison && (
//         <div className="monthly-comparison">
//           <h3 className="comparison-title">
//             📅 Monthly Comparison: {monthlyComparison.previousMonth} vs{" "}
//             {monthlyComparison.currentMonth}
//           </h3>

//           <div className="comparison-grid">
//             {/* Income Comparison */}
//             <div className="comparison-card">
//               <div className="comp-header">
//                 <span className="comp-label">Income</span>
//                 <span
//                   className={`comp-change ${
//                     monthlyComparison.incomeChange >= 0 ? "green" : "red"
//                   }`}
//                 >
//                   {monthlyComparison.incomeChange >= 0 ? (
//                     <ArrowUpRight size={14} />
//                   ) : (
//                     <ArrowDownRight size={14} />
//                   )}
//                   {Math.abs(monthlyComparison.incomeChangePercent)}%
//                 </span>
//               </div>

//               <div className="comp-values">
//                 <div className="comp-item">
//                   <span className="comp-month">
//                     {monthlyComparison.previousMonth}
//                   </span>
//                   <span className="comp-amount">
//                     {formatCurrency(monthlyComparison.previousIncome)}
//                   </span>
//                 </div>
//                 <div className="comp-arrow">→</div>
//                 <div className="comp-item">
//                   <span className="comp-month">
//                     {monthlyComparison.currentMonth}
//                   </span>
//                   <span className="comp-amount">
//                     {formatCurrency(monthlyComparison.currentIncome)}
//                   </span>
//                 </div>
//               </div>

//               {/* Progress Bar */}
//               <div className="comp-bar-wrapper">
//                 <div
//                   className="comp-bar green"
//                   style={{
//                     width: `${Math.min(
//                       (monthlyComparison.currentIncome /
//                         Math.max(
//                           monthlyComparison.previousIncome,
//                           monthlyComparison.currentIncome
//                         )) *
//                         100,
//                       100
//                     )}%`,
//                   }}
//                 />
//               </div>
//             </div>

//             {/* Expense Comparison */}
//             <div className="comparison-card">
//               <div className="comp-header">
//                 <span className="comp-label">Expenses</span>
//                 <span
//                   className={`comp-change ${
//                     monthlyComparison.expenseChange <= 0 ? "green" : "red"
//                   }`}
//                 >
//                   {monthlyComparison.expenseChange >= 0 ? (
//                     <ArrowUpRight size={14} />
//                   ) : (
//                     <ArrowDownRight size={14} />
//                   )}
//                   {Math.abs(monthlyComparison.expenseChangePercent)}%
//                 </span>
//               </div>

//               <div className="comp-values">
//                 <div className="comp-item">
//                   <span className="comp-month">
//                     {monthlyComparison.previousMonth}
//                   </span>
//                   <span className="comp-amount">
//                     {formatCurrency(monthlyComparison.previousExpenses)}
//                   </span>
//                 </div>
//                 <div className="comp-arrow">→</div>
//                 <div className="comp-item">
//                   <span className="comp-month">
//                     {monthlyComparison.currentMonth}
//                   </span>
//                   <span className="comp-amount">
//                     {formatCurrency(monthlyComparison.currentExpenses)}
//                   </span>
//                 </div>
//               </div>

//               <div className="comp-bar-wrapper">
//                 <div
//                   className="comp-bar red"
//                   style={{
//                     width: `${Math.min(
//                       (monthlyComparison.currentExpenses /
//                         Math.max(
//                           monthlyComparison.previousExpenses,
//                           monthlyComparison.currentExpenses
//                         )) *
//                         100,
//                       100
//                     )}%`,
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ---- Category Breakdown Table ---- */}
//       <div className="category-table-section">
//         <h3 className="section-title">💳 Category-wise Spending</h3>

//         <div className="category-table-wrapper">
//           <table className="category-table">
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Category</th>
//                 <th>Amount</th>
//                 <th>Share</th>
//                 <th>Bar</th>
//               </tr>
//             </thead>
//             <tbody>
//               {categoryBreakdown.map((cat, index) => {
//                 const totalExpenses = categoryBreakdown.reduce(
//                   (sum, c) => sum + c.value,
//                   0
//                 );
//                 const percentage = ((cat.value / totalExpenses) * 100).toFixed(1);

//                 return (
//                   <tr key={cat.name}>
//                     <td className="rank">
//                       {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
//                     </td>
//                     <td className="cat-name">{cat.name}</td>
//                     <td className="cat-amount">{formatCurrency(cat.value)}</td>
//                     <td className="cat-percent">{percentage}%</td>
//                     <td className="cat-bar-cell">
//                       <div className="cat-bar-wrapper">
//                         <div
//                           className="cat-bar"
//                           style={{ width: `${percentage}%` }}
//                         />
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InsightsPanel;











































// import { useApp } from "../../context/AppContext";
// import {
//   formatCurrency,
//   getCategoryBreakdown,
//   getMonthlyComparison,
//   getMonthlyData,
//   calculateTotals,
// } from "../../utils/helpers";
// import {
//   TrendingUp,
//   TrendingDown,
//   AlertTriangle,
//   Award,
//   PiggyBank,
//   BarChart3,
//   ArrowUpRight,
//   ArrowDownRight,
//   Target,
//   Flame,
//   ShieldCheck,
//   CircleDollarSign,
// } from "lucide-react";
// import "./Insights.css";

// const InsightsPanel = () => {
//   const { transactions } = useApp();

//   const totals = calculateTotals(transactions);
//   const categoryBreakdown = getCategoryBreakdown(transactions);
//   const monthlyComparison = getMonthlyComparison(transactions);
//   const monthlyData = getMonthlyData(transactions);

//   const highestCategory = categoryBreakdown.length > 0 ? categoryBreakdown[0] : null;
//   const lowestCategory =
//     categoryBreakdown.length > 1
//       ? categoryBreakdown[categoryBreakdown.length - 1]
//       : null;

//   const savingsRate =
//     totals.income > 0
//       ? (((totals.income - totals.expenses) / totals.income) * 100).toFixed(1)
//       : 0;

//   const expenseTransactions = transactions.filter((t) => t.type === "expense");
//   const incomeTransactions = transactions.filter((t) => t.type === "income");

//   const avgExpense =
//     expenseTransactions.length > 0
//       ? expenseTransactions.reduce((sum, t) => sum + t.amount, 0) /
//         expenseTransactions.length
//       : 0;

//   const largestExpense =
//     expenseTransactions.length > 0
//       ? expenseTransactions.reduce((max, t) => (t.amount > max.amount ? t : max))
//       : null;

//   const largestIncome =
//     incomeTransactions.length > 0
//       ? incomeTransactions.reduce((max, t) => (t.amount > max.amount ? t : max))
//       : null;

//   const bestMonth =
//     monthlyData.length > 0
//       ? monthlyData.reduce((best, m) => (m.balance > best.balance ? m : best))
//       : null;

//   const worstMonth =
//     monthlyData.length > 0
//       ? monthlyData.reduce((worst, m) => (m.balance < worst.balance ? m : worst))
//       : null;

//   const totalCount = transactions.length;
//   const incomeCount = incomeTransactions.length;
//   const expenseCount = expenseTransactions.length;
//   const categoryCount = categoryBreakdown.length;
//   const totalExpenses = categoryBreakdown.reduce((sum, c) => sum + c.value, 0);

//   if (transactions.length === 0) {
//     return (
//       <div className="insights-empty">
//         <div className="empty-icon">📊</div>
//         <h3>No insights yet</h3>
//         <p>Add some transactions to see your financial insights</p>
//       </div>
//     );
//   }

//   return (
//     <div className="insights-container">
//       <div className="quick-stats">
//         <div className="quick-stat">
//           <CircleDollarSign size={20} className="qs-icon blue" />
//           <div>
//             <p className="qs-value">{totalCount}</p>
//             <p className="qs-label">Total Transactions</p>
//           </div>
//         </div>

//         <div className="quick-stat">
//           <TrendingUp size={20} className="qs-icon green" />
//           <div>
//             <p className="qs-value">{incomeCount}</p>
//             <p className="qs-label">Income Entries</p>
//           </div>
//         </div>

//         <div className="quick-stat">
//           <TrendingDown size={20} className="qs-icon red" />
//           <div>
//             <p className="qs-value">{expenseCount}</p>
//             <p className="qs-label">Expense Entries</p>
//           </div>
//         </div>

//         <div className="quick-stat">
//           <BarChart3 size={20} className="qs-icon purple" />
//           <div>
//             <p className="qs-value">{categoryCount}</p>
//             <p className="qs-label">Categories</p>
//           </div>
//         </div>
//       </div>

//       <div className="insights-grid">
//         <div className="insight-card highlight">
//           <div className="insight-icon-wrap savings">
//             <PiggyBank size={24} />
//           </div>
//           <div className="insight-content">
//             <h4 className="insight-title">Savings Rate</h4>
//             <p className={`insight-value ${parseFloat(savingsRate) >= 20 ? "green" : "red"}`}>
//               {savingsRate}%
//             </p>
//             <p className="insight-desc">
//               {parseFloat(savingsRate) >= 30
//                 ? "Excellent! You're saving well"
//                 : parseFloat(savingsRate) >= 20
//                 ? "Good saving habits"
//                 : parseFloat(savingsRate) >= 10
//                 ? "Try to save more"
//                 : "Expenses are relatively high"}
//             </p>
//           </div>
//         </div>

//         {highestCategory && (
//           <div className="insight-card">
//             <div className="insight-icon-wrap danger">
//               <Flame size={24} />
//             </div>
//             <div className="insight-content">
//               <h4 className="insight-title">Highest Spending</h4>
//               <p className="insight-value red">{highestCategory.name}</p>
//               <p className="insight-desc">
//                 {formatCurrency(highestCategory.value)} spent in this category
//               </p>
//             </div>
//           </div>
//         )}

//         {lowestCategory && (
//           <div className="insight-card">
//             <div className="insight-icon-wrap success">
//               <ShieldCheck size={24} />
//             </div>
//             <div className="insight-content">
//               <h4 className="insight-title">Lowest Spending</h4>
//               <p className="insight-value green">{lowestCategory.name}</p>
//               <p className="insight-desc">
//                 Only {formatCurrency(lowestCategory.value)} spent here
//               </p>
//             </div>
//           </div>
//         )}

//         <div className="insight-card">
//           <div className="insight-icon-wrap warning">
//             <Target size={24} />
//           </div>
//           <div className="insight-content">
//             <h4 className="insight-title">Avg. Expense</h4>
//             <p className="insight-value orange">
//               {formatCurrency(Math.round(avgExpense))}
//             </p>
//             <p className="insight-desc">Average per expense transaction</p>
//           </div>
//         </div>

//         {largestExpense && (
//           <div className="insight-card">
//             <div className="insight-icon-wrap danger">
//               <AlertTriangle size={24} />
//             </div>
//             <div className="insight-content">
//               <h4 className="insight-title">Largest Expense</h4>
//               <p className="insight-value red">
//                 {formatCurrency(largestExpense.amount)}
//               </p>
//               <p className="insight-desc">
//                 {largestExpense.description} ({largestExpense.category})
//               </p>
//             </div>
//           </div>
//         )}

//         {largestIncome && (
//           <div className="insight-card">
//             <div className="insight-icon-wrap success">
//               <Award size={24} />
//             </div>
//             <div className="insight-content">
//               <h4 className="insight-title">Largest Income</h4>
//               <p className="insight-value green">
//                 {formatCurrency(largestIncome.amount)}
//               </p>
//               <p className="insight-desc">
//                 {largestIncome.description} ({largestIncome.category})
//               </p>
//             </div>
//           </div>
//         )}

//         {bestMonth && (
//           <div className="insight-card">
//             <div className="insight-icon-wrap success">
//               <ArrowUpRight size={24} />
//             </div>
//             <div className="insight-content">
//               <h4 className="insight-title">Best Month</h4>
//               <p className="insight-value green">{bestMonth.month}</p>
//               <p className="insight-desc">
//                 Saved {formatCurrency(bestMonth.balance)} this month
//               </p>
//             </div>
//           </div>
//         )}

//         {worstMonth && (
//           <div className="insight-card">
//             <div className="insight-icon-wrap danger">
//               <ArrowDownRight size={24} />
//             </div>
//             <div className="insight-content">
//               <h4 className="insight-title">Worst Month</h4>
//               <p className="insight-value red">{worstMonth.month}</p>
//               <p className="insight-desc">
//                 {worstMonth.balance >= 0
//                   ? `Only saved ${formatCurrency(worstMonth.balance)}`
//                   : `Overspent by ${formatCurrency(Math.abs(worstMonth.balance))}`}
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       {monthlyComparison && (
//         <div className="monthly-comparison">
//           <h3 className="comparison-title">
//             Monthly Comparison: {monthlyComparison.previousMonth} vs{" "}
//             {monthlyComparison.currentMonth}
//           </h3>

//           <div className="comparison-grid">
//             <div className="comparison-card">
//               <div className="comp-header">
//                 <span className="comp-label">Income</span>
//                 <span
//                   className={`comp-change ${
//                     monthlyComparison.incomeChange >= 0 ? "green" : "red"
//                   }`}
//                 >
//                   {monthlyComparison.incomeChange >= 0 ? (
//                     <ArrowUpRight size={14} />
//                   ) : (
//                     <ArrowDownRight size={14} />
//                   )}
//                   {Math.abs(monthlyComparison.incomeChangePercent)}%
//                 </span>
//               </div>

//               <div className="comp-values">
//                 <div className="comp-item">
//                   <span className="comp-month">{monthlyComparison.previousMonth}</span>
//                   <span className="comp-amount">
//                     {formatCurrency(monthlyComparison.previousIncome)}
//                   </span>
//                 </div>
//                 <div className="comp-arrow">→</div>
//                 <div className="comp-item">
//                   <span className="comp-month">{monthlyComparison.currentMonth}</span>
//                   <span className="comp-amount">
//                     {formatCurrency(monthlyComparison.currentIncome)}
//                   </span>
//                 </div>
//               </div>

//               <div className="comp-bar-wrapper">
//                 <div
//                   className="comp-bar green"
//                   style={{
//                     width: `${Math.min(
//                       (monthlyComparison.currentIncome /
//                         Math.max(
//                           monthlyComparison.previousIncome || 1,
//                           monthlyComparison.currentIncome || 1
//                         )) *
//                         100,
//                       100
//                     )}%`,
//                   }}
//                 />
//               </div>
//             </div>

//             <div className="comparison-card">
//               <div className="comp-header">
//                 <span className="comp-label">Expenses</span>
//                 <span
//                   className={`comp-change ${
//                     monthlyComparison.expenseChange <= 0 ? "green" : "red"
//                   }`}
//                 >
//                   {monthlyComparison.expenseChange >= 0 ? (
//                     <ArrowUpRight size={14} />
//                   ) : (
//                     <ArrowDownRight size={14} />
//                   )}
//                   {Math.abs(monthlyComparison.expenseChangePercent)}%
//                 </span>
//               </div>

//               <div className="comp-values">
//                 <div className="comp-item">
//                   <span className="comp-month">{monthlyComparison.previousMonth}</span>
//                   <span className="comp-amount">
//                     {formatCurrency(monthlyComparison.previousExpenses)}
//                   </span>
//                 </div>
//                 <div className="comp-arrow">→</div>
//                 <div className="comp-item">
//                   <span className="comp-month">{monthlyComparison.currentMonth}</span>
//                   <span className="comp-amount">
//                     {formatCurrency(monthlyComparison.currentExpenses)}
//                   </span>
//                 </div>
//               </div>

//               <div className="comp-bar-wrapper">
//                 <div
//                   className="comp-bar red"
//                   style={{
//                     width: `${Math.min(
//                       (monthlyComparison.currentExpenses /
//                         Math.max(
//                           monthlyComparison.previousExpenses || 1,
//                           monthlyComparison.currentExpenses || 1
//                         )) *
//                         100,
//                       100
//                     )}%`,
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="category-table-section">
//         <h3 className="section-title">Category-wise Spending</h3>

//         {categoryBreakdown.length === 0 ? (
//           <div className="insights-empty small">
//             <p>No expense categories available yet.</p>
//           </div>
//         ) : (
//           <div className="category-table-wrapper">
//             <table className="category-table">
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>Category</th>
//                   <th>Amount</th>
//                   <th>Share</th>
//                   <th>Bar</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {categoryBreakdown.map((cat, index) => {
//                   const percentage = totalExpenses
//                     ? ((cat.value / totalExpenses) * 100).toFixed(1)
//                     : 0;

//                   return (
//                     <tr key={cat.name}>
//                       <td className="rank">
//                         {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
//                       </td>
//                       <td className="cat-name">{cat.name}</td>
//                       <td className="cat-amount">{formatCurrency(cat.value)}</td>
//                       <td className="cat-percent">{percentage}%</td>
//                       <td className="cat-bar-cell">
//                         <div className="cat-bar-wrapper">
//                           <div
//                             className="cat-bar"
//                             style={{ width: `${percentage}%` }}
//                           />
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InsightsPanel;


















import { useApp } from "../../context/AppContext";
import {
  formatCurrency,
  getCategoryBreakdown,
  getMonthlyComparison,
  getMonthlyData,
  calculateTotals,
} from "../../utils/helpers";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Award,
  PiggyBank,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Flame,
  ShieldCheck,
  CircleDollarSign,
  GitCompare,
  TableProperties,
} from "lucide-react";
import "./Insights.css";

const InsightsPanel = () => {
  const { transactions } = useApp();

  const totals = calculateTotals(transactions);
  const categoryBreakdown = getCategoryBreakdown(transactions);
  const monthlyComparison = getMonthlyComparison(transactions);
  const monthlyData = getMonthlyData(transactions);

  const highestCategory = categoryBreakdown.length > 0 ? categoryBreakdown[0] : null;
  const lowestCategory =
    categoryBreakdown.length > 1
      ? categoryBreakdown[categoryBreakdown.length - 1]
      : null;

  const savingsRate =
    totals.income > 0
      ? (((totals.income - totals.expenses) / totals.income) * 100).toFixed(1)
      : 0;

  const savingsNum = parseFloat(savingsRate);
  const savingsBarClass =
    savingsNum >= 30 ? "good" : savingsNum >= 15 ? "warn" : "bad";

  const expenseTransactions = transactions.filter((t) => t.type === "expense");
  const incomeTransactions  = transactions.filter((t) => t.type === "income");

  const avgExpense =
    expenseTransactions.length > 0
      ? expenseTransactions.reduce((s, t) => s + t.amount, 0) / expenseTransactions.length
      : 0;

  const largestExpense =
    expenseTransactions.length > 0
      ? expenseTransactions.reduce((mx, t) => (t.amount > mx.amount ? t : mx))
      : null;

  const largestIncome =
    incomeTransactions.length > 0
      ? incomeTransactions.reduce((mx, t) => (t.amount > mx.amount ? t : mx))
      : null;

  const bestMonth =
    monthlyData.length > 0
      ? monthlyData.reduce((b, m) => (m.balance > b.balance ? m : b))
      : null;

  const worstMonth =
    monthlyData.length > 0
      ? monthlyData.reduce((w, m) => (m.balance < w.balance ? m : w))
      : null;

  const totalCount    = transactions.length;
  const incomeCount   = incomeTransactions.length;
  const expenseCount  = expenseTransactions.length;
  const categoryCount = categoryBreakdown.length;
  const totalExpenses = categoryBreakdown.reduce((s, c) => s + c.value, 0);

  if (transactions.length === 0) {
    return (
      <div className="insights-empty">
        <div className="empty-icon">📊</div>
        <h3>No insights yet</h3>
        <p>Add some transactions to see your financial insights</p>
      </div>
    );
  }

  return (
    <div className="insights-container">

      {/* ── QUICK STATS ── */}
      <div className="quick-stats">
        {[
          { icon: <CircleDollarSign size={18} />, cls: "blue",   val: totalCount,   lbl: "Total Transactions" },
          { icon: <TrendingUp       size={18} />, cls: "green",  val: incomeCount,  lbl: "Income Entries" },
          { icon: <TrendingDown     size={18} />, cls: "red",    val: expenseCount, lbl: "Expense Entries" },
          { icon: <BarChart3        size={18} />, cls: "purple", val: categoryCount,lbl: "Categories" },
        ].map(({ icon, cls, val, lbl }) => (
          <div className="quick-stat" key={lbl}>
            <div className={`qs-icon-wrap ${cls}`}>{icon}</div>
            <div>
              <p className="qs-value">{val}</p>
              <p className="qs-label">{lbl}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── INSIGHTS GRID ── */}
      <div className="insights-grid">

        {/* Savings Rate – highlight */}
        <div className="insight-card highlight">
          <div className="insight-icon-wrap savings">
            <PiggyBank size={22} />
          </div>
          <div className="insight-content">
            <h4 className="insight-title">Savings Rate</h4>
            <p className={`insight-value ${savingsNum >= 20 ? "green" : savingsNum >= 10 ? "orange" : "red"}`}>
              {savingsRate}%
            </p>
            <p className="insight-desc">
              {savingsNum >= 30
                ? "Excellent! You're saving really well"
                : savingsNum >= 20
                ? "Good saving habits — keep it up"
                : savingsNum >= 10
                ? "Room to improve — try to cut expenses"
                : "Expenses are high relative to income"}
            </p>
            <div className="savings-bar-wrap">
              <div
                className={`savings-bar ${savingsBarClass}`}
                style={{ width: `${Math.min(Math.max(savingsNum, 0), 100)}%` }}
              />
            </div>
          </div>
        </div>

        {highestCategory && (
          <div className="insight-card">
            <div className="insight-icon-wrap danger"><Flame size={22} /></div>
            <div className="insight-content">
              <h4 className="insight-title">Highest Spending</h4>
              <p className="insight-value red">{highestCategory.name}</p>
              <p className="insight-desc">{formatCurrency(highestCategory.value)} spent in this category</p>
            </div>
          </div>
        )}

        {lowestCategory && (
          <div className="insight-card">
            <div className="insight-icon-wrap success"><ShieldCheck size={22} /></div>
            <div className="insight-content">
              <h4 className="insight-title">Lowest Spending</h4>
              <p className="insight-value green">{lowestCategory.name}</p>
              <p className="insight-desc">Only {formatCurrency(lowestCategory.value)} spent here</p>
            </div>
          </div>
        )}

        <div className="insight-card">
          <div className="insight-icon-wrap warning"><Target size={22} /></div>
          <div className="insight-content">
            <h4 className="insight-title">Avg. Expense</h4>
            <p className="insight-value orange">{formatCurrency(Math.round(avgExpense))}</p>
            <p className="insight-desc">Average per expense transaction</p>
          </div>
        </div>

        {largestExpense && (
          <div className="insight-card">
            <div className="insight-icon-wrap danger"><AlertTriangle size={22} /></div>
            <div className="insight-content">
              <h4 className="insight-title">Largest Expense</h4>
              <p className="insight-value red">{formatCurrency(largestExpense.amount)}</p>
              <p className="insight-desc">{largestExpense.description} ({largestExpense.category})</p>
            </div>
          </div>
        )}

        {largestIncome && (
          <div className="insight-card">
            <div className="insight-icon-wrap success"><Award size={22} /></div>
            <div className="insight-content">
              <h4 className="insight-title">Largest Income</h4>
              <p className="insight-value green">{formatCurrency(largestIncome.amount)}</p>
              <p className="insight-desc">{largestIncome.description} ({largestIncome.category})</p>
            </div>
          </div>
        )}

        {bestMonth && (
          <div className="insight-card">
            <div className="insight-icon-wrap success"><ArrowUpRight size={22} /></div>
            <div className="insight-content">
              <h4 className="insight-title">Best Month</h4>
              <p className="insight-value green">{bestMonth.month}</p>
              <p className="insight-desc">Saved {formatCurrency(bestMonth.balance)} this month</p>
            </div>
          </div>
        )}

        {worstMonth && (
          <div className="insight-card">
            <div className="insight-icon-wrap danger"><ArrowDownRight size={22} /></div>
            <div className="insight-content">
              <h4 className="insight-title">Worst Month</h4>
              <p className="insight-value red">{worstMonth.month}</p>
              <p className="insight-desc">
                {worstMonth.balance >= 0
                  ? `Only saved ${formatCurrency(worstMonth.balance)}`
                  : `Overspent by ${formatCurrency(Math.abs(worstMonth.balance))}`}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ── MONTHLY COMPARISON ── */}
      {monthlyComparison && (
        <div className="monthly-comparison">
          <div className="section-header">
            <div className="section-title-wrap">
              <div className="section-title-icon"><GitCompare size={15} /></div>
              <div>
                <h3 className="section-title">Monthly Comparison</h3>
                <p className="section-subtitle">
                  {monthlyComparison.previousMonth} vs {monthlyComparison.currentMonth}
                </p>
              </div>
            </div>
          </div>

          <div className="comparison-grid">
            {/* Income */}
            <div className="comparison-card">
              <div className="comp-header">
                <span className="comp-label">Income</span>
                <span className={`comp-change ${monthlyComparison.incomeChange >= 0 ? "green" : "red"}`}>
                  {monthlyComparison.incomeChange >= 0
                    ? <ArrowUpRight size={13} />
                    : <ArrowDownRight size={13} />}
                  {Math.abs(monthlyComparison.incomeChangePercent)}%
                </span>
              </div>
              <div className="comp-values">
                <div className="comp-item">
                  <span className="comp-month">{monthlyComparison.previousMonth}</span>
                  <span className="comp-amount">{formatCurrency(monthlyComparison.previousIncome)}</span>
                </div>
                <div className="comp-arrow">→</div>
                <div className="comp-item">
                  <span className="comp-month">{monthlyComparison.currentMonth}</span>
                  <span className="comp-amount">{formatCurrency(monthlyComparison.currentIncome)}</span>
                </div>
              </div>
              <div className="comp-bar-wrapper">
                <div
                  className="comp-bar green"
                  style={{
                    width: `${Math.min(
                      (monthlyComparison.currentIncome /
                        Math.max(monthlyComparison.previousIncome || 1, monthlyComparison.currentIncome || 1)) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* Expenses */}
            <div className="comparison-card">
              <div className="comp-header">
                <span className="comp-label">Expenses</span>
                <span className={`comp-change ${monthlyComparison.expenseChange <= 0 ? "green" : "red"}`}>
                  {monthlyComparison.expenseChange >= 0
                    ? <ArrowUpRight size={13} />
                    : <ArrowDownRight size={13} />}
                  {Math.abs(monthlyComparison.expenseChangePercent)}%
                </span>
              </div>
              <div className="comp-values">
                <div className="comp-item">
                  <span className="comp-month">{monthlyComparison.previousMonth}</span>
                  <span className="comp-amount">{formatCurrency(monthlyComparison.previousExpenses)}</span>
                </div>
                <div className="comp-arrow">→</div>
                <div className="comp-item">
                  <span className="comp-month">{monthlyComparison.currentMonth}</span>
                  <span className="comp-amount">{formatCurrency(monthlyComparison.currentExpenses)}</span>
                </div>
              </div>
              <div className="comp-bar-wrapper">
                <div
                  className="comp-bar red"
                  style={{
                    width: `${Math.min(
                      (monthlyComparison.currentExpenses /
                        Math.max(monthlyComparison.previousExpenses || 1, monthlyComparison.currentExpenses || 1)) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CATEGORY TABLE ── */}
      <div className="category-table-section">
        <div className="section-header">
          <div className="section-title-wrap">
            <div className="section-title-icon"><TableProperties size={15} /></div>
            <div>
              <h3 className="section-title">Category-wise Spending</h3>
              <p className="section-subtitle">Ranked by total amount</p>
            </div>
          </div>
        </div>

        {categoryBreakdown.length === 0 ? (
          <div className="insights-empty small">
            <p>No expense categories available yet.</p>
          </div>
        ) : (
          <div className="category-table-wrapper">
            <table className="category-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Share</th>
                  <th>Bar</th>
                </tr>
              </thead>
              <tbody>
                {categoryBreakdown.map((cat, index) => {
                  const pct = totalExpenses
                    ? ((cat.value / totalExpenses) * 100).toFixed(1)
                    : 0;
                  return (
                    <tr key={cat.name}>
                      <td className="rank">
                        {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
                      </td>
                      <td className="cat-name">{cat.name}</td>
                      <td className="cat-amount">{formatCurrency(cat.value)}</td>
                      <td className="cat-percent">{pct}%</td>
                      <td className="cat-bar-cell">
                        <div className="cat-bar-wrapper">
                          <div className="cat-bar" style={{ width: `${pct}%` }} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default InsightsPanel;