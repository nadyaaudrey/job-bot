exports.view = function(req, res) {
    res.render('login');
}

exports.check_login = function(req, res) {
    const { Client } = require('pg');
    const client = new Client({
	connectionString: process.env.DATABASE_URL,
	ssl: true,
    });
    
    client.connect();

    var email = request.body.email;
    var password = request.body.pass;

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
