const Navigation = () => {
  return (
    <nav className="bg-gray-200 rounded-md flex items-center justify-between py-4 px-6 mb-4">
      <h1 className="text-xl font-semibold">Medicare</h1>
      <ul className="flex items-center">
        <li className="px-4 py-2 bg-lime-500 rounded-lg text-white font-semibold">
          <a href="#" className="flex items-center gap-2 px-6">
            <span>Login</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
