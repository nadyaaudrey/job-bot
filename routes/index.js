exports.view = function(req, res) {
    var redis= require("redis"), client = redis.createClient(process.env.REDIS_URL || 6379);
    var jobs = client.get('jobs');
    console.log(jobs);
    if(jobs === false) {
	    jobs = require("../jobs.json");
	    client.set("jobs", jobs);
    }
    res.render('index', {jobs});
}


