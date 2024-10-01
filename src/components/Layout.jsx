import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import useStore from "../store";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const { user, signOut } = useStore();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    signOut();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="flex justify-between items-center py-2  lg:px-80 bg-slate-950 text-white">
        <Link to="/" className="text-xl font-bold">
          <div className="bg-[url('./assets/main-logo.png')] bg-cover bg-center w-52 h-14"></div>
        </Link>
        <div className="flex space-x-4">
          <Link to="/statistics" className="text-white hover:underline">
            Statistics
          </Link>
        </div>
        <div className="hidden md:flex">
          <button onClick={handleToggle} className="relative">
            {`Hello, ${user?.name}`}
          </button>
          {isOpen && (
            <div className="absolute right-16 mt-8 py-2 w-48 bg-white rounded-lg shadow-xl">
              <button
                onClick={handleLogout}
                className="w-full block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
        <button className="md:hidden" onClick={handleToggle}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </nav>
      {isOpen && (
        <div className="md:hidden absolute top-0 right-0 mt-12 py-2 w-48 bg-white rounded-lg shadow-xl">
          <button
            onClick={handleLogout}
            className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
          >
            Logout
          </button>
        </div>
      )}
      <div className="flex flex-grow overflow-auto bg-background">
        <main className="flex-grow overflow-auto bg-background">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
