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
        const products = await Product.find()
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

        if(!validCate){
            return res.status(400).json({
                errors: [{
                    msg: "Category not valid"
                }]
            })
        }

        const products = await Product.find({
            category: validCate._id
        })

        res.json(products)

    } catch (error) {
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

router.put('/review/:productId', auth, [
    body('name').not().isEmpty(),
    body('email').isEmail(),
    body('comment').not().isEmpty()
], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const {
        name,
        email,
        comment,
        star
    } = req.body

    let userReview = {
        name,
        email,
       comment
    }

    if (star) userReview.star = star

    try {

        let product = await Product.findOne({
            _id: req.params.productId
        })

        if(!product){
            return res.status(400).json({
                errors: [{
                    msg: "invalid product"
                }]
            })
        }

       product.reviews.unshift(userReview)

        await product.save()
        res.json(product)

    } catch (error) {
        console.error(error)
        res.status(500).send('Server error')
    }
    
})

router.put('/review/:productId/:reviewId', adminAuth, async (req, res) => {
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