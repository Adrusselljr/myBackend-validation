const User = require('../model/User')
const bcrypt = require('bcryptjs')

const createUser = async (req, res) => {

    const { firstName, lastName, username, email, password } = req.body
    
    try {
        let salt = await bcrypt.genSalt(10)
        let hashPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: hashPassword
        })
        
        const savedUser = await newUser.save()
        res.status(200).json({ message: "New user has been saved", payload: savedUser })
    }
    catch (error) {
        let errorKey = Object.keys(error.keyValue)
        if(error.code === 11000) {
            return res.status(500).json({ message: "error", error: `${errorKey} is already in use` })
        }
        res.status(500).json(error)
    }

}

const userLogin = async (req, res) => {

    const { email, password } = req.body

    try {
        console.log(req.body)
        res.send("Hello from login")
    }
    catch (error) {
        res.status(500).json(error)
    }

}

module.exports = {
    createUser,
    userLogin
}