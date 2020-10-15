const express = require('express')
const router = express.Router()
const Category = require('../../models/Category')
const { body, validationResult } = require('express-validator')
const adminAuth = require('../../middleware/adminAuth')

// route to get all collections
// public
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find()
        res.json(categories)
    } catch (error) {
        res.status(500).json({
            errors: error
        })
    }
})

// route to create a category
// private
// adminAuth ensure route accessible for admins alone
router.post('/', [ 
    adminAuth,
    body('name').not().isEmpty(),
    body('categoryIconName').not().isEmpty()
 ], async (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }

    let { name, categoryIconName } = req.body

    name = name.trim()
    name = name.toLowerCase()
    categoryIconName = categoryIconName.trim()

    const categoryExists = await Category.findOne({
        name
    })

    if (categoryExists) {
        return res.status(400).json({
            errors: [{
                msg: "category already exists"
            }]
        })
    }

    try {
        const collection = new Category({
            name,
            categoryIconName
        })

        await collection.save()

        res.json({
            collection
        })
    } catch (error) {
        res.status(500).json({
            errors: error
        })
    }
})

// route to update a category
// private
// adminAuth ensure route accessible for admins alone
router.put('/:categoryId', [
    adminAuth,
    body('name').not().isEmpty(),
    body('categoryIconName').not().isEmpty()
], async (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }

    let { name, categoryIconName } = req.body

    name = name.trim()
    name = name.toLowerCase()
    categoryIconName = categoryIconName.trim()

    try {
        let categoryId = req.params.categoryId
        const category = await Category.findById(categoryId)
        if(!category){
            return res.status(400).json({
                errors: [{
                    msg: "category not valid"
                }]
            })
        }

        const categoryUpdateData = {
            name, 
            categoryIconName
        }

        const categoryUpdates = await Category.findByIdAndUpdate(
            {_id: category._id},
            {$set: categoryUpdateData},
            {new: true},
        )

        res.json(categoryUpdates)
    } catch (error) {
        res.status(500).json({
            errors: [{error}]
        })
    }

})

router.delete('/:categoryId', [
    adminAuth,
],  async (req, res) => {

    try {
        let categoryId = req.params.categoryId
        const category = await Category.findById(categoryId)
        if(!category){
            return res.status(400).json({
                errors: [{
                    msg: "category not valid"
                }]
            })
        }

        await category.remove()
      
        res.json({
            msg: "category removed"
        })

    } catch (error) {
        if (error.name == "CastError") {
            return res.status(404).send("category not found");
          }
          console.error(error.message);
          res.status(500).send("Server Error");
    }

})
module.exports = router