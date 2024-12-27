import "./App.css";
import { useState, useRef, useContext, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";

export default function Login() {
  const { currentUser, isLoading, setCurrentUser } = useContext(UserContext);
  const router = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const passwordRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    // Only redirect if loading is complete and user exists
    if (!isLoading && currentUser) {
      router("/dashboard");
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
    });

    const data = await res.json();

    if (data.success) {
      setCurrentUser({ id: data.user.id, username: data.user.username });
      router("/dashboard");
    }

    console.log(data);
  }

  function passwordVisibility() {
    if (passwordRef.current) {
      passwordRef.current.type =
        passwordRef.current?.type === "password" ? "text" : "password";
    }
  }

  return (
    <>
      <header>
        <span>Upload File</span>
      </header>
      <main>
        <h1>Upload File !</h1>
        <h2>Login</h2>
        <form method="POST" onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor="username">Username:</label>
            <input
              required
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="username"
            />
          </fieldset>
          <fieldset>
            <label htmlFor="password">Password:</label>
            <input
              required
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              ref={passwordRef}
            />
            <small className="password-visibility" onClick={passwordVisibility}>
              see password
            </small>
          </fieldset>

          <fieldset>
            <input type="submit" />
          </fieldset>
        </form>
      </main>
    </>
  );
}
