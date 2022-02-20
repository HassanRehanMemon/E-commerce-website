'use strict'
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
exports.reviewSchema = void 0
const mongoose_1 = __importDefault(require('mongoose'))
exports.reviewSchema = new mongoose_1.default.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  user: {
    type: mongoose_1.default.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
})
const productSchema = new mongoose_1.default.Schema({
  user: {
    type: mongoose_1.default.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true, default: 0.0 },
  countInStock: { type: Number, required: true, default: 0.0 },
  rating: { type: Number, required: true, default: 0.0 },
  numReviews: { type: Number, required: true, default: 0.0 },
  reviews: [exports.reviewSchema]
}, {
  timestamps: true
})
const Product = mongoose_1.default.model('Product', productSchema)
exports.default = Product
