import ProductCard from "../components/ProductCard";

export default function Home({ products }) {
  return (
    <div className="product-card-container">
      {products.length > 0 ? (
        products.map((product) => <ProductCard key={product._id} product={product} />)
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
}
