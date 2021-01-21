/*
 *	Background page
 * 	
 */

const IN_DEV = true;
const BG_MP3 = document.getElementById('player')

/**
 * Settings bit
 */

let settingsStore = {
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
		"showLyrics": "true"
	}
}
let settingsPagesStore = {
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
	}
}

let settings = 	{
	getSettingsPages() {
		if (!IN_DEV) {
			return settingsPagesStore;
		}
		var request = new XMLHttpRequest();
		request.open('GET', `http://localhost:8085/settingspages/`, false);  // `false` makes the request synchronous
		request.send(null);
		
		if (request.status === 200) {
			return JSON.parse(request.responseText);
		}
		return null;
	},
	registerSettingsPage(daemon, page) {
		settingsPagesStore[daemon] = page;
	},
	getSetting(daemon, key) {
		if (!IN_DEV) {
			return (settingsStore[daemon] || {})[key];
		}
		// damn I hate using a synchronous xmlhttprequest, fetch is so much better, but...
		// I need a synchronous solution because this is literally only for testing
		var request = new XMLHttpRequest();
		request.open('GET', `http://localhost:8085/setting/${encodeURIComponent(daemon)}/${encodeURIComponent(key)}`, false);  // `false` makes the request synchronous
		request.send(null);
		
		if (request.status === 200) {
			return request.responseText;
		}
		return null;
	},
	setSetting(daemon, key, value) {
		if (!IN_DEV) {
			(settingsStore[daemon] || {})[key] = value;
			return value;
		}
		this.__store.toSet[daemon] = this.__store.toSet[daemon] ?? {}
		this.__store.toSet[daemon][key] = value;
		if (!this.__store.timeouts[daemon]) {
			this.__store.timeouts[daemon] = {}
		}
		if (this.__store.timeouts[daemon][key]) {
			clearTimeout(this.__store.timeouts[daemon][key]);
		}
		this.__store.timeouts[daemon][key] = setTimeout(() => {
			this.__set(daemon, key, this.__store.toSet[daemon][key]);
			delete this.__store.timeouts[daemon][key];
			delete this.__store.toSet[daemon][key];
		}, 1500)
		return value;
	},
	__set(daemon, key, value) {
		if (value == null) {
			return;
		}
		fetch(`http://localhost:8085/setting/${
				encodeURIComponent(daemon)
			}/${
				encodeURIComponent(key)
			}/${
				encodeURIComponent(value)
			}`, {
				method: "POST"
			});
	},
	__store: {
		timeouts: {

		},
		toSet: {

		}
	},
	getAllSettings() {
		if (!IN_DEV) {
			return settingsStore;
		}
		var request = new XMLHttpRequest();
		request.open('GET', `http://localhost:8085/settings/`, false);
		request.send(null);
		
		if (request.status === 200) {
			return JSON.parse(request.responseText);
		}
		return null;
	}
}

/**
 * Settings viewer
 */

var view = new JSONTreeView('settingsStore', settingsStore, null);
view.withRootName = false;

view.expand(true);
document.getElementById('settingsView').appendChild(view.dom);

/**
 * Logs viewer
 */

const logsElem = document.getElementById("logs");

const ogConsole = {
	...console
}
function lPad(a) {
	a = a + ""
	while (a.length < 2) {
		a = "0" + a;
	}
	return a;
}
function logger() {
	let main = document.createElement('div'),
		timestamp = document.createElement('span'),
		x = new Date(),
		content = "",
		contentElem = document.createElement('span');
	timestamp.classList.add('timestamp');
	timestamp.innerText = `${
		x.getFullYear()
	}/${
		lPad(x.getMonth())
	}/${
		lPad(x.getDate())
	} ${
		lPad(x.getHours()%12)
	}:${
		lPad(x.getMinutes())
	}${
		x.getHours()<12?"am":"pm"
	}`;
	for (let i = 0; i < arguments.length; i++) {
		if (typeof arguments[i] === "object") {
			content += JSON.stringify(arguments[i]);
		} else {
			content += arguments[i];
		}
		if (arguments.length > 1 && i < arguments.length-1) {
			content += ", "
		}
	}
	contentElem.innerText = content;
	main.appendChild(timestamp);
	main.appendChild(contentElem);
	logsElem.appendChild(main);
	return main;
}
function log() {
	logger(...arguments);
	ogConsole.log(...arguments);
}
console.log = log;
function err() {
	logger(...arguments).classList.add('error');
	ogConsole.error(...arguments);
}
console.error = err;
function warn() {
	logger(...arguments).classList.add('warning');
	ogConsole.warn(...arguments);
}
console.warn = warn;

console.log('GenericPlayer main started.\nLoading extensions...');