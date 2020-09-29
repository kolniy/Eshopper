const mongoose = require('mongoose')
const Float = require('mongoose-float').loadType(mongoose)

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    short_desc: {
        type: String,
        required: true
    },
    long_desc: {
        type: String
    },
    price: {
        type: Float,
        required: true
    },
    oldprice: {
        type: Float,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    availability: {
        type: Number, 
        required: true
    },
    condition: {
        type: String
    },
    reviews: [{
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        review: {
            type: String
        },
        star: {
            type: Number,
            default: 0
        }
    }],
    timestamps: true,
    date: {
        type: Date,
        default: Date.now
    }
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product