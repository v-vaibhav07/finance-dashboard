import { createContext, useContext, useState, useCallback } from "react";
import "./Toast.css";
import { CheckCircle2, AlertTriangle, Info, X, Trash2, Pencil, Plus, Download } from "lucide-react";

const ToastContext = createContext();

let toastId = 0;

const ICONS = {
  success: CheckCircle2,
  error:   AlertTriangle,
  info:    Info,
  delete:  Trash2,
  edit:    Pencil,
  add:     Plus,
  export:  Download,
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ message, type = "success", duration = 3200 }) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type, exiting: false }]);
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
      );
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 380);
    }, duration);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 380);
  };

  // Shorthand helpers
  const toast = {
    success: (msg)        => addToast({ message: msg, type: "success" }),
    error:   (msg)        => addToast({ message: msg, type: "error",  duration: 4000 }),
    info:    (msg)        => addToast({ message: msg, type: "info" }),
    add:     (msg)        => addToast({ message: msg, type: "add" }),
    edit:    (msg)        => addToast({ message: msg, type: "edit" }),
    delete:  (msg)        => addToast({ message: msg, type: "delete", duration: 3600 }),
    export:  (msg)        => addToast({ message: msg, type: "export" }),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}

      {/* Portal-style container */}
      <div className="toast-container">
        {toasts.map(({ id, message, type, exiting }) => {
          const Icon = ICONS[type] || Info;
          return (
            <div
              key={id}
              className={`toast toast-${type} ${exiting ? "toast-exit" : "toast-enter"}`}
            >
              <div className={`toast-icon-wrap toast-icon-${type}`}>
                <Icon size={15} />
              </div>
              <span className="toast-msg">{message}</span>
              <button className="toast-close" onClick={() => removeToast(id)}>
                <X size={13} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};