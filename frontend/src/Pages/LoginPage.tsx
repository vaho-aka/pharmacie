import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { loginType } from '../interfaces';
import {
  RiEyeOffLine,
  RiEyeLine,
  RiArchive2Line,
  RiCapsuleLine,
} from 'react-icons/ri';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginType>();

  // Redirecting the user to the command if they didn't login before uploading image
  // const redirect = search ? search.split('=')[1] : '/';

  const showPasswordHandler = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  return (
    <div className="flex calc">
      <div className="flex-1 flex justify-center items-center">
        <div className="w-full">
          <h1 className="font-semibold text-xl py-10 text-center">
            Welcome back
          </h1>
          <form className="max-w-[35rem] w-full mx-auto gap-4 flex flex-col">
            <div className="flex flex-col gap-2 mb-2">
              <label>Email</label>
              <input
                type="email"
                id="email"
                placeholder="your_email@example.com"
                required
                className="border p-2 focus:outline-none rounded h-12 bg-gray-50"
                {...register('email', {
                  required: 'adresse e-mail est obligatoire',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Adresse e-mail invalide',
                  },
                })}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2 mb-2">
              <label>Password</label>
              <div className="border py-1 px-2 rounded flex items-center justify-between h-12 bg-gray-50">
                <input
                  required
                  id="password"
                  minLength={6}
                  placeholder="your password"
                  type={!showPassword ? 'password' : 'text'}
                  className="focus:outline-none w-full bg-gray-50"
                  {...register('password', {
                    required: 'Mot de passe obligatoir',
                    minLength: {
                      value: 6,
                      message: "Mot de passe doit être d'au moins 6 caractères",
                    },
                  })}
                />
                <div className="hidden sm:block" onClick={showPasswordHandler}>
                  {!showPassword ? (
                    <RiEyeOffLine size={22} />
                  ) : (
                    <RiEyeLine size={22} />
                  )}
                </div>
              </div>
              {errors.password && (
                <p className="text-xs italic text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex gap-2 items-center sm:hidden">
              <input
                type="checkbox"
                id="checkbox"
                onChange={showPasswordHandler}
                checked={showPassword}
              />
              <label htmlFor="checkbox">Afficher mot de passe</label>
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-lime-500 text-lime-900 font-semibold text-xl mt-4 rounded"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
      <div className="bg-lime-500 justify-between py-20 flex-col flex-1 w-full hidden xl:flex rounded-3xl">
        <div className="w-full">
          <h1 className="text-lime-900 text-[8vw] font-bold text-center">
            Pharmacy
          </h1>
        </div>
        <h4 className="text-center">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam, ipsam
          <br />
          ullam. Velit assumenda sint eligendi, dolorem dolore sed expedita ea
          <br />
          magni sequi quia ad est, quisquam pariatur consequatur quidem
          <br />
          provident!
        </h4>
        <div className="justify-center flex items-center gap-10">
          <div className="flex gap-2 items-center">
            <div className="w-16 h-16 flex items-center justify-center bg-neutral-800 rounded-full">
              <RiArchive2Line size={30} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span>Delivery </span> <span>to your doorstep</span>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-16 h-16 flex items-center justify-center bg-neutral-800 rounded-full">
              <RiCapsuleLine size={30} className="text-white" />
            </div>
            <div className="flex flex-col ">
              <span>100 % genuine</span> <span>medicines</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
