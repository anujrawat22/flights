const { BookingModel } = require("../models/booking.model")
const { FlightModel } = require("../models/flight.model")


exports.bookflight = async(req,res)=>{
    try{
       const {Id } = req.params
       const UserId = req.body.UserId

      const Flight = await FlightModel.findById({_id : Id})
      if(!Flight){
        res.status(404).send({message : `Flight with Id - ${Id} not found`})
      }else{
        const booking = await new BookingModel({
            user : UserId,
            Flight : Id
        })

        booking.save()
        res.status(201).send({message : "Flight Booked"})
      }
    }catch(err){
        console.log(err)
        res.status(500).send({message : 'Something went wrong'})
    }
}