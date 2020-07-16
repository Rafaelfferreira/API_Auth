const router = require('./auth');

const Router = require('express').Router();
const verify = require('./verifyToken');

// Importanto o modelo de um restaurante
const Restaurant = require('../model/Restaurant')

// the second parameter of this call is the middleware function verify
router.get('/',verify, async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    } catch(err) {
        res.json({ message: err })
    }
});

module.exports = router;