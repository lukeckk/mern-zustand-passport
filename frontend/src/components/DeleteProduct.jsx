export default function DeleteProduct({ productId, onProductDeleted }) {
  // Delete the product by making a DELETE request to the API
  const deleteProduct = async () => {
    // Ask for confirmation before deletion
    const confirmed = window.confirm('Are you sure you want to delete this product?');

    if (!confirmed) {
      return; // User cancelled the deletion
    }

    try {
      const response = await fetch(`http://localhost:5100/products/${productId}`, {
        method: 'DELETE',
        credentials: 'include' // Important for sending the auth cookie
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      // Call the callback function to update the UI
      if (onProductDeleted) {
        onProductDeleted(productId);
      }

    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  return (
    <button
      onClick={deleteProduct}
      className="delete-button"
      aria-label="Delete product"
    >
      Delete
    </button>
  );
}