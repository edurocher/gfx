define([
	"intern!object", "intern/chai!assert", "../utils/testUtils", "gfx/shape/_FontBase"
], function (registerSuite, assert, tu, fontBase) {
	var surface, t;
	tu.registerSuite({
		name: "GFX base",
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
		"splitFontString": function () {
			var s = "italic small-caps bold 12px arial,sans-serif";
			var font = fontBase.splitFontString(s);
			assert.equal(font.style, "italic", "Unexpected Values for font style.");
			assert.equal(font.variant, "small-caps", "Unexpected values for font variant.");
			assert.equal(font.weight, "bold", "Unexpected values for font weight.");
			assert.equal(font.size, "12px", "Unexpected values for font size.");
			assert.equal(font.family, "arial,sans-serif", "Unexpected values for font family.");
			t.font = s;
			s = "italic small-caps bold 12px/30px Georgia";
			font = fontBase.splitFontString(s);
			assert.equal(font.style, "italic", "Unexpected Values for font style.");
			assert.equal(font.variant, "small-caps", "Unexpected values for font variant.");
			assert.equal(font.weight, "bold", "Unexpected values for font weight.");
			assert.equal(font.size, "12px", "Unexpected values for font size.");
			assert.equal(font.family, "Georgia", "Unexpected values for font family.");
			t.font = s;
			s = "italic normal normal 150% arial";
			font = fontBase.splitFontString(s);
			assert.equal(font.style, "italic", "Unexpected Values for font style.");
			assert.equal(font.variant, "normal", "Unexpected values for font variant.");
			assert.equal(font.weight, "normal", "Unexpected values for font weight.");
			assert.equal(font.size, "150%", "Unexpected values for font size.");
			assert.equal(font.family, "arial", "Unexpected values for font family.");
			t.font = s;
		},
		"makeFontString": function () {
			var font = fontBase.makeFontString({
				style: "italic",
				variant: "small-caps",
				weight: "bold",
				size: "12px",
				family: "arial,sans-serif"
			});
			var expected = "italic small-caps bold 12px arial,sans-serif";
			assert.equal(font, expected, "Unexpected value for font sting.");
		}
	});
});
