// Test file to run GFX Bidi unit tests from a browser
// Run using http://localhost/<root>/gfx/node_modules/intern/client.html?config=tests/intern.bidi.browser

define(["./intern.bidi", "./browser"], function (intern, browser) {
	return browser(intern);
});
