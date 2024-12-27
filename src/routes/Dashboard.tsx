import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { currentUser, isLoading } = useContext(UserContext);
  const router = useNavigate();

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Redirect if no user

  return (
    <>
      <h1>Welcome {currentUser?.username}!</h1>
    </>
  );
}
