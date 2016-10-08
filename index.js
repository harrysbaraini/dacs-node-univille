var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.disable('x-powered-by');

var handlebars = require('express-handlebars').create({ 'defaultLayout' : 'main' });
app.engine('handlebars', handlebars.engine);

var port = process.env.PORT || 4000;
var apiRouter = express.Router();
var appRouter = express.Router();

// FRONT-END APP
app.use(express.static(__dirname + '/app/public'));
app.use('/', appRouter);
require('./app/routes')(appRouter);

// API
app.use('/api', apiRouter);
require('./api/clientes')(apiRouter);

// LISTEN !!
app.listen(port,function(){
	console.log("To rodando na porta...." + port);
});
