define([
	"dcl/dcl", "dojo/_base/kernel", "dojo/_base/lang", "dcolor/Color", "dojo/_base/sniff", "dojo/_base/config",
	"dojo/_base/window"
], function (dcl, kernel, lang, Color, has, config, win) {

	var createDiv = function (style) {
		var div = win.doc.createElement("div");
		var s = div.style;
		for (var p in style) {
			s[p] = style[p];
		}
		win.body().appendChild(div);
		return div;
	};

	var fontMeasurements = null;

	var measuringNode = null, empty = {};

	var uniqueId = 0;

	var g = {
		// summary:
		//		Internal utility fonctions for GFX.

		_hasClass: function (/*DomNode*/node, /*String*/classStr) {
			// summary:
			//		Returns whether or not the specified classes are a portion of the
			//		class list currently applied to the node.

			// return (new RegExp('(^|\\s+)'+classStr+'(\\s+|$)')).test(node.className)	// Boolean
			var cls = node.getAttribute("className");
			return cls && (" " + cls + " ").indexOf(" " + classStr + " ") >= 0;  // Boolean
		},
		_addClass: function (/*DomNode*/node, /*String*/classStr) {
			// summary:
			//		Adds the specified classes to the end of the class list on the
			//		passed node.
			var cls = node.getAttribute("className") || "";
			if (!cls || (" " + cls + " ").indexOf(" " + classStr + " ") < 0) {
				node.setAttribute("className", cls + (cls ? " " : "") + classStr);
			}
		},
		_removeClass: function (/*DomNode*/node, /*String*/classStr) {
			// summary:
			//		Removes classes from node.
			var cls = node.getAttribute("className");
			if (cls) {
				node.setAttribute("className", cls.replace(new RegExp("(^|\\s+)" + classStr + "(\\s+|$)"), "$1$2"));
			}
		},
		//		derived from Morris John's emResized measurer
		_getFontMeasurements: function () {
			// summary:
			//		Returns an object that has pixel equivilents of standard font
			//		size values.
			var heights = {
				"1em": 0,
				"1ex": 0,
				"100%": 0,
				"12pt": 0,
				"16px": 0,
				"xx-small": 0,
				"x-small": 0,
				"small": 0,
				"medium": 0,
				"large": 0,
				"x-large": 0,
				"xx-large": 0
			};
			var p;

			if (has("ie")) {
				//		we do a font-size fix if and only if one isn"t applied already.
				// NOTE: If someone set the fontSize on the HTML Element, this will kill it.
				win.doc.documentElement.style.fontSize = "100%";
			}

			//		set up the measuring node.
			var div = createDiv({
				position: "absolute",
				left: "0",
				top: "-100px",
				width: "30px",
				height: "1000em",
				borderWidth: "0",
				margin: "0",
				padding: "0",
				outline: "none",
				lineHeight: "1",
				overflow: "hidden"
			});

			//		do the measurements.
			for (p in heights) {
				div.style.fontSize = p;
				heights[p] = Math.round(div.offsetHeight * 12 / 16) * 16 / 12 / 1000;
			}

			win.body().removeChild(div);
			return heights; //object
		},

		_getCachedFontMeasurements: function (recalculate) {
			if (recalculate || !fontMeasurements) {
				fontMeasurements = g._getFontMeasurements();
			}
			return fontMeasurements;
		},

		_getTextBox: function (/*String*/ text, /*Object*/ style, /*String?*/ className) {
			var m, s, al = arguments.length;
			var i, box;
			if (!measuringNode) {
				measuringNode = createDiv({
					position: "absolute",
					top: "-10000px",
					left: "0",
					visibility: "hidden"
				});
			}
			m = measuringNode;
			// reset styles
			m.className = "";
			s = m.style;
			s.borderWidth = "0";
			s.margin = "0";
			s.padding = "0";
			s.outline = "0";
			// set new style
			if (al > 1 && style) {
				for (i in style) {
					if (i in empty) {
						continue;
					}
					s[i] = style[i];
				}
			}
			// set classes
			if (al > 2 && className) {
				m.className = className;
			}
			// take a measure
			m.innerHTML = text;

			var bcr = m.getBoundingClientRect();
			box =
			{l: bcr.left, t: bcr.top, w: bcr.width || (bcr.right - bcr.left), h: bcr.height || (bcr.bottom - bcr.top)};
			m.innerHTML = "";
			return box;
		},

		_computeTextLocation: function (/*g.defaultTextShape*/textShape, /*Number*/width, /*Number*/height, /*Boolean*/
			fixHeight
			) {
			var loc = {}, align = textShape.align;
			switch (align) {
			case "end":
				loc.x = textShape.x - width;
				break;
			case "middle":
				loc.x = textShape.x - width / 2;
				break;
			default:
				loc.x = textShape.x;
				break;
			}
			var c = fixHeight ? 0.75 : 1;
			loc.y = textShape.y - height * c; // **rough** approximation of the ascent...
			return loc;
		},

		_isRendered: function (/*Shape*/s) {
			var p = s.parent;
			while (p && p.getParent) {
				p = p.parent;
			}
			return p !== null;
		},

		// candidate for dojo.dom

		_getUniqueId: function () {
			// summary:
			//		returns a unique string for use with any DOM element
			var id;
			do {
				id = kernel._scopeName + "xUnique" + (++uniqueId);
			} while (win.doc.getElementById(id));
			return id;
		},

		// Set touch-action attr for dpointer:

		_fixTouchAction: function (/*gfx/shape.Surface*/surface) {
			var r = surface.rawNode;
			if (r.getAttribute("touch-action") === "") {
				r.setAttribute("touch-action", "none");
			}
		},

		_chooseRenderer: function () {

			// Choose the GFX renderer based on the (deprecated) dojoConfig.gfxRenderer
			// or the has("gfx-renderer") flag.

			return (has("gfx-renderer") || config.gfxRenderer || "svg").split(",")[0];
		},

		_makeParameters: function (defaults, update) {
			// summary:
			//		copies the original object, and all copied properties from the
			//		'update' object
			// defaults: Object
			//		the object to be cloned before updating
			// update: Object
			//		the object, which properties are to be cloned during updating
			// returns: Object
			//      new object with new and default properties
			var i = null;
			if (!update) {
				// return dojo.clone(defaults);
				return lang.delegate(defaults);
			}
			var result = {};
			for (i in defaults) {
				if (!(i in result)) {
					result[i] = lang.clone((i in update) ? update[i] : defaults[i]);
				}
			}
			return result; // Object
		},

		_normalizeColor: function (/*dojo/Color|Array|string|Object*/ color) {
			// summary:
			//		converts any legal color representation to normalized
			//		dojo/Color object
			// color:
			//		A color representation.
			return (color instanceof Color) ? color : new Color(color); // dojo/Color
		},

		_normalizedLength: function (len) {
			// summary:
			//		converts any length value to pixels
			// len: String
			//		a length, e.g., '12pc'
			// returns: Number
			//      pixels
			if (len.length === 0) {
				return 0;
			}
			if (len.length > 2) {
				var val = parseFloat(len);
				switch (len.slice(-2)) {
				case "px":
					return val;
				case "pt":
					return val * g._pxInPt();
				case "in":
					return val * 72 * g._pxInPt();
				case "pc":
					return val * 12 * g._pxInPt();
				case "mm":
					return val * 7.2 / 2.54 * g._pxInPt();
				case "cm":
					return val * 72 / 2.54 * g._pxInPt();
				}
			}
			return parseFloat(len);	// Number
		},

		_pxInPt: function () {
			// summary:
			//		returns the current number of pixels per point.
			return g._getCachedFontMeasurements()["12pt"] / 12;	// Number
		}
	};

	return g;
});
