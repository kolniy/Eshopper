const express = require("express")
const { v4: uuidv4 } = require('uuid')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const router = express.Router()
const auth = require('../../middleware/auth')

router.get('/', (req, res) => {
    res.send("The orders route")
})

// route to initiate an order
router.post('/initiate',  async (req, res) => {
  
})

// route to make payment for an order
router.put('/pay', async (req, res) => {

})

module.exports = router
