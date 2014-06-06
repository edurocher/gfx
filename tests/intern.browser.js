// Test file to run GFX unit tests from a browser
// Run using http://localhost/<root>/gfx/node_modules/intern/client.html?config=tests/intern.browser

define(["./intern", "./browser"], function (intern, browser) {
	return browser(intern);
});
