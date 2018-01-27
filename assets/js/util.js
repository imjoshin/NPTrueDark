/**
 * Get all elements of a selector based on inner HTML.
 *
 * @param {string} select Selector to use.
 * @param {string} html The innerHtml to search for.
 * @returns {array} An array of elements.
 */
function getElementsByInnerHtml(selector, html) {
	var ret = [];

	$(selector).each(function(key, element) {
		if ($(element).text() == html) {
			ret.push(element);
		}
	});

	return ret;
}

/**
 * Set true dark to be true or false.
 *
 * @param {boolean} bool Boolean to set true dark.
 * @returns {void}
 */
function setTrueDarkMode(bool) {
	chrome.storage.sync.get('np_true_dark', function(data) {
		var games = data['np_true_dark'];
		games[getGameId()] = bool;
		console.log(games);
		chrome.storage.sync.set({'np_true_dark': games}, function() {
			// Do nothing
			console.log("Set to " + bool);
		});
	});
}

/**
 * Get true dark setting.
 *
 * @param {function} callback The function to pass the dark mode setting into.
 * @returns {void} Whether or not true dark is set.
 */
async function getTrueDarkMode(callback) {
	chrome.storage.sync.get('np_true_dark', function(data) {
		var games = data['np_true_dark'];
		var bool = games[getGameId()] != undefined && games[getGameId()];
		callback(bool);
	});
}

/**
 * Gets the game id from the URL.
 *
 * @returns {string} The game id string.
 */
function getGameId() {
	var regex = /game\/[0-9]{15,}/gi;
	var viewIds = window.location.href.match(regex);

	if (viewIds == null || viewIds.length == 0) {
		return null;
	}

	return viewIds[0].replace('game/', '');
}
