// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: String, unique: true , sparse: true}, 
  name: String,
  price: Number,
  originalPrice: Number,
  rating: Number,
  reviews: Number,
  images: [String],
  tag: String,
  newProduct: Boolean,
  colors: [String],
  category: { type: String, required: true },
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);