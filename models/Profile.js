const mongooose = require('mongoose')

const ProfileSchema = new mongooose.Schema({
    owner: {
        type: mongooose.Schema.Types.ObjectId,
        ref: 'User'
    },
    address: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    country: {
        type: String,
    },
    city: {
        type: String
    },
    zipcode: {
        type: String
    }
})

const Profile = mongooose.model('Profile', ProfileSchema)

module.exports = Profile