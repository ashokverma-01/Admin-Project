
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  color: String,
  price: {
    type: Number,
    required: true
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  varient: {
    type: String, // Assuming you will store the image path
    required: true
  },
  image: {
    type: String, // Assuming you will store the image path
    required: true
  },
  timeTemps: {
    type: Date,
    default: Date.now, // Setting the default value to the current date
  },
});

module.exports = mongoose.model("addcars", carSchema);
