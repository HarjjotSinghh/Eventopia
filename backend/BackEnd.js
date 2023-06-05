const express = require('express');
const router = express.Router();
require('dotenv').config();
const router = require('./routes/event');
const mongoose = require('mongoose');
const cors = require("cors");
const eventModal = require('./Modals/example');
const app = express();
const port = 5000;
const Event = require('./Modals/eventModal');

//dummy data of event
// const data = { 
//   eventDetails:{title:'Example1',date:'DAte',timing:'timing',venue:'venue',description:'desc',poster:'poster'},
//   organizer:{society:'socity',socialmedia:'media',website:'website'},
//   management:{email:'email',contact:846456546513218}
// }'
// const responce = eventModal(data);
// responce.save();

mongoose.connect(`${process.env.MONGO_URI}`);

app.use(express.json());
app.use(cors());

app.use("/api/event",router);


router.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch events.' });
  }
});


router.post('/events', async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create event.' });
  }
});


router.delete('/events/:eventId', async (req, res) => {
  const eventId = req.params.eventId;
  try {
    await Event.findByIdAndDelete(eventId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete event.' });
  }
});


router.put('/events/:eventId', async (req, res) => {
  const eventId = req.params.eventId;
  try {
    const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, { new: true });
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update event.' });
  }
});

app.listen(port, () => {
  console.log(`Backend running on https://localhost:${port}`);
})