// import { useApp } from "../../context/AppContext";
// import { Sun, Moon, Menu, X, User, Shield } from "lucide-react";
// import "./Header.css";

// const Header = () => {
//   const {
//     darkMode,
//     toggleDarkMode,
//     role,
//     setRole,
//     sidebarOpen,
//     toggleSidebar,
//   } = useApp();

//   const isAdmin = role === "admin";

//   return (
//     <header className="header">
//       <div className="header-left">
//         <button
//           className="menu-btn"
//           onClick={toggleSidebar}
//           aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
//           title={sidebarOpen ? "Close menu" : "Open menu"}
//         >
//           {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
//         </button>

//         <div className="logo">
//           <span className="logo-icon">💰</span>
//           <div className="logo-content">
//             <h1 className="logo-text">FinDash</h1>
//             <p className="logo-subtext">Personal Finance Dashboard</p>
//           </div>
//         </div>
//       </div>

//       <div className="header-right">
//         <div className="role-switcher">
//           <div className={`role-badge ${role}`}>
//             {isAdmin ? <Shield size={14} /> : <User size={14} />}
//             <span>{isAdmin ? "Admin" : "Viewer"}</span>
//           </div>

//           <div className="role-select-wrapper">
//             <label htmlFor="role-select" className="role-label">
//               Role
//             </label>
//             <select
//               id="role-select"
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="role-select"
//               title="Switch user role"
//             >
//               <option value="viewer">Viewer</option>
//               <option value="admin">Admin</option>
//             </select>
//           </div>

//           <p className="role-note">
//             {isAdmin
//               ? "Can add, edit and delete transactions"
//               : "View-only access"}
//           </p>
//         </div>

//         <button
//           className="theme-btn"
//           onClick={toggleDarkMode}
//           aria-label="Toggle dark mode"
//           title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
//         >
//           {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;


// import { useApp } from "../../context/AppContext";
// import { Sun, Moon, Menu, X, User, Shield } from "lucide-react";
// import "./Header.css";

// const Header = () => {
//   const {
//     darkMode,
//     toggleDarkMode,
//     role,
//     setRole,
//     sidebarOpen,
//     toggleSidebar,
//   } = useApp();

//   const isAdmin = role === "admin";

//   return (
//     <header className="header">
//       <div className="header-left">
//         <button
//           className="menu-btn"
//           onClick={toggleSidebar}
//           aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
//           title={sidebarOpen ? "Close menu" : "Open menu"}
//         >
//           {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
//         </button>

//         <div className="logo">
//           <span className="logo-icon">💰</span>
//           <div>
//             <h1 className="logo-text">FinDash</h1>
//             <p className="logo-subtext">Finance Dashboard</p>
//           </div>
//         </div>
//       </div>

//       <div className="header-right">
//         <div className="role-switcher">
//           <div className={`role-badge ${role}`}>
//             {isAdmin ? <Shield size={14} /> : <User size={14} />}
//             <span>{isAdmin ? "Admin" : "Viewer"}</span>
//           </div>

//           <select
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             className="role-select"
//             title="Switch role"
//           >
//             <option value="viewer">Viewer</option>
//             <option value="admin">Admin</option>
//           </select>
//         </div>

//         <button
//           className="theme-btn"
//           onClick={toggleDarkMode}
//           aria-label="Toggle dark mode"
//           title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
//         >
//           {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;











import { useApp } from "../../context/AppContext";
import { Sun, Moon, Menu, X, Shield, Eye } from "lucide-react";
import "./Header.css";

const Header = () => {
  const {
    darkMode,
    toggleDarkMode,
    role,
    setRole,
    sidebarOpen,
    toggleSidebar,
  } = useApp();

  const isAdmin = role === "admin";

  return (
    <header className="header">
      <div className="header-left">
        <button
          className="menu-btn"
          onClick={toggleSidebar}
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          title={sidebarOpen ? "Close menu" : "Open menu"}
        >
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <div className="logo">
          <div className="logo-icon-wrap">
            <span>💎</span>
          </div>
          <div>
            <h1 className="logo-text">
              Fin<span>Dash</span>
            </h1>
            <p className="logo-subtext">Finance Intelligence</p>
          </div>
        </div>
      </div>

      <div className="header-right">
        <div className="role-switcher">
          <div className={`role-badge ${role}`}>
            <span className="role-dot" />
            {isAdmin ? <Shield size={13} /> : <Eye size={13} />}
            <span className="role-label">{isAdmin ? "Admin" : "Viewer"}</span>
          </div>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="role-select"
            title="Switch role"
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="header-divider" />

        <button
          className="theme-btn"
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        <div
          className="header-user-avatar"
          title={isAdmin ? "Admin User" : "Viewer User"}
        >
          {isAdmin ? "A" : "V"}
        </div>
      </div>
    </header>
  );
};

export default Header;