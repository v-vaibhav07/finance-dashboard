import InsightsPanel from "../components/Insights/InsightsPanel";
import "./Pages.css";

const InsightsPage = () => {
  return (
    <div className="page">
      {/* <div className="container"> */}

      <div className="page-header">
        <p className="page-eyebrow">Analytics</p>
        <h2 className="page-title">Spending Insights</h2>
        {/* <h2 className="page-title">Insights</h2> */}
        <p className="page-subtitle">
          Smart observations and trends based on your transaction history.
        </p>
        {/* <p className="page-subtitle">Track your data</p> */}
      </div>

      <InsightsPanel />

      {/* <InsightsPanel data={mockData} /> */}
     

    </div>
  );
};

export default InsightsPage;