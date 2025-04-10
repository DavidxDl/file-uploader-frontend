import { useState } from "react";

interface Props {
  buttonText: string;
  children: React.ReactNode;
  className: string;
}

export default function ButtonModal({
  buttonText,
  className,
  children,
}: Props) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative ml-3">
      <button className={className} onClick={() => setShow((s) => !s)}>
        {buttonText}
      </button>
      {show && (
        <div className="shadow z-10  absolute top-0 right-[-140px]  rounded-md border border-green-500 bg-black  p-5">
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
