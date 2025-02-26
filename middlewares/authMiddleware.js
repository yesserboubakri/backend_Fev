const jwt = require('jsonwebtoken');
const userModel = require('../models/userSchema');

const requireAuthUser = (req, res, next) => {
    const token = req.cookies.jwt_token_9antra;

    if (token) {
        jwt.verify(token, 'net secret pfe', async (err, decodedToken) => {
            if (err) {
                console.log('Token error:', err.message);
                req.session.user = null; //  Session should not be undefined now
                res.json('/Problem_token');
            } else {
                req.session.user = await userModel.findById(decodedToken.id);
                console.log('Session User:', req.session.user); //  Debug log
                next();
            }
        });
    } else {
        console.log
        req.session.user = null;
        res.json('/pas_de_token');
    }
};

module.exports = { requireAuthUser };
