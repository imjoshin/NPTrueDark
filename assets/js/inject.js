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
	// TODO get game IDs from chrome.storage
	var gameIds = [
		'5201488956882944'
	];

	// Get game ID in url
	var regex = /game\/[0-9]{15,}/gi;
	var viewId = window.location.href.match(regex);

	// Check if this game ID is a true dark game
	if (viewId !== null && viewId.length && gameIds.indexOf(viewId[0].replace('game/', '')) >= 0) {
		waitForLoad('.icon-menu', init);
	}
});

/**
 * Waits for menu to be rendered to the DOM.
 *
 * @returns {void}
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
 * Sets up listeners.
 *
 * @returns {void}
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

	// Leaderboard click handler
	$(menuItems.leaderboard).on('click', function() {
		$('.player_cell > div:contains(" Stars")').remove(); //will hide aliases if they contains the string ' Stars'
	});
	$(menuItems.intel).on('click', function() {
		alert('intel');
		waitForLoad('div.col_base div.screen_title:contains("Intel")', hideIntelData);
		alert('loaded');

	});
}

function hideIntelData() {
  $( "div.button_text:contains('None')").parent().parent().remove();
}
