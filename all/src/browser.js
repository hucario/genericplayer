import settingsProvider from './settingsProvider'
import PandoraExtension from './common/extensions/pandoraextension';
import SampleExtension from './oldext/sampleextension';
import YoutubeExtension from './common/extensions/youtubeextension';

let asdf = {
	sampleextension: SampleExtension,
	pandoraextension:PandoraExtension,
	youtubeextension:YoutubeExtension
};
let asdf2 = new (asdf[
	(settingsProvider.getSetting('settings', 'extSelect') || '').toLowerCase()
] || SampleExtension)();

const faker = {
	extension: {
		getBackgroundPage: () => {
			return {
				getActiveExtension() {
					return asdf2;
				},
				settings: settingsProvider
			}
		}
	}
}

//export default ((window.chrome.extension?window.chrome:undefined) || window.browser || faker);
export default faker;