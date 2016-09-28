var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.disable('x-powered-by');

var handlebars = require('express-handlebars').create({ 'defaultLayout' : 'main' });
app.engine('handlebars', handlebars.engine);

var port = process.env.PORT || 4000;
var router = express.Router();

// FRONT-END APP
require('./app/routes')(router);

// API
app.use('/api', router);

require('./api/usuarios')(router);

// LISTEN !!
app.listen(port,function(){
	console.log("To rodando na porta...." + port);
});
