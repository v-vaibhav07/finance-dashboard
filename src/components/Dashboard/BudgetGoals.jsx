import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { formatCurrency, getCategoryBreakdown } from "../../utils/helpers";
import { Target, Pencil, Check, X, TrendingDown, AlertTriangle, CheckCircle2 } from "lucide-react";
import "./BudgetGoals.css";

const STATUS = (spent, budget) => {
  const pct = budget > 0 ? (spent / budget) * 100 : 0;
  if (pct >= 100) return { label: "Over budget", color: "red",    icon: AlertTriangle,  cls: "over" };
  if (pct >= 80)  return { label: "Near limit",  color: "orange", icon: AlertTriangle,  cls: "warn" };
  return               { label: "On track",     color: "green",  icon: CheckCircle2,   cls: "ok" };
};

const BudgetGoals = () => {
  const { transactions, budgets, updateBudget, isAdmin } = useApp();
  const [editing, setEditing] = useState(null);
  const [editVal, setEditVal] = useState("");

  const breakdown = getCategoryBreakdown(transactions);
  const budgetedCats = Object.keys(budgets);

  const rows = budgetedCats.map((cat) => {
    const found = breakdown.find((b) => b.name === cat);
    const spent = found ? found.value : 0;
    const budget = budgets[cat] || 0;
    const pct = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;
    const status = STATUS(spent, budget);
    return { cat, spent, budget, pct, status };
  });

  const totalBudget = rows.reduce((s, r) => s + r.budget, 0);
  const totalSpent  = rows.reduce((s, r) => s + r.spent, 0);
  const totalPct    = totalBudget > 0 ? Math.min((totalSpent / totalBudget) * 100, 100) : 0;

  const startEdit = (cat, val) => {
    setEditing(cat);
    setEditVal(String(val));
  };

  const saveEdit = (cat) => {
    const v = parseFloat(editVal);
    if (!isNaN(v) && v >= 0) updateBudget(cat, v);
    setEditing(null);
  };

  const cancelEdit = () => setEditing(null);

  return (
    <div className="budget-goals">
      <div className="budget-header">
        <div className="budget-header-left">
          <div className="budget-title-icon"><Target size={15} /></div>
          <div>
            <h3 className="budget-title">Budget Goals</h3>
            <p className="budget-subtitle">Monthly spending limits by category</p>
          </div>
        </div>
        <div className="budget-summary">
          <div className="budget-summary-item">
            <span className="bsi-label">Total Budget</span>
            <span className="bsi-value">{formatCurrency(totalBudget)}</span>
          </div>
          <div className="budget-summary-divider" />
          <div className="budget-summary-item">
            <span className="bsi-label">Total Spent</span>
            <span className={`bsi-value ${totalPct >= 100 ? "red" : totalPct >= 80 ? "orange" : "green"}`}>
              {formatCurrency(totalSpent)}
            </span>
          </div>
        </div>
      </div>

      {/* Overall progress */}
      <div className="budget-overall">
        <div className="budget-overall-meta">
          <span className="bom-label">Overall</span>
          <span className={`bom-pct ${totalPct >= 100 ? "red" : totalPct >= 80 ? "orange" : "green"}`}>
            {totalPct.toFixed(1)}% used
          </span>
        </div>
        <div className="budget-bar-track">
          <div
            className={`budget-bar-fill overall ${totalPct >= 100 ? "over" : totalPct >= 80 ? "warn" : "ok"}`}
            style={{ width: `${totalPct}%` }}
          />
        </div>
      </div>

      <div className="budget-rows">
        {rows.map(({ cat, spent, budget, pct, status }) => {
          const StatusIcon = status.icon;
          return (
            <div className={`budget-row ${status.cls}`} key={cat}>
              <div className="budget-row-top">
                <div className="budget-row-left">
                  <div className={`budget-status-dot ${status.cls}`} />
                  <span className="budget-cat-name">{cat}</span>
                </div>

                <div className="budget-row-right">
                  <span className={`budget-spent ${status.cls}`}>
                    {formatCurrency(spent)}
                  </span>
                  <span className="budget-sep">/</span>

                  {isAdmin && editing === cat ? (
                    <div className="budget-edit-inline">
                      <span className="budget-currency">₹</span>
                      <input
                        className="budget-edit-input"
                        type="number"
                        value={editVal}
                        onChange={(e) => setEditVal(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEdit(cat);
                          if (e.key === "Escape") cancelEdit();
                        }}
                        autoFocus
                        min={0}
                      />
                      <button className="budget-edit-save" onClick={() => saveEdit(cat)}>
                        <Check size={12} />
                      </button>
                      <button className="budget-edit-cancel" onClick={cancelEdit}>
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <span className="budget-limit">
                      {formatCurrency(budget)}
                      {isAdmin && (
                        <button
                          className="budget-edit-btn"
                          onClick={() => startEdit(cat, budget)}
                          title="Edit budget"
                        >
                          <Pencil size={11} />
                        </button>
                      )}
                    </span>
                  )}

                  <div className={`budget-status-badge ${status.cls}`}>
                    <StatusIcon size={11} />
                    <span>{pct.toFixed(0)}%</span>
                  </div>
                </div>
              </div>

              <div className="budget-bar-track">
                <div
                  className={`budget-bar-fill ${status.cls}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {isAdmin && (
        <p className="budget-edit-hint">
          <Pencil size={11} /> Click the pencil icon to edit any budget limit
        </p>
      )}
    </div>
  );
};

export default BudgetGoals;