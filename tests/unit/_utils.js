define([
	"intern!object", "intern/chai!assert", "../utils/testUtils", "gfx/_utils"
], function (registerSuite, assert, tu, utils) {
	var surface, t;
	tu.registerSuite({
		name: "GFX internal utilities",
		setup: function () {
			surface = tu.createSurface(300, 300);
			t = new tu.Text({
				x: 100,
				y: 100,
				text: "Hello Gfx!"
			}, surface);
			t.fill = "black";
		},
		teardown: function () {
			tu.destroySurface(surface);
		},
		"_isRendered": function () {
			var g = new tu.Group(surface);
			var rect = new tu.Rect(g);
			assert.isTrue(utils._isRendered(rect), "Unexpected value for parented rect.");
			g.removeShape();
			assert.isFalse(utils._isRendered(rect), "Unexpected value for unparented rect.");
			assert.isFalse(utils._isRendered(g), "Unexpected value for unparented g.");
		}
	});
});
