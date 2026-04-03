import { useApp } from "../../context/AppContext";
import {
  LayoutDashboard, ArrowLeftRight, Lightbulb,
  Shield, Eye, Sparkles, BookOpen,
} from "lucide-react";
import "./Sidebar.css";

const navItems = [
  { id: "dashboard",    label: "Dashboard",    icon: LayoutDashboard },
  { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
  { id: "insights",     label: "Insights",     icon: Lightbulb },
  { id: "docs",         label: "Docs",         icon: BookOpen },
];

const Sidebar = () => {
  const { activePage, setActivePage, sidebarOpen, setSidebarOpen, role } = useApp();
  const isAdmin = role === "admin";

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setSidebarOpen(false);
  };

  return (
    <>
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-top">
          <div className="sidebar-role-card">
            <div className="sidebar-role-header">
              <p className="sidebar-role-label">Current Role</p>
              <div className="sidebar-role-icon">
                {isAdmin ? <Shield size={12} /> : <Eye size={12} />}
              </div>
            </div>
            <h4 className="sidebar-role-value">
              {isAdmin ? "Administrator" : "Viewer"}
            </h4>
            <p className="sidebar-role-note">
              {isAdmin ? "Full access — manage & edit" : "Read-only access"}
            </p>
          </div>
        </div>

        <p className="sidebar-section-label">Navigation</p>

        <nav className="sidebar-nav">
          {navItems.map(({ id, label, icon: Icon }) => {
            const isActive = activePage === id;
            return (
              <button
                key={id}
                className={`nav-item${isActive ? " active" : ""}`}
                onClick={() => handleNavClick(id)}
              >
                <div className="nav-icon"><Icon size={17} /></div>
                <span className="nav-label">{label}</span>
                <span className="nav-active-dot" />
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-footer-inner">
            <div className="sidebar-footer-icon"><Sparkles size={14} /></div>
            <div className="sidebar-footer-text">
              <p>FinDash © 2026</p>
              <span>Track smarter, spend better</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;