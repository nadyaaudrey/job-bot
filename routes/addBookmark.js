exports.view = async function(req, res) {
    var user = req.cookies.user
    var logged_in = false;
    var redis= require("redis"), client = redis.createClient(process.env.REDIS_URL || 6379);
    const {promisify} = require('util');
    const getAsync = promisify(client.get).bind(client);
    const setAsync = promisify(client.set).bind(client);
    if(user) {
	    logged_in = true;
	    var userInfo = await getAsync(user);
	    console.log(userInfo);
	    if(!userInfo) {
		    console.log("Generating user info!");
		    await setAsync(user, JSON.stringify({'bookmarks': [], 'applications': []}));
	    }
    }
    else {
        if(req.params.prevPage === "index") {
            res.redirect('/');
        }
        else {
	    var job = jobs[req.params.jobid];
	    res.redirect('/job_desc/' + req.params.jobid);
        }
    }
    
    var bookmarks = JSON.parse(await getAsync(user)).bookmarks;
    if(bookmarks.indexOf(req.params.jobid) > -1) {
        const index = bookmarks.indexOf(req.params.jobid);
	if(index !== -1) {
		bookmarks.splice(index, 1);
	}
    }
    else {
	bookmarks.push(req.params.jobid);
    }

    await setAsync(user, JSON.stringify({'bookmarks': bookmarks, 'applications': JSON.parse(await getAsync(user)).applications}));

    if(req.params.prevPage === "index") {
        res.redirect('/');
    }
    else {
	res.redirect('/job_desc/' + req.params.jobid);
    }
}
