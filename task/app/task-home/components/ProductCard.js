
const ProductCard = ({ name, imageSrc, price, rating }) => {
    return (
      <div className="p-4 bg-white rounded-md shadow-md">
        <img src={imageSrc} alt={name} className="w-full h-32 object-cover rounded-md" />
        <h3 className="text-xl font-bold mt-2">{name}</h3>
        <p className="text-lg text-green-500">${price}</p>
        <p className="text-sm text-yellow-400">Rating: {rating} ⭐</p>
      </div>
    );
  };
  
  export default ProductCard;
  