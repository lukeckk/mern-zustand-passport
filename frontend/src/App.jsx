import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from "./pages/Main";
import Home from "./pages/Home";
import AddProduct from "./components/AddProduct";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  // Check if user is logged in
  const checkAuthStatus = async () => {
    try {
      const response = await fetch("http://localhost:5100/users/profile", {
        credentials: 'include' // Important for cookies
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      setUser(null);
    }
  };

  // Effect to log user state changes
  useEffect(() => {
    console.log("Current user state:", user);
    if (user) {
      console.log("User isAdmin:", user.isAdmin);
    }
  }, [user]);

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
    // Check auth status and fetch products when component mounts
    checkAuthStatus();
    fetchProducts();
  }, []);

  const onProductAdded = async () => {
    fetchProducts();
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5100/users/logout", {
        method: "POST",
        credentials: "include"
      });
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div>
            <div className="header">
              {/* <h1>Swift Shop</h1> */}
              <div>
                {user ? (
                  <div className="user-info">
                    <span>Welcome, {user.username}</span>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                ) : (
                  <div className="auth-links">
                    <a href="/login">Login</a>
                    <a href="/signup">Signup</a>
                  </div>
                )}
              </div>
            </div>

            {/* Conditional rendering based on whether user is logged in */}
            {user ? (
              <>
                {/* Only render AddProduct component if user is admin */}
                {user.isAdmin && (
                  <AddProduct onProductAdded={onProductAdded} />
                )}

                {/* Main component only for logged in users */}
                <Main products={products} />
              </>
            ) : (
              /* Home component for visitors */
              <Home />
            )}
          </div>
        } />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
