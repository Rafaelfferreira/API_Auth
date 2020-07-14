const jwt = require('jsonwebtoken');

// to enable authorization the API Token should be passed as a header
module.exports = function (req,res,next) {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next(); // calls the next middleware
    }catch(err){
        res.status(400).send('Invalid API Token');
    }
}