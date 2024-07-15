import { RiAddLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { Item } from '../interfaces';

const Card: React.FC<{ product: Item }> = ({ product }) => {
  return (
    <figure className="bg-gray-200 w-[19rem] h-[500px] mx-auto rounded-md flex flex-col p-1 relative">
      <Link
        className="flex-1 h-[250px] overflow-hidden"
        to={`/products/${product.categoryName
          .split(' ')
          .join('_')
          .toLocaleLowerCase()}/${product._id}`}
      >
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={product.imageUrl}
            className="object-contain w-full h-full"
            alt={product.name}
          />
        </div>
      </Link>
      {+product.onSale === 1 && (
        <div className="absolute top-5 px-4 py-2 rounded-s right-0 bg-lime-500">
          <h1 className="text-lime-900 font-semibold">50% off</h1>
        </div>
      )}
      <figcaption className="bg-white rounded-md p-4 flex gap-2 flex-col justify-between mt-4">
        <div className="flex flex-col gap-2">
          <Link
            to={`/products/${product.categoryName
              .split(' ')
              .join('_')
              .toLocaleLowerCase()}`}
          >
            <h2 className="text-sm text-gray-500">{product.categoryName}</h2>
          </Link>
          <Link
            to={`/products/${product.categoryName
              .split(' ')
              .join('_')
              .toLocaleLowerCase()}/${product._id}`}
          >
            <h1 className="font-semibold capitalize line-clamp-2 h-12">
              {product.name}
            </h1>
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <button className="border border-neutral-800 px-3 py-1 flex items-center gap-2 rounded-full">
            <RiAddLine />
            <span>Add to cart</span>
          </button>
          <h2 className="font-semibold">{product.price} Ar</h2>
        </div>
      </figcaption>
    </figure>
  );
};

export default Card;
