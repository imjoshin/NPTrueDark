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
