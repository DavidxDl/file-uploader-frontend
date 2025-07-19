import { useState } from "react";

interface Props {
  shouldShow?: boolean;
  buttonText: string;
  children: React.ReactNode;
}

export default function ButtonModal({
  shouldShow = false,
  buttonText,
  children,
}: Props) {
  const [show, setShow] = useState(shouldShow);

  return (
    <div className="relative">
      <button onClick={() => setShow((s) => !s)}>{buttonText}</button>
      {show && (
        <div className="shadow  absolute top-0 right-[-10px]  rounded-md border border-green-500 bg-transparent backdrop-blur-lg p-5">
          {children}
          <div className="w-full flex items-center justify-center">
            <button
              className="mt-2 text-sm mx-auto"
              onClick={() => setShow((s) => false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
