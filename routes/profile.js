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
	if(logged_in) {
		console.log(req.cookies.name);
		console.log(req.cookies.profile_pic);
		client.quit();
		res.render('profile', {'name': req.cookies.name, 'img': req.cookies.profile_pic});
	}
	else {
		client.quit();
		res.render('profile', {'name': 'Your Name Here', 'img': 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'});
	}
}
