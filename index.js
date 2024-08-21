const express = require('express');
const app = express();
const port = 5000;


//Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Cors
const cors = require('cors');
app.use(cors());


//Cookie Parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());



//create route 
app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/about', (req, res) => {
    res.send('About Us!')
});

//Params
app.get('/user/:id', (req, res) => {
    res.send(`User ID ${req.params.id}`)
});


//Multiple Params
app.get('/shaon', (req, res) => {
    res.send(`Shaon is a ${req.query.nature} boy and he lives in ${req.query.city}`)
});


//Query
app.get('/shaon', (req, res) => {
    res.send(`User Name ${req.query.name} <br> City ${req.query.city}`)
});


//Post
app.post('/contact', (req, res) => {
    // res.send(`Thank you for contacting with us. ${req.body.message}`);
    req.body.msg = "Thank you for contacting with us. ";
    res.send(req.body)
});


//Cookie
app.get('/cookie', (req, res) => {
    res.cookie('Name', 'Shaon');
    res.cookie('City', 'Dhaka')
    res.send('Cookie Set')
});


//Get Cookies
app.get('/getcookie', (req, res) => {
    res.send(req.cookies)
});

//create server
app.listen(port, () => {
    console.log('Server is running on port http://localhost:${port}');
});