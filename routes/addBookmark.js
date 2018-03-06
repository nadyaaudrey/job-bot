exports.bookmark = async function(req, res) {
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
	    res.send({'success': false});
    }
    
    var bookmarks = JSON.parse(await getAsync(user)).bookmarks;
    if(bookmarks.indexOf(req.body.jobid) > -1) {
        const index = bookmarks.indexOf(req.body.jobid);
	if(index !== -1) {
		bookmarks.splice(index, 1);
	}
    }
    else {
	bookmarks.push(req.body.jobid);
    }

    await setAsync(user, JSON.stringify({'bookmarks': bookmarks, 'applications': JSON.parse(await getAsync(user)).applications}));
    client.quit();
    res.send({'success': true});
}
