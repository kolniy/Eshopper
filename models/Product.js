const mongoose = require('mongoose')
const Float = require('mongoose-float').loadType(mongoose)

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    shortDesc: {
        type: String,
        required: true
    },
    longDesc: {
        type: String
    },
    price: {
        type: Float,
        required: true
    },
    oldprice: {
        type: Float
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    availability: {
        type: Number, 
        required: true
    },
    reviews: [{
        name: {
            type: String
        },
        email: {
            type: String
        },
        comment: {
            type: String
        },
        star: {
            type: Number,
            default: 0
        },
        date: {
            type: Date,
            default: Date.now
        }
    }]
},
{
  timestamps: true,
}
)

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product