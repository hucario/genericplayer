function updateRating(songId, newRating) { // placeholder function for now

	return;
}
// @ts-ignore
function settings(key,value) {
	if (typeof value === "undefined") {
		return pog[key];
	}
	pog[key] = value;
	return value;
}
let pog = {
	historyListView: true,
	activeExtension: new PandoraExtension(),
	loggedIn: true,
	inDev: true
}