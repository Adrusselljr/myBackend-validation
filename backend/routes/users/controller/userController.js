const User = require('../model/User')

const regexName = str => {
    return str.match(/[!`\-_=@#$%^&*()\[\],.?":;{}|<>1234567890]/g)
}

const regexUsername = str => {
    return str.match(/[!`\-_=@#$%^&*()\[\],.?":;{}|<>\s]/g)
}

const regexEmail = str => {
    return !str.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
}

const regexPassword = str => {
    return !str.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
}

const createUser = async (req, res) => {
    const { firstName, lastName, email, username, password } = req.body
    let errObj = {}
    try {
        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            password: password
        })
        
        // Checks if firstName and lastname are in correct format
        if(regexName(firstName)) {
            errObj.firstName = "First name should not include numbers or special characters!"
        }
        if(regexName(lastName)) {
            errObj.lastName = "Last name should not include numbers or special characters!"
        }
        // Checks if username are in correct format
        if(regexUsername(username)) {
            errObj.username = "Username should not have a space or special characters!"
        }
        // Checks if email is in correct format
        if(regexEmail(email)) {
            errObj.email = "Email is not in the correct format!"
        }
        // Checks if password is in correct format
        if(regexPassword(password)) {
            errObj.password = "Password must contain a minimum of 1 number, 1 uppercase letter, 1 lowercase letter, 1 special character and 8 characters in length!"
        }
        // Sends error messages to object
        let checkObj = Object.keys(errObj)
        if(checkObj.length > 0) {
            return res.json(errObj)
        }
        res.json(password)
        // const savedUser = await newUser.save()
        // res.status(200).json({ message: "data has been saved", payload: savedUser })
    }
    catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {
    createUser
}