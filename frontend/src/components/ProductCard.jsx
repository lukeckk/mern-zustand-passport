export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
      {/* Only render image if product.image exists */}
      {product.image ? (
        <img src={product.image} alt={product.name} />
      ) : null}
      <ul>
        {product.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );
}
