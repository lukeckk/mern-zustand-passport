import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useCartStore from '../stores/cartStore';
import './Checkout.css';

// Load Stripe publishable key from environment
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Payment Form Component
function PaymentForm({ onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (stripe && elements) {
      setIsMounted(true);
      console.log('Stripe and Elements initialized successfully');
    }
  }, [stripe, elements]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !isMounted) {
      setError('Payment form is not ready. Please wait a moment.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const { error: submitError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/order-confirmation`,
        },
      });

      if (submitError) {
        setError(submitError.message);
      } else {
        onSuccess();
      }
    } catch (err) {
      setError(`Payment error: ${err.message || 'Something went wrong'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {error && <div className="error-message">{error}</div>}
      <button
        type="submit"
        className="submit-button"
        disabled={!stripe || isProcessing || !isMounted}
      >
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
}


// Main Checkout Component
export default function Checkout() {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCartStore();
  const [formData, setFormData] = useState({
    shippingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  });
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch('http://localhost:5100/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            amount: getCartTotal() * 100,
            items: items.map(item => ({
              product: item._id,
              quantity: item.quantity,
              price: item.price
            }))
          })
        });

        if (!response.ok) throw new Error('Failed to create payment intent');
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        setError(err.message);
      }
    };

    createPaymentIntent();
  }, [items, getCartTotal]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleOrderSuccess = async () => {
    try {
      const response = await fetch('http://localhost:5100/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          items: items.map(item => ({
            product: item._id,
            quantity: item.quantity,
            price: item.price
          })),
          totalAmount: getCartTotal(),
          shippingAddress: formData.shippingAddress,
          paymentStatus: 'paid'
        })
      });

      if (!response.ok) throw new Error('Failed to create order');

      clearCart();
      navigate('/order-confirmation');
    } catch (err) {
      setError(err.message);
    }
  };

  if (items.length === 0) {
    return (
      <div className="checkout-container">
        <h1>Your cart is empty</h1>
        <button onClick={() => navigate('/')}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      {error && <div className="error-message">{error}</div>}

      <div className="checkout-content">
        <div className="order-summary">
          <h2>Order Summary</h2>
          {items.map(item => (
            <div key={item._id} className="cart-item">
              <span>{item.name}</span><br />
              <span>Quantity: {item.quantity} x </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="total">
            <strong>Total: ${getCartTotal().toFixed(2)}</strong>
          </div>
        </div>

        <div className="checkout-form">
          <h2>Shipping Information</h2>
          {['street', 'city', 'state', 'zipCode', 'country'].map(field => (
            <div className="form-group" key={field}>
              <input
                type="text"
                name={`shippingAddress.${field}`}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData.shippingAddress[field]}
                onChange={handleInputChange}
                required
              />
            </div>
          ))}

          {!clientSecret ? (
            <div>Loading payment form...</div>
          ) : (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <PaymentForm onSuccess={handleOrderSuccess} />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
}
