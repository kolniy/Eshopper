const express = require("express")
const { body, validationResult} = require('express-validator')
const router = express.Router()
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')

// get logged in users Profile
// private route
router.get('/', [auth], async (req, res) => {
    try {
        const profile = await Profile.findOne({ owner: req.user.id }).populate('owner', ['name', 'email'])

        if(!profile){
            return res.status(404).json({
                errors: [{
                    msg: "profile not found"
                }]
            })
        }

        res.json(profile)

    } catch (error) {
        console.error(error)
        res.status(500).send('Server Error')
    }
})

// route to create or update user Profile
// private route
router.post('/', [auth, 
    body('address').not().isEmpty(),
    body('number').not().isEmpty(),
    body('country').not().isEmpty(),
    body('city').not().isEmpty(),
    body('zipcode').not().isEmpty(),
    body('state').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.json({
            errors : errors.array()
        })
    }
    try {
        const {
            address,
            number,
            country,
            city,
            zipcode,
            state
        } = req.body

    let profile = await Profile.findOne({ owner: req.user.id })

    // if profile exists, update user profile
    if(profile){
       profile.address = address
       profile.number = number
       profile.country = country
       profile.city = city
       profile.zipcode = zipcode
       profile.state = state

       await profile.save()
       return res.json({profile})
    }

    // if profile does not exists, create new profile
    const profileData = {
        owner: req.user.id,
        address,
        number,
        country,
        city,
        zipcode,
        state
    }

    const newProfile = await new Profile(profileData)
    await newProfile.save()
    res.json(newProfile)

    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
})

router.delete('/', [auth], async (req, res) => {
    try {
        const profile = await Profile.findOne({
            owner: req.user.id
        })

        if(!profile){
            return res.status(404).json({
                msg: "Profile Not Found"
            })
        }

        await profile.remove()
        res.json({
            msg: "Profile Removed"
        })
    } catch (error) {
        console.error(error)
        res.status(500).send("server Error")
    }
})

module.exports = router