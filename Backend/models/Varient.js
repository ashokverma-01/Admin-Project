const mongoose = require('mongoose');
const varientSchema = new mongoose.Schema({
    varient: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    timeTemps: {
        type: Date,
        default: Date.now, // Setting the default value to the current date
    },
});

// Create a model based on the schema
module.exports = mongoose.model("varients", varientSchema);