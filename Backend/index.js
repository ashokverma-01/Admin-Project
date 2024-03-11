const express = require("express");
const Config = require('./db/Config');
const User = require("./models/User");
const Adduser = require("./models/Adduser")
const Userimage = require("./models/Userimage")
const Cors = require("cors");
const bodyParser = require('body-parser');
const multer = require("multer");



const app = express();

app.use(express.json());
app.use(Cors());

app.use(bodyParser.json());


// Login Route
app.post('/User', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)

        console.log("Received credentials:", email, password);
        if (email && password) {
            const user = await User.findOne({ email: email });
            if (user) {
                // Check if the provided password matches the stored password
                if (user.password === password) {
                    res.json({
                        status: "success",
                        message: "Login successful",
                        user: {
                            _id: user._id,
                            email: user.email,
                            // Include other user properties if needed
                        },
                    });
                } else {
                    res.status(401).json({
                        status: "failed",
                        message: "Email or password does not match",
                    });
                }
            } else {
                res.status(404).json({
                    status: "failed",
                    message: "Email is not registered",
                });
            }
        } else {
            res.status(400).json({
                status: "failed",
                message: "Email and password are required fields",
            });
        }
        console.log("Finished userLogin successfully");
    } catch (error) {
        console.error("Error in userLogin:", error);
        res.status(500).json({
            status: "failed",
            message: "Unable to login. Internal server error.",
        });
    }
});

//adduser api  

app.post('/Adduser', async (req, res) => {
    const { firstname, lastname, email, technology, age, gender, phoneNumber, address } = req.body;

    try {
        // Check if the email is already registered
        const existingUser = await Adduser.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // Create a new user
        const newUser = new Adduser({
            firstname,
            lastname,
            email,
            technology,
            age,
            gender,
            phoneNumber,
            address,
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


//get users api 
app.get("/User", async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await Adduser.find().sort({ timeTemps: -1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users.", error: error.message });
    }
});

//users delete api 
app.delete("/User/:_id", async (req, resp) => {
    const result = await Adduser.deleteOne({ _id: req.params._id })
    resp.send(result);
});

//user update api 
app.get("/UpdateUser/:_id", async (req, resp) => {
    const result = await Adduser.findOne({ _id: req.params._id })
    if (result) {
        resp.send(result);
    } else {
        resp.send({ result: "No Record Found" })
    }
});
app.put("/UpdateUser/:_id", async (req, resp) => {
    try {
        const result = await Adduser.updateOne(
            { _id: req.params._id }, // Filter to find the document with the given _id
            { $set: req.body } // Update with the data from req.body
        );
        resp.send(result);
    } catch (error) {
        resp.status(500).send(error);
    }
});

//search api user
app.get('/Search/:value', async (req, res) => {
    try {
        const { value } = req.params;
        // Perform a case-insensitive search for users whose firstname, lastname, or email match the search value
        const filteredUsers = await Adduser.find({
            $or: [
                { firstname: { $regex: new RegExp(value, 'i') } },
                { lastname: { $regex: new RegExp(value, 'i') } },
                { email: { $regex: new RegExp(value, 'i') } }
            ]
        });
        res.json(filteredUsers);
    } catch (error) {
        console.error("Error searching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//total users api
// Simulated database
app.get('/api/total-users', async (req, res) => {
    try {
        const totalUsers = await Adduser.countDocuments();
        res.json({ totalUsers });
    } catch (error) {
        console.error('Error fetching total users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//total male user api
app.get('/api/total-male', async (req, res) => {
    try {
        const totalMaleUsers = await Adduser.countDocuments({ gender: 'male' });
        res.json({ totalMaleUsers });
    } catch (error) {
        console.error('Error fetching total users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//active deactive api user 
app.patch('/Active/:id', async (req, res) => {
    const { id } = req.params;
    const { active } = req.body;

    try {
        const user = await Adduser.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the active state in the database
        user.active = active;
        await user.save();

        res.json({ message: 'Active state updated successfully' });
    } catch (error) {
        console.error('Error updating active state:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.listen(5500, () => {
    console.log("Server is running on port 5500");
});
