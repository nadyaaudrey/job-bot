exports.view = function(req, res) {
    var jobs = require("../jobs.json");
    res.render('appHistory', {jobs});
}