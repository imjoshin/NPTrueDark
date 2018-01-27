var menuItems = {
	'compass': null,
	'zoom_in': null,
	'zoom_out': null,
	'home': null,
	'ruler': null,
	'quick_upgrade': null,
	'bulk_upgrade': null,
	'leaderboard': null,
	'research': null,
	'galaxy': null,
	'intel': null,
	'options': null,
	'help': null,
}

$(function() {
	gameId = getGameId();
	trueDarkModeLoop();

	// Check if this game ID is a true dark game
	if (gameId !== null) {
		waitForLoad('.icon-menu', init);
	}
});

/**
 * Sets up listeners.
 *
 * @return {void}
 */
function init() {
	menuItems.compass = $('.icon-compass').parent()[0];
	menuItems.zoom_in = $('.icon-zoom-in').parent()[0];
	menuItems.zoom_out = $('.icon-zoom-out').parent()[0];
	menuItems.home = $('.icon-home').parent()[0];
	menuItems.ruler = $('.icon-myspace').parent()[0];
	menuItems.quick_upgrade = $('.icon-flash').parent()[0];
	menuItems.bulk_upgrade = $('.icon-dollar').parent()[1];
	menuItems.leaderboard = $('.icon-users').parent()[0];
	menuItems.research = $('.icon-beaker').parent()[0];
	menuItems.galaxy = $('.icon-star-1').parent()[0];
	menuItems.intel = $('.icon-chart-line').parent()[0];
	menuItems.options = $('.icon-cog-1').parent()[0];
	menuItems.help = $('.icon-help').parent()[0];
	menuItems.player = $('.icon-eye').closest('.button');

	// Initially hide data on page load
	leaderboard();

	// Leaderboard click handler
	$(menuItems.leaderboard).on('click', function() {
		if (window.trueDarkMode) {
			leaderboard();
		}
	});

	// Intel click handler
	$(menuItems.intel).on('click', function() {
		if (window.trueDarkMode) {
			waitForLoad('div.col_base div.screen_title:contains("Intel")', intel);
		}
	});

	// Options click handler
	$(menuItems.options).on('click', options);


	$(menuItems.player).on('click', function() {
		if (window.trueDarkMode) {
			alert("player view");
		}
	});
}
