if(process.env.NODE_ENV === "development") {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT
const router = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

app.use(cors())

app.use(express.urlencoded({
    extended: false
}))

app.use(express.json())

app.use(router)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})
