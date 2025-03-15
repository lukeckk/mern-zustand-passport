import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  features: { type: [String] },
  image: { type: String }
});

// below triggers the creation of 'products' table
const Product = mongoose.model('Product', productSchema);
export default Product;
