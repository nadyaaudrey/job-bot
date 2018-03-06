exports.view = async function(req, res) {
        var redis= require("redis"), client = redis.createClient(process.env.REDIS_URL || 6379);
	var axios = require("axios");
	var https = require("https");
        const {promisify} = require('util');
        const getAsync = promisify(client.get).bind(client);
        const setAsync = promisify(client.set).bind(client);
	const getHttpAsync = promisify(https.get);
        var logged_in = false;
        var user = req.cookies.user;
        if(user != undefined) {
	        //console.log(user);
	        logged_in = true;
	        var userInfo = await getAsync(user);
                //console.log(userInfo);
	        if(!userInfo) {
                console.log("Generating user info!");
		        await setAsync(user, JSON.stringify({'bookmarks': [], 'applications': []}));
		        console.log(await getAsync(user));
	        }
        }
	var uinfo = await getAsync(user);
	var uApps = JSON.parse(uinfo).applications;
	var jobs = [];
	var promises = [];
	var statuses = {};
	for(app in uApps) {
	    console.log(app);
	    promises.push(axios('https://jobs.github.com/positions/' + uApps[app].id + '.json'));
	    statuses[uApps[app].id] = uApps[app].status;
            /*await getHttpAsync('https://jobs.github.com/positions/' + uApps[app].id + '.json', (resp) => {
	    let data = "";
	    
	    resp.on('data', (chunk) => {
		    data += chunk;
	    });

	    resp.on('end', async () => {
	        var job = JSON.parse(data);
		job.status = uApps[app].status;
		jobs.push(job);
		console.log(jobs);
	    });
            });
	    console.log("test"); */
	}
	await Promise.all(promises).then(function(values) {
		for(value in values) {
			console.log(value);
			jobs.push(values[value].data);
			jobs[value].status = statuses[jobs[value].id];
		}
		console.log(jobs);
		client.quit();
		res.render('appHistory', {jobs});
	});
	//console.log(jobs);
	//res.render('appHistory', {jobs});
    
    //var jobs = require("../jobs.json");
    //res.render('appHistory', {jobs});
}
