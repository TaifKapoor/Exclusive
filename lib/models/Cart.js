// models/Cart.js
import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  }
});

const CartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: false,
    index: true
  },
  guestId: {
    type: String,
    required: false,
    index: true
  },
  items: [CartItemSchema]
}, { 
  timestamps: true 
});


CartSchema.index({ userId: 1, guestId: 1 });

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);