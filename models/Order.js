const mongoose = require('mongoose')
const Float = require('mongoose-float').loadType(mongoose)

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
        ref: 'User'
    },
    shippingAddress: {
        type: String
    },
    recipientNumber: {
        type: String
    },
    recipientEmail: {
        type: String
    },
    shippingCountry: {
        type: String
    },
    shippingCity: {
        type: String
    },
    shippingZipcode: {
        type: String
    },
    shippingState: {
        type: String
    },
    amount: {
      type: Float
    },
    payment_status: {
        type: Boolean,
        default: false
    },
    delivery_status: {
        type: Boolean,
        default: false
    },
    paidAt: {
        type: Date
    },
    deliveredAt: {
        type: Date
    }
},
{
    timestamps: true,
}
)

const Order = mongoose.model('Order', OrderSchema)

module.exports = Order