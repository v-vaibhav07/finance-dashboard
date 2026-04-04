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