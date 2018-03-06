exports.view = async function(req, res) {
    var https = require('https');
    const {promisify} = require('util');
var redis= require("redis"), client = redis.createClient(process.env.REDIS_URL || 6379);
    const getAsync = promisify(client.get).bind(client);
    const setAsync = promisify(client.set).bind(client);
    var logged_in = false;
    var user = req.cookies.user;
    if(user != undefined) {
        console.log(user);
        logged_in = true;
        var userInfo = await getAsync(user);
        console.log(userInfo);
        if(!userInfo) {
            console.log("Generating user info!");
            await setAsync(user, JSON.stringify({'bookmarks': [], 'applications': []}));
            console.log(await getAsync(user));
        }
    }
    var job_id = req.params.jobid;
    https.get('https://jobs.github.com/positions/' + job_id + '.json', (resp) => {
	    let data = "";
	    
	    resp.on('data', (chunk) => {
		    data += chunk;
	    });

	    resp.on('end', async () => {
	        var job = JSON.parse(data);
            if(logged_in) {
	        var uinfo = await getAsync(user);
	        var bookmarks = JSON.parse(uinfo).bookmarks;
	        console.log(bookmarks);
		if(bookmarks.indexOf(job.id) > -1) {
			job.Bookmarked = true;
		}
	    }
		    console.log(job.job_url);
		    client.quit();
		    res.render('job_desc', {job});
	    });
    }).on("error", (err) => {
	    client.quit();
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

