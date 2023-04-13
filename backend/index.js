const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');

//Models
const User = require('./models/dataSchema');

// Port
const port = 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// database connection
dotenv.config();
mongoose.connect(process.env.DB_CONNECTION);

// use of express validator for using backend validations
const { body, validationResult } = require('express-validator');

app.post('/insert',
// validate values using express validator
body('firstName').isLength({min:3, max:30}),
body('lastName').isLength({min:3, max:30}),
body('email').isEmail(),
body('contact').isLength({min:10, max:10}),
body('password').isLength({min:8}),
body('confirmPassword').isLength({min:8}),
async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }
    // defining variables to store values coming from client
    const FirstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const contact = req.body.contact
    const designation = req.body.designation
    const gender = req.body.gender
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword

    const existingUser = await User.findOne({ $or: [{ email }, { contact }] });
  if (existingUser) {
        return res.status(400).send( {message:'User already exists with this email or phone number'});
    
  }
// storing form data using model
    const formData = new User({
        firstName: FirstName,
        lastName: lastName,
        email : email,
        contact : contact,
        designation : designation,
        gender : gender,
        password : password,
        confirmPassword : confirmPassword
    })

    try {
        await formData.save();
        res.send({message:'User created successfully'})
    } catch (err) {
        console.log(err)
        res.send({message:'Please fill all the details correct'})
    }
});

app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error getting users');
    }
  });

// app listening to port
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})