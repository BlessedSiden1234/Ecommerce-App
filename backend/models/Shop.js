const mongoose = require('mongoose')

const ShopSchema = new mongoose.Schema({
    name: {
        type: String,
        required : [true, "Please provide your name"],
        unique: true
    },
    slug: {
        type: String,
        required :true,
        unique: true
    },
    image: {
        type: String,
        required :true,
    },
    category: {
        type: String,
        required :true,
    },
    description: {
        type: String,
        required :true,
    },

    brand: {
        type: String,
        required :true,
    },

    price: {
        type: Number,
        required :true,
    },
    
    countInStock: {
        type: Number,
        required :true,
    },
    rating: {
        type: Number,
        required :true,
    },
      numReviews: {
        type: Number,
        required :true,
    },
    
    
}, {
    timestamps: true,
})

module.exports = mongoose.model('Ecommerce', ShopSchema)