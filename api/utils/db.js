var mysql      = require('mysql');

function dbconnection () {
	var connection = mysql.createConnection({
		host: '127.0.0.1',
		port: 33060,
		user: 'dacs',
		password: 'dacs',
		database: 'dacs'
	});

	connection.connect(function(err){
		if(err) {
			console.log("ERRO!!!" + err);
		}
	});

	return connection;
}

module.exports = dbconnection();
