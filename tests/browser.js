// A utility function that modifies an existing intern config to run in the browser.

define([], function () {
	return function (intern) {

		intern.loader.baseUrl = "../../..";

		return intern;
	};
});
