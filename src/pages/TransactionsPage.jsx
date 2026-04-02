// import { useState } from "react";
// import { useApp } from "../context/AppContext";
// import TransactionList from "../components/Transactions/TransactionList";
// import TransactionForm from "../components/Transactions/TransactionForm";
// import { Plus } from "lucide-react";
// import "./Pages.css";

// const TransactionsPage = () => {
//   const { isAdmin } = useApp();

//   const [showForm, setShowForm] = useState(false);
//   const [editingTransaction, setEditingTransaction] = useState(null);

//   const handleEdit = (transaction) => {
//     if (!isAdmin) return;
//     setEditingTransaction(transaction);
//     setShowForm(true);
//   };

//   const handleClose = () => {
//     setShowForm(false);
//     setEditingTransaction(null);
//   };

//   return (
//     <div className="page">
//       <div className="page-header">
//         <div className="page-header-top">
//           <div>
//             <h2 className="page-title">Transactions</h2>
//             <p className="page-subtitle">
//               Manage and review your financial transactions
//             </p>
//           </div>

//           {isAdmin && (
//             <button className="add-btn" onClick={() => setShowForm(true)}>
//               <Plus size={18} />
//               <span>Add Transaction</span>
//             </button>
//           )}
//         </div>
//       </div>

//       <TransactionList onEdit={handleEdit} />

//       {showForm && isAdmin && (
//         <TransactionForm
//           editTransaction={editingTransaction}
//           onClose={handleClose}
//         />
//       )}
//     </div>
//   );
// };

// export default TransactionsPage;


import { useState } from "react";
import { useApp } from "../context/AppContext";
import TransactionList from "../components/Transactions/TransactionList";
import TransactionForm from "../components/Transactions/TransactionForm";
import { Plus } from "lucide-react";
import "./Pages.css";

const TransactionsPage = () => {
  const { isAdmin } = useApp();

  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleEdit = (transaction) => {
    if (!isAdmin) return;
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingTransaction(null);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <p className="page-eyebrow">Records</p>
            <h2 className="page-title">Transactions</h2>
            <p className="page-subtitle">
              View, filter, and manage all your financial transactions.
            </p>
          </div>

          {isAdmin && (
            <button className="add-btn" onClick={() => setShowForm(true)}>
              <Plus size={18} />
              <span>Add Transaction</span>
            </button>
          )}
        </div>
      </div>

      <TransactionList onEdit={handleEdit} />

      {showForm && isAdmin && (
        <TransactionForm
          editTransaction={editingTransaction}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default TransactionsPage;