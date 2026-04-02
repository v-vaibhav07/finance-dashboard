import { useMemo } from "react";
import { useApp } from "../../context/AppContext";
import { calculateTotals, getCategoryBreakdown, getMonthlyData } from "../../utils/helpers";
import {
  ShieldCheck, TrendingUp, PiggyBank, BarChart3,
  AlertTriangle, CheckCircle2, Info, Zap
} from "lucide-react";
import "./FinancialHealthScore.css";

// ── Score computation ────────────────────────────────────────────────────────
const computeScore = (transactions, budgets) => {
  if (!transactions.length) return { total: 0, breakdown: [], grade: "N/A", color: "muted" };

  const { income, expenses } = calculateTotals(transactions);
  const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;
  const categoryBreakdown = getCategoryBreakdown(transactions);
  const monthlyData = getMonthlyData(transactions);

  const tips = [];
  const breakdown = [];

  // 1. Savings rate (max 30pts)
  let savingsScore = 0;
  if (savingsRate >= 30)      { savingsScore = 30; }
  else if (savingsRate >= 20) { savingsScore = 24; }
  else if (savingsRate >= 10) { savingsScore = 16; }
  else if (savingsRate >= 0)  { savingsScore = 8; }
  else                        { savingsScore = 0; tips.push("Your expenses exceed income — review high-spend categories."); }
  breakdown.push({ label: "Savings Rate", score: savingsScore, max: 30, color: savingsScore >= 24 ? "green" : savingsScore >= 16 ? "orange" : "red", icon: PiggyBank });
  if (savingsRate < 20) tips.push("Aim to save at least 20% of income each month.");

  // 2. Budget adherence (max 25pts)
  const budgetedCats = Object.keys(budgets);
  let overBudget = 0;
  budgetedCats.forEach((cat) => {
    const found = categoryBreakdown.find((b) => b.name === cat);
    if (found && found.value > budgets[cat]) overBudget++;
  });
  const budgetScore = Math.max(0, 25 - overBudget * 6);
  breakdown.push({ label: "Budget Adherence", score: budgetScore, max: 25, color: budgetScore >= 20 ? "green" : budgetScore >= 12 ? "orange" : "red", icon: ShieldCheck });
  if (overBudget > 0) tips.push(`You exceeded budget in ${overBudget} categor${overBudget > 1 ? "ies" : "y"}. Try adjusting limits.`);

  // 3. Income diversity (max 20pts)
  const incomeCategories = new Set(transactions.filter((t) => t.type === "income").map((t) => t.category));
  let diversityScore = 0;
  if (incomeCategories.size >= 3)      diversityScore = 20;
  else if (incomeCategories.size === 2) diversityScore = 13;
  else                                  diversityScore = 6;
  breakdown.push({ label: "Income Diversity", score: diversityScore, max: 20, color: diversityScore >= 13 ? "green" : "orange", icon: TrendingUp });
  if (incomeCategories.size < 2) tips.push("Consider adding a secondary income source.");

  // 4. Spending consistency (max 25pts)
  let consistencyScore = 25;
  if (monthlyData.length >= 2) {
    const expenseArr = monthlyData.map((m) => m.expenses);
    const avg = expenseArr.reduce((s, v) => s + v, 0) / expenseArr.length;
    const variance = expenseArr.reduce((s, v) => s + Math.abs(v - avg), 0) / expenseArr.length;
    const variancePct = avg > 0 ? (variance / avg) * 100 : 0;
    if (variancePct > 40)      { consistencyScore = 8;  tips.push("Your monthly spending varies a lot — try to stabilize expenses."); }
    else if (variancePct > 20) { consistencyScore = 16; }
    else                       { consistencyScore = 25; }
  }
  breakdown.push({ label: "Spending Consistency", score: consistencyScore, max: 25, color: consistencyScore >= 20 ? "green" : consistencyScore >= 14 ? "orange" : "red", icon: BarChart3 });

  const total = savingsScore + budgetScore + diversityScore + consistencyScore;

  let grade, color, label;
  if (total >= 85)      { grade = "A+"; color = "green";  label = "Excellent"; }
  else if (total >= 70) { grade = "A";  color = "green";  label = "Very Good"; }
  else if (total >= 55) { grade = "B";  color = "blue";   label = "Good"; }
  else if (total >= 40) { grade = "C";  color = "orange"; label = "Fair"; }
  else                  { grade = "D";  color = "red";    label = "Needs Work"; }

  return { total, breakdown, grade, color, label, tips };
};

// ── Component ─────────────────────────────────────────────────────────────────
const FinancialHealthScore = () => {
  const { transactions, budgets } = useApp();
  const { total, breakdown, grade, color, label, tips } = useMemo(
    () => computeScore(transactions, budgets),
    [transactions, budgets]
  );

  const circumference = 2 * Math.PI * 42; // r=42
  const dash = (total / 100) * circumference;

  return (
    <div className="fhs-card">
      {/* Header */}
      <div className="fhs-header">
        <div className="fhs-header-left">
          <div className="fhs-title-icon"><Zap size={15} /></div>
          <div>
            <h3 className="fhs-title">Financial Health Score</h3>
            <p className="fhs-subtitle">Based on your real transactions</p>
          </div>
        </div>
      </div>

      {/* Score ring + breakdown side-by-side */}
      <div className="fhs-body">
        {/* Circular score */}
        <div className="fhs-ring-wrap">
          <svg className="fhs-ring" viewBox="0 0 100 100">
            <circle className="fhs-ring-bg"    cx="50" cy="50" r="42" />
            <circle
              className={`fhs-ring-fill ${color}`}
              cx="50" cy="50" r="42"
              strokeDasharray={`${dash} ${circumference}`}
              strokeDashoffset="0"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="fhs-ring-center">
            <span className={`fhs-grade ${color}`}>{grade}</span>
            <span className="fhs-score">{total}<span>/100</span></span>
            <span className={`fhs-label ${color}`}>{label}</span>
          </div>
        </div>

        {/* Sub-scores */}
        <div className="fhs-breakdown">
          {breakdown.map(({ label, score, max, color: c, icon: Icon }) => (
            <div className="fhs-sub" key={label}>
              <div className="fhs-sub-head">
                <div className={`fhs-sub-icon ${c}`}><Icon size={13} /></div>
                <span className="fhs-sub-label">{label}</span>
                <span className={`fhs-sub-score ${c}`}>{score}/{max}</span>
              </div>
              <div className="fhs-sub-track">
                <div
                  className={`fhs-sub-bar ${c}`}
                  style={{ width: `${(score / max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      {tips.length > 0 && (
        <div className="fhs-tips">
          <div className="fhs-tips-header">
            <AlertTriangle size={13} />
            <span>Improvement Tips</span>
          </div>
          <ul className="fhs-tips-list">
            {tips.map((tip, i) => (
              <li key={i} className="fhs-tip-item">
                <Info size={12} />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {total >= 85 && (
        <div className="fhs-congrats">
          <CheckCircle2 size={14} />
          Excellent financial health! Keep up the great work.
        </div>
      )}
    </div>
  );
};

export default FinancialHealthScore;