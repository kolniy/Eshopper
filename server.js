const express = require("express")
const dbConnect = require("./connection/connection")
const cloudinary = require('cloudinary').v2
const app = express()

// Initialise Middleware
app.use(express.json({ extended: false }));

const usersRoute = require('./routes/api/users')
const productsRoute = require('./routes/api/products')
const ordersRoute = require('./routes/api/orders')
const profileRoute = require('./routes/api/profile')
const wishlistRoute = require('./routes/api/wishlist')
const categoryRoute = require('./routes/api/category')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const PORT = process.env.PORT || 5000
dbConnect()

app.get('/', (req, res) => {
    res.send("we're here");
})

//Application routes
app.use('/api/users', usersRoute)
app.use('/api/product', productsRoute)
app.use('/api/order', ordersRoute)
app.use('/api/profile', profileRoute)
app.use('/api/wishlist', wishlistRoute)
app.use('/api/category', categoryRoute)

if(process.env.NODE_ENV === 'production'){
    // set static files
    app.use(express.static('client/build'))

    
    app.get("/*", (req, res) => {
      res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'))
    })
}

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})