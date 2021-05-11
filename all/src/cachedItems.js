import store from './redux/store';
import { 
	setCachedReq, 
	setCachedItem as sCIRedux,
	setCachedSearch as sCSRedux
} from './redux/actions'

export async function cachedFetch(url, options = {}) {
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
export function cachedItem(id) {
	return store.getState().cachedItems[id];
}
export function setCachedItem(payload) {
	store.dispatch(sCIRedux(payload))
	return payload;
}

export async function cachedSearch(term) {
	const results = store.getState().cachedSearches[term];
	if (results) {
		return results;
	}
	let yea = await fetch("https://www.pandora.com/api/v3/sod/search", {
		headers: {
			"content-type": "application/json"
		},
		"body": "{\"query\":\""+term+"\",\"types\":[\"AL\",\"AR\",\"CO\",\"TR\",\"SF\",\"PL\",\"ST\",\"PE\"],\"listener\":null,\"start\":0,\"count\":30,\"annotate\":true,\"searchTime\":0,\"annotationRecipe\":\"CLASS_OF_2019\"}",
		"method": "POST",
	});
	yea = await yea.json();
	let m = [];
	yea.results && yea.results.forEach(e => {
		m.push(yea.annotations[e]);
	})
	store.dispatch(sCSRedux({
		term,
		results: m
	}));
	return m;
}

window.cachedStuff = {
	cachedFetch,
	cachedItem,
	setCachedItem,
	cachedSearch,
	store
};