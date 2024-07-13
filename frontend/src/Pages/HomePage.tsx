import { useEffect } from 'react';
import { RiArchive2Line, RiCapsuleLine } from 'react-icons/ri';
import { useAppDispatch, useAppSelector } from '../hooks';
import Card from '../Layout/Card';
import { getProducts } from '../actions/productActions';

const Home = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="">
      <div className="bg-lime-500 flex flex-col justify-center w-full rounded-md">
        <div className="w-full">
          <h1 className="text-lime-900 text-[10vw] lg:pr-2 font-bold text-center">
            Pharmacy
          </h1>
        </div>
        <div className="lg:px-16 flex-col flex md:flex-row">
          <div className="flex flex-col flex-1 lg:w-[45rem]">
            <h4 className="text-center lg:text-left pb-16 px-10 lg:px-0">
              Your Health, Our Mission: Quality Care Delivered to Your Door.
              Wellness Made Simple: Expert Care, Convenient Service, Trusted
              Results. Empowering Your Health Journey: Professional Care at Your
              Fingertips. Experience the convenience of modern healthcare
              without compromising on quality. Your journey to better health
              starts here, with us.
            </h4>
            <div className="justify-center lg:justify-start flex-col md:flex-row flex lg:items-center lg:px-0 px-10 gap-10 pb-16">
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
      </div>
      <div className="flex flex-wrap sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-center mt-10 mx-auto">
        {products.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
