import { RiShoppingCartLine } from 'react-icons/ri';

const Navigation = () => {
  return (
    <nav className="bg-gray-200 rounded-md flex items-center justify-between py-4 px-6 mb-4">
      <h1 className="text-xl font-semibold">Medicare</h1>
      <ul className="flex items-center">
        <div className="relative">
          <button className="">
            <RiShoppingCartLine size={30} />
            <div className="absolute text-white inline-flex items-center justify-center w-6 h-6 text-xs bg-lime-500 font-semibold rounded-full -top-2 -right-2">
              2
            </div>
          </button>
        </div>
        <li className="ml-10 px-4 py-2 bg-lime-500 rounded-lg text-white font-semibold">
          <a href="#" className="flex items-center gap-2">
            <span>Login</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
