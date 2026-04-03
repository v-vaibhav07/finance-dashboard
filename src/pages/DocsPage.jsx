// import "./DocsPage.css";
// import {
//   BookOpen, Layers, Shield, BarChart3, Target, Trophy,
//   Bell, Download, Moon, Search, SlidersHorizontal,
//   ArrowRight, CheckCircle2, Zap, Database,
// } from "lucide-react";
// // GitHub icon is not in lucide-react by default, use a different icon or add it properly

// const SECTIONS = [
//   {
//     id: "overview",
//     icon: BookOpen,
//     title: "Project Overview",
//     color: "purple",
//     content: (
//       <>
//         <p>
//           <strong>FinDash</strong> is a fully client-side Finance Dashboard built with
//           React 19 + Vite. It lets users track income &amp; expenses, visualize spending
//           patterns, set budget limits, and work toward savings goals — all without a
//           backend.
//         </p>
//         <div className="docs-tech-grid">
//           {[
//             { label: "Framework",   value: "React 19 + Vite 8" },
//             { label: "Charts",      value: "Recharts 3" },
//             { label: "Icons",       value: "Lucide React" },
//             { label: "State",       value: "Context API + useReducer" },
//             { label: "Persistence", value: "localStorage" },
//             { label: "Styling",     value: "Pure CSS Variables" },
//           ].map(({ label, value }) => (
//             <div key={label} className="docs-tech-item">
//               <span className="docs-tech-label">{label}</span>
//               <span className="docs-tech-value">{value}</span>
//             </div>
//           ))}
//         </div>
//       </>
//     ),
//   },
//   {
//     id: "setup",
//     icon: Zap,
//     title: "Quick Setup",
//     color: "green",
//     content: (
//       <>
//         <p>Get the project running locally in under 2 minutes:</p>
//         <div className="docs-steps">
//           {[
//             { step: "1", cmd: "git clone <repo-url>",   desc: "Clone the repository" },
//             { step: "2", cmd: "cd finance-dashboard",    desc: "Enter project directory" },
//             { step: "3", cmd: "npm install",             desc: "Install dependencies" },
//             { step: "4", cmd: "npm run dev",             desc: "Start dev server at localhost:5173" },
//           ].map(({ step, cmd, desc }) => (
//             <div key={step} className="docs-step">
//               <div className="docs-step-num">{step}</div>
//               <div className="docs-step-body">
//                 <code className="docs-code">{cmd}</code>
//                 <span className="docs-step-desc">{desc}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="docs-note">
//           <CheckCircle2 size={14} />
//           No environment variables or backend required. Runs entirely in the browser.
//         </div>
//       </>
//     ),
//   },
//   {
//     id: "features",
//     icon: Layers,
//     title: "Core Features",
//     color: "blue",
//     content: (
//       <>
//         <div className="docs-feature-list">
//           {[
//             { icon: BarChart3, title: "Dashboard Overview",      desc: "Summary cards, monthly bar chart, and spending donut chart with real-time data from transactions." },
//             { icon: Search,    title: "Transaction Management",  desc: "Full CRUD for transactions. Search, filter by type/category, sort by date/amount/category, export CSV or JSON." },
//             { icon: Shield,    title: "Role-Based UI (RBAC)",    desc: "Viewer role is read-only. Admin role unlocks add, edit, delete. Switch roles from the header dropdown." },
//             { icon: BarChart3, title: "Insights Panel",          desc: "Savings rate, highest/lowest spending categories, monthly comparison, best/worst month, and a ranked category table." },
//             { icon: Target,    title: "Budget Goals",            desc: "Set monthly limits per category. Live progress bars turn orange at 80% and red when over budget. Admin can edit inline." },
//             { icon: Zap,       title: "Financial Health Score",  desc: "Scores savings rate, budget adherence, income diversity, and spending consistency. Returns A+–D grade with improvement tips." },
//             { icon: Trophy,    title: "Savings Goal Tracker",    desc: "Create goals with emoji, target, deadline. Add funds inline. Auto-estimates months needed based on current savings rate." },
//             { icon: Bell,      title: "Toast Notifications",     desc: "Animated bottom-right toasts fire on every action — add, edit, delete, export. Each has a countdown progress bar." },
//             { icon: Moon,      title: "Dark Mode",               desc: "Toggles via header button. Preference persists in localStorage across sessions." },
//             { icon: Database,  title: "Data Persistence",        desc: "All data (transactions, budgets, goals, dark mode, role) saved to localStorage. Survives page refreshes." },
//             { icon: Download,  title: "CSV / JSON Export",       desc: "Export filtered transactions as CSV or JSON with one click from the Transactions page toolbar." },
//           ].map(({ icon: Icon, title, desc }) => (
//             <div key={title} className="docs-feature-item">
//               <div className="docs-feature-icon"><Icon size={15} /></div>
//               <div>
//                 <p className="docs-feature-title">{title}</p>
//                 <p className="docs-feature-desc">{desc}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </>
//     ),
//   },
//   {
//     id: "rbac",
//     icon: Shield,
//     title: "Role-Based Access",
//     color: "orange",
//     content: (
//       <>
//         <p>Two roles are simulated on the frontend. No authentication is required.</p>
//         <div className="docs-roles-grid">
//           <div className="docs-role-card viewer">
//             <div className="docs-role-header">
//               <Shield size={16} />
//               <span>Viewer</span>
//             </div>
//             <ul className="docs-role-list">
//               {["View dashboard & charts","Browse all transactions","Read insights & analytics","See budget & goal progress"].map((item) => (
//                 <li key={item}><CheckCircle2 size={12} />{item}</li>
//               ))}
//             </ul>
//           </div>
//           <div className="docs-role-card admin">
//             <div className="docs-role-header">
//               <Shield size={16} />
//               <span>Admin</span>
//             </div>
//             <ul className="docs-role-list">
//               {["Everything Viewer can do","Add new transactions","Edit existing transactions","Delete transactions","Edit budget limits","Add savings goals & funds"].map((item) => (
//                 <li key={item}><CheckCircle2 size={12} />{item}</li>
//               ))}
//             </ul>
//           </div>
//         </div>
//         <div className="docs-note">
//           Switch roles using the dropdown in the top-right header. The role is persisted
//           in localStorage across sessions.
//         </div>
//       </>
//     ),
//   },
//   {
//     id: "structure",
//     icon: Layers,
//     title: "Project Structure",
//     color: "blue",
//     content: (
//       <>
//         <div className="docs-tree">
//           {[
//             { indent: 0, text: "src/", type: "dir" },
//             { indent: 1, text: "components/", type: "dir" },
//             { indent: 2, text: "Dashboard/    ← SummaryCards, Charts, Budget, Health, Goals", type: "file" },
//             { indent: 2, text: "Insights/     ← InsightsPanel", type: "file" },
//             { indent: 2, text: "Layout/       ← Header, Sidebar", type: "file" },
//             { indent: 2, text: "Transactions/ ← TransactionList, TransactionForm", type: "file" },
//             { indent: 1, text: "context/", type: "dir" },
//             { indent: 2, text: "AppContext.jsx   ← global state + localStorage", type: "file" },
//             { indent: 2, text: "ToastContext.jsx ← toast notification system", type: "file" },
//             { indent: 1, text: "data/", type: "dir" },
//             { indent: 2, text: "mockData.js     ← 40 sample transactions + COLORS", type: "file" },
//             { indent: 1, text: "pages/", type: "dir" },
//             { indent: 2, text: "DashboardPage, TransactionsPage, InsightsPage, DocsPage", type: "file" },
//             { indent: 1, text: "utils/", type: "dir" },
//             { indent: 2, text: "helpers.js      ← formatCurrency, calculateTotals, etc.", type: "file" },
//           ].map(({ indent, text, type }, i) => (
//             <div key={i} className={`docs-tree-row ${type}`} style={{ paddingLeft: `${indent * 20}px` }}>
//               <span className="docs-tree-icon">{type === "dir" ? "📁" : "📄"}</span>
//               <span>{text}</span>
//             </div>
//           ))}
//         </div>
//       </>
//     ),
//   },
//   {
//     id: "state",
//     icon: Database,
//     title: "State Management",
//     color: "purple",
//     content: (
//       <>
//         <p>
//           Application state is managed with <strong>React Context API</strong> and
//           <strong> useReducer</strong> — no external library needed.
//         </p>
//         <div className="docs-state-grid">
//           {[
//             { store: "AppContext",   keys: ["transactions (useReducer)","darkMode","role","activePage","budgets"], desc: "Core app state. Entire state tree persists to localStorage on every change." },
//             { store: "ToastContext", keys: ["toasts[]","addToast()","removeToast()"], desc: "Lightweight toast queue. Auto-removes after duration. Spring animation on enter/exit." },
//             { store: "localStorage", keys: ["findash_transactions","findash_dark","findash_role","findash_budgets","findash_goals"], desc: "Persistence layer. All keys are namespaced with 'findash_' prefix." },
//           ].map(({ store, keys, desc }) => (
//             <div key={store} className="docs-state-card">
//               <p className="docs-state-name">{store}</p>
//               <div className="docs-state-keys">
//                 {keys.map((k) => <code key={k} className="docs-key">{k}</code>)}
//               </div>
//               <p className="docs-state-desc">{desc}</p>
//             </div>
//           ))}
//         </div>
//       </>
//     ),
//   },
// ];

// const DocsPage = () => {
//   return (
//     <div className="page docs-page">
//       {/* Hero */}
//       <div className="docs-hero">
//         <div className="docs-hero-icon"><BookOpen size={28} /></div>
//         <div>
//           <p className="page-eyebrow">Documentation</p>
//           <h2 className="page-title">Project README</h2>
//           <p className="page-subtitle">
//             Setup guide, feature overview, architecture decisions, and state management approach.
//           </p>
//         </div>
//         <a
//           className="docs-github-btn"
//           href="https://github.com/v-vaibhav07/finance-dashboard"
//           target="_blank"
//           rel="noreferrer"
//         >
//           <span className="docs-github-icon">🐙</span> View on GitHub
//         </a>
//       </div>

//       {/* TOC */}
//       <div className="docs-toc">
//         <p className="docs-toc-label">On this page</p>
//         <div className="docs-toc-links">
//           {SECTIONS.map(({ id, title, icon: Icon, color }) => (
//             <a key={id} href={`#${id}`} className={`docs-toc-link toc-${color}`}>
//               <Icon size={13} />
//               {title}
//               <ArrowRight size={11} />
//             </a>
//           ))}
//         </div>
//       </div>

//       {/* Sections */}
//       <div className="docs-sections">
//         {SECTIONS.map(({ id, icon: Icon, title, color, content }) => (
//           <section key={id} id={id} className="docs-section">
//             <div className="docs-section-header">
//               <div className={`docs-section-icon icon-${color}`}><Icon size={16} /></div>
//               <h3 className="docs-section-title">{title}</h3>
//             </div>
//             <div className="docs-section-body">{content}</div>
//           </section>
//         ))}
//       </div>

//       {/* Footer */}
//       <div className="docs-footer">
//         <p>Built with ❤️ by <b>Vaibhav</b> for <strong>Zorvyn FinTech Pvt. Ltd.</strong> Frontend Intern Assignment · 2026</p>
//       </div>
//     </div>
//   );
// };

// export default DocsPage;


















import "./DocsPage.css";
import {
  BookOpen, Layers, Shield, BarChart3, Target, Trophy,
  Bell, Download, Moon, Search, SlidersHorizontal,
  ArrowRight, CheckCircle2, Zap, Database,
} from "lucide-react";

const SECTIONS = [
  {
    id: "overview",
    icon: BookOpen,
    title: "Project Overview",
    color: "purple",
    content: (
      <>
        {/* <p>
          <strong>FinDash</strong> is a fully client-side Finance Dashboard built with
          React 20 It lets users track income &amp; expenses, visualize spending
          patterns, set budget limits, and work toward savings goals — all without a
          backend.
        </p> */}
        <p>
          <strong>FinDash</strong> is a fully client-side Finance Dashboard built with
          React 19 + Vite. It lets users track income &amp; expenses, visualize spending
          patterns, set budget limits, and work toward savings goals — all without a
          backend.
        </p>
        <div className="docs-tech-grid">
          {[
            { label: "Framework",   value: "React 19 + Vite 8" },
            { label: "Charts",      value: "Recharts 3" },
            { label: "Icons",       value: "Lucide React" },
            { label: "State",       value: "Context API + useReducer" },
            { label: "Persistence", value: "localStorage" },
            { label: "Styling",     value: "Pure CSS Variables" },
          ].map(({ label, value }) => (
            <div key={label} className="docs-tech-item">
              <span className="docs-tech-label">{label}</span>
              <span className="docs-tech-value">{value}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "features",
    icon: Layers,
    title: "Core Features",
    color: "blue",
    content: (
      <>
        <div className="docs-feature-list">
          {[
            { icon: BarChart3, title: "Dashboard Overview",      desc: "Summary cards, monthly bar chart, and spending donut chart with real-time data from transactions." },
            { icon: Search,    title: "Transaction Management",  desc: "Full CRUD for transactions. Search, filter by type/category, sort by date/amount/category, export CSV or JSON." },
            { icon: Shield,    title: "Role-Based UI (RBAC)",    desc: "Viewer role is read-only. Admin role unlocks add, edit, delete. Switch roles from the header dropdown." },
            { icon: BarChart3, title: "Insights Panel",          desc: "Savings rate, highest/lowest spending categories, monthly comparison, best/worst month, and a ranked category table." },
            { icon: Target,    title: "Budget Goals",            desc: "Set monthly limits per category. Live progress bars turn orange at 80% and red when over budget. Admin can edit inline." },
            { icon: Zap,       title: "Financial Health Score",  desc: "Scores savings rate, budget adherence, income diversity, and spending consistency. Returns A+–D grade with improvement tips." },
            { icon: Trophy,    title: "Savings Goal Tracker",    desc: "Create goals with emoji, target, deadline. Add funds inline. Auto-estimates months needed based on current savings rate." },
            { icon: Bell,      title: "Toast Notifications",     desc: "Animated bottom-right toasts fire on every action — add, edit, delete, export. Each has a countdown progress bar." },
            { icon: Moon,      title: "Dark Mode",               desc: "Toggles via header button. Preference persists in localStorage across sessions." },
            { icon: Database,  title: "Data Persistence",        desc: "All data (transactions, budgets, goals, dark mode, role) saved to localStorage. Survives page refreshes." },
            { icon: Download,  title: "CSV / JSON Export",       desc: "Export filtered transactions as CSV or JSON with one click from the Transactions page toolbar." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="docs-feature-item">
              <div className="docs-feature-icon"><Icon size={15} /></div>
              <div>
                <p className="docs-feature-title">{title}</p>
                <p className="docs-feature-desc">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "rbac",
    icon: Shield,
    title: "Role-Based Access",
    color: "orange",
    content: (
      <>
        <p>Two roles are simulated on the frontend. No authentication is required.</p>
        <div className="docs-roles-grid">
          <div className="docs-role-card viewer">
            <div className="docs-role-header">
              <Shield size={16} />
              <span>Viewer</span>
            </div>
            <ul className="docs-role-list">
              {["View dashboard & charts","Browse all transactions","Read insights & analytics","See budget & goal progress"].map((item) => (
                <li key={item}><CheckCircle2 size={12} />{item}</li>
              ))}
            </ul>
          </div>
          <div className="docs-role-card admin">
            <div className="docs-role-header">
              <Shield size={16} />
              <span>Admin</span>
            </div>
            <ul className="docs-role-list">
              {["Everything Viewer can do","Add new transactions","Edit existing transactions","Delete transactions","Edit budget limits","Add savings goals & funds"].map((item) => (
                <li key={item}><CheckCircle2 size={12} />{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="docs-note">
          Switch roles using the dropdown in the top-right header. The role is persisted
          in localStorage across sessions.
        </div>
      </>
    ),
  },
  {
    id: "structure",
    icon: Layers,
    title: "Project Structure",
    color: "blue",
    content: (
      <>
        <div className="docs-tree">
          {[
            { indent: 0, text: "src/", type: "dir" },
            { indent: 1, text: "components/", type: "dir" },
            { indent: 2, text: "Dashboard/    ← SummaryCards, Charts, Budget, Health, Goals", type: "file" },
            { indent: 2, text: "Insights/     ← InsightsPanel", type: "file" },
            { indent: 2, text: "Layout/       ← Header, Sidebar", type: "file" },
            { indent: 2, text: "Transactions/ ← TransactionList, TransactionForm", type: "file" },
            { indent: 1, text: "context/", type: "dir" },
            { indent: 2, text: "AppContext.jsx   ← global state + localStorage", type: "file" },
            { indent: 2, text: "ToastContext.jsx ← toast notification system", type: "file" },
            { indent: 1, text: "data/", type: "dir" },
            { indent: 2, text: "mockData.js     ← 40 sample transactions + COLORS", type: "file" },
            { indent: 1, text: "pages/", type: "dir" },
            { indent: 2, text: "DashboardPage, TransactionsPage, InsightsPage, DocsPage", type: "file" },
            { indent: 1, text: "utils/", type: "dir" },
            { indent: 2, text: "helpers.js      ← formatCurrency, calculateTotals, etc.", type: "file" },
          ].map(({ indent, text, type }, i) => (
            <div key={i} className={`docs-tree-row ${type}`} style={{ paddingLeft: `${indent * 20}px` }}>
              <span className="docs-tree-icon">{type === "dir" ? "📁" : "📄"}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "state",
    icon: Database,
    title: "State Management",
    color: "purple",
    content: (
      <>
        <p>
          Application state is managed with <strong>React Context API</strong> and
          <strong> useReducer</strong> — no external library needed.
        </p>
        <div className="docs-state-grid">
          {[
            { store: "AppContext",   keys: ["transactions (useReducer)","darkMode","role","activePage","budgets"], desc: "Core app state. Entire state tree persists to localStorage on every change." },
            { store: "ToastContext", keys: ["toasts[]","addToast()","removeToast()"], desc: "Lightweight toast queue. Auto-removes after duration. Spring animation on enter/exit." },
            { store: "localStorage", keys: ["findash_transactions","findash_dark","findash_role","findash_budgets","findash_goals"], desc: "Persistence layer. All keys are namespaced with 'findash_' prefix." },
          ].map(({ store, keys, desc }) => (
            <div key={store} className="docs-state-card">
              <p className="docs-state-name">{store}</p>
              <div className="docs-state-keys">
                {keys.map((k) => <code key={k} className="docs-key">{k}</code>)}
              </div>
              <p className="docs-state-desc">{desc}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
];

const DocsPage = () => {
  return (
    <div className="page docs-page">
      {/* Hero */}
      <div className="docs-hero">
        <div className="docs-hero-icon"><BookOpen size={28} /></div>
        <div>
          <p className="page-eyebrow">Documentation</p>
          <h2 className="page-title">Project README</h2>
          <p className="page-subtitle">
            Setup guide, feature overview, architecture decisions, and state management approach.
          </p>
        </div>
        <a
          className="docs-github-btn"
          href="https://github.com/v-vaibhav07/finance-dashboard"
          target="_blank"
          rel="noreferrer"
        >
          <span className="docs-github-icon">🐙</span> View on GitHub
        </a>
      </div>

      {/* TOC */}
      <div className="docs-toc">
        <p className="docs-toc-label">On this page</p>
        <div className="docs-toc-links">
          {SECTIONS.map(({ id, title, icon: Icon, color }) => (
            <a key={id} href={`#${id}`} className={`docs-toc-link toc-${color}`}>
              <Icon size={13} />
              {title}
              <ArrowRight size={11} />
            </a>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div className="docs-sections">
        {SECTIONS.map(({ id, icon: Icon, title, color, content }) => (
          <section key={id} id={id} className="docs-section">
            <div className="docs-section-header">
              <div className={`docs-section-icon icon-${color}`}><Icon size={16} /></div>
              <h3 className="docs-section-title">{title}</h3>
            </div>
            <div className="docs-section-body">{content}</div>
          </section>
        ))}
      </div>

      {/* Footer */}
      <div className="docs-footer">
        <p>Built with ❤️ by <b>Vaibhav</b> for <strong>Zorvyn FinTech Pvt. Ltd.</strong> Frontend Intern Assignment · 2026</p>
      </div>
    </div>
  );
};

export default DocsPage;