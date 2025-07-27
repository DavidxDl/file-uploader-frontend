import { useState, useRef, useContext, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import Main from "./components/Main";

export default function Login() {
  const { currentUser, isLoading, setCurrentUser } = useContext(UserContext);
  const router = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const passwordRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    // Only redirect if loading is complete and user exists
    if (!isLoading && currentUser) {
      router("/");
    }
  }, [currentUser, isLoading, router]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    const data = await res.json();

    if (data.success) {
      setCurrentUser({ id: data.user.id, username: data.user.username });
      router("/");
    }
  }

  function passwordVisibility() {
    if (passwordRef.current) {
      passwordRef.current.type =
        passwordRef.current?.type === "password" ? "text" : "password";
    }
  }

  return (
    <Main>
      <h2 className="text-2xl font-bold">Login</h2>
      <form
        method="POST"
        className="min-h-80 w-full max-w-xl flex flex-col items-center justify-center border border-green-500 rounded-md px-10"
        onSubmit={handleSubmit}
      >
        <fieldset className="flex flex-col">
          <label htmlFor="username">Username:</label>
          <input
            className="bg-white rounded-md px-2 text-sm text-black"
            required
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
          />
        </fieldset>
        <fieldset className="flex flex-col">
          <label htmlFor="password">Password:</label>
          <input
            className="bg-white rounded-md px-2 text-black text-sm"
            required
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            ref={passwordRef}
          />
          <small
            className="cursor-pointer password-visibility"
            onClick={passwordVisibility}
          >
            see password
          </small>
        </fieldset>

        <fieldset>
          <button className="text-sm mt-2">Log in</button>
        </fieldset>
      </form>
    </Main>
  );
}
