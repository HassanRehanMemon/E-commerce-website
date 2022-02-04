import mongoose from 'mongoose'


const Order = new mongoose.Schema({
    user : { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    shippingAddress : {
        address: {type: String, required: true},
        city: {type: String, required: true},
        postalCode: {type: String, required: true},
        country: {type: String, required: true},
    },
    paymentMethod : {type:String, required: true},
})

