const { User } = require('../models/');
const checkPass = require('../helpers/hashPassword')
const Jwt = require('../helpers/jwt')

class UserController {
    static async register(req, res, next) {
        try {
            let { username, password } = req.body
            const result = await User.create({
                username,
                password
            })
           
            res.status(201).json({
                success: true,
                message: {
                    id: result.id,
                    username: result.username,
                    password: result.password
                }
            })

        } catch (error) {
            if (error.name) {
                return res.status(400).json({
                  success: false,
                  message: error.errors.map(e => e.message)
                })
            } else {
                next(error)
            }
        }
    }
    

    static async login(req, res, next) {
        let { username, password } = req.body
        try {
            const result = await User.findOne({
                where: {
                    username
                }
            })

            if(!result) {
                next({
                    name: "not found",
                    status: 404,
                    message: "Invalid username"
                })
            }

            password = checkPass.comparePassword(password, result.password)
            if(password) {
                let access_token = Jwt.generateToken({
                    id: result.id,
                    username: result.username
                })
                res.status(200).json({
                    success: true,
                    access_token
                })
            } else {
                next({
                    name: "not found",
                    status: 404,
                    message: "Invalid password"
                })
            }
            
        } catch (error) {
            next(error)
        }
    }
}



module.exports = UserController