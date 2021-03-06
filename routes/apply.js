exports.view = async function(req, res) {
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
        else {
	    res.redirect(req.body.joburl);
	}
	console.log("test");
	console.log(req.body.joburl);
	var uinfo = await getAsync(user);
	var uApps = JSON.parse(uinfo).applications;
	if(uApps.indexOf(req.body.jobid) == -1) {
	    uApps.push({'id': req.body.jobid, 'status': 'pending'});
	    await setAsync(user, JSON.stringify({'bookmarks': JSON.parse(uinfo).bookmarks, 'applications': uApps}));
	}
	client.quit();
	res.end('Success!');

	res.redirect(req.body.joburl);
}
