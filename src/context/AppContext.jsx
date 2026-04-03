// import { createContext, useContext, useState, useEffect } from "react";
// import { initialTransactions } from "../data/mockData";

// const AppContext = createContext();

// export const useApp = () => {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error("useApp must be used within AppProvider");
//   }
//   return context;
// };

// export const AppProvider = ({ children }) => {
//   // ---- Dark Mode ----
//   const [darkMode, setDarkMode] = useState(() => {
//     const saved = localStorage.getItem("darkMode");
//     return saved ? JSON.parse(saved) : false;
//   });

//   // ---- Role Management ----
//   const [role, setRole] = useState(() => {
//     const saved = localStorage.getItem("role");
//     return saved || "viewer";
//   });

//   // ---- Transactions ----
//   const [transactions, setTransactions] = useState(() => {
//     const saved = localStorage.getItem("transactions");
//     return saved ? JSON.parse(saved) : initialTransactions;
//   });

//   // ---- Active Page (simple navigation) ----
//   const [activePage, setActivePage] = useState("dashboard");

//   // ---- Sidebar open/close for mobile ----
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   // ---- Persist to localStorage ----
//   useEffect(() => {
//     localStorage.setItem("transactions", JSON.stringify(transactions));
//   }, [transactions]);

//   useEffect(() => {
//     localStorage.setItem("darkMode", JSON.stringify(darkMode));
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [darkMode]);

//   useEffect(() => {
//     localStorage.setItem("role", role);
//   }, [role]);

//   // ---- Transaction CRUD ----
//   const addTransaction = (transaction) => {
//     setTransactions((prev) => [transaction, ...prev]);
//   };

//   const editTransaction = (id, updatedData) => {
//     setTransactions((prev) =>
//       prev.map((t) => (t.id === id ? { ...t, ...updatedData } : t))
//     );
//   };

//   const deleteTransaction = (id) => {
//     setTransactions((prev) => prev.filter((t) => t.id !== id));
//   };

//   // ---- Toggle functions ----
//   const toggleDarkMode = () => setDarkMode((prev) => !prev);
//   const toggleSidebar = () => setSidebarOpen((prev) => !prev);

//   const isAdmin = role === "admin";

//   const value = {
//     darkMode,
//     toggleDarkMode,
//     role,
//     setRole,
//     isAdmin,
//     transactions,
//     setTransactions,
//     addTransaction,
//     editTransaction,
//     deleteTransaction,
//     activePage,
//     setActivePage,
//     sidebarOpen,
//     setSidebarOpen,
//     toggleSidebar,
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };















// import { createContext, useContext, useReducer, useEffect, useState } from "react";
// import { initialTransactions } from "../data/mockData";

// const AppContext = createContext();

// // ── Load from localStorage (with fallback) ──────────────────────────────────
// const loadFromStorage = (key, fallback) => {
//   try {
//     const raw = localStorage.getItem(key);
//     return raw ? JSON.parse(raw) : fallback;
//   } catch {
//     return fallback;
//   }
// };

// const saveToStorage = (key, value) => {
//   try {
//     localStorage.setItem(key, JSON.stringify(value));
//   } catch {}
// };

// // ── Default budget goals (per category per month) ────────────────────────────
// const DEFAULT_BUDGETS = {
//   Food: 12000,
//   Rent: 16000,
//   Transport: 3000,
//   Entertainment: 4000,
//   Shopping: 8000,
//   Utilities: 2500,
//   Health: 3000,
//   Education: 3000,
// };

// // ── Reducer ──────────────────────────────────────────────────────────────────
// const transactionReducer = (state, action) => {
//   switch (action.type) {
//     case "ADD":
//       return [action.payload, ...state];
//     case "EDIT":
//       return state.map((t) =>
//         t.id === action.payload.id ? { ...t, ...action.payload.data } : t
//       );
//     case "DELETE":
//       return state.filter((t) => t.id !== action.payload);
//     case "RESET":
//       return initialTransactions;
//     default:
//       return state;
//   }
// };

// // ── Provider ─────────────────────────────────────────────────────────────────
// export const AppProvider = ({ children }) => {
//   const [darkMode, setDarkMode] = useState(() =>
//     loadFromStorage("findash_dark", false)
//   );
//   const [role, setRoleState] = useState(() =>
//     loadFromStorage("findash_role", "viewer")
//   );
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activePage, setActivePage] = useState("dashboard");

//   const [transactions, dispatch] = useReducer(
//     transactionReducer,
//     null,
//     () => loadFromStorage("findash_transactions", initialTransactions)
//   );

//   const [budgets, setBudgetsState] = useState(() =>
//     loadFromStorage("findash_budgets", DEFAULT_BUDGETS)
//   );

//   // ── Persist to localStorage ────────────────────────────────────────────────
//   useEffect(() => {
//     saveToStorage("findash_transactions", transactions);
//   }, [transactions]);

//   useEffect(() => {
//     saveToStorage("findash_dark", darkMode);
//     document.documentElement.classList.toggle("dark", darkMode);
//     document.body.classList.toggle("dark", darkMode);
//   }, [darkMode]);

//   useEffect(() => {
//     saveToStorage("findash_role", role);
//   }, [role]);

//   useEffect(() => {
//     saveToStorage("findash_budgets", budgets);
//   }, [budgets]);

//   // Apply dark mode on mount
//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", darkMode);
//     document.body.classList.toggle("dark", darkMode);
//   }, []);

//   // ── Actions ────────────────────────────────────────────────────────────────
//   const toggleDarkMode = () => setDarkMode((p) => !p);

//   const setRole = (r) => setRoleState(r);

//   const toggleSidebar = () => setSidebarOpen((p) => !p);

//   const addTransaction = (t) => dispatch({ type: "ADD", payload: t });

//   const editTransaction = (id, data) =>
//     dispatch({ type: "EDIT", payload: { id, data } });

//   const deleteTransaction = (id) =>
//     dispatch({ type: "DELETE", payload: id });

//   const resetTransactions = () => dispatch({ type: "RESET" });

//   const updateBudget = (category, amount) =>
//     setBudgetsState((prev) => {
//       const next = { ...prev, [category]: Number(amount) };
//       return next;
//     });

//   const isAdmin = role === "admin";

//   return (
//     <AppContext.Provider
//       value={{
//         darkMode,
//         toggleDarkMode,
//         role,
//         setRole,
//         isAdmin,
//         sidebarOpen,
//         setSidebarOpen,
//         toggleSidebar,
//         activePage,
//         setActivePage,
//         transactions,
//         addTransaction,
//         editTransaction,
//         deleteTransaction,
//         resetTransactions,
//         budgets,
//         updateBudget,
//         DEFAULT_BUDGETS,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useApp = () => {
//   const ctx = useContext(AppContext);
//   if (!ctx) throw new Error("useApp must be used within AppProvider");
//   return ctx;
// };
import { createContext, useContext, useReducer, useEffect, useState } from "react";
import { initialTransactions } from "../data/mockData";

const AppContext = createContext();

// ── Load from localStorage (with fallback) ──────────────────────────────────
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

// ── Default budget goals (per category per month) ────────────────────────────
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

// ── Reducer ──────────────────────────────────────────────────────────────────
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

// ── Provider ─────────────────────────────────────────────────────────────────
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

  // ── Apply dark mode on mount (BEFORE any other effects) ───────────────────
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
  }, []); // Empty dependency array - runs only once on mount

  // ── Persist dark mode to localStorage and apply class changes ─────────────
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

  // ── Persist other data to localStorage ────────────────────────────────────
  useEffect(() => {
    saveToStorage("findash_transactions", transactions);
  }, [transactions]);

  useEffect(() => {
    saveToStorage("findash_role", role);
  }, [role]);

  useEffect(() => {
    saveToStorage("findash_budgets", budgets);
  }, [budgets]);

  // ── Actions ────────────────────────────────────────────────────────────────
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