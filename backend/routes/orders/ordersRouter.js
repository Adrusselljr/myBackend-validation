const express = require('express')
const { route } = require('express/lib/application')
const router = express.Router()
const { jwtMiddleware } = require('../users/lib/authMiddleware/index')
const { createOrder, getAllOrders, deleteOrder } = require('./controller/orderController.js')

router.get("/", (req, res) => {
    res.send("Hello World from ordersRouter!")
})

router.post('/create-order', jwtMiddleware, createOrder)
router.get('/get-all-orders', jwtMiddleware, getAllOrders)
router.delete('/delete-order/:id', jwtMiddleware, deleteOrder)
router.put('/update-order')

module.exports = router