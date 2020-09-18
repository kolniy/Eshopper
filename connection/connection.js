const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASEURL, 
            {
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useNewUrlParser: true
            })

            console.log('Database connected')
    } catch (err) {
        console.error(err)

        process.exit(1)
    }
}

module.exports = connectDB

