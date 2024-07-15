import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { registerType } from '../interfaces';
import {
  RiEyeOffLine,
  RiEyeLine,
  RiArchive2Line,
  RiCapsuleLine,
  RiArrowRightLine,
} from 'react-icons/ri';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    formState: { errors },
  } = useForm<registerType>();

  // Redirecting the user to the command if they didn't login before uploading image
  // const redirect = search ? search.split('=')[1] : '/';

  const showPasswordHandler = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  return (
    <div className="flex calc">
      <div className="flex-1 flex justify-center items-center">
        <div className="w-full">
          <h1 className="font-semibold text-[2vw] py-10 text-center">
            Create account
          </h1>
          <form className="max-w-[35rem] w-full mx-auto gap-4 flex flex-col">
            <div className="flex flex-col gap-2 mb-2">
              <label>Username</label>
              <input
                type="text"
                id="username"
                placeholder="ex: vahoaka"
                required
                className="border p-2 focus:outline-none rounded h-12 bg-gray-50"
                {...register('username', {
                  required: 'Username is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Invalid username',
                  },
                })}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2 mb-2">
              <label>Email</label>
              <input
                type="email"
                id="email"
                placeholder="your_email@example.com"
                required
                className="border p-2 focus:outline-none rounded h-12 bg-gray-50"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Invalid email',
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
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be atleast 6 digits',
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
              Sign up
            </button>
          </form>

          <div className="flex justify-center py-10 gap-2 items-center">
            <h1>Already have an account?</h1>
            <Link to="/login" className="text-lime-500 flex gap-1 items-center">
              <span>login here</span>
              <RiArrowRightLine />
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-lime-500 justify-between py-10 2xl:py-20 flex-col flex-1 w-full hidden xl:flex rounded-md">
        <div className="w-full">
          <h1 className="text-lime-900 text-[5vw] font-bold text-center">
            Pharmacy
          </h1>
        </div>
        <h4 className="text-center w-[25vw] mx-auto">
          Your Health, Our Mission: Quality Care Delivered to Your Door.
          Wellness Made Simple: Expert Care, Convenient Service, Trusted
          Results. Empowering Your Health Journey: Professional Care at Your
          Fingertips. Experience the convenience of modern healthcare without
          compromising on quality. Your journey to better health starts here,
          with us.
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

export default SignUpPage;
