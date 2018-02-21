exports.view = function(req, res) {
    var redis= require("redis"), client = redis.createClient(process.env.REDIS_URL || 6379);
    var https = require('https');
    https.get('https://jobs.github.com/positions.json?page=0', (resp) => {
	    let data = "";
	    
	    resp.on('data', (chunk) => {
		    data += chunk;
	    });

	    resp.on('end', () => {
		    var jobs = JSON.parse(data);
		    res.render('index', {jobs});
	    });
    }).on("error", (err) => {
	    console.log("Error: " + err.message);
    });
}
exports.view_search = function(req, res) {
    var redis= require("redis"), client = redis.createClient(process.env.REDIS_URL || 6379);
    var search_param = req.params.search_param;
    var https = require('https');
    https.get('https://jobs.github.com/positions.json?description=' + search_param + '&page=0', (resp) => {
	    let data = "";
	    
	    resp.on('data', (chunk) => {
		    data += chunk;
	    });

	    resp.on('end', () => {
		    var jobs = JSON.parse(data);
		    res.render('index', {jobs});
	    });
    }).on("error", (err) => {
	    console.log("Error: " + err.message);
    });
}

	/*
    var jobs = client.get('jobs');
    console.log(jobs);
    if(jobs === false) {
	    jobs = require("../jobs.json");
	    client.set("jobs", jobs);
    }
    res.render('index', {jobs});
}
	*/


