import DeleteProduct from './DeleteProduct';
import AddToCart from './AddToCart';

export default function ProductCard({ product, user, onProductDeleted }) {
  // Check if user exists and is an admin
  const isAdmin = user && user.isAdmin;

  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
      {/* Only render image if product.image exists */}
      {product.image ? (
        <img src={product.image} alt={product.name} width="200" height="200" />
      ) : null}
      <ul>
        {product.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>

      {/* Only show delete button for admin users */}
      {isAdmin ? (
        <div className="admin-actions">
          <DeleteProduct
            productId={product._id}
            onProductDeleted={onProductDeleted}
          />
        </div>
      ) : (
        <AddToCart product={product} />
      )}

    </div>
  );
}
