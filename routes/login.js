exports.view = function(req, res) {
    res.render('login');
}

exports.check_login = function(req, res) {
    const { Client } = require('pg');
    console.log("checking login!");
    var dbString = "postgres://kkhlblwfxlsomu:64e7ceb13ab96abb7f43092a9f28416916a8e601fa7376023bf47231df08ac01@ec2-184-73-202-79.compute-1.amazonaws.com:5432/d829ct2999j86l";
    const client = new Client({
	connectionString: dbString,
	ssl: true,
    });
    
    client.connect();
    console.log("Client connected!"); 
    var email = req.body.email;
    var password = req.body.pass;
    const query = {
	    text: "SELECT email FROM users WHERE email = $1 AND password = $2",
	    values: [email, password],
    }
    var login_status = false;
    
    client.query(query, (err, response) => {
        if(err) throw err;
	console.log(response.rows.length);
	console.log(response.rows);
        if(res.rows.length == 0) {
		res.json({'login_status': false});	
        }
        else {
		res.json({'login_status': true});
        }

        client.end();
    });

    //console.log(login_status);

    //res.json({'login_status': login_status});

    console.log("Query made!");


}
