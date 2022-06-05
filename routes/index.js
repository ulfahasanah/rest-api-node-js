const router = require("express").Router()
const UserController = require("../controllers/user")
const JobController = require("../controllers/job")
const authentication = require('../middlewares/authentication');

router.post("/register", UserController.register)

router.post("/login", UserController.login)

router.use(authentication)

router.get("/job/list", JobController.getList)

router.get("/job/detail/:id", JobController.getDetail)

module.exports = router