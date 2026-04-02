// import { useApp } from "../../context/AppContext";
// import {
//   LayoutDashboard,
//   ArrowLeftRight,
//   Lightbulb,
// } from "lucide-react";
// import "./Sidebar.css";

// const navItems = [
//   { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
//   { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
//   { id: "insights", label: "Insights", icon: Lightbulb },
// ];

// const Sidebar = () => {
//   const { activePage, setActivePage, sidebarOpen, setSidebarOpen } = useApp();

//   const handleNavClick = (pageId) => {
//     setActivePage(pageId);
//     setSidebarOpen(false); // close on mobile after click
//   };

//   return (
//     <>
//       {/* Overlay for mobile */}
//       {sidebarOpen && (
//         <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
//       )}

//       <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
//         <nav className="sidebar-nav">
//           {navItems.map((item) => {
//             const Icon = item.icon;
//             const isActive = activePage === item.id;

//             return (
//               <button
//                 key={item.id}
//                 className={`nav-item ${isActive ? "active" : ""}`}
//                 onClick={() => handleNavClick(item.id)}
//               >
//                 <Icon size={20} />
//                 <span>{item.label}</span>
//               </button>
//             );
//           })}
//         </nav>

//         <div className="sidebar-footer">
//           <p>© 2026 FinDash</p>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;










// import { useApp } from "../../context/AppContext";
// import { LayoutDashboard, ArrowLeftRight, Lightbulb } from "lucide-react";
// import "./Sidebar.css";

// const navItems = [
//   { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
//   { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
//   { id: "insights", label: "Insights", icon: Lightbulb },
// ];

// const Sidebar = () => {
//   const { activePage, setActivePage, sidebarOpen, setSidebarOpen, role } = useApp();

//   const handleNavClick = (pageId) => {
//     setActivePage(pageId);
//     setSidebarOpen(false);
//   };

//   return (
//     <>
//       {sidebarOpen && (
//         <div
//           className="sidebar-overlay"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
//         <div className="sidebar-top">
//           <div className="sidebar-role-card">
//             <p className="sidebar-role-label">Signed in as</p>
//             <h4 className="sidebar-role-value">
//               {role === "admin" ? "Admin" : "Viewer"}
//             </h4>
//             <p className="sidebar-role-note">
//               {role === "admin"
//                 ? "Full access to manage transactions"
//                 : "Read-only dashboard access"}
//             </p>
//           </div>
//         </div>

//         <nav className="sidebar-nav">
//           {navItems.map((item) => {
//             const Icon = item.icon;
//             const isActive = activePage === item.id;

//             return (
//               <button
//                 key={item.id}
//                 className={`nav-item ${isActive ? "active" : ""}`}
//                 onClick={() => handleNavClick(item.id)}
//               >
//                 <Icon size={20} />
//                 <span>{item.label}</span>
//               </button>
//             );
//           })}
//         </nav>

//         <div className="sidebar-footer">
//           <p>© 2026 FinDash</p>
//           <span>Track smarter, spend better</span>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;










import { useApp } from "../../context/AppContext";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Lightbulb,
  Shield,
  Eye,
  Sparkles,
} from "lucide-react";
import "./Sidebar.css";

const navItems = [
  { id: "dashboard",    label: "Dashboard",    icon: LayoutDashboard },
  { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
  { id: "insights",     label: "Insights",     icon: Lightbulb },
];

const Sidebar = () => {
  const { activePage, setActivePage, sidebarOpen, setSidebarOpen, role } =
    useApp();

  const isAdmin = role === "admin";

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setSidebarOpen(false);
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        {/* Role Card */}
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

        {/* Nav label */}
        <p className="sidebar-section-label">Navigation</p>

        {/* Nav items */}
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                className={`nav-item${isActive ? " active" : ""}`}
                onClick={() => handleNavClick(item.id)}
              >
                <div className="nav-icon">
                  <Icon size={17} />
                </div>
                <span className="nav-label">{item.label}</span>
                <span className="nav-active-dot" />
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <div className="sidebar-footer-inner">
            <div className="sidebar-footer-icon">
              <Sparkles size={14} />
            </div>
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