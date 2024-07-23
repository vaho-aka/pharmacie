import { RiCheckboxCircleFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useEffect, useState } from 'react';
import { updateUserProfile } from '../actions/userActions';

const tableClasses =
  'bg-background px-2 grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-6 sm:grid-cols-5 grid-cols-3 items-center justify-between';

const inputClasses =
  'border bg-gray-50 p-2 focus:outline-none rounded h-12 sm:bg-gray-50 bg-white';

const AccountPage = () => {
  const dispatch = useAppDispatch();
  const { userLoggedIn } = useAppSelector((state) => state.user);
  const [isModifyed, setIsModifyed] = useState(false);
  const [userName, setUserName] = useState(userLoggedIn.username);
  const [email, setEmail] = useState(userLoggedIn.email);
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (
      userName !== userLoggedIn.username ||
      email !== userLoggedIn.email ||
      password
    ) {
      setIsModifyed(true);
    } else setIsModifyed(false);
  }, [password, userLoggedIn, userName, email]);

  const modifyProfilHandler = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      updateUserProfile(userLoggedIn.id, userName, email, password && password)
    );
  };

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div className="max-w-[25rem] w-full">
        <h1 className="text-2xl border-l-8 font-semibold border-lime-500 px-4">
          User's profile
        </h1>
        <form
          className="w-full sm:border-2 sm:p-4 my-4 rounded-md sm:bg-white"
          onSubmit={modifyProfilHandler}
        >
          <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="name">Username</label>
            <input
              type="text"
              id="name"
              value={userName}
              className={inputClasses}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              className={inputClasses}
            />
          </div>
          <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="votre mot de passe"
              type="password"
              className={inputClasses}
            />
          </div>
          <button
            type="submit"
            disabled={!isModifyed ? true : false}
            className="active:translate-y-1 disabled:bg-neutral-500 disabled:cursor-not-allowed disabled:text-white transition-all w-full py-2 bg-lime-500 rounded-md text-lime-900 font-semibold mt-4"
          >
            Update my profile
          </button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-2xl border-l-8 border-lime-500 font-semibold px-4">
          My command
        </h1>
        <div>
          <div className="w-full border-x rounded-md mt-4">
            <div
              className={`${tableClasses} py-2 bg-slate-400 text-white rounded-t-md`}
            >
              <span className="col-span-2">ID</span>
              <span className="hidden md:block lg:hidden xl:block">Date</span>
              <span className="hidden sm:block">Prix total (Ar)</span>
              <span className="hidden sm:block">Payé</span>
              <span className="hidden md:block"></span>
            </div>
            <ul className="bg-white">
              {Array.from('irna').map((a, i) => (
                <li key={a + i} className={`${tableClasses} border-b`}>
                  <span className="col-span-2">65e9d9be1a7fb9cff6951d13</span>
                  <span className="hidden md:block lg:hidden xl:block">
                    10/07/24
                  </span>
                  <span className="hidden sm:block">85.000 Ar</span>
                  <div className="text-2xl hidden sm:block">
                    <RiCheckboxCircleFill className="text-emerald-600" />
                  </div>
                  <Link to={`/order/1`}>
                    <button className="bg-lime-500  text-lime-900 w-full py-1 my-1">
                      Détails
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
