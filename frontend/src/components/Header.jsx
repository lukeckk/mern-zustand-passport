import { Link, useNavigate } from 'react-router-dom';
import CartIcon from './CartIcon';
import "./Header.css"

export default function Header({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await onLogout();
    navigate('/login');
  };

  return (
    <header>
      <h1 id='swiftShop'>Swift Shop</h1>
      {user ? (
        <>
          <CartIcon />
          <Link to='/'>Home</Link>
          <Link to='/checkout'>Checkout</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          {/* <Link to='/login'>Login</Link>
          <Link to='/signup'>Signup</Link> */}
        </>
      )}
    </header>
  );
}