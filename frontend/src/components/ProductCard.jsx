import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Spinner, Alert } from 'react-bootstrap'; // Import necessary components


export default function ProductCard() {
  const [products, setProducts] = useState([]); // An array to hold the fetched product data.
  const [loading, setLoading] = useState(true); // A boolean to track if the data is still loading (true initially).
  const [error, setError] = useState(null); // A variable to hold any error message that occurs during data fetching.

  // useEffect triggers on page load like window.onload, Both are used for tasks that should be performed after the initial rendering of the page or component
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5100/products')
        if (!response.ok) {
          throw new Error('Error fetching data')
        }
        const data = await response.json();
        setProducts(data.data); // Assuming the API returns { data: [...] }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>;
  }

  return (
    <div className="product-card-container">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <h2>{product.name}</h2>
          <p>Category: {product.category}</p>
          <p>Price: ${product.price}</p>
          <p>{product.description}</p>
          <img src={product.image} alt={product.name} />
          <ul>
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

}