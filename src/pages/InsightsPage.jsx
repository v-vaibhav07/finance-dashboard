// import InsightsPanel from "../components/Insights/InsightsPanel";
// import "./Pages.css";

// const InsightsPage = () => {
//   return (
//     <div className="page">
//       <div className="page-header">
//         <h2 className="page-title">Insights</h2>
//         <p className="page-subtitle">
//           Smart observations about your spending habits
//         </p>
//       </div>

//       <InsightsPanel />
//     </div>
//   );
// };

// export default InsightsPage;








import InsightsPanel from "../components/Insights/InsightsPanel";
import "./Pages.css";

const InsightsPage = () => {
  return (
    <div className="page">
      <div className="page-header">
        <p className="page-eyebrow">Analytics</p>
        <h2 className="page-title">Spending Insights</h2>
        <p className="page-subtitle">
          Smart observations and trends based on your transaction history.
        </p>
      </div>

      <InsightsPanel />
    </div>
  );
};

export default InsightsPage;