module.exports = {
    //Forwarding the response in json format
    jsonResponse: function(req, res, next) {
        res.json(req.output);
    },
    //Basic validation of input whether the required keys are present
    validate : function(req, res, next){
        var obj = req.body
        if(Object.keys(obj).length === 0){
            obj = req.query
        }
        Object.keys(obj).forEach(function(key){
            if (obj[key] === null || obj[key] === ''){
                return next(new Error("Invalid Input"))
            }
        })
        return next()
    }
};