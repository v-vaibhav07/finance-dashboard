import { createContext, useContext, useState, useEffect } from "react";
import { initialTransactions } from "../data/mockData";

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // ---- Dark Mode ----
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  // ---- Role Management ----
  const [role, setRole] = useState(() => {
    const saved = localStorage.getItem("role");
    return saved || "viewer";
  });

  // ---- Transactions ----
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  // ---- Active Page (simple navigation) ----
  const [activePage, setActivePage] = useState("dashboard");

  // ---- Sidebar open/close for mobile ----
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ---- Persist to localStorage ----
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  // ---- Transaction CRUD ----
  const addTransaction = (transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  const editTransaction = (id, updatedData) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedData } : t))
    );
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // ---- Toggle functions ----
  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const isAdmin = role === "admin";

  const value = {
    darkMode,
    toggleDarkMode,
    role,
    setRole,
    isAdmin,
    transactions,
    setTransactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
    activePage,
    setActivePage,
    sidebarOpen,
    setSidebarOpen,
    toggleSidebar,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};