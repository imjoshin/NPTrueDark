/**
 * Handles the options.
 *  - Adds a 'True Dark' option to the interface section
 *
 * @return {void}
 */
function options() {
	var settingHeight = 48;
	var interfaceLabel = $( ".section_title:contains('Interface')");
	var interfaceSettings = $(interfaceLabel).parent();

	// Create new button
	var trueDarkLabel = interfaceSettings.children('.pad12').eq(0).clone();
	trueDarkLabel.text('True Dark').removeClass('col_accent').addClass('col_base');
	var trueDarkOption = interfaceSettings.children('.drop_down').eq(0).clone();
	trueDarkOption.find('.drop_down_text').text(window.trueDarkMode ? 'Enabled' : 'Disabled');
	var trueDarkSelect = trueDarkOption.children('select').empty();
	trueDarkSelect.addClass('true_dark_select');
	trueDarkSelect.append('<option value="enabled" ' + (window.trueDarkMode ? 'selected' : '') + '>Enabled</option>');
	trueDarkSelect.append('<option value="disabled" ' + (window.trueDarkMode ? '' : 'selected') + '>Disabled</option>');

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
}

/**
 * Handles the intel graphs.
 *  - Hides buttons to show other players
 *
 * @return {void}
 */
function intel() {
	$("div.button_text:contains('None')").parent().parent().remove();
	//TODO gotta add hiding after clicking selecting from the select box
}

/**
 * Handles the leaderboard.
 *  - Hides star count
 *  - Hides KO status
 *  - Sorts leaderboard
 *
 * @return {void}
 */
function leaderboard() {
	// Hide star count on each player
	$('.player_cell > div:contains(" Stars")').remove();

	// Hide 'KO' from dead players
	knockedOutPlayers = $('.player_cell > .section_title.txt_ellipsis:contains("(KO)")');
	knockedOutPlayers.each(function(key, player) {
		name = $(player).text().replace("(KO)", "");
		$(player).text(name);
	});

	// Sort leaderboard
	var leaderboard = $('.player_cell').parent();
	$(leaderboard).append($(".player_cell").get().sort(function(a, b) {
		var regex = /pci_48_[0-9]+/gi;

		var aIcon = $(a).find('[class*=pci_48_]');
		var aMatch = $(aIcon).attr('class').match(regex);
		var aId = aMatch[0].replace('pci_48_', '');

		var bIcon = $(b).find('[class*=pci_48_]');
		var bMatch = $(bIcon).attr('class').match(regex);
		var bId = bMatch[0].replace('pci_48_', '');

		return parseInt(aId) - parseInt(bId);
	}));
}
