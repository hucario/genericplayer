import {
	Extension
} from './extension'

class SampleExtension extends Extension {
	/** @type { Boolean } */
	allowsRatings = true
	/** @type { String } */
	logo = "https://1.gravatar.com/avatar/ab748872b9461554f80c9f1326727984?s=128"
	/** @type { String } */
	name = "Pandora"
	/** @type { Boolean } */
	loggedIn = true
	playlist = []
	history = []
	stations = []
	/** @type { Function[] } */
	setStatesList = []
	/** @type { Function[] } */
	setHistoriesList = []

	constructor() {
		super();
		this.state = {

		}
	}

	/*
	 * Settings segment.
	 * 
	 */

	/**
	 * When the settings page opens, it's going to need to know
	 * all the options to show. This returns those options.
	 */

	settingsPage = {
		saveAs: 'sampleExtension',
		title: 'SampleExtension Settings',
		defaults: {
			httpOnly: true
		},
		setVar: (a,b) => {
			this.settings[a] = b;
		},
		getVar: (a) => {
			return this.settings[a];
		},	
		sections: [
			{
				title: 'General',
				fields: [
					{
						label: 'Only use secured connections',
						sublabel: 'HTTP may be used if HTTPS is unavailable and this is unchecked.',
						type: 'toggle',
						rawName: 'httpOnly'
					}
				]
			}
		]
	}

	/** Stores setting values. */
	settings = {
		httpOnly: true
	}
}

export {
	SampleExtension
}