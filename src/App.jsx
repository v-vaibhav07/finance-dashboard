import { AppProvider, useApp } from "./context/AppContext";
import Header from "./components/Layout/Header";
import Sidebar from "./components/Layout/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage";
import InsightsPage from "./pages/InsightsPage";
import "./App.css";

const AppContent = () => {
  const { activePage } = useApp();

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage />;
      case "transactions":
        return <TransactionsPage />;
      case "insights":
        return <InsightsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="app">
      <Header />
      <div className="app-body">
        <Sidebar />
        <main className="main-content">{renderPage()}</main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;