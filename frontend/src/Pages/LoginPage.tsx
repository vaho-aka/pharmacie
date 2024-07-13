import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { loginType } from '../interfaces';
import {
  RiEyeOffLine,
  RiEyeLine,
  RiArchive2Line,
  RiCapsuleLine,
  RiArrowRightLine,
  RiErrorWarningLine,
} from 'react-icons/ri';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { login } from '../actions/userActions';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { search } = useLocation();
  const navigate = useNavigate();
  const { userLoggedIn, error } = useAppSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginType>();

  //Redirecting the user to the command if they didn't login before uploading image
  const redirect = search ? search.split('=')[1] : '/products';

  useEffect(() => {
    if (userLoggedIn.username) navigate(redirect);
  }, [userLoggedIn, navigate, redirect]);

  const submitHandler = (data: loginType) => {
    dispatch(login(data.email, data.password));
    // console.log(data);
  };

  const showPasswordHandler = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  return (
    <div className="flex calc w-full">
      <div className="flex-1 flex justify-center items-center">
        <div className="w-full">
          <h1 className="font-semibold text-[2vw] py-10 text-center">
            Welcome back
          </h1>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="max-w-[35rem] w-full mx-auto gap-4 flex flex-col"
          >
            {error && (
              <div className="text-red-500 flex gap-2 my-2 bg-red-100 justify-center py-1">
                <RiErrorWarningLine size={22} />
                <span>{error}</span>
              </div>
            )}
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
              Log in
            </button>
          </form>

          <div className="flex justify-center py-10 gap-2 items-center">
            <h1>Don't have an account yet?</h1>
            <Link
              to="/register"
              className="text-lime-500 flex gap-1 items-center"
            >
              <span>Register here</span>
              <RiArrowRightLine />
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-lime-500 justify-between py-20 flex-col flex-1 w-full hidden xl:flex rounded-md">
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

export default LoginPage;
