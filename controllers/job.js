
const axios = require('axios');

class JobController {
    static async getList(req, res, next) {
        try {
            let { data } = await axios ({
                url: "http://dev3.dansmultipro.co.id/api/recruitment/positions.json",
                method: "GET"
            })

            if(req.query.description) {
                let filter = "description";
                let keyword = req.query.description;

                data = data.filter(function(obj) {
                     if(obj[filter].toLowerCase().includes(keyword.toLowerCase())) {
                         return obj
                     }
                });
            } 
             if(req.query.location) {
                let filter = "location";
                let keyword = req.query.location;

                data = data.filter(function(obj) {
                     if(obj[filter].toLowerCase().includes(keyword.toLowerCase())) {
                         return obj
                     }
                });
            } 
            if(req.query.full_time == true) {
                let filter = "full_time";

                data = data.filter(function(obj) {
                     if(obj[filter] == 'Full Time') {
                         return obj
                     }
                });
            } 
            if(req.query.page) {
                const page = parseInt(req.query.page);
                const limit = 10;
                const startIndex = (page - 1) * limit;
                const endIndex = page * limit;
            
                data = data.slice(startIndex, endIndex);
            }
            
            res.status(200).json({
                success: true,
                data
            })
        } catch (error) {
            next(error)
        }
    }

    static async getDetail(req, res, next)
    {
        try {
            let { data } = await axios ({
                url: `http://dev3.dansmultipro.co.id/api/recruitment/positions/${req.params.id}`,
                method: "GET"
            })
            
           res.status(200).json({
                success: true,
                data
           })

        } catch (error) {
            next(error)
        }
    }
}

module.exports = JobController