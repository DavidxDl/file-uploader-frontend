import React from "react";

interface Props {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  title: string;
}
export default function Form({ onSubmit, title, children }: Props) {
  return (
    <>
      <h2 className="text-2xl mb-5 font-bold">{title}</h2>
      <form
        method="POST"
        className="min-h-80 w-full max-w-xl flex flex-col items-center justify-center border-2 border-green-500 rounded-md px-10"
        onSubmit={onSubmit}
      >
        {children}
      </form>
    </>
  );
}
