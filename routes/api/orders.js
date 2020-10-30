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

// route to initiate an order
router.post('/initiate', [
    auth,
    body('address').not().isEmpty(),
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

    const {
        address,
        number,
        email,
        country,
        city,
        zipcode,
        state,
        products
    } = req.body


})

// route to make payment for an order
router.put('/pay', auth, async (req, res) => {

})


// route to update delivered status
router.put('/delivered', adminAuth, async(req, res) => {

})

module.exports = router
