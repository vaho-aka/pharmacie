import { Fragment } from 'react';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';

import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { logout } from '../actions/userActions';
import {
  RiArrowDropDownLine,
  RiMenuLine,
  RiLogoutBoxLine,
  RiUserLine,
  RiFunctionLine,
} from 'react-icons/ri';

const classesLink =
  'hover:bg-lime-500 flex items-center gap-1 rounded-md py-2 px-4';

const MenuAccount = () => {
  const dispatch = useAppDispatch();
  const { userLoggedIn } = useAppSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Menu
      as="div"
      className={`relative z-40 inline-block text-left ${
        !userLoggedIn.username ? 'md:hidden' : ''
      }`}
    >
      <MenuButton
        className={`inline-flex w-full justify-center px-4 py-2 font-medium text-white rounded-md bg-neutral-800`}
      >
        {userLoggedIn.username ? (
          <div className="flex items-center gap-2 py-2 sm:p-0">
            <span>{userLoggedIn.username.split(' ')[0]}</span>
            <RiArrowDropDownLine size={22} />
          </div>
        ) : (
          <RiMenuLine size={22} />
        )}
      </MenuButton>
      <Transition
        as={Fragment}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <MenuItems className="absolute right-0 w-56 mt-2 origin-top-right bg-neutral-800 text-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none flex flex-col p-1">
          {!userLoggedIn.username ? (
            <>
              <MenuItem>
                <Link
                  to="/login"
                  className="py-2 px-4  hover:bg-lime-500 rounded-md"
                >
                  Se connecter
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/register"
                  className="py-2 px-4 hover:bg-lime-500 rounded-md"
                >
                  S'inscrire
                </Link>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem>
                <Link
                  to={`/account/${userLoggedIn.id}`}
                  className={classesLink}
                >
                  <RiUserLine />
                  <span>Mon profile</span>
                </Link>
              </MenuItem>
              {+userLoggedIn.isAdmin === 1 && (
                <MenuItem>
                  <Link to="/admin/user" className={classesLink}>
                    <RiFunctionLine />
                    <span>Administration</span>
                  </Link>
                </MenuItem>
              )}
              <MenuItem>
                <div
                  onClick={logoutHandler}
                  className="hover:bg-red-500 hover:bg-opacity-20 text-red-500 rounded-md py-2 px-4 flex items-center gap-1 transition-all cursor-pointer"
                >
                  <RiLogoutBoxLine />
                  <span>Déconnexion</span>
                </div>
              </MenuItem>
            </>
          )}
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default MenuAccount;
