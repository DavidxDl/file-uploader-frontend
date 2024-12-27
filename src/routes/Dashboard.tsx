import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { currentUser, isLoading } = useContext(UserContext);
  const router = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      router("/login");
    }
  }, [currentUser, router]);

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <h1>Welcome {currentUser?.username}!</h1>
    </main>
  ); //;
}
