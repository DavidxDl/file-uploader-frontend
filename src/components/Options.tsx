import { useRef, useEffect, useState } from "react";
import "../index.css";

interface Props {
  shouldShow?: boolean;
  buttonText: string;
  className: string;
  children: React.ReactNode;
}

export default function Options({
  shouldShow = false,
  className,
  buttonText,
  children,
}: Props) {
  const [show, setShow] = useState(shouldShow);
  const dropdownRef = useRef<null | HTMLDivElement>(null);
  const position = useRef<{ position: null | DOMRect }>({ position: null });

  function onClick(e: React.MouseEvent<HTMLButtonElement>) {
    setShow((s) => !s);
    position.current.position = e.currentTarget.getBoundingClientRect();
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [show]);

  return (
    <div className="cursor-default ">
      <button className={className} onClick={onClick}>
        {buttonText}
      </button>
      {show && position.current.position && (
        <div
          ref={dropdownRef}
          className={`shadow z-40 roll overflow-y-hidden  absolute  left-[${position.current.position.left + window.scrollX}] top-[${position.current.position.bottom + window.scrollY}]  rounded-md border border-green-500 bg-transparent backdrop-blur-lg`}
        >
          {children}
          <div className="w-full flex items-center justify-center">
            <button
              className="mt-2 text-sm mx-auto"
              onClick={() => setShow(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
