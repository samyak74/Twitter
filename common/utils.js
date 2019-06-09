module.exports = {
    jsonResponse: function(req, res, next) {
        res.json(req.output);
    },
    sortData: function(req, res, next) {
        var sortBy = req.query.order_by || "company_preference";
        var sortType = req.query.sort_type || "asc";
        res.output.output = req.output.output.sort(function(a, b) {
            if (sortType === "desc") return b[sortBy] - a[sortBy];
            else return a[sortBy] - b[sortBy];
        });
        return next();
    }
};