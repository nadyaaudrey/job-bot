exports.view = function(req, res) {
    var redis= require("redis"), client = redis.createClient(process.env.REDIS_URL || 6379);
    var jobs = client.get('jobs');
    if(jobs === false) {
	    jobs = require("../jobs.json");
	    client.set("jobs", jobs);
    }
    var bookmarkStatus = jobs[req.params.jobid]["Bookmarked"];
    jobs[req.params.jobid]["Bookmarked"] = !bookmarkStatus;
    client.set('jobs', jobs);
    if(req.params.prevPage === "index") {
        res.redirect('/');
    }
    else {
	var job = jobs[req.params.jobid];
	res.redirect('/job_desc/' + req.params.jobid);
    }
}
