const User = require('../model/User')

const regexName = str => {
    if(str.match(/[!`\-_=@#$%^&*()\[\],.?":;{}|<>1234567890]/g)) {
        return true
    } else return false
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

        // Checks to see if firstName or lastname have special chars or numbers
        if(regexName(firstName)) {
            errObj.firstName = "First name should not include numbers or special characters!"
        }
        if(regexName(lastName)) {
            errObj.lastName = "Last name should not include numbers or special characters!"
        }
        let checkObj = Object.keys(errObj)
        if(checkObj.length > 0) {
            return res.json(errObj)
        }

        const savedUser = await newUser.save()
        res.status(200).json({ message: "data has been saved", payload: savedUser })

    }
    catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {
    createUser
}