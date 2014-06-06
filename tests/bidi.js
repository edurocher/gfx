// A utility function that modifies an existing intern config to run GFX Bidi tests.

define([], function () {
	return function (intern) {

		intern.loader.config = {
			"dojo/has": {
				"bidi": 1
			}
		};

		intern.suites = ["gfx/tests/unit/bidi/all"];

		intern.functionalSuites = [];

		return intern;
	};
});
