import { useEffect, useRef, useState } from "react";
import "../index.css";

interface Props {
  shouldShow?: boolean;
  buttonText: string;
  className?: string;
  children: React.ReactNode;
}

export default function ButtonModal({
  shouldShow = false,
  className,
  buttonText,
  children,
}: Props) {
  const [show, setShow] = useState(shouldShow);
  const dropdownRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        e.target &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [show]);

  return (
    <div className="relative">
      <button
        className={`text-xs md:text-lg ${className}`}
        onClick={() => setShow((s) => !s)}
      >
        {buttonText}
      </button>
      {show && (
        <div
          ref={dropdownRef}
          className="shadow roll z-50  absolute top-0 right-[-10px]  rounded-md border border-green-500 bg-transparent backdrop-blur-lg p-5"
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
