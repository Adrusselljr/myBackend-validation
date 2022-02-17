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
        
        // const savedUser = await newUser.save()
        res.status(200).json(req.body)
        // res.status(200).json({ message: "New user has been saved", payload: savedUser })
    }
    catch (err) {
        res.status(500).json(err)
    }
    
}

module.exports = {
    createUser
}