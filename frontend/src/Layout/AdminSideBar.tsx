import { NavLink } from 'react-router-dom';

const AdminSideBar = () => {
  return (
    <ul className="min-w-60 calc bg-neutral-800 rounded-md p-1 text-white flex gap-1 flex-col">
      <NavLink
        className={({ isActive }) =>
          `${
            isActive ? 'bg-lime-500 text-neutral-800' : ''
          } hover:bg-lime-200 py-2 hover:text-neutral-800 transition-all rounded-md text-center`
        }
        to="/admin/user"
      >
        Users
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `${
            isActive ? 'bg-lime-500 text-neutral-800' : ''
          } hover:bg-lime-200 py-2 rounded-md transition-all hover:text-neutral-800 text-center`
        }
        to="/admin/product"
      >
        Products
      </NavLink>
    </ul>
  );
};

export default AdminSideBar;
