import { useApp } from "../../context/AppContext";
import { calculateTotals, formatCurrency } from "../../utils/helpers";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import "./SummaryCards.css";

const SummaryCards = () => {
  const { transactions } = useApp();
  const { income, expenses, balance } = calculateTotals(transactions);

  const incomeCount = transactions.filter((t) => t.type === "income").length;
  const expenseCount = transactions.filter((t) => t.type === "expense").length;

  const cards = [
    {
      id: "balance",
      title: "Net Balance",
      amount: balance,
      icon: Wallet,
      color: "primary",
      trend: balance >= 0 ? "positive" : "negative",
      trendIcon: balance >= 0 ? ArrowUpRight : ArrowDownRight,
      trendLabel: balance >= 0 ? "Positive" : "Negative",
      subtitle: "Total net worth",
      badgeLabel: "Net",
    },
    {
      id: "income",
      title: "Total Income",
      amount: income,
      icon: TrendingUp,
      color: "green",
      trend: "positive",
      trendIcon: ArrowUpRight,
      trendLabel: "Earned",
      subtitle: `${incomeCount} transaction${incomeCount !== 1 ? "s" : ""}`,
      badgeLabel: `+${incomeCount}`,
    },
    {
      id: "expenses",
      title: "Total Expenses",
      amount: expenses,
      icon: TrendingDown,
      color: "red",
      trend: "negative",
      trendIcon: ArrowDownRight,
      trendLabel: "Spent",
      subtitle: `${expenseCount} transaction${expenseCount !== 1 ? "s" : ""}`,
      badgeLabel: `-${expenseCount}`,
    },
  ];

  return (
    <div className="summary-cards">
      {cards.map((card) => {
        const Icon = card.icon;
        const TrendIcon = card.trendIcon;

        return (
          <div key={card.id} className={`summary-card ${card.color}`}>
            <div className="card-header">
              <div className={`card-icon ${card.color}`}>
                <Icon size={21} />
              </div>
              <div className={`card-trend ${card.trend}`}>
                <TrendIcon size={12} />
                <span>{card.trendLabel}</span>
              </div>
            </div>

            <div className="card-body">
              <p className="card-title">{card.title}</p>
              <h3 className="card-amount">{formatCurrency(card.amount)}</h3>
            </div>

            <div className="card-divider" />

            <div className="card-footer">
              <p className="card-subtitle">{card.subtitle}</p>
              <span className="card-footer-badge">{card.badgeLabel}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;