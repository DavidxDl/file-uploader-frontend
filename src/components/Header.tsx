import Modal from "./Modal";
export default function Header() {
  return (
    <header className="p-2 bg-green-500 text-center shadow">
      <a href={"/"} className=" text-white text-xl font-bold ">
        Upload File
      </a>
      <Modal />
    </header>
  );
}
