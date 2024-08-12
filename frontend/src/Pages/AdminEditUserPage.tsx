import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getUserById, updateUserProfileAsAdmin } from '../actions/userActions';
import { useParams } from 'react-router-dom';
import { Switch } from '@headlessui/react';
import LoadingSpinner from '../Layout/LoadingSpinner';
import { RiUserLine } from 'react-icons/ri';
import { userActions } from '../Reducers/userReducer';

const AdminEditUserPage = () => {
  const dispatch = useAppDispatch();
  const { userId } = useParams();
  const { user, error, loading } = useAppSelector((state) => state.user);
  const [isAdmin, setIsAdmin] = useState(+user.isAdmin !== 1 ? false : true);

  useEffect(() => {
    dispatch(getUserById(userId));
  }, [userId, dispatch]);

  useEffect(() => {
    if (!loading && user) {
      setIsAdmin(+user.isAdmin !== 1 ? false : true);
    }
  }, [user, loading]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>User not found</div>;
  }

  const modifyProfilHandler = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(updateUserProfileAsAdmin(user.id, isAdmin ? '1' : '0'));
    dispatch(userActions.GET_ALL_USERS([]));
  };

  return (
    <div className="max-w-96 mx-auto h-full pt-10">
      <div className="w-[150px] h-[150px] flex justify-center items-center ring rounded-full ring-neutral-800 text-neutral-800 mx-auto py-10">
        <RiUserLine size={100} />
      </div>
      <form
        onSubmit={modifyProfilHandler}
        className="flex-1 flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-semibold">
            username
          </label>
          <input
            type="text"
            id="name"
            readOnly
            value={user.username}
            className="border-2 px-4 py-2 focus:outline-none rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-semibold">
            user's email address
          </label>
          <input
            type="email"
            id="email"
            value={user.email}
            readOnly
            className="border-2 px-4 py-2 focus:outline-none rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="count" className="font-semibold">
            user is admin
          </label>
          <Switch
            checked={isAdmin}
            onChange={setIsAdmin}
            className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600"
          >
            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
          </Switch>
        </div>
        <button className="bg-lime-500 text-lime-900 py-2 rounded-md font-semibold">
          update user's profile
        </button>
      </form>
    </div>
  );
};

export default AdminEditUserPage;
