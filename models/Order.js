const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    refnum : {
        type: String,
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String
    },
    timestamps: true
})

const Order = mongoose.model('Order', OrderSchema)

module.exports = Order