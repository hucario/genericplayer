import settingsProvider from './settingsProvider'
import PandoraExtension from './common/extensions/pandoraextension';

let asdf2 = new PandoraExtension();

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
