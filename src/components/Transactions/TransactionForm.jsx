import { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { generateId } from "../../utils/helpers";
import { categories } from "../../data/mockData";
import { X } from "lucide-react";
import "./Transactions.css";

const TransactionForm = ({ editTransaction, onClose }) => {
  const { addTransaction, editTransaction: updateTransaction } = useApp();

  const isEditing = !!editTransaction;

  const [formData, setFormData] = useState({
    date: "",
    description: "",
    amount: "",
    category: "",
    type: "expense",
  });

  const [errors, setErrors] = useState({});

  // ---- Pre-fill form when editing ----
  useEffect(() => {
    if (editTransaction) {
      setFormData({
        date: editTransaction.date,
        description: editTransaction.description,
        amount: editTransaction.amount.toString(),
        category: editTransaction.category,
        type: editTransaction.type,
      });
    }
  }, [editTransaction]);

  // ---- Handle Input Change ----
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ---- Validate Form ----
  const validate = () => {
    const newErrors = {};

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Enter a valid amount";
    }

    if (!formData.category) {
      newErrors.category = "Select a category";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---- Handle Submit ----
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const transactionData = {
      ...formData,
      amount: parseFloat(formData.amount),
    };

    if (isEditing) {
      updateTransaction(editTransaction.id, transactionData);
    } else {
      addTransaction({
        ...transactionData,
        id: generateId(),
      });
    }

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <h3>{isEditing ? "✏️ Edit Transaction" : "➕ Add Transaction"}</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form className="transaction-form" onSubmit={handleSubmit}>
          {/* Type Toggle */}
          <div className="form-group">
            <label className="form-label">Type</label>
            <div className="type-toggle">
              <button
                type="button"
                className={`toggle-btn ${formData.type === "income" ? "active income" : ""}`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, type: "income" }))
                }
              >
                Income
              </button>
              <button
                type="button"
                className={`toggle-btn ${formData.type === "expense" ? "active expense" : ""}`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, type: "expense" }))
                }
              >
                Expense
              </button>
            </div>
          </div>

          {/* Date */}
          <div className="form-group">
            <label className="form-label">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`form-input ${errors.date ? "error" : ""}`}
            />
            {errors.date && <span className="form-error">{errors.date}</span>}
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="e.g. Grocery shopping"
              className={`form-input ${errors.description ? "error" : ""}`}
            />
            {errors.description && (
              <span className="form-error">{errors.description}</span>
            )}
          </div>

          {/* Amount */}
          <div className="form-group">
            <label className="form-label">Amount (₹)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="e.g. 5000"
              min="0"
              step="1"
              className={`form-input ${errors.amount ? "error" : ""}`}
            />
            {errors.amount && (
              <span className="form-error">{errors.amount}</span>
            )}
          </div>

          {/* Category */}
          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`form-input ${errors.category ? "error" : ""}`}
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="form-error">{errors.category}</span>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {isEditing ? "Update" : "Add Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;