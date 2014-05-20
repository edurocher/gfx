define([
	"../_utils", "dcl/dcl", "dojo/_base/lang", "./_PathBase", "./_FontBase", "dojo/has",
	"dojo/has!dojo-bidi?./bidi/_TextPath"
], function (g, dcl, lang, Path, Font, has, BidiTextPath) {
	var defaultShape = {
		// summary:
		//		Defines the default TextPath prototype.

		// type: String
		//		Specifies this is a TextPath, value 'textpath'.
		type: "textpath",

		// path: String
		//		The path commands. See W32C SVG 1.0 specification.
		//		Defaults to empty string value.
		path: "",

		// text: String
		//		The text to be displayed, default value empty string.
		text: "",

		// align: String
		//		The horizontal text alignment, one of 'start', 'end', 'center'. Default value 'start'.
		align: "start",

		// decoration: String
		//		The text decoration , one of 'none', ... . Default value 'none'.
		decoration: "none",

		// rotated: Boolean
		//		Whether the text is rotated, boolean default value false.
		rotated: false,

		// kerning: Boolean
		//		Whether kerning is used on the text, boolean default value true.
		kerning: true
	};
	var TextPath = dcl([Path, Font], {
		// summary:
		//		a generalized TextPath shape
		shape: defaultShape,

		// text: Object
		//		The text to be drawn along the path
		text: null,

		constructor: function () {
			// summary:
			//		a TextPath shape constructor
			if (!this._get("font")) {
				this._set("font", lang.clone(Font.defaultFont));
			}
		},

		_setShapeAttr: dcl.superCall(function (sup) {
			return function () {
				// summary:
				//		forms a path using a shape (SVG)
				// newShape: Object
				//		an SVG path string or a path object.
				sup.apply(this, arguments);
				this._setTextPath();
				if (this.shape.text) {
					this.text = this.shape.text;
				}
				return this;	// self
			};
		}),

		_setTextAttr: function (newText) {
			// summary:
			//		sets a text to be drawn along the path
			this._set("text", g._makeParameters(this._get("text") || lang.clone(defaultShape),
				typeof newText === "string" ? {text: newText} : newText));
			this._setText();
			return this;	// self
		}
	});
	if (has("dojo-bidi")) {
		TextPath = dcl([TextPath, BidiTextPath], {});
		dcl.mix(defaultShape, {
			// textDir: String
			//		The text direction.
			textDir: ""
		});
	}
	return TextPath;
});
