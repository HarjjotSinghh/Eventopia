const express = require('express');
require('dotenv').config();
const router = require('./routes/routes');
const mongoose = require('mongoose');
const cors = require("cors");
const eventModal = require('./Modals/example');
const app = express();
const port = 5000;

mongoose.connect(`${process.env.MONGO_URI}/EVENTOPIA`);//this will connect our express app to mongoDB server when express app start.

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
})
app.use("/api",router);

app.listen(port, () => {
  console.log(`Example app listening on https://localhost:${port}`);
})