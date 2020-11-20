const mongoose = require('mongoose')
const Float = require('mongoose-float').loadType(mongoose)

const OrderSchema = new mongoose.Schema({
    refnum : {
        type: String,
        required: true
    },
    products: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        name: {
            type: String
        },
        price: {
            type: Float
        },
        image: {
            type: String
        },
        quantity: {
            type: Number
        },
        total: {
            type: Float
        }
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
    recipientFirstName: {
        type: String
    },
    recipientLastName: {
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
    deliveryMsg: {
        type: String
    },
    amount: {
      type: Float
    },
    paymentStatus: {
        type: Boolean,
        default: false
    },
    deliveryStatus: {
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