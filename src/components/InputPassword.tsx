import React, { useRef } from "react";

interface Props {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  name: string;
}

export default function InputPassword({ password, name, setPassword }: Props) {
  const passwordRef = useRef<HTMLInputElement | null>(null);
  return (
    <>
      <input
        className="flex-1 focus:outline focus:outline-2 focus:outline-green-500 bg-stone-800 rounded-r-md px-2  text-sm"
        required
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name={name}
        ref={passwordRef}
      />
    </>
  );
}
