import SummaryCards from "../components/Dashboard/SummaryCards";
import BalanceTrendChart from "../components/Dashboard/BalanceTrendChart";
import SpendingBreakdownChart from "../components/Dashboard/SpendingBreakdownChart";
import BudgetGoals from "../components/Dashboard/BudgetGoals";
import FinancialHealthScore from "../components/Dashboard/FinancialHealthScore";
import { useApp } from "../context/AppContext";
import "./Pages.css";

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
};

const DashboardPage = () => {
  const { role } = useApp();

  return (
    <div className="page">
      <div className="page-header">
        <p className="page-eyebrow">
          {getGreeting()}, {role === "admin" ? "Admin" : "Viewer"}
        </p>
        <h2 className="page-title">Financial Overview</h2>
        <p className="page-subtitle">
          Your complete financial summary — income, expenses, and trends at a glance.
        </p>
      </div>

      <SummaryCards />

      <div className="charts-grid">
        <BalanceTrendChart />
        <SpendingBreakdownChart />
      </div>

      <div className="dashboard-extras-grid">
        <FinancialHealthScore />
        <BudgetGoals />
      </div>
    </div>
  );
};

export default DashboardPage;