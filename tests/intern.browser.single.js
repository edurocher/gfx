// Test file to run a single GFX unit test from a browser, as a demo/sample
// Run using http://localhost/<root>/gfx/node_modules/intern/client.html?config=tests/intern.browser.single&test=<test-name>

define(["./intern.browser"], function (intern) {

	intern.loader.config = {
		"dojo/has": {
			"bidi": location.href.match(/bidi/) ? 1 : 0
		}
	};

	intern.suites = ["gfx/tests/unit/" + (location.search.match(/&test=([\w\/]*)/) && RegExp.$1)];

	intern.gfxVisualTest = true;

	return intern;
});
