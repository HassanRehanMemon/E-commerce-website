import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
   name: { type: String, required: true },
   rating: { type: Number, required: true },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
   },

})

const productSchema = new mongoose.Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
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
   numReiviews: { type: Number, required: true, default: 0.0 },

   reviews: [reviewSchema],

})

const Product = mongoose.model('Product', productSchema)