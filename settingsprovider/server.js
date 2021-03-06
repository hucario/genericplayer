const Express = require('express');

const app = Express();

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
let settings = {
	"popup": {
		"blurredAlbumBackground": "true",
		"background": "#ffffff",
		"background-floating": "#ededed",
		"background-floating-higher": "#c2c2c2",
		"text-color": "#000000",
		"text-muted": "#383838",
		"hint-icon-color": "#ffc23d",
		"icon-color": "#000000",
		"active-icon-color": "#e6bf00",
		"accent-color": "#1dc98f",
		"height": "580px",
		"width": "500px",
		"font-size": "16px"
	},
	"settings": {
		"extSelect": "sampleExtension",
		"showLyrics": "true"
	},
	"sampleExtension": {
		"doPlay": "true",
		"doRandom": "true"
	},
	"pandoraExtension": {
		"httpsOnly": "true",
		"historyLength": "20"
	}
},
	settingsPages = {
		popup: {
			title: 'Popup Settings',
			showReq: true,
			defaults: {
				blurredAlbumBackground: true,
				background: "#ffffff",
				"background-floating": "#ededed",
				"background-floating-higher": "#c2c2c2",
				"text-color": "#000000",
				"text-muted": "#383838",
				"hint-icon-color": "#ffc23d",
				"icon-color": "#000000",
				"active-icon-color": "#e6bf00",
				"accent-color": "#1dc98f",
				height: "580px",
				width: "500px",
				"font-size": "16px"
			},
			sections: [
				{
					title: 'Colors',
					fields: [
						{
							label: 'Blurred album background',
							sublabel: 'Puts a blurred album cover behind the player pane.',
							type: 'toggle',
							rawName: 'blurredAlbumBackground'
						},
						{
							label: 'Background color',
							sublabel: 'Color of the background of the player.',
							type: 'color',
							rawName: 'background'
						},
						{
							label: 'Secondary background color',
							sublabel: 'For inner components.',
							type: 'color',
							rawName: 'background-floating'
						},
						{
							label: 'Tertiary background color',
							sublabel: 'For components inside components.',
							type: 'color',
							rawName: 'background-floating-higher'
						},
						{
							label: 'Accent color',
							sublabel: 'The spice of life. Also the color of the seek and volume bar, among other things.',
							type: 'color',
							rawName: 'accent-color'
						},
						{
							label: 'Active icon color',
							sublabel: 'Shows when a button is active, e.g. the like button on a liked song.',
							type: 'color',
							rawName: 'active-icon-color'
						},
						{
							label: 'Inactive icon color',
							sublabel: 'Shows when a button is inactive, e.g. the dislike button on a liked song.',
							type: 'color',
							rawName: 'icon-color'
						},
						{
							label: 'Hint icon color',
							sublabel: 'Shows when a button is being hovered on.',
							type: 'color',
							rawName: 'hint-icon-color'
						},
						{
							label: 'Text color',
							sublabel: 'For normal text.',
							type: 'color',
							rawName: 'text-color'
						},
						{
							label: 'Muted text color',
							sublabel: 'For less important text.',
							type: 'color',
							rawName: 'text-muted'
						}
					]
				},
				{
					title: 'Sizings',
					fields: [
						{
							label: 'Player height',
							sublabel: 'Due to limitations placed by Chrome, the max height is 580px.',
							type: 'px',
							rawName: 'height',
							min:"100",
							max:"580"
						},
						{
							label: 'Player width',
							sublabel: 'This probably shouldn\'t be under 300px.',
							type: 'px',
							rawName: 'width',
							min:"100",
						},
						{
							label: 'Font size',
							sublabel: 'The default size of text',
							type: 'px',
							rawName: 'font-size',
							min:"1",
							max:"50"
						},
					]
				}
			]
		},
		"settings": {
			title: 'GenericPlayer',
			showReq: true,
			defaults: {
				"extSelect": "sampleExtension",
				"showLyrics": "true"
			},
			sections: [
				{
					fields: [
						{
							label: 'Streaming service',
							sublabel: 'Which streaming service to play from.',
							type: 'select',
							options: [
							{ value: 'sampleExtension', label: 'Sample Extension' },
							{ value: 'pandoraExtension', label: 'Pandora' },
							],
							rawName: 'extSelect'
						},
						{
							label: 'Show lyrics',
							sublabel: 'Attempt to show lyrics. This would send your listening information to Genius.',
							type: 'toggle',
							rawName: 'showLyrics'
						}
					]
				}
			]
		},
		"sampleExtension": {
			title: 'SampleExtension Settings',
			showReq: [
				'settings',
				'extSelect',
				'sampleExtension'
			],
			defaults: {
				httpsOnly: true,
				historyLength: 20
			},
			sections: [
				{
					title: 'General',
					fields: [
						{
							label: 'Play on open',
							sublabel: 'When player page is opened, have player... playing.',
							type: 'toggle',
							rawName: 'doPlay'
						},
						{
							label: 'Play a random song',
							sublabel: 'do prepRandom()',
							type: 'toggle',
							rawName: 'doRandom'
						}
					]
				}
			]
		},
		"pandoraExtension": {
			title: 'Pandora Settings',
			showReq: [
				'settings',
				'extSelect',
				'pandoraExtension'	
			],
			defaults: {
				httpsOnly: true,
				historyLength: 20
			},
			sections: [
				{
					fields: [
						{
							label: 'Play ads',
							sublabel: 'We hate ads too, which is why this is off by default - but if you don\'t mind too much, please turn this on to support the artists you love <3',
							type: 'toggle',
							rawName: 'playAds'
						},
						{
							label: 'Only use secured connections',
							sublabel: 'HTTP may be used if HTTPS is unavailable and this is unchecked.',
							type: 'toggle',
							rawName: 'httpsOnly'
						},
						{
							label: 'History length',
							sublabel: 'Amount of songs to keep in history.',
							type: 'number',
							rawName: 'historyLength',
							min: 0,
							max: 999
						},
						
					]
				}
			]
		}
	}

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
						color: transparent;
						padding: 2em 2em;
						font-weight: bold;
						border-radius: 1em;
						box-sizing: border-box;
						margin: 0;
						${req.query.trim?`height: 100%;
						width: 100%;
						overflow-x: hidden;
						overflow-y: auto;`:''}
					}
					
					body {
						font-family: system-ui;
						width: 100%;
						height: 100%;
						background: black;
						color: white;
						box-sizing: border-box;
						padding: 1em;
						margin: 0;
						width: 100vw;
						height: 100vh;${req.query.fontSize?`
						font-size: ${req.query.fontSize}px;`:''}
					}
					html {
						padding: 0;
						margin: 0;
					}
					code.hljs {
						background: unset;
						width: 100%;
						padding: 0;
						margin: 0;
						height: unset;
						overflow: hidden;
						animation: fadeIn 500ms;
					}
					@keyframes fadeIn {
						0% {
							opacity: 0;
						}
						100% {
							opacity: 1;
						}
					}
				</style>
			</head>
			<body>
				${req.query.trim?``:`<h1>hey what is this?</h1>
				<p>this is a development settings provider.<br>
				due to the fact that localstorage doesn't work between ports (rightfully),<br>
				I have to have some way for the different react apps to communicate.<br>
				this is that.
				</p>
				<h2>current settings stored:</h2>`}
				<pre><code>${b.join('<br>')}</code></pre>
				<link rel="stylesheet"
      href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.4.1/styles/atom-one-dark.min.css">
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.4.1/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>
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

app.get('/settingspages/', (req, res) => {
	res.header('Content-Type', 'application/json');
	res.send(settingsPages)
})
