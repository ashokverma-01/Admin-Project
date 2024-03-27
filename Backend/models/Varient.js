const mongoose = require("mongoose");

// Define the Varient schema
const varientSchema = new mongoose.Schema({
    varient: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    timeTemps: {
        type: Date,
        default: Date.now, // Setting the default value to the current date
    },
});

// Create a model based on the schema
const Varient = mongoose.model("varients", varientSchema);

module.exports = Varient;
