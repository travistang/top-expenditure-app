import React from "react";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Header from "./components/Header";
import RecordExpenditurePage from "./pages/RecordExpenditurePage";
import Footer from "./components/Footer";
import ExpenditureListPage from "./pages/ExpenditureListPage";

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

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <RecordExpenditurePage />,
      },
      {
        path: "/expenditures",
        element: <ExpenditureListPage />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
