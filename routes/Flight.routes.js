const express = require("express")
const {Flightmodel}= require("../models/Flight.model")
const flightRouter = express.Router()

flightRouter.get("/",(req,res)=>{
    res.status(200).send("All the flights")
})

flightRouter.get("/:id",(req,res)=>{
    res.status(200).send("Particular flight")
})

flightRouter.post("/", async(req,res)=>{
    const payload = req.body
    try{
        const new_flight = new Flightmodel(payload)
        await new_flight.save()
        res.status(201).send("Added new flight")
    }
    catch(err){
        console.log(err)
        res.send({"msg":"Something went wrong"})
    }
})

flightRouter.patch("/:id", async(req,res)=>{
    const payload = req.body
    const id = req.params.id
    const flight = await Flightmodel.findOne({"_id":id})
    const userID_in_flight=flight.userID_in_flight
    const userID_making_req =req.body.userID
    try{
        if(userID_making_req!==userID_in_flight)
        {
            res.send({"msg":"You are not authorized"})
        }
        else{
            await Flightmodel.findByIdAndUpdate({"_id":id},payload)
            res.status(204).send("Updated the flight")
        }
    }
    catch(err){
        console.log(err)
        res.send({"msg":"Something went wrong"})
    }
})

flightRouter.delete("/:id", async(req,res)=>{
    const id = req.params.id
    const flight = await Flightmodel.findOne({"_id":id})
    const userID_in_flight=flight.userID_in_flight
    const userID_making_req = req.body.userID
    try{
        if(userID_making_req!==userID_in_flight)
        {
            res.send({"msg":"You are not authorized"})
        }
        else{
            await Flightmodel.findByIdAndDelete({"_id":id})
            res.status(202).send("Deleted the flight")
        }
    }
    catch(err){
        console.log(err)
        res.send({"msg":"Something went wrong"})
    }
})

module.exports={
    flightRouter
}