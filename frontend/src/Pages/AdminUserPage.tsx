import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { deleteUser, getAllUsers } from '../actions/userActions';
import {
  RiCheckboxCircleFill,
  RiCloseCircleFill,
  RiDeleteBinLine,
  RiEditLine,
} from 'react-icons/ri';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../Layout/LoadingSpinner';

const tableClasses =
  'bg-background px-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 items-center justify-between';

const AdminUserPage = () => {
  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector((state) => state.user);
  const [localUsers, setLocalUsers] = useState(users);

  useEffect(() => {
    dispatch(getAllUsers());
    setLocalUsers(users);
  }, [dispatch, users]);

  const deleteUserHandler = (userId: string) => {
    dispatch(deleteUser(userId));
    setLocalUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== userId)
    );
  };

  return (
    <>
      {loading && localUsers.length === 0 ? (
        <LoadingSpinner />
      ) : (
        <div className="p-4">
          <h1 className="border-l-8 font-semibold text-xl border-lime-500 pl-5 mb-4">
            Lists of users
          </h1>
          <div className="overflow-x-auto">
            <div className="w-full border-x rounded-md mt-4 min-w-[600px]">
              <div
                className={`${tableClasses} py-2 bg-slate-400 text-white rounded-t-md`}
              >
                <span className="hidden md:block">ID</span>
                <span className="text-left">Name</span>
                <span className="hidden sm:block">Email</span>
                <span className="text-center">Admin</span>
                <span className="hidden lg:block text-right">Created at</span>
                <span className="text-right">Action</span>
              </div>
              <ul className="bg-white">
                {localUsers.map((user) => (
                  <li key={user.id} className={`${tableClasses} py-2 border-b`}>
                    <span className="hidden md:block">{user.id}</span>
                    <span className="text-left truncate">{user.username}</span>
                    <span className="hidden sm:block truncate">
                      {user.email}
                    </span>
                    <div className="text-2xl flex justify-center">
                      {+user.isAdmin === 1 ? (
                        <RiCheckboxCircleFill className="text-lime-600" />
                      ) : (
                        <RiCloseCircleFill className="text-red-500" />
                      )}
                    </div>
                    <span className="hidden lg:block text-right">
                      {user.createdAt.substring(0, 10)}
                    </span>
                    <div className="flex gap-1 justify-end">
                      <Link to={`/admin/user/edit/${user.id}`}>
                        <RiEditLine size={24} />
                      </Link>
                      <button
                        onClick={() => deleteUserHandler(user.id)}
                        className="text-red-600"
                      >
                        <RiDeleteBinLine size={24} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminUserPage;
