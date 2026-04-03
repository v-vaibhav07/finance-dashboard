import { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { useToast } from "../../context/ToastContext";
import { formatCurrency, calculateTotals } from "../../utils/helpers";
import {
  Target, Plus, Trash2, X, Check, Trophy,
  TrendingUp, Calendar, Zap, Edit2,
} from "lucide-react";
import "./SavingsGoal.css";

const GOAL_KEY = "findash_goals";

const loadGoals = () => {
  try { return JSON.parse(localStorage.getItem(GOAL_KEY)) || []; }
  catch { return []; }
};

const saveGoals = (goals) => {
  try { localStorage.setItem(GOAL_KEY, JSON.stringify(goals)); } catch {}
};

const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

// ── Small form component ──────────────────────────────────────────────────────
const GoalForm = ({ onSave, onCancel, initial }) => {
  const [name,       setName]       = useState(initial?.name       || "");
  const [target,     setTarget]     = useState(initial?.target     || "");
  const [saved,      setSaved]      = useState(initial?.saved      || "");
  const [deadline,   setDeadline]   = useState(initial?.deadline   || "");
  const [emoji,      setEmoji]      = useState(initial?.emoji      || "🎯");
  const [errors,     setErrors]     = useState({});

  const EMOJIS = ["🎯","🏠","✈️","🚗","💍","📱","🎓","💊","🏖️","💻","🎸","🐶"];

  const validate = () => {
    const e = {};
    if (!name.trim())              e.name   = "Goal name required";
    if (!target || +target <= 0)   e.target = "Enter a valid target";
    if (saved && +saved < 0)       e.saved  = "Cannot be negative";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({
      id:       initial?.id || generateId(),
      name:     name.trim(),
      target:   parseFloat(target),
      saved:    parseFloat(saved) || 0,
      deadline: deadline || null,
      emoji,
      createdAt: initial?.createdAt || new Date().toISOString(),
    });
  };

  return (
    <div className="sg-form">
      {/* Emoji picker */}
      <div className="sg-form-emojis">
        {EMOJIS.map((e) => (
          <button key={e} type="button"
            className={`sg-emoji-btn ${emoji === e ? "active" : ""}`}
            onClick={() => setEmoji(e)}>{e}</button>
        ))}
      </div>

      <div className="sg-form-row">
        <div className="sg-form-group">
          <label className="sg-form-label">Goal Name</label>
          <input className={`sg-form-input ${errors.name ? "err" : ""}`}
            placeholder="e.g. Buy a laptop" value={name}
            onChange={(e) => setName(e.target.value)} />
          {errors.name && <span className="sg-form-error">{errors.name}</span>}
        </div>
      </div>

      <div className="sg-form-row two">
        <div className="sg-form-group">
          <label className="sg-form-label">Target Amount (₹)</label>
          <input className={`sg-form-input ${errors.target ? "err" : ""}`}
            type="number" placeholder="50000" min={1} value={target}
            onChange={(e) => setTarget(e.target.value)} />
          {errors.target && <span className="sg-form-error">{errors.target}</span>}
        </div>
        <div className="sg-form-group">
          <label className="sg-form-label">Already Saved (₹)</label>
          <input className={`sg-form-input ${errors.saved ? "err" : ""}`}
            type="number" placeholder="0" min={0} value={saved}
            onChange={(e) => setSaved(e.target.value)} />
          {errors.saved && <span className="sg-form-error">{errors.saved}</span>}
        </div>
      </div>

      <div className="sg-form-group">
        <label className="sg-form-label">Target Date (optional)</label>
        <input className="sg-form-input" type="date" value={deadline}
          onChange={(e) => setDeadline(e.target.value)} />
      </div>

      <div className="sg-form-actions">
        <button className="sg-btn-cancel" onClick={onCancel}>Cancel</button>
        <button className="sg-btn-save"   onClick={handleSave}>
          <Check size={14} /> {initial ? "Update Goal" : "Add Goal"}
        </button>
      </div>
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
const SavingsGoal = () => {
  const { transactions, isAdmin } = useApp();
  const toast = useToast();

  const [goals,       setGoals]       = useState(loadGoals);
  const [showForm,    setShowForm]    = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [addingFunds, setAddingFunds] = useState(null); // goal id
  const [fundAmount,  setFundAmount]  = useState("");

  const { balance } = calculateTotals(transactions);

  // persist
  useEffect(() => { saveGoals(goals); }, [goals]);

  const addGoal = (goal) => {
    setGoals((prev) => [goal, ...prev]);
    setShowForm(false);
    toast.success(`Goal "${goal.name}" created! 🎯`);
  };

  const updateGoal = (goal) => {
    setGoals((prev) => prev.map((g) => (g.id === goal.id ? goal : g)));
    setEditingGoal(null);
    toast.edit(`Goal "${goal.name}" updated`);
  };

  const deleteGoal = (id) => {
    const g = goals.find((g) => g.id === id);
    setGoals((prev) => prev.filter((g) => g.id !== id));
    toast.delete(`Deleted goal "${g?.name}"`);
  };

  const addFunds = (id) => {
    const amount = parseFloat(fundAmount);
    if (!amount || amount <= 0) return;
    setGoals((prev) =>
      prev.map((g) =>
        g.id === id
          ? { ...g, saved: Math.min(g.saved + amount, g.target) }
          : g
      )
    );
    const goal = goals.find((g) => g.id === id);
    toast.success(`Added ${formatCurrency(amount)} to "${goal?.name}"`);
    setAddingFunds(null);
    setFundAmount("");
  };

  const daysLeft = (deadline) => {
    if (!deadline) return null;
    const diff = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const monthlySavings = balance > 0 ? balance : 0;

  return (
    <div className="savings-goal">
      {/* Header */}
      <div className="sg-header">
        <div className="sg-header-left">
          <div className="sg-title-icon"><Trophy size={15} /></div>
          <div>
            <h3 className="sg-title">Savings Goals</h3>
            <p className="sg-subtitle">
              Track your financial targets
              {monthlySavings > 0 && (
                <span className="sg-monthly-hint">
                  · ~{formatCurrency(monthlySavings)}/mo available
                </span>
              )}
            </p>
          </div>
        </div>
        {isAdmin && !showForm && !editingGoal && (
          <button className="sg-add-btn" onClick={() => setShowForm(true)}>
            <Plus size={15} /> New Goal
          </button>
        )}
      </div>

      {/* Add form */}
      {showForm && (
        <GoalForm onSave={addGoal} onCancel={() => setShowForm(false)} />
      )}

      {/* Goals list */}
      {goals.length === 0 && !showForm ? (
        <div className="sg-empty">
          <div className="sg-empty-icon">🎯</div>
          <p className="sg-empty-title">No goals yet</p>
          <p className="sg-empty-sub">
            {isAdmin ? "Add a savings goal to start tracking your progress." : "No savings goals have been set."}
          </p>
          {isAdmin && (
            <button className="sg-add-btn" onClick={() => setShowForm(true)}>
              <Plus size={14} /> Add First Goal
            </button>
          )}
        </div>
      ) : (
        <div className="sg-goals-list">
          {goals.map((goal) => {
            const pct     = Math.min((goal.saved / goal.target) * 100, 100);
            const done    = pct >= 100;
            const left    = goal.target - goal.saved;
            const days    = daysLeft(goal.deadline);
            const monthsNeeded = monthlySavings > 0 ? Math.ceil(left / monthlySavings) : null;
            const isEditing   = editingGoal?.id === goal.id;
            const isAddingFunds = addingFunds === goal.id;

            if (isEditing) {
              return (
                <div key={goal.id} className="sg-goal-card editing">
                  <GoalForm
                    initial={goal}
                    onSave={updateGoal}
                    onCancel={() => setEditingGoal(null)}
                  />
                </div>
              );
            }

            return (
              <div key={goal.id} className={`sg-goal-card ${done ? "done" : ""}`}>
                {/* Top row */}
                <div className="sg-goal-top">
                  <div className="sg-goal-left">
                    <span className="sg-goal-emoji">{goal.emoji}</span>
                    <div>
                      <div className="sg-goal-name-row">
                        <h4 className="sg-goal-name">{goal.name}</h4>
                        {done && <span className="sg-done-badge"><Trophy size={11} /> Achieved!</span>}
                      </div>
                      <div className="sg-goal-meta">
                        <span className="sg-goal-saved">{formatCurrency(goal.saved)}</span>
                        <span className="sg-goal-sep">/</span>
                        <span className="sg-goal-target">{formatCurrency(goal.target)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="sg-goal-right">
                    <span className={`sg-pct ${done ? "done" : pct >= 75 ? "near" : ""}`}>
                      {pct.toFixed(0)}%
                    </span>
                    {isAdmin && (
                      <div className="sg-goal-actions">
                        <button className="sg-action-btn edit" onClick={() => setEditingGoal(goal)} title="Edit">
                          <Edit2 size={13} />
                        </button>
                        <button className="sg-action-btn delete" onClick={() => deleteGoal(goal.id)} title="Delete">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="sg-progress-track">
                  <div
                    className={`sg-progress-bar ${done ? "done" : pct >= 75 ? "near" : "active"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>

                {/* Footer: deadline + estimate + add funds */}
                <div className="sg-goal-footer">
                  <div className="sg-goal-hints">
                    {!done && (
                      <span className="sg-hint">
                        <TrendingUp size={11} />
                        {formatCurrency(left)} remaining
                      </span>
                    )}
                    {days !== null && !done && (
                      <span className={`sg-hint ${days < 0 ? "red" : days < 30 ? "orange" : ""}`}>
                        <Calendar size={11} />
                        {days < 0 ? `${Math.abs(days)}d overdue` : `${days}d left`}
                      </span>
                    )}
                    {monthsNeeded && !done && monthlySavings > 0 && (
                      <span className="sg-hint">
                        <Zap size={11} />
                        ~{monthsNeeded}mo to go
                      </span>
                    )}
                  </div>

                  {isAdmin && !done && (
                    isAddingFunds ? (
                      <div className="sg-add-funds-inline">
                        <span className="sg-currency">₹</span>
                        <input
                          className="sg-funds-input"
                          type="number"
                          placeholder="Amount"
                          value={fundAmount}
                          min={1}
                          onChange={(e) => setFundAmount(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter")  addFunds(goal.id);
                            if (e.key === "Escape") { setAddingFunds(null); setFundAmount(""); }
                          }}
                          autoFocus
                        />
                        <button className="sg-funds-save"   onClick={() => addFunds(goal.id)}><Check size={13} /></button>
                        <button className="sg-funds-cancel" onClick={() => { setAddingFunds(null); setFundAmount(""); }}><X size={13} /></button>
                      </div>
                    ) : (
                      <button className="sg-add-funds-btn"
                        onClick={() => { setAddingFunds(goal.id); setFundAmount(""); }}>
                        <Plus size={13} /> Add Funds
                      </button>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SavingsGoal;