import { createContext, useContext, useReducer, useEffect, useState } from "react";
import { initialTransactions } from "../data/mockData";

const AppContext = createContext();


const loadFromStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};


const DEFAULT_BUDGETS = {
  Food: 12000,
  Rent: 16000,
  Transport: 3000,
  Entertainment: 4000,
  Shopping: 8000,
  Utilities: 2500,
  Health: 3000,
  Education: 3000,
};

const transactionReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "EDIT":
      return state.map((t) =>
        t.id === action.payload.id ? { ...t, ...action.payload.data } : t
      );
    case "DELETE":
      return state.filter((t) => t.id !== action.payload);
    case "RESET":
      return initialTransactions;
    default:
      return state;
  }
};


export const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() =>
    loadFromStorage("findash_dark", false)
  );
  const [role, setRoleState] = useState(() =>
    loadFromStorage("findash_role", "viewer")
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  const [transactions, dispatch] = useReducer(
    transactionReducer,
    null,
    () => loadFromStorage("findash_transactions", initialTransactions)
  );

  const [budgets, setBudgetsState] = useState(() =>
    loadFromStorage("findash_budgets", DEFAULT_BUDGETS)
  );

  useEffect(() => {
    // This runs once when the app loads
    const isDark = darkMode;
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    }
  }, []); 

  
  useEffect(() => {
    saveToStorage("findash_dark", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  
  useEffect(() => {
    saveToStorage("findash_transactions", transactions);
  }, [transactions]);

  useEffect(() => {
    saveToStorage("findash_role", role);
  }, [role]);

  useEffect(() => {
    saveToStorage("findash_budgets", budgets);
  }, [budgets]);

  const toggleDarkMode = () => setDarkMode((p) => !p);

  const setRole = (r) => setRoleState(r);

  const toggleSidebar = () => setSidebarOpen((p) => !p);

  const addTransaction = (t) => dispatch({ type: "ADD", payload: t });

  const editTransaction = (id, data) =>
    dispatch({ type: "EDIT", payload: { id, data } });

  const deleteTransaction = (id) =>
    dispatch({ type: "DELETE", payload: id });

  const resetTransactions = () => dispatch({ type: "RESET" });

  const updateBudget = (category, amount) =>
    setBudgetsState((prev) => {
      const next = { ...prev, [category]: Number(amount) };
      return next;
    });

  const isAdmin = role === "admin";

  return (
    <AppContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        role,
        setRole,
        isAdmin,
        sidebarOpen,
        setSidebarOpen,
        toggleSidebar,
        activePage,
        setActivePage,
        transactions,
        addTransaction,
        editTransaction,
        deleteTransaction,
        resetTransactions,
        budgets,
        updateBudget,
        DEFAULT_BUDGETS,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};