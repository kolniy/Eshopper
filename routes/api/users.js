const express = require("express")
const route = express.Router()

route.get('/', (req, res) => {
    res.send("The users route")
})


module.exports = route