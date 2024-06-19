require('dotenv').config();
const mongodb = require('./config/mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 5000; // Use PORT environment variable or default to 3000
const route = require('./routes');
const app = express();


app.options("*", cors());
app.use(cors({ origin: "http://localhost:3000" }));
// Other middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(route);

// MongoDB setup
mongodb();

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
