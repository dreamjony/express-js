const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const multer = require('multer');




// Created Storage Engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, + Date.now() + '.' + file.originalname.split('.').pop());
    }
})

const upload = multer({ storage: storage })



//Upload File
app.post('/upload', upload.single('image'), (req, res) => {
    res.send('File uploaded successfully');
})






//Home Route
app.get('/', (req, res) => {
    res.send('Hello World!')
})

//Get Parameters from URL
app.get('/student/:name', (req, res) => {
    res.send(`Hello ${req.params.name}`);
})

//Not Required Parameters
app.get('/student-city/:city?', (req, res) => {
    if (req.params.city) {
        res.send(`Student city is ${req.params.city}`);
    } else {
        res.send(`Student city is not found`);
    }
})

//Get Query Parameters
app.get('/student-class', (req, res) => {
    res.send(`Student class is ${req.query.class}`);
})

//Middleware
const checkAge = (req, res, next) => {
    if (req.params.age < 18) {
        res.send(`You're not eligible to vote`);
    } else {
        next();
    }
}

app.get('/student-age/:age', checkAge , (req, res) => {
    res.send('You are eligible to vote');
})


//Post Request
app.post('/student', (req, res) => {
    res.send(`Student name is ${req.body.name}`);
})


//Set Cookie
app.post('/login', (req, res) => {
    res.cookie('username', req.body.username);
    res.send('Login Successfully');

})

//Get Cookie
app.get('/user-info', (req, res) => {
        res.send(`Welcome ${req.cookies.username}`);
})

//Delete Cookie
app.post('/logout', (req, res) => {
    if (req.cookies.username) {
        res.clearCookie('username');
        res.send('Logout Successfully');
    } else {
        res.send('You are not logged in');
    }
})














//Server Start
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})