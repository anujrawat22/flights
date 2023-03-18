const express = require('express')
require("dotenv").config()
const { connection } = require('./config/db')
const { BookingRouter } = require('./routes/booking.route')
const { FlightRouter } = require('./routes/flight.route')
const { UserRouter } = require('./routes/user.route')



const app = express()

app.use(express.json())


app.use("/user",UserRouter)

app.use('/flights',FlightRouter)

app.use('/book',BookingRouter)

app.listen(process.env.PORT,async()=>{
    try{
        await connection
        console.log("Connected to DB")
        console.log(`Listening on PORT ${process.env.PORT}`)
    }catch(err){
        console.log("Error connecting to DB")
        console.log(err)
    }
})