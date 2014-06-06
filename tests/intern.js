// Test file to run GFX tests.
// This configuration file is used as a base module for other intern configs (intern.*.js),
// and it can also be run directly to run all the GFX tests on SauceLabs using grunt test:remote

define({
	// The port on which the instrumenting proxy will listen
	proxyPort: 9000,


	// Browsers to run integration testing against. Note that version numbers must be strings if used with Sauce
	// OnDemand. Options that will be permutated are browserName, version, platform, and platformVersion; any other
	// capabilities options specified for an environment will be copied as-is
	environments: [
		// desktop:
		{ browserName: "internet explorer", version: "11", platform: "Windows 8.1", requireWindowFocus: "true",
			name: "gfx" },
		{ browserName: "internet explorer", version: "10", platform: "Windows 8", requireWindowFocus: "true",
			name: "gfx" },
		{ browserName: "internet explorer", version: "11", platform: "Windows 7", name: "gfx" },
		{ browserName: "internet explorer", version: "10", platform: "Windows 7", name: "gfx" },
		{ browserName: "internet explorer", version: "9", platform: "Windows 7", name: "gfx" },
		{ browserName: "firefox", version: "25", platform: "Windows 7", name: "gfx" },
		{ browserName: "chrome", version: "33", platform: "Windows 7", name: "gfx" },
		{ browserName: "safari", version: "7", platform: "OS X 10.9", name: "gfx" },
		// mobile:
		{ browserName: "iphone", version: "7", platform: "OS X 10.9", name: "gfx" }
		//, { browserName: "android", platform: "Android" }		not currently working
	],

	// Maximum number of simultaneous integration tests that should be executed on the remote WebDriver service
	maxConcurrency: 3,

	// Whether or not to start Sauce Connect before running tests
	useSauceConnect: true,

	// Connection information for the remote WebDriver service. If using Sauce Labs, keep your username and password
	// in the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables unless you are sure you will NEVER be
	// publishing this configuration file somewhere
	webdriver: {
		host: "localhost",
		port: 4444
	},

	useLoader: {
		"host-node": "requirejs",
		"host-browser": "../../../requirejs/require.js"
	},

	loader: {
		baseUrl: ".."
	},

	// Non-functional test suite(s) to run in each browser
	suites: ["gfx/tests/unit/all"],

	// Functional test suite(s) to run in each browser once non-functional tests are completed
	functionalSuites: ["gfx/tests/functional/all"],

	// A regular expression matching URLs to files that should not be included in code coverage analysis
	excludeInstrumentation: /^(requirejs|dcl|dojo|dcolor|delite|gfx\/tests)/
});
