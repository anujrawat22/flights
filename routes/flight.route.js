const express = require('express')
const { allflights, flightbyId, createFlight, updateFlight, deleteFlight } = require('../controller/flights')
const { authenticate } = require('../middlewares/authenticate')



const FlightRouter = express.Router()

FlightRouter.get("/allflights",allflights)

FlightRouter.get("/search/:Id",flightbyId)

FlightRouter.post('/create',authenticate,createFlight)

FlightRouter.patch('/update/:Id',authenticate,updateFlight)

FlightRouter.delete('/delete/:Id',deleteFlight)

module.exports = { FlightRouter}

