module.exports = (err, req, res, next) => {
    switch(err.name) {
        case "unauthorized":
            res.status(err.status).json({
                success: false,
                message: err.message
            })
        break;
        case "not found":
            res.status(err.status).json({
                success: false,
                message: err.message
            })
        break;
        case "bad request":
            res.status(err.status).json({
                success: false,
                message: err.message
            })
        break;
        default:
            res.status(err.status || 500).json({
                success: false,
                message: err.message || "Internal Server Error"
            })
        break;
    }
}