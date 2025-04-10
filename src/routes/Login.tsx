import { useState, useRef, useContext, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import Header from "../components/Header";
import Main from "../components/Main";
import Form from "../components/Form";
import InputPassword from "../components/InputPassword";

export default function Login() {
  const { currentUser, isLoading, setCurrentUser } = useContext(UserContext);
  const router = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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

  return (
    <Main>
      <Form title="Login" onSubmit={handleSubmit}>
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
          <InputPassword
            name="password"
            password={password}
            setPassword={setPassword}
          />
        </fieldset>

        <fieldset>
          <button className="text-sm my-2">Log in</button>
        </fieldset>
        <small>
          You dont have a account? <a href="/sign-up">Register</a>!
        </small>
      </Form>
    </Main>
  );
}
