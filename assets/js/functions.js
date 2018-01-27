/**
 * Set true dark to be true or false.
 *
 * @param {boolean} bool Boolean to set true dark.
 * @return {void}
 */
function setTrueDarkMode(bool) {
	chrome.storage.sync.get('np_true_dark', function(data) {
		var games = data['np_true_dark'];
		games[getGameId()] = bool;
		window.trueDarkMode = bool;
		chrome.storage.sync.set({'np_true_dark': games}, function() {
			// Do nothing
		});
	});
}

/**
 * Loop and set the window variable for the dark mode setting every second.
 *
 * @return {void}
 */
async function trueDarkModeLoop() {
	setTimeout(function() {
		chrome.storage.sync.get('np_true_dark', function(data) {
			var games = data['np_true_dark'];
			var bool = games[getGameId()] != undefined && games[getGameId()];
			window.trueDarkMode = bool;
		});
		trueDarkModeLoop();
	}, 1000);
}

/**
 * Gets the game id from the URL.
 *
 * @return {string} The game id string.
 */
function getGameId() {
	var regex = /game\/[0-9]{15,}/gi;
	var viewIds = window.location.href.match(regex);

	if (viewIds == null || viewIds.length == 0) {
		return null;
	}

	return viewIds[0].replace('game/', '');
}

/**
 * Hides intel data on the intel panel.
 *
 * @return {void}
 */
function hideIntelData() {
	$( "div.button_text:contains('None')").parent().parent().remove();
}
