const p = {
	getSettingsPages() {
		let x;
		try {
			x = JSON.parse(localStorage.settingsPages);
		} catch(e) {
			x = {}
		}
		return x;
	},
	getSetting(daemon, key) {
		let x;
		try {
			x = JSON.parse(localStorage.settings);
		} catch(e) {
			x = {};
		}
		return x[daemon]?.[key];
	},
	getAllSettings() {
		let x;
		try {
			x = JSON.parse(localStorage.settings);
		} catch(e) {
			x = {};
		}
		return x;
	},
	setSetting(daemon, key, value) {
		let x;
		try {
			x = JSON.parse(localStorage.settings);
		} catch(e) {
			x = {};
		}
		x[daemon] = x[daemon] ?? {};
		x[daemon][key] = value;
		localStorage.settings = JSON.stringify(x);
		return value;
	}
}
export default p 