exports.view = function(req, res) {
    var jobs = require("../jobs.json");
    var fs = require('fs');
    var bookmarkStatus = jobs[req.params.jobid]["Bookmarked"];
    jobs[req.params.jobid]["Bookmarked"] = !bookmarkStatus;
    fs.writeFile("../jobs.json", JSON.stringify(jobs));
    if(req.params.prevPage === "index") {
        res.redirect('/');
    }
    else {
	var job = jobs[req.params.jobid];
	res.redirect('/job_desc/' + req.params.jobid);
    }
}
