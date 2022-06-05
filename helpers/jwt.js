const jwt = require('jsonwebtoken')

class Jwt {
    static generateToken(payload) {
        return jwt.sign(payload, process.env.PRIVATE_KEY, {
            expiresIn: '10h'
       })
    }
}

module.exports = Jwt