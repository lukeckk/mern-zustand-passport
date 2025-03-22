import "./Cart.css";
import useCartStore from '../stores/cartStore';

export default function AddToCart({ product }) {
  const addToCart = useCartStore(state => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product);
  }

  return (
    <button className="add-btn" onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
}

