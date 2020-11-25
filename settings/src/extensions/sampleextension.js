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

	settingsPage = [{
		title: 'Gaming'
	}]
}

export {
	SampleExtension
}