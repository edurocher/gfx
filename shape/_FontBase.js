define(["dcl/dcl", "dojo/_base/lang", "../_utils"], function (dcl, lang, g) {

	var defaultFont = {
		// summary:
		//		An object specifying the default properties for a Font used in text operations.

		// type: String
		//		Specifies this object is a Font, value 'font'.
		type: "font",

		// style: String
		//		The font style, one of 'normal', 'bold', default value 'normal'.
		style: "normal",

		// variant: String
		//		The font variant, one of 'normal', ... , default value 'normal'.
		variant: "normal",

		// weight: String
		//		The font weight, one of 'normal', ..., default value 'normal'.
		weight: "normal",

		// size: String
		//		The font size (including units), default value '10pt'.
		size: "10pt",

		// family: String
		//		The font family, one of 'serif', 'sanserif', ..., default value 'serif'.
		family: "serif"
	};

	function makeFontString(font) {
		// summary:
		//		converts a font object to a CSS font string
		// font: Object
		//		font object (see gfx.defaultFont)
		return font.style + " " + font.variant + " " + font.weight + " " + font.size + " " + font.family; // Object
	}

	function splitFontString(str) {
		// summary:
		//		converts a CSS font string to a font object
		// description:
		//		Converts a CSS font string to a gfx font object. The CSS font
		//		string components should follow the W3C specified order
		//		(see http://www.w3.org/TR/CSS2/fonts.html#font-shorthand):
		//		style, variant, weight, size, optional line height (will be
		//		ignored), and family. Note that the Font.size attribute is limited to numeric CSS length.
		// str: String
		//		a CSS font string.
		// returns: Object
		//      object in gfx.defaultFont format
		var font = lang.clone(defaultFont);
		var t = str.split(/\s+/);
		do {
			if (t.length < 5) {
				break;
			}
			font.style = t[0];
			font.variant = t[1];
			font.weight = t[2];
			var i = t[3].indexOf("/");
			font.size = i < 0 ? t[3] : t[3].substring(0, i);
			var j = 4;
			if (i < 0) {
				if (t[4] === "/") {
					j = 6;
				} else if (t[4].charAt(0) === "/") {
					j = 5;
				}
			}
			if (j < t.length) {
				font.family = t.slice(j).join(" ");
			}
		} while (false);
		return font;	// Object
	}

	var FontBase = dcl(null, {
		// summary: A mixin for shapes that have a font (Text and TextPath).

		// font: Object
		//		A font object or a font string
		font: null,

		_setFontAttr: function (newFont) {
			// summary:
			//		Sets a font for text
			// newFont: Object
			//		A font object or a font string
			this._set("font",
				typeof newFont === "string" ? splitFontString(newFont) : g._makeParameters(defaultFont, newFont));
			this._setFont();
		},

		_setFont: function () {
			// summary:
			//		Sets a font object. Should be implemented by renderers.
		}
	});

	FontBase.defaultFont = defaultFont;
	FontBase.splitFontString = splitFontString;
	FontBase.makeFontString = makeFontString;

	return FontBase;
});
