const express = require('express');
const router = require('./Route/routes');
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
})
app.use("/api",router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})