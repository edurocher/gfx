// Test file to run GFX tests on a local Selenium server
// Run using grunt test:local

define([
	"./intern"
], function (intern) {
	intern.useSauceConnect = false;
	intern.webdriver = {
		host: "localhost",
		port: 4444
	};

	intern.environments = [
		{ browserName: "firefox" },
		{ browserName: "internet explorer" },
		{ browserName: "chrome" }
	];

	return intern;
});
