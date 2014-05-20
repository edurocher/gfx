define([
	"../_utils", "dcl/dcl", "./_ShapeBase", "./_FontBase", "dojo/has", "dojo/has!dojo-bidi?./bidi/_Text"
], function (g, dcl, Shape, Font, has, BidiText) {
	var defaultShape = {
		// summary:
		//		Defines the default Text prototype.

		// type: String
		//		Specifies this is a Text shape, value 'text'.
		type: "text",

		// x: Number
		//		The X coordinate of the text position, default value 0.
		x: 0,

		// y: Number
		//		The Y coordinate of the text position, default value 0.
		y: 0,

		// text: String
		//		The text to be displayed, default value empty string.
		text: "",

		// align:	String
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
	var Text = dcl([Shape, Font], {
		// summary:
		//		a generic text (do not instantiate it directly)
		shape: defaultShape,

		_computeTextBoundingBox: function () {
			// summary:
			//		Compute the bbox of the given shape.Text instance. Note that this method returns an
			//		approximation of the bbox, and should be used when the underlying renderer cannot provide precise
			//		metrics.
			if (!g._isRendered(this)) {
				return {x: 0, y: 0, width: 0, height: 0};
			}
			var loc, textShape = this.shape, font = this.font ||
				Font.defaultFont, w = this.getTextWidth(), h = g._normalizedLength(font.size);
			loc = g._computeTextLocation(textShape, w, h, true);
			return {
				x: loc.x,
				y: loc.y,
				width: w,
				height: h
			};
		},

		getBoundingBox: function () {
			var bbox = null, s = this._get("shape");
			if (s.text) {
				bbox = this._computeTextBoundingBox(this);
			}
			return bbox;
		}
	});
	if (has("dojo-bidi")) {
		Text = dcl([Text, BidiText], {});
		dcl.mix(defaultShape, {
			// textDir: String
			//		The text direction.
			textDir: ""
		});
	}
	return Text;
});
