import { useState, useMemo } from "react";
import { useApp } from "../../context/AppContext";
import { useToast } from "../../context/ToastContext";
import { formatCurrency, formatDate, exportToCSV, exportToJSON } from "../../utils/helpers";
import {
  Search, SlidersHorizontal, ArrowUpDown, ArrowUp, ArrowDown,
  TrendingUp, TrendingDown, Pencil, Trash2, X, FileDown, Receipt,
} from "lucide-react";
import { categories } from "../../data/mockData";
import ReceiptModal from "./ReceiptModal";
import "./Transactions.css";

const TransactionList = ({ onEdit }) => {
  const { transactions, deleteTransaction, isAdmin } = useApp();
  const toast = useToast();

  const [search,         setSearch]         = useState("");
  const [filterType,     setFilterType]     = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy,         setSortBy]         = useState("date");
  const [sortOrder,      setSortOrder]      = useState("desc");
  const [showFilters,    setShowFilters]    = useState(false);
  const [showExport,     setShowExport]     = useState(false);
  const [deleteId,       setDeleteId]       = useState(null);
  const [receiptTx,      setReceiptTx]      = useState(null);

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.amount.toString().includes(q) ||
          t.date.includes(q)
      );
    }
    if (filterType !== "all")     result = result.filter((t) => t.type === filterType);
    if (filterCategory !== "all") result = result.filter((t) => t.category === filterCategory);
    result.sort((a, b) => {
      let cmp = 0;
      if (sortBy === "date")     cmp = new Date(a.date) - new Date(b.date);
      if (sortBy === "amount")   cmp = a.amount - b.amount;
      if (sortBy === "category") cmp = a.category.localeCompare(b.category);
      return sortOrder === "desc" ? -cmp : cmp;
    });
    return result;
  }, [transactions, search, filterType, filterCategory, sortBy, sortOrder]);

  const handleSort = (field) => {
    if (sortBy === field) setSortOrder((p) => (p === "asc" ? "desc" : "asc"));
    else { setSortBy(field); setSortOrder("desc"); }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return <ArrowUpDown size={14} />;
    return sortOrder === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  const handleDelete = (id) => {
    const t = transactions.find((tx) => tx.id === id);
    deleteTransaction(id);
    setDeleteId(null);
    toast.delete(`Deleted — ${t?.description || "transaction"}`);
  };

  const clearFilters = () => {
    setSearch(""); setFilterType("all");
    setFilterCategory("all"); setSortBy("date"); setSortOrder("desc");
  };

  const hasActiveFilters = search || filterType !== "all" || filterCategory !== "all";

  const handleExportCSV = () => {
    exportToCSV(filteredTransactions);
    setShowExport(false);
    toast.export(`Exported ${filteredTransactions.length} transactions as CSV`);
  };

  const handleExportJSON = () => {
    exportToJSON(filteredTransactions);
    setShowExport(false);
    toast.export(`Exported ${filteredTransactions.length} transactions as JSON`);
  };

  return (
    <>
      <div className="transaction-list-container">
        {/* Toolbar */}
        <div className="list-toolbar">
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input type="text" placeholder="Search transactions..." value={search}
              onChange={(e) => setSearch(e.target.value)} className="search-input" />
            {search && (
              <button className="search-clear" onClick={() => setSearch("")}>
                <X size={15} />
              </button>
            )}
          </div>
          <div className="toolbar-actions">
            <button className={`toolbar-btn ${showFilters ? "active" : ""}`}
              onClick={() => setShowFilters(!showFilters)}>
              <SlidersHorizontal size={15} />
              <span>Filters</span>
              {hasActiveFilters && <span className="filter-dot" />}
            </button>
            <button className={`toolbar-btn ${showExport ? "active" : ""}`}
              onClick={() => setShowExport(!showExport)}>
              <FileDown size={15} />
              <span>Export</span>
            </button>
          </div>
        </div>

        {showExport && (
          <div className="export-bar">
            <button className="export-btn" onClick={handleExportCSV}>📄 Export CSV</button>
            <button className="export-btn" onClick={handleExportJSON}>📋 Export JSON</button>
          </div>
        )}

        {showFilters && (
          <div className="filter-bar">
            <div className="filter-group">
              <label className="filter-label">Type</label>
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="filter-select">
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">Category</label>
              <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="filter-select">
                <option value="all">All Categories</option>
                {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            {hasActiveFilters && (
              <button className="clear-filters-btn" onClick={clearFilters}>
                <X size={14} /> Clear All
              </button>
            )}
          </div>
        )}

        <div className="results-info">
          <p>Showing <strong>{filteredTransactions.length}</strong> of <strong>{transactions.length}</strong> transactions</p>
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No transactions found</h3>
            <p>{hasActiveFilters ? "Try adjusting your filters" : "Start by adding your first transaction"}</p>
            {hasActiveFilters && (
              <button className="clear-filters-btn" onClick={clearFilters}>Clear Filters</button>
            )}
          </div>
        ) : (
          <>
            <div className="table-wrapper">
              <table className="transaction-table">
                <thead>
                  <tr>
                    <th className="sortable" onClick={() => handleSort("date")}>Date {getSortIcon("date")}</th>
                    <th>Description</th>
                    <th className="sortable" onClick={() => handleSort("category")}>Category {getSortIcon("category")}</th>
                    <th>Type</th>
                    <th className="sortable" onClick={() => handleSort("amount")}>Amount {getSortIcon("amount")}</th>
                    <th>Receipt</th>
                    {isAdmin && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((t) => (
                    <tr key={t.id} className="table-row">
                      <td className="td-date">{formatDate(t.date)}</td>
                      <td className="td-desc">{t.description}</td>
                      <td><span className="category-badge">{t.category}</span></td>
                      <td>
                        <span className={`type-badge ${t.type}`}>
                          {t.type === "income" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                          {t.type}
                        </span>
                      </td>
                      <td className={`td-amount ${t.type}`}>
                        {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                      </td>
                      <td>
                        <button
                          className="action-btn receipt-btn-row"
                          onClick={() => setReceiptTx(t)}
                          title="View Receipt"
                        >
                          <Receipt size={13} />
                        </button>
                      </td>
                      {isAdmin && (
                        <td className="td-actions">
                          {deleteId === t.id ? (
                            <div className="delete-confirm">
                              <span>Delete?</span>
                              <button className="confirm-yes" onClick={() => handleDelete(t.id)}>Yes</button>
                              <button className="confirm-no"  onClick={() => setDeleteId(null)}>No</button>
                            </div>
                          ) : (
                            <div className="action-btns">
                              <button className="action-btn edit"   onClick={() => onEdit(t)}><Pencil size={14} /></button>
                              <button className="action-btn delete" onClick={() => setDeleteId(t.id)}><Trash2 size={14} /></button>
                            </div>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mobile-cards">
              {filteredTransactions.map((t) => (
                <div key={t.id} className="mobile-card">
                  <div className="mobile-card-top">
                    <div className="mobile-card-left">
                      <div className={`mobile-type-icon ${t.type}`}>
                        {t.type === "income" ? <TrendingUp size={17} /> : <TrendingDown size={17} />}
                      </div>
                      <div>
                        <p className="mobile-desc">{t.description}</p>
                        <p className="mobile-meta">{t.category} · {formatDate(t.date)}</p>
                      </div>
                    </div>
                    <p className={`mobile-amount ${t.type}`}>
                      {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                    </p>
                  </div>
                  <div className="mobile-card-actions">
                    <button className="action-btn receipt-btn-row" onClick={() => setReceiptTx(t)}>
                      <Receipt size={13} /> Receipt
                    </button>
                    {isAdmin && (
                      deleteId === t.id ? (
                        <div className="delete-confirm">
                          <span>Delete?</span>
                          <button className="confirm-yes" onClick={() => handleDelete(t.id)}>Yes</button>
                          <button className="confirm-no"  onClick={() => setDeleteId(null)}>No</button>
                        </div>
                      ) : (
                        <>
                          <button className="action-btn edit"   onClick={() => onEdit(t)}><Pencil size={14} /> Edit</button>
                          <button className="action-btn delete" onClick={() => setDeleteId(t.id)}><Trash2 size={14} /> Delete</button>
                        </>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {receiptTx && (
        <ReceiptModal
          transaction={receiptTx}
          onClose={() => setReceiptTx(null)}
        />
      )}
    </>
  );
};

export default TransactionList;