import express from 'express';
import productRoutes from './../backend/routes/productRouter.js'
import userRoutes from './../backend/routes/userRouter.js'
import cors from 'cors';
import connectDB from './db.js';
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5100;

// Connect to MongoDB
connectDB()

// Check for required environment variables for auth
if (!process.env.JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined.');
  process.exit(1); // Exit with failure
}

app.use(cors({
  origin: "*"
}));

// Middleware to parse JSON bodies for POST request
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send(`Backend API is running on PORT ${PORT}`)
})

app.use('/products', productRoutes)
app.use('/users', userRoutes)

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))