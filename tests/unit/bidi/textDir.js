define([
	"intern!object", "intern/chai!assert", "../../utils/testUtils"
], function (registerSuite, assert, tu) {

	var CPD = 30, tp1, tp2, tp3, tp4, tp5, tp6, t1, t2, t3, t4, t5, t6;
	var g1 = null, g2 = null, g3, g4;

	var surfaceLTR = null, surfaceRTL = null, surfaceAUTO = null;

	function placeAnchor(surface, x, y) {
		surface.add(new tu.Line({x1: x - 2, y1: y, x2: x + 2, y2: y}));
		surface.add(new tu.Line({x1: x, y1: y - 2, x2: x, y2: y + 2}));
	}

	function makeText(surface, text, font, fill, stroke) {
		var t = new tu.Text(text, surface);
		if (font) {
			t.font = font;
		}
		if (fill) {
			t.fill = fill;
		}
		if (stroke) {
			t.stroke = stroke;
		}
		placeAnchor(surface, text.x, text.y);
		return t;
	}

	function makeShapes() {
		surfaceLTR = tu.createSurface(500, 170, null, null, null, "ltr");
		console.debug("surfaceLTR created");
		new tu.Path({}, surfaceLTR).moveTo(0, 15).setAbsoluteMode(false).curveTo(CPD, 0, 0, 0, 50, 0);

		console.debug("p created");
		tp1 = new tu.TextPath({
			text: "\u05d4\u05ea\u05d7\u05dc\u05d4 end. ",
			align: "start"
		}, surfaceLTR).moveTo(0, 15).setAbsoluteMode(false).curveTo(CPD, 0, 0, 0, 100, 0);
		tp1.font = {family: "times", size: "12pt"};
		tp1.fill = "blue";

		console.debug("tp1 created");
		tp2 = new tu.TextPath({
			text: "Beginning \u05e1\u05d5\u05e3.",
			align: "start"

		}, surfaceLTR).moveTo(0, 50).setAbsoluteMode(false).curveTo(CPD, 0, 0, 0, 100, 0);
		tp2.font = {family: "times", size: "12pt"};
		tp2.fill = "blue";

		console.debug("tp2 created");
		g1 = new tu.Group(surfaceLTR);
		g1.textDir = "rtl";
		//		surfaceLTR.textDir = "ltr";
		t1 = makeText(g1, {id: "t1", x: 0, y: 100, text: "1.) \u05d4\u05ea\u05d7\u05dc\u05d4 end!"},
			{family: "Times", size: "18pt"}, "black", "blue");

		t2 = makeText(surfaceLTR, {x: 0, y: 140, text: "1.) Beginning \u05e1\u05d5\u05e3!"},
			{family: "Times", size: "18pt"}, "black", "blue");

		surfaceRTL = tu.createSurface(500, 170);
		console.debug("surfaceRTL created");
		new tu.Path({}, surfaceRTL).moveTo(0, 15).setAbsoluteMode(false).curveTo(CPD, 0, 0, 0, 100, 0);

		console.debug("p2 created");
		tp3 = new tu.TextPath({
			text: "\u05d4\u05ea\u05d7\u05dc\u05d4 end. ",
			align: "start"
			//, rotated: true
		}, surfaceRTL).moveTo(0, 15).setAbsoluteMode(false).curveTo(CPD, 0, 100 - CPD, 0, 100, 0);
		tp3.font = {family: "times", size: "12pt"};
		tp3.fill = "red";

		g2 = new tu.Group(surfaceRTL);
		g2.add(tp3);
		g2.textDir = "ltr";

		g3 = new tu.Group({ textDir: "rtl"}, g2);

		g4 = new tu.Group({textDir: "auto"}, surfaceRTL);
		console.debug("tp3 created");
		tp4 = new tu.TextPath({
			text: "Beginning \u05e1\u05d5\u05e3.",
			align: "start"

			//, rotated: true
		}, surfaceRTL)//.setShape(p.shape)
			.moveTo(0, 50).setAbsoluteMode(false).curveTo(CPD, 0, 100 - CPD, 0, 100, 0);
		tp4.font = {family: "times", size: "12pt"};
		tp4.fill = "red";

		console.debug("tp4 created");

		t3 = makeText(g3, {id: "t1", x: 0, y: 100, text: "1.) \u05d4\u05ea\u05d7\u05dc\u05d4 end!"},
			{family: "Times", size: "18pt"}, "black", "red");

		t4 = makeText(surfaceRTL, {x: 0, y: 140, text: "1.) Beginning \u05e1\u05d5\u05e3!"},
			{family: "Times", size: "18pt"}, "black", "red");

		surfaceAUTO = tu.createSurface(500, 170, null, null, null, "auto");
		console.debug("surfaceAUTO created");
		new tu.Path({}, surfaceAUTO).moveTo(0, 15).setAbsoluteMode(false).curveTo(CPD, 0, 0, 0, 100, 0);

		console.debug("p3 created");

		tp5 = new tu.TextPath({
			text: "\u05d4\u05ea\u05d7\u05dc\u05d4 end. ",
			align: "start"

			//, rotated: true
		}, surfaceAUTO)//.setShape(p.shape)
			.moveTo(0, 15).setAbsoluteMode(false).curveTo(CPD, 0, 100 - CPD, 0, 100, 0);

		tp5.font = {family: "times", size: "12pt"};
		tp5.fill = "red";

		console.debug("tp5 created");
		tp6 = new tu.TextPath({
			text: "Beginning \u05e1\u05d5\u05e3.",
			align: "start"

			//, rotated: true
		}, surfaceAUTO)//.setShape(p.shape)
			.moveTo(0, 50).setAbsoluteMode(false).curveTo(CPD, 0, 100 - CPD, 0, 100, 0);
		tp6.font = {family: "times", size: "12pt"};
		tp6.fill = "blue";

		console.debug("tp6 created");

		t5 = makeText(surfaceAUTO, {id: "t1", x: 0, y: 100, text: "1.) \u05d4\u05ea\u05d7\u05dc\u05d4 end!"},
			{family: "Times", size: "18pt"}, "black", "red");

		t6 = makeText(surfaceAUTO, {x: 0, y: 140, text: "1.) Beginning \u05e1\u05d5\u05e3!"},
			{family: "Times", size: "18pt"}, "black", "blue");
	}

	tu.registerSuite({
		name: "Bidi textDir",
		setup: function () {
			document.documentElement.setAttribute("dir", "rtl");
			makeShapes();
		},
		teardown: function () {
			if (!tu.visual) {
				document.documentElement.setAttribute("dir", "");
			}
		},
		"surfaces_TextDir": function () {
			assert.equal(surfaceLTR.textDir, "ltr", "surfaceLTR.textDir");
			assert.equal(surfaceRTL.textDir, "rtl", "surfaceRTL.textDir");
			assert.equal(surfaceAUTO.textDir, "auto", "surfaceAUTO.textDir");
		},
		"groups_TextDir": function () {
			assert.equal(g1.textDir, "rtl", "g1.textDir");
			assert.equal(g2.textDir, "ltr", "g2.textDir");
			assert.equal(g3.textDir, "rtl", "g3.textDir");
			assert.equal(g4.textDir, "auto", "g4.textDir");
		},
		"gfxText_TextDir": function () {
			assert.equal(t1.textDir, "rtl", "t1.textDir");
			assert.equal(t2.textDir, "ltr", "t2.textDir");
			assert.equal(t3.textDir, "rtl", "t3.textDir");
			assert.equal(t4.textDir, "rtl", "t4.textDir");
			assert.equal(t5.textDir, "auto", "t5.textDir");
			assert.equal(t6.textDir, "auto", "t6h.textDir");
		},
		"gfxTextPath_TextDir": function () {
			assert.equal(tp1.textDir, "ltr", "tp1.textDir");
			assert.equal(tp2.textDir, "ltr", "tp2.textDir");
			assert.equal(tp3.textDir, "ltr", "tp3.textDir");
			assert.equal(tp4.textDir, "rtl", "tp4.textDir");
			assert.equal(tp5.textDir, "auto", "tp5.textDir");
			assert.equal(tp6.textDir, "auto", "tp6.textDir");
		},
		"changeSurfaceRTLextDir": function () {
			surfaceRTL.textDir = "ltr";

			assert.equal(surfaceRTL.textDir, "ltr", "surfaceRTL.textDir");

			assert.equal(g2.textDir, "ltr", "g2.textDir");
			assert.equal(g3.textDir, "ltr", "g3.textDir");
			assert.equal(g4.textDir, "ltr", "g4.textDir");


			assert.equal(t3.textDir, "ltr", "t3.textDir");
			assert.equal(t4.textDir, "ltr", "t4.textDir");

			assert.equal(tp3.textDir, "ltr", "tp3.textDir");
			assert.equal(tp4.textDir, "ltr", "tp4.textDir");
		},
		"changeGroupTextDir": function () {

			g3.add(tp5);
			g3.add(t2);

			g2.textDir = "rtl";

			assert.equal(g2.textDir, "rtl", "g2.textDir");
			// son of g2
			assert.equal(g3.textDir, "rtl", "g3.textDir");

			assert.equal(t2.textDir, "rtl", "t2.textDir");
			assert.equal(t3.textDir, "rtl", "t3.textDir");

			assert.equal(tp5.textDir, "rtl", "tp3.textDir");
		}
	});
});
