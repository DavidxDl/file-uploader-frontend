import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./routes/Dashboard";
import { UserProvider } from "./contexts/UserContext";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ]);

  return (
    <UserProvider>
      <RouterProvider router={router} />;
    </UserProvider>
  );
}
