const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    imageUrl: String,
});

module.exports = mongoose.model("userImage", userSchema);
