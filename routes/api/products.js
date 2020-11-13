const express = require("express")
const router = express.Router()
const { body, validationResult } = require('express-validator')
const multer = require('multer')
const { memoryStorage } = require("multer")
const cloudinary = require('cloudinary').v2
const adminAuth = require('../../middleware/adminAuth')
const auth = require('../../middleware/auth')
const Product = require('../../models/Product')
const Category = require('../../models/Category')
const User = require('../../models/User')
const dataUri = require('../../utils/dataUri')
const mongoose = require('mongoose')

// route to get just one product
router.get('/:productId', async (req, res) => {
    try {
    const product = await Product.findOne({
        _id: req.params.productId
    })

        if(!product){
            return res.status(400).json({
                errors: [{msg: "product not found"}]
            })
        }

        res.json(product)
    } catch (error) {
        res.status(500).send(error)
    }
})

// route to get all products
router.get('/', async (req, res) => {
    try {
        const queryOptions = {}
        if(req.query.limit){
            queryOptions.limit = parseInt(req.query.limit)
        }
        const products = await Product.find({}, null, queryOptions)
        res.json(products)
    } catch (error) {
        res.status(500).send('Server Error')
    }
})

// route to get category specific products
router.get('/category/:categoryname', async (req, res) => {
    try {
        const validCate = await Category.findOne({
            name: req.params.categoryname
        })

        const queryOptions = {}

        if(req.query.limit){
            queryOptions.limit = parseInt(req.query.limit)
        }

        if(!validCate){
            return res.status(400).json({
                errors: [{
                    msg: "Category not valid"
                }]
            })
        }

        const products = await Product.find({
            category: validCate._id
        }, null, queryOptions)
        res.json(products)

    } catch (error) {
        console.error(error)
        res.status(500).send('Server Error')
    }
})

const storageDest = memoryStorage()

const upload = multer({
    storage: storageDest,
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            cb(new Error('Please Upload an image'))
        }
        cb(undefined, true)
    }
})

// route to create new product 
// route access private
router.post('/:categoryname', [
    adminAuth,
    body('name').not().isEmpty(),
    body('shortDesc').not().isEmpty(),
    body('price').not().isEmpty(),
    body('productImage').not().isEmpty(),
    body('availability').not().isEmpty(),
], 
 upload.single('productImage'),
async (req, res) => {
    const errors = validationResult(req.body)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const categoryName = req.params.categoryname

    try {
        
    const validCategory = await Category.findOne({ name: categoryName})

    if(!validCategory){
        return res.status(400).json({
            errors: [{msg: "product must have a valid category"}]
        })
    }
    const {
        name,
        shortDesc,
        longDesc,
        price,
        oldprice,
        availability,
    } = req.body

    let product = new Product({
        name,
        shortDesc,
        longDesc,
        price,
        oldprice,
        availability,
        category: validCategory._id,
        image: ''
    })


    const productImagetoUploadfile = dataUri(req).content

    let uploadResponse = await cloudinary.uploader.upload(productImagetoUploadfile, {
        folder: 'Eshopper/products/',
        public_id: `${validCategory.name}.${name}`
    })

    product.image = uploadResponse.url

    await product.save()
    res.json(product)

    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
})

// update product image
router.put('/image/:productId', [ 
    adminAuth, 
    body('productImage').not().isEmpty()
 ], upload.single('productImage'), async (req, res) => {

    const errors = validationResult(req.body)
    if(!errors.isEmpty()){
        res.status(400).json({
            errors: errors.array()
        })
    }

    try {
        
       let product = await Product.findOne({
           _id: req.params.productId
       }).populate('category')

        if (!product) {
            return res.status(400).json({
                errors: [{msg: "invalid product"}]
            })
        }

        const productImagetoUploadfile = dataUri(req).content

          let uploadResponse = await cloudinary.uploader.upload(productImagetoUploadfile, {
        folder: 'Eshopper/products/',
        public_id: `${product.category.name}.${product.name}`
    })

    product.image = uploadResponse.url
    await product.save()

    res.json(product)

    } catch (error) {
        console.error(error)
        res.status(500).send("Server error")
    }
})


// route to update product details
router.put('/details/:productId', [adminAuth], async (req, res) => {
    const {
        name,
        shortDesc,
        longDesc,
        price,
        oldprice,
        availability
    } = req.body

    try {
        
        let product = await Product.findOne({
            _id: req.params.productId
        })

        if (!product) {
            return res.status(400).json({
                errors: [{
                    msg: 'Invalid product'
                }]
            })
        }

        if (name) product.name = name
        if (shortDesc) product.shortDesc = shortDesc
        if (longDesc) product.longDesc = longDesc
        if (price) product.price = price
        if (oldprice) product.oldprice = oldprice
        if (availability) product.availability = availability

        await product.save()

        res.json(product)

    } catch (error) {
        console.error(error)
        res.status(500).send('Server error')
    }
})

// route to review product
// user access 
router.put('/review/:productId', auth, [
    body('comment').not().isEmpty()
], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const {
        comment,
        star
    } = req.body

    try {

        let product = await Product.findOne({
            _id: req.params.productId
        })

        // checks for valid product 
        if(!product){
            return res.status(400).json({
                errors: [{
                    msg: "invalid product"
                }]
            })
        }

    // search user who wants to review
    const user = await User.findOne({
        _id: req.user.id
    })

    let userReview = {
        name: user.name,
        email: user.email,
       comment,
       date: Date.now()
    }

    if (star) userReview.star = star

    if(product.reviews.filter((review) => review.email.toString().toLowerCase() === user.email.toLowerCase()).length > 0) {
        return res.status(400).json({msg: "User review already exists"})
    }

    product.reviews.unshift(userReview)
    await product.save()
    res.json(product)
    } catch (error) {
        console.error(error)
        res.status(500).send('Server error')
    }
    
})

// route to remove products review
router.put('/review/:productId/:reviewId', auth, async (req, res) => {
    try {
        let product = await Product.findOne({
            _id: req.params.productId
        })

        if (!product) {
            return res.status(400).json({
                errors: [{
                    msg: "invalid product"
                }]
            })
        }

        product.reviews = product.reviews.filter((review) => review._id != req.params.reviewId )

        await product.save()

        res.json(product)

    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

module.exports = router