const Express = require('express');

const app = Express();

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
let settings = {}

app.listen(8085, () => {
	console.log("started");
})

app.get('/', (req, res) => {
	res.send(`
		<!DOCTYPE html>
		<html>
			<head>
				<title>settingsprovider</title>
			</head>
			<body>
				<h1>hey what is this?</h1>
				<p>this is a development settings provider.<br>
				due to the fact that localstorage doesn't work between ports (rightfully),<br>
				I have to have some way for the different react apps to communicate.<br>
				this is that.
				</p>
				<h2>current settings stored:</h2>
				<pre>${JSON.stringify(settings)}</pre>
			</body>
		</html>
	`)
})

app.get('/setting/:daemon/:key/', (req, res) => {
	res.status(200);
	console.log(req.params)
	console.log(settings)
	console.log(settings[req.params.daemon], req.params.daemon)
	console.log(settings[req.params.daemon][req.params.key])
	res.send((settings[req.params.daemon] && settings[req.params.daemon][req.params.key]) || "undefined")
})

app.post('/setting/:daemon/:key/:value', (req, res) => {
	res.status(200);
	if (!settings[req.params.daemon]) {
		settings[req.params.daemon] = {}
		settings[req.params.daemon][req.params.key] = req.params.value;
	} else {
		settings[req.params.daemon][req.params.key] = req.params.value;
	}
	res.send(JSON.stringify(settings[req.params.daemon][req.params.key]) || "undefined");
})

app.get('/settings/', (req, res) => {
	console.log(settings);
	res.send(settings);
});