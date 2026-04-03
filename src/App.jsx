// import { AppProvider, useApp } from "./context/AppContext";
// import { ToastProvider } from "./context/ToastContext";
// import Header from "./components/Layout/Header";
// import Sidebar from "./components/Layout/Sidebar";
// import DashboardPage from "./pages/DashboardPage";
// import TransactionsPage from "./pages/TransactionsPage";
// import InsightsPage from "./pages/InsightsPage";
// import "./App.css";

// const AppContent = () => {
//   const { activePage } = useApp();

//   const renderPage = () => {
//     switch (activePage) {
//       case "dashboard":    return <DashboardPage />;
//       case "transactions": return <TransactionsPage />;
//       case "insights":     return <InsightsPage />;
//       default:             return <DashboardPage />;
//     }
//   };

//   return (
//     <div className="app">
//       <Header />
//       <div className="app-body">
//         <Sidebar />
//         <main className="main-content">{renderPage()}</main>
//       </div>
//     </div>
//   );
// };

// const App = () => {
//   return (
//     <AppProvider>
//       <ToastProvider>
//         <AppContent />
//       </ToastProvider>
//     </AppProvider>
//   );
// };

// export default App;






import { AppProvider, useApp } from "./context/AppContext";
import { ToastProvider } from "./context/ToastContext";
import Header from "./components/Layout/Header";
import Sidebar from "./components/Layout/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage";
import InsightsPage from "./pages/InsightsPage";
import DocsPage from "./pages/DocsPage";
import "./App.css";

const AppContent = () => {
  const { activePage } = useApp();

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":    return <DashboardPage />;
      case "transactions": return <TransactionsPage />;
      case "insights":     return <InsightsPage />;
      case "docs":         return <DocsPage />;
      default:             return <DashboardPage />;
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

const App = () => (
  <AppProvider>
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  </AppProvider>
);

export default App;