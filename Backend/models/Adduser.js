const mongoose = require('mongoose');

const addUserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    technology: String,
    age: String,
    gender: String,
    phoneNumber: Number,
    address: String,
    timeTemps: {
        type: Date,
        default: Date.now, // Setting the default value to the current date
    },
    active: {
        type: Boolean,
        default: true, // Default value for active status is true (active)
    }

});

module.exports = mongoose.model("addusers", addUserSchema);