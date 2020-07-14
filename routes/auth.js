const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validation');
const { valid } = require('@hapi/joi');


router.post('/register', async (req, res) => {
    
    // validating
    result = registerValidation(req.body);
    if(result.error) { return res.status(400).send(result.error.details[0].message) }
    
    // checking if the user is already in the databse
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) { return res.status(400).send('Email already registered.'); }

    // Hash the password
    //salts are random data generated to increase the amount of information thats gets hashed with the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // creating new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        res.send({user: user._id});
    } catch(err) {
        res.status(400).send(err);
    }
});

router.post('/login', async (req,res) => {
    // validating the login is in the correct format
    result = loginValidation(req.body)
    if(result.error) { return res.status(400).send('Invalid login'); }

    // checking if the email is registered in the DB
    const user = await User.findOne({ email: req.body.email });
    if(!user) { return res.status(400).send('Email or password is wrong'); }

    // checking if the password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) { return res.status(400).send('Invalid password'); }

    // create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

    // return token
    res.send('Logged In!')

});

module.exports = router;