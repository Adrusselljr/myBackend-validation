const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    firstName: {
        type: String
    },

    lastName: {
        type: String
    },

    username: {
        type: String
    },
    
    email: {
        type: String
    },
    
    password: {
        type: String
    }

}, { timestamp: true })

module.exports = mongoose.model("user", UserSchema)