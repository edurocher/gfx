﻿define([
	"require", "intern!object", "intern/chai!assert", "../utils/testUtils"
], function (require, registerSuite, assert, tu) {

	var surface;

	tu.registerSuite({
		name: "Surface clipping",
		setup: function () {
			surface = tu.createSurface(200, 200);
		},
		teardown: function () {
			tu.destroySurface(surface);
		},
		"surface clipping": function () {
			new tu.Rect({width: 200, height: 200}, surface).stroke = "black";
			new tu.Rect({x: 150, y: 10, width: 300, height: 300}, surface).fill = "red";

			var s = window.getComputedStyle(surface.rawNode);
			assert.equal(s.width, "200px", "surface width");
			assert.equal(s.height, "200px", "surface height");
		},
	});
});
