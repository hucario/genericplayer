function updateRating(songId, newRating) { // placeholder function for now

	return;
}
// @ts-ignore
function settings(key,value) {
	if (!value) {
		return pog[key];
	}
	pog[key] = value;
	return value;
}
var pog = {
	historyListView: true,
	activeExtension: new PandoraExtension(),
	loggedIn: false
}