import { FormEvent, useState } from "react";
import Main from "../components/Main";
import Form from "../components/Form";
import InputPassword from "../components/InputPassword";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const router = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (password !== repeatPassword)
      return setErrors(["passwords don't match!"]);

    try {
      const res = await fetch("http://localhost:3000/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          repeat_password: repeatPassword,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (data.errors) {
        return setErrors(data.errors);
      }

      router("/login");
    } catch (error) {
      setIsLoading(false);
      console.log(password, repeatPassword, username);
      return console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Main>
      <Form title="Sign Up" onSubmit={handleSubmit}>
        <fieldset className="flex flex-col">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername((u) => e.target.value)}
            className="valid:outline-1 outline-green-500 bg-white rounded-md px-2 text-sm text-black"
            required
          />
        </fieldset>
        <fieldset className="flex flex-col">
          <label htmlFor="password">Password:</label>
          <InputPassword
            name={"password"}
            password={password}
            setPassword={setPassword}
          />
        </fieldset>
        <fieldset className="flex flex-col">
          <label htmlFor="repeat-password">Repeat Password:</label>
          <InputPassword
            name="repeat_password"
            password={repeatPassword}
            setPassword={setRepeatPassword}
          />
        </fieldset>
        <ul>
          {errors.map((err, i) => (
            <li className="animate-bounce text-red-600 text-sm" key={i}>
              {err}
            </li>
          ))}
        </ul>

        <fieldset>
          <button
            disabled={isLoading}
            className={`${isLoading ? "bg-green-900" : "bg-green-500"}  mt-5`}
          >
            Sign up
          </button>
        </fieldset>
      </Form>
    </Main>
  );
}
