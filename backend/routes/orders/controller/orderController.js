const Order = require('../model/Order')
const User = require('../../users/model/User')
const { isAlpha, isInt } = require('validator')
const { errorHandler } = require('..//../users/utils/errorHandler')

const createOrder = async(req, res) => {
    try {
        const { orderName, orderAmount, orderItems } = req.body
        let errObj = {}

        if(!isAlpha(orderName)) {
            errObj.orderName = "Order name should be alphabet only!"
        }
        if(!isInt(orderAmount)) {
            errObj.orderAmount = "Order amount should a numbers only!"
        }
        if(Object.keys(errObj).length > 0) {
            return res.status(500).json({ message: "Error", error: errObj})
        }

        const decodedData = res.locals.decodedToken
        const foundUser =  await User.findOne({ email: decodedData.email })
        if(!foundUser) throw { message: "User not found" }

        const newOrder = new Order({
            orderName: orderName,
            orderAmount: orderAmount,
            orderItems: orderItems,
            orderOwner: foundUser.id
        })

        const savedOrder = await newOrder.save()
        foundUser.orderHistory.push(savedOrder.id)
        await foundUser.save()

        res.status(200).json({ mesaage: "Saved new order", payload: savedOrder })
    }
    catch (error) {
        res.status(500).json(errorHandler(error))
    }
}

const getAllOrders = async(req, res) => {
    try {
        const decodedData = res.locals.decodedToken
        const foundUser =  await User.findOne({ email: decodedData.email })
        if(!foundUser) throw { message: "User not found" }

        const foundOrders = await Order.find({ orderOwner: foundUser.id })

        res.status(200).json({ payload: foundOrders })
    }
    catch (error) {
        res.status(500).json({ message: "Error", error: error.mesaage })
    }
}

const deleteOrder = async(req, res) => {

    const { id } = req.params

    try {
        const deleteOrder = await Order.findByIdAndDelete(id)
        if(deleteOrder === null) throw { message: "No order with id found!" }

        const decodedData = res.locals.decodedToken
        const foundUser =  await User.findOne({ email: decodedData.email })
        if(!foundUser) throw { message: "User not found" }

        foundUser.orderHistory.pull(id)
        await foundUser.save()

        res.status(200).json({ message: "Order was deleted", payload: deleteOrder })
    }
    catch (error) {
        res.status(500).json({ message: "Error", error: error.mesaage })
    }
}

module.exports = {
    createOrder,
    getAllOrders,
    deleteOrder
}