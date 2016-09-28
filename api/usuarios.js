var db = require('./utils/db');

module.exports = function(router) {

  /**
  * GET /usuarios
  */
  router.get('/usuarios', function (req, res) {
  	var querystr = 'select * from cliente';

  	db.query(querystr, function (err, rows, fields) {
  		if (err) throw err;

  		res.status(200);
  		res.json({
  			data: rows,
  			length: rows.length
  		});
  	});
  });

  /**
  * GET /usuarios/:id
  */
  router.get('/usuarios/:id', function (req, res) {
  	var querystr = 'select * from cliente where oid = ' + req.params.id;

  	db.query(querystr, function (err, rows, fields) {
  		if (err) throw err;

  		var status = 404;
  		var response = null;

  		if (rows.length) {
  			status = 200;
  			response = {
  				data: rows[0]
  			};
  		}

  		res.status(200);
  		res.json({
  			data: rows,
  			length: rows.length
  		});
  	});
  });

  router.post('/usuarios',function (req, res) {
  	var values = [ "'" + req.body.nome + "'", "'" + req.body.endereco + "'", "'" + req.body.email + "'" ];
  	var querystr = "insert into cliente (NOME, ENDERECO, EMAIL) values(" + values.join(', ') + ")";

  	db.query(querystr, function (err, rows, fields) {
  		if (err) throw err;

  		res.status(200);
  		res.json({
  			data: rows
  		});
  	});
  });

  router.put('/usuarios/:id',function (req, res) {
  	var values = [];
  	for (var p in req.body) {
  		values.push(p + " = '" + req.body[p] + "'");
  	};

  	var querystr = "UPDATE cliente SET " + values.join(', ') + " WHERE oid = " + req.params.id;

  	db.query(querystr, function (err, rows, fields) {
  		if (err) throw err;

  		res.status(200);
  		res.json({
  			data: rows
  		});
  	});
  });

}
