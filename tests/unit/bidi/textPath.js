define([
	"intern!object", "intern/chai!assert", "../../utils/testUtils", "gfx/svg/Path", "gfx/svg/TextPath"
], function (registerSuite, assert, tu, Path, TextPath) {

	var CPD = 30;

	registerSuite({
		name: "Bidi text path (SVG only)",
		"LTR": function () {
			var surfaceLTR = tu.createSurface(500, 60, "svg");

			new Path({}, surfaceLTR).moveTo(0, 15).setAbsoluteMode(false).curveTo(CPD, 0, 0, 0, 50, 0);

			var t = new TextPath({
				text: "\u05d4\u05ea\u05d7\u05dc\u05d4 end.",
				align: "start",
				textDir: "ltr"
			}, surfaceLTR).moveTo(0, 15).setAbsoluteMode(false).curveTo(CPD, 0, 0, 0, 100, 0);
			t.font = {family: "times", size: "12pt"};
			t.fill = "blue";

			var t2 = new TextPath({
				text: "Beginning \u05e1\u05d5\u05e3.",
				align: "start",
				textDir: "ltr"
			}, surfaceLTR).moveTo(0, 50).setAbsoluteMode(false).curveTo(CPD, 0, 0, 0, 100, 0);
			t2.font = {family: "times", size: "12pt"};
			t2.fill = "blue";


			/* jshint maxlen:100000, quotmark:single */
			tu.compare(surfaceLTR, {
				svg: '<defs><path id="dojoxUnique1" d=""></path><path id="dojoxUnique2" d="M 0 15"></path><path id="dojoxUnique3" d="M 0 15c 30 0 0 0 100 0"></path><path id="dojoxUnique4" d=""></path><path id="dojoxUnique5" d="M 0 50"></path><path id="dojoxUnique6" d="M 0 50c 30 0 0 0 100 0"></path></defs><path fill="none" fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" path="" d="M 0 15c 30 0 0 0 50 0"></path><text fill="rgb(0, 0, 255)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" path="" text="הלחתה end." align="start" decoration="none" rotated="false" kerning="true" textDir="ltr" font-style="normal" font-variant="normal" font-weight="normal" font-size="12pt" font-family="times" fill-rule="evenodd"><textPath alignment-baseline="middle" text-anchor="start" startOffset="0%" baseline-shift="0.5ex" text-decoration="none" rotate="0" kerning="auto" xlink:href="#dojoxUnique3">התחלה end.</textPath></text><text fill="rgb(0, 0, 255)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" path="" text="Beginning ףוס." align="start" decoration="none" rotated="false" kerning="true" textDir="ltr" font-style="normal" font-variant="normal" font-weight="normal" font-size="12pt" font-family="times" fill-rule="evenodd"><textPath alignment-baseline="middle" text-anchor="start" startOffset="0%" baseline-shift="0.5ex" text-decoration="none" rotate="0" kerning="auto" xlink:href="#dojoxUnique6">Beginning סוף.</textPath></text>'
			});
			/* jshint maxlen:120, quotmark:double */
		},
		"RTL": function () {

			var surfaceRTL = tu.createSurface(500, 60, "svg");

			new Path({}, surfaceRTL).moveTo(0, 15).setAbsoluteMode(false).curveTo(CPD, 0, 0, 0, 100, 0);

			var t3 = new TextPath({
				text: "\u05d4\u05ea\u05d7\u05dc\u05d4 end. ",
				align: "start",
				textDir: "rtl"
				//, rotated: true
			}, surfaceRTL).moveTo(0, 15).setAbsoluteMode(false).curveTo(CPD, 0, 100 - CPD, 0, 100, 0);
			t3.font = {family: "times", size: "12pt"};
			t3.fill = "red";

			var t4 = new TextPath({
				text: "Beginning \u05e1\u05d5\u05e3.",
				align: "start",
				textDir: "rtl"
				//, rotated: true
			}, surfaceRTL).moveTo(0, 50).setAbsoluteMode(false).curveTo(CPD, 0, 100 - CPD, 0, 100, 0);
			t4.font = {family: "times", size: "12pt"};
			t4.fill = "red";

			/* jshint maxlen:100000, quotmark:single */
			tu.compare(surfaceRTL, {
				svg: '<defs><path id="dojoxUnique7" d=""></path><path id="dojoxUnique8" d="M 0 15"></path><path id="dojoxUnique9" d="M 0 15c 30 0 70 0 100 0"></path><path id="dojoxUnique10" d=""></path><path id="dojoxUnique11" d="M 0 50"></path><path id="dojoxUnique12" d="M 0 50c 30 0 70 0 100 0"></path></defs><path fill="none" fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" path="" d="M 0 15c 30 0 0 0 100 0"></path><text fill="rgb(255, 0, 0)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" path="" text=" .end הלחתה" align="start" decoration="none" rotated="false" kerning="true" textDir="rtl" font-style="normal" font-variant="normal" font-weight="normal" font-size="12pt" font-family="times" fill-rule="evenodd"><textPath alignment-baseline="middle" text-anchor="start" startOffset="0%" baseline-shift="0.5ex" text-decoration="none" rotate="0" kerning="auto" xlink:href="#dojoxUnique9">התחלה end. </textPath></text><text fill="rgb(255, 0, 0)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" path="" text=".ףוס Beginning" align="start" decoration="none" rotated="false" kerning="true" textDir="rtl" font-style="normal" font-variant="normal" font-weight="normal" font-size="12pt" font-family="times" fill-rule="evenodd"><textPath alignment-baseline="middle" text-anchor="start" startOffset="0%" baseline-shift="0.5ex" text-decoration="none" rotate="0" kerning="auto" xlink:href="#dojoxUnique12">Beginning סוף.</textPath></text>'
			});
			/* jshint maxlen:120, quotmark:double */
		},
		"Auto": function () {

			var surfaceAUTO = tu.createSurface(500, 60, "svg");

			new Path({}, surfaceAUTO).moveTo(0, 15).setAbsoluteMode(false).curveTo(CPD, 0, 0, 0, 100, 0);

			var t5 = new TextPath({
				text: "\u05d4\u05ea\u05d7\u05dc\u05d4 end. ",
				align: "start",
				textDir: "auto"
				//, rotated: true
			}, surfaceAUTO).moveTo(0, 15).setAbsoluteMode(false).curveTo(CPD, 0, 100 - CPD, 0, 100, 0);
			t5.font = {family: "times", size: "12pt"};
			t5.fill = "red";

			var t6 = new TextPath({
				text: "Beginning \u05e1\u05d5\u05e3.",
				align: "start",
				textDir: "auto"
				//, rotated: true
			}, surfaceAUTO).moveTo(0, 50).setAbsoluteMode(false).curveTo(CPD, 0, 100 - CPD, 0, 100, 0);
			t6.font = {family: "times", size: "12pt"};
			t6.fill = "blue";

			/* jshint maxlen:100000, quotmark:single */
			tu.compare(surfaceAUTO, {
				svg: '<defs><path id="dojoxUnique13" d=""></path><path id="dojoxUnique14" d="M 0 15"></path><path id="dojoxUnique15" d="M 0 15c 30 0 70 0 100 0"></path><path id="dojoxUnique16" d=""></path><path id="dojoxUnique17" d="M 0 50"></path><path id="dojoxUnique18" d="M 0 50c 30 0 70 0 100 0"></path></defs><path fill="none" fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" path="" d="M 0 15c 30 0 0 0 100 0"></path><text fill="rgb(255, 0, 0)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" path="" text=" .end הלחתה" align="start" decoration="none" rotated="false" kerning="true" textDir="auto" font-style="normal" font-variant="normal" font-weight="normal" font-size="12pt" font-family="times" fill-rule="evenodd"><textPath alignment-baseline="middle" text-anchor="start" startOffset="0%" baseline-shift="0.5ex" text-decoration="none" rotate="0" kerning="auto" xlink:href="#dojoxUnique15"> .end התחלה</textPath></text><text fill="rgb(0, 0, 255)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" path="" text="Beginning ףוס." align="start" decoration="none" rotated="false" kerning="true" textDir="auto" font-style="normal" font-variant="normal" font-weight="normal" font-size="12pt" font-family="times" fill-rule="evenodd"><textPath alignment-baseline="middle" text-anchor="start" startOffset="0%" baseline-shift="0.5ex" text-decoration="none" rotate="0" kerning="auto" xlink:href="#dojoxUnique18">Beginning סוף.</textPath></text>'
			});
			/* jshint maxlen:120, quotmark:double */
		}
	});
});
