const express = require("express")
const route = express.Router()

route.get('/', (req, res) => {
    res.send("The profile route")
})


module.exports = route