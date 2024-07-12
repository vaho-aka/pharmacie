import { RiArchive2Line, RiCapsuleLine } from 'react-icons/ri';

const Home = () => {
  return (
    <div className="">
      <div className="bg-lime-500 w-full rounded-3xl">
        <div className="w-full">
          <h1 className="text-lime-900 text-[18vw] pr-2 font-bold text-center">
            Pharmacy
          </h1>
        </div>
        <div className="flex lg:flex-row flex-col justify-between lg:px-16">
          <div className="flex flex-col">
            <h4 className="text-center lg:text-left pb-16">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam,
              ipsam
              <br />
              ullam. Velit assumenda sint eligendi, dolorem dolore sed expedita
              ea
              <br />
              magni sequi quia ad est, quisquam pariatur consequatur quidem
              <br />
              provident!
            </h4>
            <div className="justify-center lg:justify-start flex items-center gap-10 pb-16">
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
          <div className="py-4">upload</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
