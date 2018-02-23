exports.view = async function(req, res) {
    
    var https = require('https');

    https.get('https://jobs.github.com/positions.json?page=0', async (resp) => {
	    let data = "";
	    var redis= require("redis"), client = redis.createClient(process.env.REDIS_URL || 6379);
        const {promisify} = require('util');
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
	    resp.on('data', (chunk) => {
		    data += chunk;
	    });

	    resp.on('end', async () => {
		    var jobs = JSON.parse(data);
		    if(logged_in) {
			    var uinfo = await getAsync(user);
			    var bookmarks = JSON.parse(uinfo).bookmarks;
			    console.log(bookmarks);
			    for(job in jobs) {
				    if(bookmarks.indexOf(jobs[job].id) > -1) {
					    console.log(job);
					    jobs[job].Bookmarked = true;
				    }
			    }
		    }
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
    var logged_in = false;
    var user = req.cookies.user
    if(user) {
	    logged_in = true;
	    var userInfo = client.get(user);
	    if(!userInfo) {
		    client.set(user, {'bookmarks': [], 'applications': []});
	    }
    }
    https.get('https://jobs.github.com/positions.json?description=' + search_param + '&page=0', (resp) => {
	    let data = "";
	    
	    resp.on('data', (chunk) => {
		    data += chunk;
	    });

	    resp.on('end', () => {
		    var jobs = JSON.parse(data);
                    if(logged_in) {
			    for(job in jobs) {
				    if(job.id in client.get(user).bookmarks) {
					    job.Bookmarked = true;
				    }
			    }
		    }
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


