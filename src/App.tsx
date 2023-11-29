import React from "react";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import RecordExpenditurePage from "./pages/RecordExpenditurePage";
import Footer from "./components/Footer";
import ExpenditureListPage from "./pages/ExpenditureListPage";
import CategoryListPage from "./pages/CategoryListPage";
import AnalysisPage from "./pages/AnalysisPage";
import { Routes } from "./routes";
import RegularExpenditurePage from "./pages/RegularExpenditurePage";

function AppLayout() {
  return (
    <div
      id="page"
      className="bg-normal gap-2 fixed inset-0 overflow-hidden flex flex-col items-stretch"
    >
      <Header />
      <Toaster />
      <div className="flex-1 flex items-stretch">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

const router = createBrowserRouter(
  [
    {
      element: <AppLayout />,
      children: [
        {
          path: Routes.RecordExpenditure,
          element: <RecordExpenditurePage />,
        },
        {
          path: Routes.ExpenditureList,
          element: <ExpenditureListPage />,
        },
        {
          path: Routes.ExpenditureDetails,
          element: null,
        },
        {
          path: Routes.CategoryList,
          element: <CategoryListPage />,
        },
        {
          path: Routes.RegularExpenditureList,
          element: <RegularExpenditurePage />,
        },
        {
          path: Routes.Analysis,
          element: <AnalysisPage />,
        },
      ],
    },
  ],
  { basename: "/top-expenditure-app" }
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
