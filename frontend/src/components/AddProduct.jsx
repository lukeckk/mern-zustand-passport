import React, { useState } from 'react';
import './AddProduct.css';

export default function AddProduct({ onProductAdded }) {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    features: [],
    image: ''
  });
  const [error, setError] = useState('');
  // console.log("Current product state:", product);

  // Updates state dynamically as user types for real time validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      /* If the name is "price", converts the input value to a number using 
      Number(value), else keep the value as it is (string). */
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  // Converts the comma-separated string into an array for features
  const handleFeaturesChange = (e) => {
    const featuresArray = e.target.value
      ? e.target.value.split(',').map(feature => feature.trim())
      : []; // Ensure it's an empty array if input is empty
    setProduct((prevProduct) => ({
      ...prevProduct,
      features: featuresArray
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5100/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error('Error adding product');
      }

      const data = await response.json();

      // fetch data using prop passed in from App.jsx
      onProductAdded();

      // checks newly added data
      console.log('Product added:', data);

      // Reset the form after submission
      setProduct({
        name: '',
        category: '',
        price: '',
        description: '',
        features: [],
        image: ''
      });
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to add product. Please try again.');
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Features (comma-separated):</label>
          <input
            type="text"
            name="features"
            value={product.features.join(', ')}
            onChange={handleFeaturesChange}
          />
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="submit-button">Add Product</button>
      </form>
    </div>
  );
}