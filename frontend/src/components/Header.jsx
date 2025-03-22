import CartIcon from './CartIcon';

export default function Header({ user }) {
  return (
    <header>
      <h1>Swift Shop</h1>
      {user && <CartIcon />}
    </header>
  );
}