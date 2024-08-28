const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const app = express();
const port = 4000;

//Body Parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
const uri = "mongodb://localhost:27017/Batch83";
const client = new MongoClient(uri);

//Create Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Home Route
app.get("/", (req, res) => {
    res.send("Hello World!");
});


// Get All Students

app.get("/students", async (req, res) => {
    try {
        await client.connect();
        const students = await client.db().collection("students").find().toArray();
        res.json(students);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Get Student by ID
app.get("/students/:id", async (req, res) => {
    try {
        await client.connect();
        const students = await client.db().collection("students").findOne({ _id: new ObjectId (req.params.id) });
        res.json(students);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Create Student
app.post("/students", async (req, res) => {
    try {
        await client.connect();
        const result = await client.db().collection("students").insertOne(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Update Student by ID
app.put("/students/:id", async (req, res) => {
    try {
        await client.connect();
        const result = await client.db().collection("students").updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
        res.json(result);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Delete Student by ID
app.delete("/students/:id", async (req, res) => {
    try {
        await client.connect();
        const result = await client.db().collection("students").deleteOne({ _id: new ObjectId(req.params.id) });
        res.json(result);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});
