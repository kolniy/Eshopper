const express = require("express")
const router = express.Router()
const { body, validationResult, check } = require('express-validator')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const tokenSecret = process.env.JWTTOKENSECRET
const auth = require('../../middleware/auth')

// route to get logged in user
// private
router.get('/', auth,  async (req, res) => {
   const user_id = req.user.id
   try {
    const user = await User.findById(user_id)
    if(!user){
        return res.status(400).json({
            errors: [{ msg: "user not found" }]
        })
    }
    res.json(user)
   } catch (error) {
       res.status(500).json({
           errors: [{msg: error}]
       })
   }
})


// route to register user
// public
router.post('/', [
    body('name').not().isEmpty().trim(),
    body('email').not().isEmpty().isEmail(),
    body('password').not().isEmpty().isLength({min:5}),
    body('type').not().isEmpty()
] ,async (req, res) => {

    // check validation result
    const errors = validationResult(req)
    if(!errors.isEmpty()){
       return res.status(400).json({
            errors: errors.array()
        })
    }

    try {

        const { name, email, password, type } = req.body

        let user = await User.findOne({ email })

        if(user) {
           return res.status(400).json({ errors: [{msg: "User Already Exists"}] })
        }

        user = new User({
            name,
            email,
            password,
            type
        })

        const saltRounds = 8
        user.password = await bcrypt.hash(password, saltRounds)
        await user.save()

        const payload = {
            user: {
                id: user.id
            }
        }
        
        const token = jwt.sign(payload, tokenSecret, {expiresIn: 360000}, (err, token) => {
            if (err) {
                throw err
            }

            res.status(200).json({
                token
            })
        })

    } catch (error) {
        res.status(500).json({
            errors: error
        })
        console.error(error)
    }

})

// route to login user
// public
router.post('/login', [
    body('email').isEmail(),
    body('password').exists()
] , async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const { email, password } = req.body

    try {

      let user = await User.findOne({ email })

        if(!user){
            return res.status(400).json({
                errors: [{msg: "invalid credentials"}]
            })
        }
    
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({
                errors: [{msg: "invalid credentials"}]
            })
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        const token = jwt.sign(payload, tokenSecret, {expiresIn: 360000}, (err, token) => {
            if (err) {
                throw err
            }

            res.status(200).json({
                token
            })
        })

    } catch (error) {
        res.status(500).json({
            errors: error
        })
        console.error(error)
    }
})

router.put('/', [auth,
        body('name').not().isEmpty(),
        body('email').isEmail(),
        body('password').not().isEmpty(),
        body('type').not().isEmpty()
    ] , async (req , res) => {

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            })
        }

    try {
        let { name, email, password, type } = req.body
        const saltRounds = 8
        password = await bcrypt.hash(password, saltRounds)
        const updates = {
            name,
            email,
            password,
            type
        }

       const updatedUser = await User.findOneAndUpdate(
           {_id: req.user.id}, 
           {$set: updates},
           {new: true}
           )

        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({
            errors: error
        })
        console.error(error)
    }
})


router.delete('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if(!user){
           return res.status(400).json({
                msg: "user not found"
            })
        }

        await user.remove()

        res.send('User removed successfully')
    } catch (error) {
        console.error(error)
        res.status(500).send('Server Error')
    }
})

module.exports = router