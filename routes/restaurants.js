const router = require('./auth');

const Router = require('express').Router();
const verify = require('./verifyToken');

// Importanto o modelo de um restaurante
const Restaurant = require('../model/Restaurant');
const { func } = require('@hapi/joi');

// the second parameter of this call is the middleware function verify
// MARK: - Get all the restaurants on the database
router.get('/',verify, async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    } catch(err) {
        res.json({ message: err })
    }
});

// MARK: - Search all the restaurants with the keywords in the name or in the description
router.get('/search', async (req, res) => {
    try {
        const restaurants = await searchRestaurantOnDB(req.body.search)
        res.json(restaurants);
    } catch(err) {
        res.json({ message: err })
    }
})

// Runs an aggregate function on the database
function searchRestaurantOnDB(searchField){
    return Restaurant.aggregate([
        {
          '$search': {
            'compound': {
              'should': [
                {
                  'text': {
                    'query': searchField, 
                    'path': 'name', 
                    'fuzzy': {
                      'maxEdits': 2, 
                      'maxExpansions': 100
                    }, 
                    'score': {
                      'boost': {
                        'value': 5
                      }
                    }
                  }
                }, {
                  'text': {
                    'query': searchField, 
                    'path': [
                      'description'
                    ], 
                    'fuzzy': {
                      'maxEdits': 2, 
                      'maxExpansions': 100
                    }
                  }
                }
              ]
            }
          }
        }, {
          '$limit': 10
        }
    ]);
} 
    

module.exports = router;