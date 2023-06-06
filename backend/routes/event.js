const express = require('express');
const eventModal = require('../Modals/eventModal');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const mongoose = require("mongoose");
const { createCheckSchema } = require('express-validator/src/middlewares/schema');
const {
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
} = require("../controllers/eventController");

mongoose.connect(`${process.env.MONGO_URI}`);


router.get("/", getEvents);
router.get("/:id", getEvent);
router.post("/", createEvent);
router.delete("/:id", deleteEvent);
router.patch("/:id", updateEvent);


// router.get("/",async (req,res)=>{//This route gives data of all Events.
//     //Url: http://localhost:5000/api/events
//     const data = await eventModal.find();
//     res.send(data);
// })
// router.post("/",[//This route add Events.
// body("eventDetails").notEmpty(),
// body("organizer").notEmpty(),
// body("management").notEmpty()
// ],async (req,res)=>{
//     // URL:http://localhost:5000/api/events
//     const result = validationResult(req);
//     if (result.isEmpty()) {
//       const data = await eventModal({eventDetails:{
//         title:req.body.eventDetails.title,
//         date:req.body.eventDetails.date,
//         timing:req.body.eventDetails.timing,
//         venue:req.body.eventDetails.venue,
//         description:req.body.eventDetails.description,
//         poster:req.body.eventDetails.poster
//     },organizer:{
//         society:req.body.organizer.society,
//         socialmedia:req.body.organizer.socialmedia,
//         website:req.body.organizer.website
//     },management:{
//         email:req.body.management.email,
//         contact:req.body.management.contact
//     }});

//     data.save();

//     res.send(data);
//     }
//     else{
//         res.send({errors: result.array()});
//     } 
// //     sample data of Body : {
// //   "eventDetails":{"title":"Example1","date":"DAte","timing":"timing","venue":"venue","description":"desc","poster":"poster"},
// //   "organizer":{"society":"socity","socialmedia":"media","website":"website"},
// //   "management":{"email":"email","contact":846456546513218}
// // }
// })

// router.put("/updateevent/:id",[//This route will Update Events.
//     body("eventDetails").notEmpty(),
//     body("organizer").notEmpty(),
//     body("management").notEmpty()
// ],async (req,res)=>{
//     // URL:http://localhost:5000/api/event/updateevent/646d0350f84794410e70fbfa
//     const result = validationResult(req);
//     if (result.isEmpty()) {
//         const data = await eventModal.findByIdAndUpdate(req.params.id,{eventDetails:{
//             title:req.body.eventDetails.title,
//             date:req.body.eventDetails.date,
//             timing:req.body.eventDetails.timing,
//             venue:req.body.eventDetails.venue,
//             description:req.body.eventDetails.description,
//             poster:req.body.eventDetails.poster
//         },organizer:{
//             society:req.body.organizer.society,
//             socialmedia:req.body.organizer.socialmedia,
//             website:req.body.organizer.website
//         },management:{
//             email:req.body.management.email,
//             contact:req.body.management.contact
//         }});
//     // data.save();

//     res.send(data);
//     }
//     else{
//         res.send({errors: result.array()});
//     } 
// //     sample data of Body : {
// //   "eventDetails":{"title":"Example1","date":"DAte","timing":"timing","venue":"venue","description":"desc","poster":"poster"},
// //   "organizer":{"society":"socity","socialmedia":"media","website":"website"},
// //   "management":{"email":"email","contact":846456546513218}
// // }
// })
// router.delete("/deleteevent/:id",async (req,res)=>{//This route delete data of selected Events.
//     // URL:http://localhost:5000/api/event/deleteevent/646e6bcc68c1b45f5c744afe
//     const data = await eventModal.findByIdAndDelete(req.params.id);
//     res.send(data);
// })

module.exports = router;
