$(function() {
	// TODO get game IDs from chrome.storage
	var gameIds = [
		'5927633574690816'
	];

	// Get game ID in url
	var regex = /game\/[0-9]{15,}/gi;
	var viewId = window.location.href.match(regex);

	// Check if this game ID is a true dark game
	if (viewId !== null && viewId.length && gameIds.indexOf(viewId[0].replace('game/', '')) >= 0) {
		inject();
	}
});

function inject() {
	alert("woo!");
}
