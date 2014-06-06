// Test file to run all GFX Bidi tests on a local Selenium server
// Run using grunt test:bidi.local

define(["./intern.local", "./bidi"], function (intern, bidi) {
	return bidi(intern);
});
