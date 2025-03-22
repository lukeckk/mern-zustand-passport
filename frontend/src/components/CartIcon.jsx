import { FiShoppingCart } from "react-icons/fi";
import "./Cart.css";
import useCartStore from '../stores/cartStore';

export default function CartIcon() {
  const cartCount = useCartStore(state => state.getCartCount());

  return (
    <div className="cart-icon-wrapper">
      <FiShoppingCart size={24} className="cart-icon" />
      {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
    </div>
  );
} 