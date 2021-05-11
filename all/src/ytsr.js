export default async function ytsr(term) {
	let params = {
		part: "snippet",
		maxResults: 25,
		q: term,
		key: process.env.REACT_APP_YTSR_KEY
	}
	let params2 = [];
	for (let key in params) {
		params2.push(encodeURIComponent(key) + "=" + encodeURIComponent(params[key]));
	}
	params2 = params2.join('&');
	let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?${params2}`);
	res = await res.json();
	return res;
}