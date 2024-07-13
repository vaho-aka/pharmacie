import Card from '../Layout/Card';

const ProductsPage = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl border-l-8 border-lime-500 text-lime-900 px-4 mb-5 font-semibold">
        All products
      </h1>
      <div className="flex flex-wrap justify-evenly gap-y-6">
        {Array.from('irna v').map((a, i) => (
          <Card key={a + i} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
