
const express = require('express');
require('dotenv').config();
const router = require('./routes/event');
const mongoose = require('mongoose');
const cors = require("cors");
const eventModal = require('./Modals/eventModal');
const app = express();
const port = 5000;

//dummy data of event
// const data = { 
//   eventDetails:{title:'Example1',date:'DAte',timing:'timing',venue:'venue',description:'desc',poster:'poster'},
//   organizer:{society:'socity',socialmedia:'media',website:'website'},
//   management:{email:'email',contact:846456546513218}
// }'
// const responce = eventModal(data);
// responce.save();

mongoose.connect(`${process.env.MONGO_URI}`);//this will connect our express app to mongoDB server when express app start.


app.use(express.json());
app.use(cors());

app.use("/api/event",router);//This route gives data of all Events.

app.listen(port, () => {
  console.log(`Example app listening on https://localhost:${port}`);
})