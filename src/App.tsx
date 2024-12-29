import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./routes/Dashboard";
import { UserProvider } from "./contexts/UserContext";
import Header from "./components/Header";

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
