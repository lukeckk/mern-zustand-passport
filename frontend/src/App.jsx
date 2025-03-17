import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import AddProduct from "./components/AddProduct";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5100/products");
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const data = await response.json();
      setProducts(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onProductAdded = async () => {
    fetchProducts();
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div>
            <h1>Hello World</h1>
            <AddProduct onProductAdded={onProductAdded} />
            <Home products={products} />
          </div>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
