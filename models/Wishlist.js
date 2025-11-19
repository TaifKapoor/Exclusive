// models/Wishlist.js
import mongoose from 'mongoose';

const WishlistSchema = new mongoose.Schema({
  userId: { type: String, required: false, index: true },
  guestId: { type: String, required: false, index: true },
  productIds: [{ type: String, required: true }] // sirf String
}, { timestamps: true });

WishlistSchema.index({ userId: 1, guestId: 1 });

export default mongoose.models.Wishlist || mongoose.model('Wishlist', WishlistSchema);
