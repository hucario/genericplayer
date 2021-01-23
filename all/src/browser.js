import settingsProvider from './settingsProvider'
import PandoraExtension from './common/extensions/pandoraextension';
import SampleExtension from './common/extensions/sampleextension';



let asdf2 = new ({
	sampleextension: SampleExtension,
	pandoraextension:PandoraExtension
}[
	(settingsProvider.getSetting('settings', 'extselect') || '').toLowerCase()
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

export default (window.chrome || window.browser || faker);
