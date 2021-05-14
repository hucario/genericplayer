export default async function ytsr(term: string): Promise<any> {
	let params: {
		part: string,
		maxResults: number,
		q: string,
		key: string | undefined,
		[key: string]: string | number | undefined
	} = {
		part: "snippet",
		maxResults: 25,
		q: term,
		key: process.env.REACT_APP_YTSR_KEY,
	}
	let params2: string[] | string = [];
	for (let key in params) {
		// @ts-ignore
		params2.push(encodeURIComponent(key) + "=" + encodeURIComponent(params[key]));
	}
	params2 = params2.join('&');
	let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?${params2}`);
	res = await res.json();
	return res;
}