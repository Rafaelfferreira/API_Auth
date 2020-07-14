const router = require('./auth');

const Router = require('express').Router();
const verify = require('./verifyToken');

// the second parameter of this call is the middleware function verify
router.get('/',verify, (req, res) => {
    res.json({ 
        restaurants: [{
            name: 'BellaGulla',
            description: 'Tortas artesanais e cafés especiais'
         },{
            name: 'Outback',
            description: 'Australian SteakHouse' 
        }]
    });
});

module.exports = router;