import express from 'express';
import productRoutes from './routes/productRouter.js'
import userRoutes from './routes/userRouter.js'
import orderRoutes from './routes/orderRouter.js'
import stripeRoutes from './routes/stripeRouter.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './db.js';
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5100;

// Connect to MongoDB
connectDB()

// Updated CORS configuration from * to below to allow credentials: 'include'
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:4173", "http://34.133.37.127", "http://34.133.37.127:5100", "http://34.42.226.221/"], // Allow both ports
  credentials: true // Allow credentials (cookies)
}));

// Cookie parser middleware to allow credentials: 'include'
app.use(cookieParser());

// Middleware to parse JSON bodies for POST request
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send(`Backend API is running on PORT ${PORT}`)
})

app.use('/products', productRoutes)
app.use('/users', userRoutes)
app.use('/orders', orderRoutes)
app.use('/', stripeRoutes) // Stripe routes

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server started on PORT ${PORT}`);
});