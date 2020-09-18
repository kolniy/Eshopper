const express = require("express")
const route = express.Router()

route.get('/', (req, res) => {
    res.send("The products route")
})


module.exports = route