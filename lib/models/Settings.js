// models/Settings.js
import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  storeName: { type: String, default: 'My Store' },
  supportEmail: { type: String, default: 'support@mystore.com' },
  description: { type: String, default: 'Welcome to our store!' },
}, { timestamps: true });

export default mongoose.models.Settings || mongoose.model('Settings', settingsSchema);