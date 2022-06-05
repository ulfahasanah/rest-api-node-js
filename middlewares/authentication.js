const jwt = require('jsonwebtoken');
const { User } = require('../models/');

async function authentication(req, res, next) {
    try {
        const authHeader = String(req.headers['authorization'] || '');
        if (authHeader.startsWith('Bearer ')) {
            const access_token = authHeader.substring(7, authHeader.length);
            let decoded = jwt.verify(access_token, process.env.PRIVATE_KEY)
            const result = await User.findOne({
                where: {
                    username: decoded.username
                }
            })
            if(result) {
                req.userId = result.userId
                next()
            } else {
                next({
                    name: "unauthorized",
                    status: 401,
                    message: "Not Found"
                })
            } 
        } else {
            next({
                name: "unauthorized",
                status: 401,
                message: "Bearer Token is required"
            })
        }

    } catch(err) {
        next({
            name: "unauthorized",
            status: 401,
            message: "Unauthorized"
        })
    }

}

module.exports = authentication