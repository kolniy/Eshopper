const mongoose = require('mongoose')

const WishListSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const WishList = mongoose.model('Wishlist', WishListSchema)
module.exports = WishList