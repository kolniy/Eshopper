const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')
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
    
        const adminUser = await Admin.findById(payload.user.id)
    
        if(!adminUser){
            return res.status(400).json({
                errors: [{
                    msg: "user not found"
                }]
            })
        }
    
        if(adminUser.type === null){
            return res.status(400).json({
                errors: [{
                    msg: "user not found"
                }]
            })
        }
    
        req.user = adminUser
        next()
    } catch (error) {
        res.status(401).json({msg: 'Token is not valid'})
    }
}

module.exports = adminAuth