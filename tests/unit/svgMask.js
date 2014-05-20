define([
	"require", "intern!object", "intern/chai!assert", "../utils/testUtils", "gfx/svg/Mask", "gfx/svg/Group",
	"gfx/svg/Rect", "gfx/svg/Text", "gfx/svg/Image"
], function (require, registerSuite, assert, tu, Mask, Group, Rect, Text, Image) {
	var surface;

	registerSuite({
		name: "SVG masks",
		setup: function () {
			tu.addTitle(this.name);
			surface = tu.createSurface(600, 600);
			surface._parent.style.background = "#FFFFE0";
		},
		teardown: function () {
			tu.destroySurface(surface);
		},
		beforeEach: function () {
			surface.clear();
		},
		"Surface.createMask": function () {
			var mask = new Mask({}, surface);
			assert.equal(mask.parent, surface, "mask parent should be the surface");
			assert.equal(mask.rawNode.parentNode, surface.defNode, "mask parent node should be the svg def node");
		},
		"Shape.mask = mask": function () {
			var rect = new Rect({}, surface), mask = new Mask({}, surface);

			assert.equal(rect.mask, null);
			rect.mask = mask;
			assert.equal(rect.mask, mask);
			assert(rect.rawNode.getAttribute("mask").match(/url\("?#(\w*)"?\)/));
			assert.equal(RegExp.$1, mask.shape.id);
		},
		"Shape.mask = null": function () {
			var rect = new Rect({}, surface), mask = new Mask({}, surface);

			assert.equal(rect.mask, null);
			rect.mask = mask;
			assert.equal(rect.mask, mask);
			rect.mask = null;
			assert.equal(rect.mask, null);
			assert.isFalse(rect.rawNode.hasAttribute("mask"));
		},
		"Mask.shape = shapeWithId": function () {
			var mask = new Mask({}, surface);

			var shape = {
				id: "a-mask-id",
				x: 1,
				y: 2,
				width: 3,
				height: 4
			};
			mask.shape = shape;

			var rawNode = mask.rawNode;
			for (var key in shape) {
				assert.equal(rawNode.getAttribute(key), shape[key]);
			}
		},
		"Mask.shape = shapeWithoutId": function () {
			var mask = new Mask({}, surface);

			var shape = {
				x: 1,
				y: 2,
				width: 3,
				height: 4
			};
			mask.shape = shape;

			var actualShape = mask.shape;
			assert.isTrue("id" in actualShape);
			assert.equal(mask.rawNode.getAttribute("id"), actualShape.id);

		},
		"Surface.remove(mask)": function () {
			var mask = new Mask({}, surface);
			surface.remove(mask);
			assert.equal(mask.parent, null);
			assert.equal(mask.rawNode.parentNode, null);
		},
		"Surface.add(mask)": function () {
			var mask = new Mask({}, surface);
			surface.remove(mask);
			surface.add(mask);
			assert.equal(mask.parent, surface);
			assert.equal(mask.rawNode.parentNode, surface.defNode);
		},
		"Mask.createXxx/add/remove": function () {
			var mask = new Mask({}, surface);
			var rect = new Rect({}, mask);
			assert.equal(rect.getParent(), mask);
			mask.remove(rect);
			assert.equal(rect.getParent(), null);
			mask.add(rect);
			assert.equal(rect.getParent(), mask);
		},
		"Mask example": function () {

			var d = surface.getDimensions(), w = d.width, h = d.height;

			var group = new Group(surface);
			var rect = new Rect({width: w, height: h}, group);
			rect.fill = "blue";

			// Create mask with the same dimensions as the group
			var maskShape = {
				width: 1,
				height: 1,
				maskContentUnits: "objectBoundingBox"
			};
			var mask = new Mask(maskShape, surface);

			// By default, the mask is applied as if initialized to black (i.e., #000)
			// and will completely mask out objects painted through it.
			// Create a white (i.e., #fff) rectangle in the dimensions of the mask
			// so no painting is masked out by default.
			new Rect({
				width: 0.5,
				height: 1
			}, mask).fill = "#fff";

			var margin = 0.1;
			new Rect({
				x: margin,
				y: margin,
				width: 0.5 - margin * 2,
				height: 1 - margin * 2
			}, mask).fill = "black";

			group.mask = mask;

			var textMargin = 60;
			var text = new Text({
				x: w / 2 + textMargin,
				y: textMargin,
				text: "Masked Text"
			}, surface);
			text.fill = "red";
			text.stroke = "purple";
			text.font = {
				size: "40px"
			};
			var maskForText = new Mask(maskShape, surface);
			new Rect({
				width: 1,
				height: 1
			}, maskForText).fill = {
				type: "linear",
				x2: 1,
				y2: 0,
				colors: [
					{ offset: 0, color: "#111" },
					{ offset: 1, color: "#ddd" }
				]
			};
			text.mask = maskForText;

			var image = new Image({
				x: 300,
				y: 100,
				width: 300,
				height: 300,
				src: require.toUrl("../images/maps.png")
			}, surface);
			var textMask = new Mask({}, surface);
			text = new Text({
				x: 375,
				y: 250,
				text: "Text Mask"
			}, textMask);
			text.fill = "white";
			text.font = {
				size: "40px"
			};
			image.mask = textMask;

			tu.compare(surface, {
				/* jshint maxlen:100000, quotmark:single */
				svg: '<defs><mask id="dojoxUnique178" x="0" y="0" width="1" height="1" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox"><rect fill="rgb(255, 255, 255)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="0.5" height="1" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="rgb(0, 0, 0)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0.1" y="0.1" width="0.3" height="0.8" ry="0" rx="0" fill-rule="evenodd"></rect></mask><mask id="dojoxUnique179" x="0" y="0" width="1" height="1" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox"><rect fill="url(#dojoxUnique180)" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="1" height="1" ry="0" rx="0" fill-rule="evenodd"></rect></mask><linearGradient id="dojoxUnique180" gradientUnits="userSpaceOnUse" x1="0.00000000" y1="0.00000000" x2="1.00000000" y2="0.00000000"><stop offset="0.00000000" stop-color="rgb(17, 17, 17)" stop-opacity="1"></stop><stop offset="1.00000000" stop-color="rgb(221, 221, 221)" stop-opacity="1"></stop></linearGradient><mask id="dojoxUnique181" x="0" y="0" width="1" height="1" maskUnits="objectBoundingBox" maskContentUnits="userSpaceOnUse"><text fill="rgb(255, 255, 255)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="375" y="250" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" fill-rule="evenodd" font-style="normal" font-variant="normal" font-weight="normal" font-size="40px" font-family="serif">Text Mask</text></mask></defs><g mask="url(#dojoxUnique178)"><rect fill="rgb(0, 0, 255)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="600" height="600" ry="0" rx="0" fill-rule="evenodd"></rect></g><text fill="rgb(255, 0, 0)" fill-opacity="1" stroke="rgb(128, 0, 128)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="360" y="60" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" fill-rule="evenodd" stroke-dasharray="none" font-style="normal" font-variant="normal" font-weight="normal" font-size="40px" font-family="serif" mask="url(#dojoxUnique179)">Masked Text</text><image fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="300" y="100" width="300" height="300" preserveAspectRatio="none" xlink:href="../../../gfx/tests/images/maps.png" mask="url(#dojoxUnique181)"></image>'
				/* jshint maxlen:120, quotmark:double */
			});
		}
	});
});
