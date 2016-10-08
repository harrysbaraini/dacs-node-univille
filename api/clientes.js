var db = require('./utils/db');

module.exports = function(router) {

  /**
  * GET /clientes
  */
  router.get('/clientes', function (req, res) {
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
  * GET /clientes/:id
  */
  router.get('/clientes/:id', function (req, res) {
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

  router.post('/clientes',function (req, res) {
  	var values = [ "'" + req.body.NOME + "'", "'" + req.body.ENDERECO + "'", "'" + req.body.EMAIL + "'" ];
  	var querystr = "insert into cliente (NOME, ENDERECO, EMAIL) values(" + values.join(', ') + ")";

  	db.query(querystr, function (err, rows, fields) {
  		if (err) throw err;

  		res.status(200);
  		res.json({
  			data: rows
  		});
  	});
  });

  router.put('/clientes/:id',function (req, res) {
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

  router.delete('/clientes/:id',function (req, res) {
  	var querystr = "DELETE FROM cliente WHERE OID = " + req.params.id;

  	db.query(querystr, function (err, rows, fields) {
  		if (err) throw err;

  		res.status(204);
  		res.json({});
  	});
  });

}
