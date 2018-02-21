exports.view = function(req, res) {
    var https = require('https');
    var job_id = req.params.jobid;
    https.get('https://jobs.github.com/positions/' + job_id + '.json', (resp) => {
	    let data = "";
	    
	    resp.on('data', (chunk) => {
		    data += chunk;
	    });

	    resp.on('end', () => {
		    var job = JSON.parse(data);
		    console.log(job);
		    res.render('job_desc', {job});
	    });
    }).on("error", (err) => {
	    console.log("Error: " + err.message);
    });
	/*
    var redis= require("redis"), client = redis.createClient(process.env.REDIS_URL || 6379);
    var job_desc = client.get('jobs');
    if(job_desc === false) {
	    job_desc = require("../jobs.json");
	    client.set("jobs", job_desc);
    }
    var job_id = req.params.jobid;
    var job = job_desc[job_id]
    res.render('job_desc', {job});
	*/
}

