# 💸 Finance Dashboard

A modern, responsive **Finance Dashboard** built using React + Vite that helps users track expenses, visualize data, and gain financial insights.

---

## ✨ Features

- 📊 Interactive Dashboard with financial overview  
- 💰 Expense & Transaction Management  
- 📈 Charts for spending and balance trends  
- 🎯 Budget Goals & Savings Tracking  
- 📉 Financial Health Score  
- 🔍 Insights & Analytics Panel  
- 🔄 Role-based UI (User/Admin)  
- 🔔 Toast Notifications System  
- 📄 Documentation Page  

---

## ✨ Features

### 📊 Dashboard Overview
- **Summary Cards** - Real-time view of total income, expenses, and net balance with animated hover effects
- **Monthly Trend Chart** - Bar chart visualization comparing income vs expenses over the last 6 months
- **Spending Breakdown** - Interactive donut chart showing category-wise expense distribution
- **Financial Health Score** - AI-like scoring system (A+ to D grade) based on 4 key metrics
- **Budget Goals** - Category-wise monthly spending limits with live progress bars
- **Savings Goals Tracker** - Create, track, and manage savings goals with deadlines and fund addition

### 📝 Transaction Management
- **Full CRUD Operations** - Add, Edit, Delete transactions (Admin only)
- **Search & Filter** - Search by description, category, amount, or date
- **Advanced Sorting** - Sort by date, amount, or category (ascending/descending)
- **Data Export** - Export filtered transactions as CSV or JSON files
- **Digital Receipt** - Download/Print transaction receipts as styled HTML documents
- **Delete Confirmation** - Safety confirmation before deleting any transaction

### 💡 Insights & Analytics
- **Savings Rate** - Real-time savings percentage with visual progress bar
- **Highest/Lowest Spending** - Identify top and bottom spending categories
- **Monthly Comparison** - Compare income and expenses between consecutive months
- **Best/Worst Month** - Identify your best and worst performing months
- **Category Table** - Ranked category spending with emoji medals (🥇🥈🥉) and visual progress bars
- **Quick Stats** - Total transactions, income entries, expense entries, and category count

### 👥 Role-Based Access Control (RBAC)

| Role | Icon | Permissions |
|------|------|-------------|
| **Viewer** | 👁️ | View-only access (dashboard, transactions, insights, analytics) |
| **Admin** | 🛡️ | Full access - Add/Edit/Delete transactions, Edit budgets, Add savings goals |

### 🎨 UI/UX Features
- **Dark/Light Mode** - Seamless theme switching with localStorage persistence
- **Responsive Design** - Fully responsive layout for desktop, tablet, and mobile devices
- **Toast Notifications** - Beautiful animated notifications for all CRUD operations
- **Modern Design System** - Glassmorphism effects, smooth animations, and custom scrollbar
- **Print-Ready Receipts** - Transaction receipts optimized for printing

---

## 🛠️ Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| Frontend Framework | React | 19 |
| Build Tool | Vite | 8 |
| Charts Library | Recharts | 3 |
| Icons | Lucide React | Latest |
| State Management | React Context API + useReducer | - |
| Styling | Pure CSS Variables | - |
| Data Persistence | localStorage | - |
| Fonts | Plus Jakarta Sans, DM Sans, JetBrains Mono | Google Fonts |
| Code Quality | ESLint | Latest |

---

## 🧠 Approach & Architecture

### 🏗️ Development Approach

This project follows a **component-based architecture** using React, focusing on modularity, scalability, and reusability.

- The application is divided into **pages and reusable components**
- Each feature (Dashboard, Transactions, Insights) is implemented as an independent module
- Styling is handled using **component-level CSS** for better maintainability

---

### 🔄 State Management

- Global state is managed using **React Context API + useReducer**
- Centralized state helps in:
  - Managing transactions
  - Updating dashboard data in real-time
  - Handling role-based access

---

### 📊 Data Handling

- Data is stored in **localStorage** to simulate persistent storage
- All CRUD operations (Create, Read, Update, Delete) are handled efficiently
- Utility functions are used for data formatting and calculations

---

### 🎯 Design Decisions

- **Role-Based Access (RBAC):**
  Implemented to simulate real-world applications where different users have different permissions

- **Modular Structure:**
  Code is divided into small reusable components to improve readability and scalability

- **Separation of Concerns:**
  Logic, UI, and data handling are separated into different layers (components, context, utils)

- **Performance Optimization:**
  Efficient rendering using React best practices and minimal re-renders

---

### 🎨 UI/UX Approach

- Designed with a focus on **clean and modern UI**
- Smooth animations and transitions for better user experience
- Fully responsive design for all screen sizes



---
## 📁 Project Structure

```bash
FINANCE-DASHBOARD/
├── public/
│   └── assets/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Dashboard/
│   │   │   ├── BalanceTrendChart.jsx
│   │   │   ├── BudgetGoals.css
│   │   │   ├── BudgetGoals.jsx
│   │   │   ├── Charts.css
│   │   │   ├── FinancialHealthScore.css
│   │   │   ├── FinancialHealthScore.jsx
│   │   │   ├── SavingsGoal.css
│   │   │   ├── SavingsGoal.jsx
│   │   │   ├── SpendingBreakdownChart.jsx
│   │   │   ├── SummaryCards.css
│   │   │   └── SummaryCards.jsx
│   │   ├── Insights/
│   │   │   ├── Insights.css
│   │   │   └── InsightsPanel.jsx
│   │   ├── Layout/
│   │   │   ├── Header.css
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.css
│   │   │   └── Sidebar.jsx
│   │   ├── RoleSwitcher/
│   │   │   ├── RoleSwitcher.css
│   │   │   └── RoleSwitcher.jsx
│   │   └── Transactions/
│   │       ├── ReceiptModal.css
│   │       ├── ReceiptModal.jsx
│   │       ├── TransactionForm.jsx
│   │       ├── TransactionList.jsx
│   │       └── Transactions.css
│   ├── context/
│   │   ├── AppContext.jsx
│   │   ├── Toast.css
│   │   └── ToastContext.jsx
│   ├── data/
│   │   └── mockData.js
│   ├── pages/
│   │   ├── DashboardPage.jsx
│   │   ├── DocsPage.css
│   │   ├── DocsPage.jsx
│   │   ├── InsightsPage.jsx
│   │   ├── Pages.css
│   │   └── TransactionsPage.jsx
│   ├── utils/
│   │   └── helpers.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```




---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn or pnpm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/v-vaibhav07/finance-dashboard.git

# 2. Navigate to project directory
cd finance-dashboard

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev

# 5. Build for production
npm run build

# 6. Preview production build
npm run preview
