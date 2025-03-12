import express from 'express';
import productRoutes from './../backend/routes/productRouter.js'

const app = express()
const PORT = 5100

app.get('/', (req, res) => {
  res.status(200).send(`Backend API is running on PORT ${PORT}`)
})

app.use('/products', productRoutes)

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))