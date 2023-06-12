const mongoose = require("mongoose");  


const ImageSchema = new mongoose.Schema({
    link: String
  });

module.exports = mongoose.model("Image", ImageSchema);