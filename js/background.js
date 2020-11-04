function updateRating(songId, newRating) { // placeholder function for now

	return;
}
// @ts-ignore
function settings(key,value) {
	console.log(key, value)
	if (typeof value === "undefined") {
		return pog[key];
	}
	console.log(pog);
	pog[key] = value;
	console.log(pog)
	return value;
}
let pog = {
	historyListView: true,
	activeExtension: new SampleExtension(),
	loggedIn: true,
	inDev: true
}