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

	// Check if this game ID is a true dark game
	if (gameId !== null) {
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
		chrome.storage.sync.get(null, function (data) { console.info(data) });
	});

	// Options click handler
	$(menuItems.options).on('click', function() {
		getTrueDarkMode(optionsHandler)
	});
}

function optionsHandler(isTrueDark) {
	var settingHeight = 48;
	var interfaceLabel = getElementsByInnerHtml('.section_title', 'Interface')[0];
	var interfaceSettings = $(interfaceLabel).parent();

	// Create new button
	var trueDarkLabel = interfaceSettings.children('.pad12').eq(0).clone();
	trueDarkLabel.text('True Dark').removeClass('col_accent').addClass('col_base');
	var trueDarkOption = interfaceSettings.children('.drop_down').eq(0).clone();
	trueDarkOption.find('.drop_down_text').text(isTrueDark ? 'Enabled' : 'Disabled');
	var trueDarkSelect = trueDarkOption.children('select').empty();
	trueDarkSelect.addClass('true_dark_select');
	trueDarkSelect.append('<option value="disabled" ' + (isTrueDark ? '' : 'selected') + '>Disabled</option>');
	trueDarkSelect.append('<option value="enabled" ' + (isTrueDark ? 'selected' : '') + '>Enabled</option>');

	// Expand the image
	interfaceSettings.children('.rel[src]').css('height', '290px');

	// Make room for new setting
	interfaceSettings.css('height', (parseInt(interfaceSettings.css('height')) + settingHeight) + 'px');
	interfaceSettings.children('.pad12, .drop_down').each(function(key, element) {
		$(element).css('top', (parseInt($(element).css('top')) + settingHeight) + 'px');
	});

	// Add setting to page
	interfaceSettings.append(trueDarkLabel);
	interfaceSettings.append(trueDarkOption);

	// Handle select on change
	$('.true_dark_select').off('change').on('change', function() {
		var selected = $(this).find("option:selected");
		$(this).parent().children('.drop_down_text').text($(selected).text());
		setTrueDarkMode($(selected).text() == 'Enabled');
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
