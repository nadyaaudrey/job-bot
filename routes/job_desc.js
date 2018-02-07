exports.view = function(req, res) {
    var job_desc = require("../job_desc.json");
    res.render('job_desc', {job_desc});
}

