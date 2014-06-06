// Test file to run all GFX Bidi tests on SauceLabs
// Run using grunt test:bidi.remote

define(["./intern", "./bidi"], function (intern, bidi) {
	return bidi(intern);
});
