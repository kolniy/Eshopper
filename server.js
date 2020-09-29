const express = require("express")
const dbConnect = require("./connection/connection")
const app = express()

// Initialise Middleware
app.use(express.json({ extended: false }));

const usersRoute = require('./routes/api/users')
const productsRoute = require('./routes/api/products')
const ordersRoute = require('./routes/api/orders')
const profileRoute = require('./routes/api/profile')
const wishlistRoute = require('./routes/api/wishlist')
const categoryRoute = require('./routes/api/category')
const adminRoute = require('./routes/api/admin')

const PORT = process.env.PORT || 5000
dbConnect()

app.get('/', (req, res) => {
    res.send("we're here");
})

//Application routes
app.use('/api/users', usersRoute)
app.use('/api/products', productsRoute)
app.use('/api/orders', ordersRoute)
app.use('/api/profile', profileRoute)
app.use('/api/wishlist', wishlistRoute)
app.use('/api/category', categoryRoute)
app.use('/api/admin', adminRoute)

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
})