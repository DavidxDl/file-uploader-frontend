import { useState } from "react";

export default function Modal() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className="p-0 m-0 size-7 absolute right-2"
        onClick={() => setShowModal(!showModal)}
      >
        <img src="lines.png" alt="" />
      </button>
      {showModal && (
        <div className="flex justify-end overflow-hidden absolute z-10 left-0 right-0 bottom-0 top-11 bg-black/50 ">
          {/* this div act as a button to close the modal */}
          <div className="flex-1" onClick={(e) => setShowModal(false)}></div>
          <div className="p-2 menu bg-black ">
            <ul>
              <h2>Menu</h2>
              <li>
                <a href="#">some Menu shit</a>
              </li>
              <li>
                <a href="#">some Menu shit</a>
              </li>
              <li>
                <a href="#">some Menu shit</a>
              </li>
              <li>
                <a href="#">some Menu shit</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
