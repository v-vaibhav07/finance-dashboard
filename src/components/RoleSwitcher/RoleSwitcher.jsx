import { useApp } from "../../context/AppContext";
import { Shield, User, LogOut } from "lucide-react";
import "./RoleSwitcher.css";

const RoleSwitcher = () => {
  const { role, setRole, isAdmin } = useApp();

  const handleRoleChange = (newRole) => {
    setRole(newRole);
  };

  return (
    <div className="role-switcher">
      <div className="role-header">
        <span className="role-label">Current Role</span>
        <div className={`role-badge ${role}`}>
          {role === "admin" ? (
            <>
              <Shield size={14} /> Admin
            </>
          ) : (
            <>
              <User size={14} /> Viewer
            </>
          )}
        </div>
      </div>

      <div className="role-options">
        <button
          className={`role-option ${role === "admin" ? "active admin" : ""}`}
          onClick={() => handleRoleChange("admin")}
          title={isAdmin ? "Admin Mode - Full Access" : "Click to enable admin access"}
        >
          <Shield size={16} />
          <span>Admin</span>
        </button>

        <button
          className={`role-option ${role === "viewer" ? "active viewer" : ""}`}
          onClick={() => handleRoleChange("viewer")}
          title="Viewer Mode - Read Only"
        >
          <User size={16} />
          <span>Viewer</span>
        </button>
      </div>

      <div className="role-description">
        {isAdmin ? (
          <p>✓ You can add, edit & delete transactions</p>
        ) : (
          <p>👁️ You can only view transactions (read-only)</p>
        )}
      </div>
    </div>
  );
};

export default RoleSwitcher;