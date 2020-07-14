const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Importing routes
const authRoute = require('./routes/auth');
const restaurantsRoute = require('./routes/restaurants');

dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, // accessing the .env file through process.env
{ useNewUrlParser: true, useUnifiedTopology: true },
() => {
    console.log('Connected to the DB');
});


//Middleware
app.use(express.json());

// Route Middlewares (code executes before the route runs)
app.use('/api/user', authRoute);
app.use('/api/restaurants', restaurantsRoute)


app.listen(3000, () => console.log('The Server is running!'));