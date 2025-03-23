import stripe from '../config/stripe.js';

// Create a payment intent
export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, items } = req.body;
    console.log('Creating payment intent with:', { amount, items });

    // Create a payment intent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // amount in cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        items: JSON.stringify(items),
        userId: req.user._id.toString(),
      },
    });

    console.log('Payment intent created successfully:', paymentIntent.id);
    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error.message);
    console.error('Error details:', error);
    res.status(500).json({
      error: 'Failed to create payment intent',
      details: error.message
    });
  }
};

// Handle Stripe webhooks
export const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      const items = JSON.parse(paymentIntent.metadata.items);
      const userId = paymentIntent.metadata.userId;

      console.log('Payment succeeded:', {
        paymentIntentId: paymentIntent.id,
        userId,
        items,
        amount: paymentIntent.amount,
      });
      break;

    case 'payment_intent.payment_failed':
      console.log('Payment failed:', event.data.object.id);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
}; 