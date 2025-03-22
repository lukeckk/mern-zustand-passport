import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

export default function Main({ products: initialProducts, user }) { // rename 'products' to 'initialProducts' to avoid error 
  // Local state to manage products after potential deletions
  const [products, setProducts] = useState(initialProducts || []); // use [] as default is 'initialProducts' is null or undefined to avoid error

  // Update local products when prop changes such as after deletion
  useEffect(() => {
    setProducts(initialProducts || []);
  }, [initialProducts]);

  // Handle product deletion
  const handleProductDeleted = (deletedProductId) => {
    // Refresh the list and update the local state to remove the deleted product in UI
    setProducts(prevProducts =>
      prevProducts.filter(product => product._id !== deletedProductId)
    );
  };

  return (
    <div className="product-card-container">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            user={user}
            onProductDeleted={handleProductDeleted}
          />
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
}
