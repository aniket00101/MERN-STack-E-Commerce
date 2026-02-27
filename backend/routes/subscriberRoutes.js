const express = require("express")
const router = express.Router()
const Subscriber = require("../models/Subscriber")

router.post("/", async(req, res) => {
    const { email } = req.body
    if(!email)  return res.status(400).json({message: "Email is required"})
    try {
        let subscriber = await Subscriber.findOne({email})
        if(subscriber) {
            return res.status(400).json({message: "Email is already subscribed"})
        }
        subscriber = new Subscriber({email})
        await subscriber.save()
        res.status(201).json({message: "Successfully subscribed  to the news letter"})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Serever error"})
    }
})

module.exports = router