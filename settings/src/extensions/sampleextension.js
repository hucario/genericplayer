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
		title: 'SampleExtension Settings',
		showReq: (settings) => {
			if (!settings.settings) {
				return false;
			}
			return (settings.settings.extSelect === "sampleExtension")
		},
		defaults: {
			httpOnly: false,
			doPlay: true,
			doRandom: true
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
	}

	/** Stores setting values. */
	settings = {}
}

export {
	SampleExtension
}