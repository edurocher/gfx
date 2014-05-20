﻿define([
	"require", "intern!object", "intern/chai!assert", "../utils/testUtils", "gfx/svg/Rect"
], function (require, registerSuite, assert, tu, Rect) {

	var surface;

	registerSuite({
		name: "Percent sizes (SVG only)",
		setup: function () {
			tu.addTitle(this.name);
			surface = tu.createSurface(800, 600);
		},
		teardown: function () {
			tu.destroySurface(surface);
		},
		"percent sizes": function () {
			var rect;
			rect = new Rect({x: 10, y: 10, width: "100%", height: 100}, surface);
			rect.fill = "red";
			rect.stroke = "black";
			rect = new Rect({x: 10, y: 130, width: 100, height: "100%"}, surface);
			rect.fill = "red";
			rect.stroke = "black";

			/* jshint maxlen:100000, quotmark:single */
			tu.compare(surface, {
				svg: '<defs></defs><rect fill="rgb(255, 0, 0)" fill-opacity="1" stroke="rgb(0, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="10" y="10" width="100%" height="100" ry="0" rx="0" fill-rule="evenodd" stroke-dasharray="none"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="1" stroke="rgb(0, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="10" y="130" width="100" height="100%" ry="0" rx="0" fill-rule="evenodd" stroke-dasharray="none"></rect>'
			});
			/* jshint maxlen:120, quotmark:double */
		}
	});
});
