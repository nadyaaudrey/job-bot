exports.view = function(req, res) {
    res.render('login');
}

exports.check_login = function(req, res) {
    const { Client } = require('pg');
    var dbString = "postgres://kkhlblwfxlsomu:64e7ceb13ab96abb7f43092a9f28416916a8e601fa7376023bf47231df08ac01@ec2-184-73-202-79.compute-1.amazonaws.com:5432/d829ct2999j86l"
    console.log(process.env.DATABASE_URL);
    const client = new Client({
	connectionString: dbString,
	ssl: true,
    });
    
    client.connect();

    var email = req.body.email;
    var password = req.body.pass;

    var queryString = "SELECT email FROM users WHERE email = '" + email + "' AND password = '" + password + "';";
    
    client.query(queryString, (err, res) => {
        if(err) throw err;
        if(res.rows.length == 0) {
               res.json({'login_status': 'false'});
        }
        else {
               res.json({'login_status': 'true'});
        } 
    });

    client.end();

}
