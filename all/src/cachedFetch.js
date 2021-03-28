import store from './redux/store';
import { setCachedReq } from './redux/actions'

export default async function cachedFetch(url, options = {}) {
	// this is very inefficient with memory :sunglasses:
	// it encodes the entire request details for every request into the json
	// what a mess
	const state = store.getState();
	if (state.cachedReqs[url] && state.cachedReqs[url][JSON.stringify(options)]) {
		return state.cachedReqs[url][JSON.stringify(options)];
	} else {
		let x = await fetch(url, options);
		x = await x.text();
		store.dispatch(setCachedReq({
			url: url,
			options: options,
			result: x
		}))
		return x;
	}
}