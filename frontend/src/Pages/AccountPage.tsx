import { RiCheckboxCircleFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const tableClasses =
  'bg-background px-2 grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-6 sm:grid-cols-5 grid-cols-3 items-center justify-between';

const AccountPage = () => {
  return (
    <div className="flex">
      <div className="max-w-[25rem] w-full">
        <h1 className="text-2xl border-l-8 font-semibold border-lime-500 px-4">
          User's profil
        </h1>
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
