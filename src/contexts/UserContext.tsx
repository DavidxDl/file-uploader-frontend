import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

type User = {
  id: string;
  username: string;
} | null;

type UserContextType = {
  currentUser: User;
  setCurrentUser: Dispatch<SetStateAction<User>>;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => {},
  isLoading: true,
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND}/get_user`,
          {
            method: "GET",
            credentials: "include", // Important for sending cookies with the request
          },
        );

        const data = await response.json();

        if (data) {
          setCurrentUser({
            id: data.id,
            username: data.username,
          });
        }
      } catch (error) {
        console.error("Error checking user session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
