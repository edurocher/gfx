﻿define([
	"require", "intern!object", "intern/chai!assert", "../utils/testUtils", "gfx/matrix", "gfx/svg/Group",
	"gfx/svg/Line", "gfx/svg/Text"
], function (require, registerSuite, assert, tu, matrix, Group, Line, Text) {
	var surface, parent, g, s;
	registerSuite({
		name: "SVG rendering options",
		setup: function () {
			tu.addTitle(this.name);
			surface = tu.createSurface(700, 500, "svg");
		},
		teardown: function () {
			tu.destroySurface(surface);
		},
		afterEach: function () {
			surface = tu.clear(surface);
		},
		"shape-rendering": function () {
			["auto", "optimizeSpeed", "crispEdges", "geometricPrecision"].forEach(function (opt, idx) {
				g = new Group(surface);
				g.transform = matrix.translate(0, 20 * idx);
				s = new Line({
					x1: 10,
					y1: 10,
					x2: 490,
					y2: 100
				}, g);
				s.stroke = "blue";
				s.addRenderingOption("shape-rendering", opt);
				s = new Text({
					x: 490,
					y: 100,
					text: opt
				}, g);
				s.fill = "black";
			});
			parent = new Group(surface);
			parent.transform = matrix.translate(0, 80);
			["auto", "optimizeSpeed", "crispEdges", "geometricPrecision"].forEach(function (opt, idx) {
				g = new Group(parent);
				g.transform = matrix.translate(0, 20 * idx);
				s = new Line({
					x1: 10,
					y1: 100,
					x2: 490,
					y2: 100
				}, g);
				s.stroke = "blue";
				s.addRenderingOption("shape-rendering", opt);
				s = new Text({
					x: 490,
					y: 100,
					text: opt
				}, g);
				s.fill = "black";
			});
			tu.compare(surface, {
				/* jshint maxlen:1000000, quotmark:single */
				svg: '<defs></defs><g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,0.00000000,0.00000000)"><line fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="10" y1="10" x2="490" y2="100" stroke-dasharray="none" shape-rendering="auto"></line><text fill="rgb(0, 0, 0)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="490" y="100" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" fill-rule="evenodd">auto</text></g><g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,0.00000000,20.00000000)"><line fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="10" y1="10" x2="490" y2="100" stroke-dasharray="none" shape-rendering="optimizeSpeed"></line><text fill="rgb(0, 0, 0)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="490" y="100" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" fill-rule="evenodd">optimizeSpeed</text></g><g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,0.00000000,40.00000000)"><line fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="10" y1="10" x2="490" y2="100" stroke-dasharray="none" shape-rendering="crispEdges"></line><text fill="rgb(0, 0, 0)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="490" y="100" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" fill-rule="evenodd">crispEdges</text></g><g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,0.00000000,60.00000000)"><line fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="10" y1="10" x2="490" y2="100" stroke-dasharray="none" shape-rendering="geometricPrecision"></line><text fill="rgb(0, 0, 0)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="490" y="100" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" fill-rule="evenodd">geometricPrecision</text></g><g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,0.00000000,80.00000000)"><g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,0.00000000,0.00000000)"><line fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="10" y1="100" x2="490" y2="100" stroke-dasharray="none" shape-rendering="auto"></line><text fill="rgb(0, 0, 0)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="490" y="100" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" fill-rule="evenodd">auto</text></g><g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,0.00000000,20.00000000)"><line fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="10" y1="100" x2="490" y2="100" stroke-dasharray="none" shape-rendering="optimizeSpeed"></line><text fill="rgb(0, 0, 0)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="490" y="100" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" fill-rule="evenodd">optimizeSpeed</text></g><g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,0.00000000,40.00000000)"><line fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="10" y1="100" x2="490" y2="100" stroke-dasharray="none" shape-rendering="crispEdges"></line><text fill="rgb(0, 0, 0)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="490" y="100" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" fill-rule="evenodd">crispEdges</text></g><g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,0.00000000,60.00000000)"><line fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="10" y1="100" x2="490" y2="100" stroke-dasharray="none" shape-rendering="geometricPrecision"></line><text fill="rgb(0, 0, 0)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="490" y="100" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" fill-rule="evenodd">geometricPrecision</text></g></g>'
				/* jshint maxlen:120, quotmark:double */
			});
		},
		"text-rendering": function () {
			parent = new Group(surface);
			["auto", "optimizeSpeed", "optimizeLegibility", "geometricPrecision"].forEach(function (opt, idx) {
				g = new Group(parent);
				g.transform = matrix.translate(0, 20 * idx);
				s = new Text({
					x: 50,
					y: 50,
					text: "LYoWAT	ff fi fl ffl  (" + opt + ")"
				}, g);
				s.fill = "black";
				s.font = {size: "23px", family: "Calibri, Constantia"};
				s.addRenderingOption("text-rendering", opt);
			});
			tu.compare(surface, {
				/* jshint maxlen:1000000, quotmark:single */
				svg: '<defs></defs><g><g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,0.00000000,0.00000000)"><text fill="rgb(0, 0, 0)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="50" y="50" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" fill-rule="evenodd" font-style="normal" font-variant="normal" font-weight="normal" font-size="23px" font-family="Calibri, Constantia">LYoWAT	ff fi fl ffl  (auto)</text></g><g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,0.00000000,20.00000000)"><text fill="rgb(0, 0, 0)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="50" y="50" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="optimizeSpeed" fill-rule="evenodd" font-style="normal" font-variant="normal" font-weight="normal" font-size="23px" font-family="Calibri, Constantia">LYoWAT	ff fi fl ffl  (optimizeSpeed)</text></g><g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,0.00000000,40.00000000)"><text fill="rgb(0, 0, 0)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="50" y="50" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="optimizeLegibility" fill-rule="evenodd" font-style="normal" font-variant="normal" font-weight="normal" font-size="23px" font-family="Calibri, Constantia">LYoWAT	ff fi fl ffl  (optimizeLegibility)</text></g><g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,0.00000000,60.00000000)"><text fill="rgb(0, 0, 0)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="50" y="50" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="geometricPrecision" fill-rule="evenodd" font-style="normal" font-variant="normal" font-weight="normal" font-size="23px" font-family="Calibri, Constantia">LYoWAT	ff fi fl ffl  (geometricPrecision)</text></g></g>'
				/* jshint maxlen:120, quotmark:double */
			});
		}
	});
});
