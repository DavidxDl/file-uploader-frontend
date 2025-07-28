import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Files from "../components/Files";
import { Sparkles } from "lucide-react";

export default function Dashboard() {
  const { currentUser, isLoading } = useContext(UserContext);
  const router = useNavigate();

  useEffect(() => {
    if (!currentUser && !isLoading) {
      router("/login");
    }
  }, [currentUser, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
          <p className="text-gray-400">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Sparkles className="w-6 h-6 text-emerald-400" />
            <h1 className="text-3xl font-bold text-white">
              Welcome back, {currentUser.username}!
            </h1>
          </div>
          <p className="text-gray-400">
            Manage your files and folders in your secure cloud storage
          </p>
        </div>

        {/* Files Component */}
        <Files />
      </div>
    </div>
  );
}
