export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);
};

export const formatDate = (dateString) => {
  if (!dateString) return "-";

  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const getMonthName = (dateString) => {
  if (!dateString) return "-";

  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });
};

export const calculateTotals = (transactions = []) => {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  return {
    income,
    expenses,
    balance: income - expenses,
  };
};

export const getCategoryBreakdown = (transactions = []) => {
  const expenseTransactions = transactions.filter((t) => t.type === "expense");
  const breakdown = {};

  expenseTransactions.forEach((t) => {
    breakdown[t.category] = (breakdown[t.category] || 0) + Number(t.amount || 0);
  });

  return Object.entries(breakdown)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

export const getMonthlyData = (transactions = []) => {
  const monthlyMap = {};

  const sorted = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  sorted.forEach((t) => {
    const monthKey = getMonthName(t.date);

    if (!monthlyMap[monthKey]) {
      monthlyMap[monthKey] = {
        month: monthKey,
        income: 0,
        expenses: 0,
      };
    }

    if (t.type === "income") {
      monthlyMap[monthKey].income += Number(t.amount || 0);
    } else {
      monthlyMap[monthKey].expenses += Number(t.amount || 0);
    }
  });

  return Object.values(monthlyMap).map((item) => ({
    ...item,
    balance: item.income - item.expenses,
  }));
};

export const getHighestSpendingCategory = (transactions = []) => {
  const breakdown = getCategoryBreakdown(transactions);
  return breakdown.length ? breakdown[0] : null;
};

export const getMonthlyComparison = (transactions = []) => {
  const monthlyData = getMonthlyData(transactions);

  if (monthlyData.length < 2) return null;

  const current = monthlyData[monthlyData.length - 1];
  const previous = monthlyData[monthlyData.length - 2];

  const expenseChange = current.expenses - previous.expenses;
  const incomeChange = current.income - previous.income;

  const expenseChangePercent =
    previous.expenses > 0
      ? Number(((expenseChange / previous.expenses) * 100).toFixed(1))
      : 0;

  const incomeChangePercent =
    previous.income > 0
      ? Number(((incomeChange / previous.income) * 100).toFixed(1))
      : 0;

  return {
    currentMonth: current.month,
    previousMonth: previous.month,
    expenseChange,
    expenseChangePercent,
    incomeChange,
    incomeChangePercent,
    currentExpenses: current.expenses,
    previousExpenses: previous.expenses,
    currentIncome: current.income,
    previousIncome: previous.income,
  };
};

export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
};

export const exportToCSV = (transactions = []) => {
  if (!transactions.length) return;

  const headers = ["Date", "Description", "Category", "Type", "Amount"];

  const escapeCSV = (value) => {
    const str = String(value ?? "");
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = transactions.map((t) => [
    t.date,
    t.description,
    t.category,
    t.type,
    t.amount,
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.map(escapeCSV).join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "transactions.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};

export const exportToJSON = (transactions = []) => {
  if (!transactions.length) return;

  const jsonContent = JSON.stringify(transactions, null, 2);
  const blob = new Blob([jsonContent], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "transactions.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};