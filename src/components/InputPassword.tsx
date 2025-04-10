import React, { useRef } from "react";

interface Props {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  name: string;
}

export default function InputPassword({ password, name, setPassword }: Props) {
  const passwordRef = useRef<HTMLInputElement | null>(null);

  function passwordVisibility() {
    if (passwordRef.current) {
      passwordRef.current.type =
        passwordRef.current?.type === "password" ? "text" : "password";
    }
  }
  return (
    <>
      <input
        className="bg-white rounded-md px-2 text-black text-sm"
        required
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name={name}
        ref={passwordRef}
      />
      <small
        className="cursor-pointer password-visibility"
        onClick={passwordVisibility}
      >
        see password
      </small>
    </>
  );
}
