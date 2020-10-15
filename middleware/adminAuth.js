const jwt = require('jsonwebtoken')
const User = require('../models/User')
const tokenSecret = process.env.JWTTOKENSECRET

const adminAuth =  async (req, res, next) => {
    const token = req.header('x-auth-token')

    if(!token){
        return res.status(404).json({
            errors: [{
                msg: 'token not provided'
            }]
        })
    }

    try {

        const payload = jwt.verify(token, tokenSecret)
    
        const adminUser = await User.findById(payload.user.id)
    
        if(!adminUser){
            return res.status(400).json({
                errors: [{
                    msg: "user not found"
                }]
            })
        }
    
        if(adminUser.type !== 'admin'){
            return res.status(400).json({
                errors: [{
                    msg: "Bad Request"
                }]
            })
        }
    
        req.user = payload.user
        next()
    } catch (error) {
        res.status(401).json({msg: 'Token is not valid'})
    }
}

module.exports = adminAuth