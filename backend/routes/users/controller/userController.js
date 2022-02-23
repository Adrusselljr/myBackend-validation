const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
        const foundUser = await User.findOne({ email: email })
        if(foundUser === null) throw { message: "Email not found!" }

        const comparedPassword = await bcrypt.compare(password, foundUser.password)
        if(!comparedPassword) throw { message: "Password does not match!" }

        const jwtToken = jwt.sign({
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            email: foundUser.email,
            username: foundUser.userName
        },
            process.env.SECRET_KEY, 
            { expiresIn: "12h" }
        )

        res.status(200).json({ payload: jwtToken })
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }

}

const profileValid = async (req, res) => {

    const { token } = req.body

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
        res.status(200).json({ token: decodedToken })
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    createUser,
    userLogin,
    profileValid
}