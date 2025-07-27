import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Main from "../components/Main";
import Files from "../components/Files";

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
    <Main>
      <h1 className="text-3xl mb-4">Welcome {currentUser?.username}!</h1>

      <Files />
    </Main>
  );
}
