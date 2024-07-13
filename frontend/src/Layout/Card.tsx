import { RiAddLine } from 'react-icons/ri';

const Card = () => {
  return (
    <figure className="bg-gray-200 w-72  rounded-xl p-1 relative">
      <img src="/images/bebelac.png" className="p-4" alt="nitril disposal" />
      <div className="absolute top-5 px-4 py-2 rounded-s right-0 bg-lime-500">
        <h1 className="text-lime-900 font-semibold">50% off</h1>
      </div>
      <figcaption className="bg-white rounded-xl p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-sm text-gray-500">Nutrition</h2>
          <h1 className="font-semibold capitalize">
            Bebelac Premature Milk Formula - 400 Grams
          </h1>
        </div>
        <div className="flex items-center justify-between">
          <button className="border border-neutral-800 px-3 py-1 flex items-center gap-2 rounded-full">
            <RiAddLine />
            <span>Add to cart</span>
          </button>
          <h2 className="font-semibold">20.000 Ar</h2>
        </div>
      </figcaption>
    </figure>
  );
};

export default Card;
