import { RiArchive2Line, RiCapsuleLine } from 'react-icons/ri';

const Home = () => {
  return (
    <div className="">
      <div className="bg-lime-500 calc flex flex-col justify-center w-full rounded-3xl">
        <div className="w-full">
          <h1 className="text-lime-900 text-[18vw] lg:pr-2 font-bold text-center">
            Pharmacy
          </h1>
        </div>
        <div className="flex flex-col lg:px-16 lg:w-[45rem]">
          <h4 className="text-center lg:text-left pb-16 px-10 lg:px-0">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam,
            ipsam ullam. Velit assumenda sint eligendi, dolorem dolore sed
            expedita ea magni sequi quia ad est, quisquam pariatur consequatur
            quidem provident!
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
  );
};

export default Home;
