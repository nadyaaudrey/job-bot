exports.view = function(req, res) {
    var job_desc = require("../jobs.json");
    var job_id = req.params.jobid;
    var job = job_desc[job_id]
    res.render('job_desc', {job});
}

