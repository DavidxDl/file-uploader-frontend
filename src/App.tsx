import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard";
import { UserProvider } from "./contexts/UserContext";
import Header from "./components/Header";
import SignUp from "./routes/SignUp";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "/",
      element: <Dashboard />,
    },

    {
      path: "/sign-up",
      element: <SignUp />,
    },
  ]);

  return (
    <>
      <Header />
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </>
  );
}
