const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const mongoose = require("mongoose");

const port = 5000;

async function mongooseConnect () {
    try {
        await mongoose.connect ('mongodb://localhost:27017/mongoose83');

        console.log("Connected to MongoDB");

    } catch (error) {
        console.log(error.message);
}

}

mongooseConnect ();


// Create a user Schema
const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,

        required: {
            value: true,
            message: 'Email is required'
        },

        unique: {
            value: true,
            message: 'Email already exists'
        },

        phone : {
            type: String,
            required: {
                value: true,
                message: 'Phone number is required'
            },
            unique: {
                value: true,
                message: 'Phone number already exists'
            },

        }

    }

})

// Create a user model
const User = mongoose.model('User', userSchema);



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})


const upload = multer({ storage: storage });

app.get ("/", (req, res) => {
    res.send("Hello World!");
});


// Add a new user
app.post('/addUser', async (req, res) => {
    try {
        await User.create(req.body);
        res.send("User added successfully");
    } catch (error) {
        res.send(error.message);
    }
})


// User Find
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.send(error.message);
    }
})

// User Find by ID
app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).send(user);
    } catch (error) {
        res.send(error.message);
    }
})


// Find user by ID and update
app.put('/updateUser/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send("User updated successfully");
    } catch (error) {
        res.send(error.message);
    }
})

//User Delete
app.delete('/deleteUser/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).send("User deleted successfully");
    } catch (error) {
        res.send(error.message);
    }
})






app.listen (port, () => {
    console.log(`Server is running on port ${port}`);
});


