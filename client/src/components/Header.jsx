import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
const Header = () => {
  const { currentUser } = useSelector((store) => store.user);
  return (
    <header className="bg-yellow-50 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-red-500">ANJAAN</span>
            <span className="text-slate-700">Property</span>
          </h1>
        </Link>
        <form className="bg-yellow-50 p-3 border-2 border-red-950 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <button>
            <FaSearch className="text-red-600" />
          </button>
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          {currentUser ? (
            <Link to={"/profile"}>
              <img
                src={currentUser.photoURL}
                className="w-7 h-7 object-cover rounded-full"
              />
            </Link>
          ) : (
            <Link to="/signin">
              <li className=" text-slate-700 hover:underline"> Sign in</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
