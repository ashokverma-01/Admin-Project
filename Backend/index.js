const express = require("express");
const Config = require('./db/Config');
const User = require("./models/User");
const Adduser = require("./models/Adduser")
const Cors = require("cors");
const bodyParser = require('body-parser');



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
// app.get("/UpdateUser/:_id", async (req, resp) => {
//     const result = await Adduser.findOne({ _id: req.params._id })
//     if (result) {
//         resp.send(result);
//     } else {
//         resp.send({ result: "No Record Found" })
//     }
// });
app.put('/UpdateUser/:id', async (req, res) => {
    const userId = req.params.id;
    const updateFields = req.body; // Assuming you send the fields to be updated in the request body

    try {
        // Check if the provided ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        // Find the user by ID and update the fields
        const updatedUser = await Adduser.findByIdAndUpdate(userId, updateFields, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send the updated user object as a response
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//search api user
app.get("/Search/:key", async (req, resp) => {
    let result = await Adduser.find({
        "$or": [
            { firstname: { $regex: req.params.key } },
            { lastname: { $regex: req.params.key } },
            { email: { $regex: req.params.key } },
            { technology: { $regex: req.params.key } },
            { age: { $regex: req.params.key } },
            { gender: { $regex: req.params.key } },
            { phoneNumber: { $regex: req.params.key } },
            { address: { $regex: req.params.key } },
        ]
    });
    resp.send(result)
})

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


app.listen(5500, () => {
    console.log("Server is running on port 5500");
});
