const express = require("express")
const { v4: uuidv4 } = require('uuid')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const router = express.Router()
const Order = require('../../models/Order')
const auth = require('../../middleware/auth')
const adminAuth = require('../../middleware/adminAuth')
const { body, validationResult } = require('express-validator')

// route to get all orders
router.get('/', adminAuth, async (req, res) => {
    const orders = await Order.find()
    res.json(orders)
})

// route to get orders by a specific user
router.get('/user', auth, async (req, res) => {
    const orders = await Order.find({
        owner: req.user.id
    })
    res.json(orders)
})

// route to get a specific order
router.get('/:orderId', auth, async (req, res) => {
    const orderId = req.params.orderId
    const order = await Order.findOne({
        _id: orderId
    })
    if(!order){
        return res.status(400).json({
            msg: "Order not found"
        })
    }
    res.json(order)
})

// route to initiate an order
router.post('/create', [
    auth,
    body('address').not().isEmpty(),
    body('firstname').not().isEmpty(),
    body('lastname').not().isEmpty(),
    body('number').not().isEmpty(),
    body('email').isEmail(),
    body('country').not().isEmpty(),
    body('city').not().isEmpty(),
    body('zipcode').not().isEmpty(),
    body('state').not().isEmpty()
],  async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        }) 
    }

    try {
        const {
            address,
            number,
            email,
            firstname,
            lastname,
            message,
            country,
            city,
            zipcode,
            state,
            products
        } = req.body
    
        let orderTotal = products.reduce((prev, curr) => {
            return prev + curr.total
        }, 0)

        const order = new Order({
            refnum: uuidv4(),
            products,
            owner: req.user.id,
            shippingAddress: address,
            recipientFirstName: firstname,
            recipientLastName: lastname,
            recipientNumber: number,
            recipientEmail: email,
            shippingCountry: country,
            shippingCity: city,
            shippingZipcode: zipcode,
            shippingState: state,
            deliveryMsg: message,
            amount:parseFloat(orderTotal)
        })
        await order.save()
        res.json(order)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            errors: error
        })
    }
})

// route to update payment status for an order
router.put('/updatePayStatus/:orderId', auth, async (req, res) => {
    const orderId = req.params.orderId
    try {
        let order = await Order.findOne({
            _id: orderId
        })
        if(!order){
            return res.status(400).json({
                errors: [{
                 msg: "Order Not Found"
                }]
             })
        }

        order.paymentStatus = true
        order.paidAt = Date.now()
        await order.save()
        res.json(order)
    } catch (error) {
        res.status(500).json({
            errors: error
         })
    }
})

router.post('/paymentsession/:orderId', async (req, res) => {

    const orderId = req.params.orderId
    try {

        let order = await Order.findOne({
            _id: orderId
        })

        if(!order){
            return res.status(400).json({
               errors: [{
                msg: "Order Not Found"
               }]
            })
        }

        const sessionLineItems = order.products.map((product) => {
            return {
                price_data:{
                    currency: 'usd',
                    product_data: {
                        name: product.name
                    },
                    unit_amount_decimal: parseFloat(product.price) * 100
                },
                quantity: product.quantity
            }
        })

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: sessionLineItems,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_DEVELOPMENT_DOMAIN}/order/paymentstatus/${order._id}`,
            cancel_url: `${process.env.FRONTEND_DEVELOPMENT_DOMAIN}/order/${order._id}`
        })

        res.json({
            checkoutSessionId: session.id
        })

    } catch (error) {
        res.status(500).json({
            errors: error
         })
    }
})


// route to update delivery status
router.put('/delivered/:orderId', adminAuth, async(req, res) => {
    const orderId = req.params.orderId
    try {
        let order = await Order.findOne({
            _id: orderId
        })
        if(!order){
            return res.status(400).json({
                msg: "Order Not Found"
            })
        }
        order.deliveryStatus = true
        order.deliveredAt = Date.now()
        await order.save()
        res.json(order)
    } catch (error) {
        res.status(500).json({
           errors: error
        })
    }
})

module.exports = router
