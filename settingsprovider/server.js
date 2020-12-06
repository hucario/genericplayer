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
	// behold! a mess of a json formatter!
	let a = JSON.stringify(settings)
			.replace(/{/g, "{\n")
			.replace(/\,/g, ",\n")
			.replace(/}/g, "\n}")
			.replace(/:/g, ": ")
			.replace(/\[/g, "[\n")
			.replace(/\]/g, "\n]")
		,
		tabLevel = 0;
	let b = a.split('\n');
	for (let i = 0; i < b.length; i++) {
		for (let c = 0; c < tabLevel; c++) {
			b[i] = "\t" + b[i];
		}
		if (
			b[i].trim()[0] === "{" || 
			b[i].trim()[b[i].trim().length-1] === "{" ||
			b[i].trim()[b[i].trim().length-1] === "[" ||
			b[i].trim()[0] === "["
		) {
			tabLevel++;
		} else if (
			b[i].trim()[b[i].trim().length-1] === "}" || 
			b[i].trim()[b[i].trim().length-2] === "}" ||
			b[i].trim()[b[i].trim().length-1] === "]" || 
			b[i].trim()[b[i].trim().length-2] === "]"
		) {
			tabLevel--;
			b[i] = b[i].substring(1);
		}
	}

	res.send(`
		<!DOCTYPE html>
		<html>
			<head>
				<title>settingsprovider</title>
				<style>
					pre {
						background: #313131;
						color: #76ffe6;
						padding: 2em 2em;
						font-weight: bold;
						border-radius: 1em;
					}
					
					body {
						font-family: system-ui;
						width: 100%;
						height: 100%;
						background: black;
						color: white;
						box-sizing: border-box;
						padding: 2em;
					}
				</style>
			</head>
			<body>
				<h1>hey what is this?</h1>
				<p>this is a development settings provider.<br>
				due to the fact that localstorage doesn't work between ports (rightfully),<br>
				I have to have some way for the different react apps to communicate.<br>
				this is that.
				</p>
				<h2>current settings stored:</h2>
				<pre>${b.join('<br>')}</pre>
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
	res.header('Content-Type', 'application/json');
	res.send(settings);
});