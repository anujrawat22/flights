const { FlightModel } = require("../models/flight.model");

exports.allflights = async (req, res) => {
  try {
    const Data = await FlightModel.find();
    console.log(Data);
    res.status(200).send({ message: "All flight data", Data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ Error: "Something went wrong" });
  }
};

exports.flightbyId = async (req, res) => {
  try {
    const { Id } = req.params;
    console.log(Id);
    const data = await FlightModel.findById({_id : Id})
    if(data){
        res.status(200).send({message : `Flight with ID - ${Id}`,data})
    }else{
        res.status(404).send({message : `Flight with ID - ${Id } not found`})
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ Error: "Something went wrong" });
  }
};


exports.createFlight = async(req,res)=>{
    try{
        console.log(req.body)
        const { airline , flightNo , departure ,arrival,departureTime,arrivalTime , seats , price} = req.body
        const UserId = req.body.UserId
        
        const flight = await new FlightModel({airline,flightNo,departure,arrival,departureTime,arrivalTime,seats,price,creator_Id : UserId})
        flight.save()
        
        res.status(201).send({message : "Flight created sucessfully"})
    }catch (err) {
        console.log(err);
        res.status(500).send({ Error: "Something went wrong" });
      }
}


exports.updateFlight = async(req,res)=>{
    try{
     const { Id } = req.params
     const payload = req.body

     const Flight = await FlightModel.findById({_id : Id})

     if(Flight){
        await FlightModel.findByIdAndUpdate({_id : Id},{$set : payload})
        res.status(204).send({message : `Flight with ID - ${Id} update sucessfully` })
     }else{
        res.status(404).send({message : `Flight with ID - ${Id} not found`})
     }
    }catch (err) {
        console.log(err);
        res.status(500).send({ Error: "Something went wrong" });
      }
}


exports.deleteFlight = async(req,res)=>{
    try{
       const { Id } = req.params

       const flight = await FlightModel.findById({_id : Id})

       if(flight){
        await FlightModel.findByIdAndDelete({_id : Id})
        res.status(202).send({message : `Flight with Id - ${Id } deleted sucessfully`})
       }else{
        res.status(404).send({message : `Flght with ${Id} not found`})
       }
    }catch(err){
        console.log(err);
        res.status(500).send({ Error: "Something went wrong" });
    }
}
