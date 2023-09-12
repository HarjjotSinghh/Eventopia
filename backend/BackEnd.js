const express = require('express');
// const router = express.Router();
require('dotenv').config();
const eventRouter = require('./routes/event');
const userRouter = require('./routes/user');
const imageRouter = require('./routes/image');

const mongoose = require('mongoose');
const cors = require("cors");
// const eventModal = require('./Modals/example');
const app = express();
const port = 6969;
const Event = require('./Modals/eventModal');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const axios = require('axios');

// const next = require('concurrent/lib/next');

//dummy data of event
// const data = { 
//   eventDetails:{title:'Example1',date:'DAte',timing:'timing',venue:'venue',description:'desc',poster:'poster'},
//   organizer:{society:'socity',socialmedia:'media',website:'website'},
//   management:{email:'email',contact:846456546513218}
// }'
// const responce = eventModal(data);
// responce.save();




const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path,req.method);
  next();
});

app.use("/api/events",eventRouter);
app.use("/api/user",userRouter);
app.use("/api/image",imageRouter);

// router.get('/events', async (req, res) => {
//   try {
//     const events = await Event.find();
//     res.json(events);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch events.' });
//   }
// });


// router.post('/events', async (req, res) => {
//   try {
//     const event = await Event.create(req.body);
//     res.status(201).json(event);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to create event.' });
//   }
// });


// router.delete('/events/:eventId', async (req, res) => {
//   const eventId = req.params.eventId;
//   try {
//     await Event.findByIdAndDelete(eventId);
//     res.sendStatus(204);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to delete event.' });
//   }
// });


// router.put('/events/:eventId', async (req, res) => {
//   const eventId = req.params.eventId;
//   try {
//     const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, { new: true });
//     res.json(updatedEvent);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to update event.' });
//   }
// });

mongoose.connect(`${process.env.MONGO_URI}`)
.then(() => {
    app.listen(port, () => {
    console.log(`Connected to MongoDB`);
    console.log(`Backend running on https://localhost:${port}`);
  });
})
.catch((error) => {
  console.log(error);
});