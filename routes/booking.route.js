const express = require('express')
const { bookflight } = require('../controller/booking')
const { authenticate } = require('../middlewares/authenticate')



const BookingRouter = express.Router()

BookingRouter.post("/flights/:Id",authenticate,bookflight)




module.exports = { BookingRouter }