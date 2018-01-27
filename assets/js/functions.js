/**
 * Waits for an element to be rendered to the DOM.
 *
 * @return {void}
 */
function waitForLoad(selector, exitFunction) {
	setTimeout(
		function() {
			if ($(selector).length == 0) {
				waitForLoad(selector, exitFunction);
			} else {
				exitFunction();
			}
		},
		200
	);
}

/**
 * Set true dark to be true or false.
 *
 * @param {boolean} bool Boolean to set true dark.
 * @return {void}
 */
function setTrueDarkMode(bool) {
	chrome.storage.sync.get('np_true_dark', function(data) {
		var games = data['np_true_dark'];
		games[getGameId()]  = bool;
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
      if (games != undefined){
				var bool = games[getGameId()] != undefined && games[getGameId()];
				window.trueDarkMode = bool;
			}else{
				gameId = getGameId();
	      games = {};
				games[gameId] = false;
				chrome.storage.sync.set({'np_true_dark': games}, function() {
					// Do nothing
				});
			}
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
