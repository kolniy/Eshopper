const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const Admin = require('../../models/Admin')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { route } = require('./users')
const jwtSecret = process.env.JWTTOKENSECRET

router.get('/', (req, res) => {
    res.send('Welcome to the admin side')
})

router.post('/', [ 
    body('name').not().isEmpty(),
    body('email').isEmail(),
    body('password').not().isEmpty(),
], async (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }

    try {

        const { name, email, password } = req.body

        let admin = await Admin.findOne({ email })

        if(admin) {
           return res.status(400).json({ errors: [{msg: "Admin Already Exists"}] })
        }

        let type = 'admin'
        
        admin = new Admin({
            email,
            password,
            name,
            type
        })

        let round = 10
        admin.password = await bcrypt.hash(password, round)
        await admin.save()

        const payload = {
            user: {
                id: admin._id
            }
        }

        jwt.sign(payload, jwtSecret, {expiresIn: 360000}, (err, token) => {
            if (err) {
                throw err
            }

            res.status(201).json({
                token
            })
        })

    } catch (error) {
        res.status(500).json({
            errors: error
        })
    }

})

router.post('/login', [
    body('email').isEmail(),
    body('password').not().isEmpty()
] , async (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }

    let { email, password } = req.body

    try {
        
        let admin = await Admin.findOne({ email })

        if (!admin) {
            return res.status(400).json({
                errors: [{
                    msg: "Invalid credentials"
                }]
            })
        }

        const isMatch = await bcrypt.compare(password, admin.password)
        if(!isMatch){
            return res.status(400).json({
                errors: [{
                    msg: "Invalid credentials"
                }]
            })
        }

        const payload = {
            user: {
                id: admin._id
            }
        }

        jwt.sign(payload, jwtSecret, { expiresIn: 36000}, (err, token) => {
            if(err){
                throw err
            }

            res.json({
                token
            })
        })

    } catch (error) {
        res.status(400).json({
            errors: error
        })
    }

})

module.exports = router