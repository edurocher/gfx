define([
	"intern!object", "intern/chai!assert", "../../utils/testUtils"
], function (registerSuite, assert, tu) {

	var surface = null, t1;

	var shalom = "\u05e9\u05dc\u05d5\u05dd!";
	var hello = "Hello!";

	var placeAnchor = function (surface, x, y) {
		surface.add(new tu.Line({x1: x - 2, y1: y, x2: x + 2, y2: y}));
		surface.add(new tu.Line({x1: x, y1: y - 2, x2: x, y2: y + 2}));
	};

	var makeText = function (surface, text, font, fill, stroke) {
		var t = new tu.Text(text);
		surface.add(t);
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
	};

	var makeShapes = function () {
		surface = tu.createSurface(500, 200);
		//surface.add(new Line({x1: 250, y1: 0, x2: 250, y2: 500})).stroke = "green";
		t1 = makeText(surface, {id: "t1", x: 250, y: 50, text: "Hello!", textDir: "ltr"},
			{family: "Times", size: "24pt"}, "black", "red");
	};

	tu.registerSuite({
		name: "Bidi text",
		setup: function () {
			makeShapes();
		},
		"ltr: hello shalom": function () {
			t1.shape = { text: "ltr: Hello! \u05e9\u05dc\u05d5\u05dd!", textDir: "ltr" };
			/* jshint maxlen:100000, quotmark:single */
			tu.compare(surface, {
				svg: '<defs></defs><text fill="rgb(0, 0, 0)" fill-opacity="1" stroke="rgb(255, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="250" y="50" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" font-style="normal" font-variant="normal" font-weight="normal" font-size="24pt" font-family="Times" fill-rule="evenodd" stroke-dasharray="none">‎‪ltr: Hello! שלום!‬</text><line fill="none" fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="248" y1="50" x2="252" y2="50"></line><line fill="none" fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="250" y1="48" x2="250" y2="52"></line>',
				canvas: '["s","s","fil","0,0,0,1","stro","255,0,0,1","li",1,"lin","butt","line","miter","mi",4,"te","start","fo","normal normal normal 24pt Times","fi","‪ltr: Hello! שלום!‬",250,50,"b","str","‪ltr: Hello! שלום!‬",250,50,"c","r","s","b","m",248,50,"l",252,50,"fil","0,0,0,0.0","r","s","b","m",250,48,"l",250,52,"fil","0,0,0,0.0","r","r"]'
			});
			/* jshint maxlen:120, quotmark:double */
		},
		"ltr: shalom hello": function () {
			t1.shape = { text: "ltr:  \u05e9\u05dc\u05d5\u05dd! Hello!", textDir: "ltr" };
			/* jshint maxlen:100000, quotmark:single */
			tu.compare(surface, {
				svg: '<defs></defs><text fill="rgb(0, 0, 0)" fill-opacity="1" stroke="rgb(255, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="250" y="50" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" font-style="normal" font-variant="normal" font-weight="normal" font-size="24pt" font-family="Times" fill-rule="evenodd" stroke-dasharray="none">‎‪ltr:  שלום! Hello!‬</text><line fill="none" fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="248" y1="50" x2="252" y2="50"></line><line fill="none" fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="250" y1="48" x2="250" y2="52"></line>',
				canvas: '["s","s","fil","0,0,0,1","stro","255,0,0,1","li",1,"lin","butt","line","miter","mi",4,"te","start","fo","normal normal normal 24pt Times","fi","‪ltr:  שלום! Hello!‬",250,50,"b","str","‪ltr:  שלום! Hello!‬",250,50,"c","r","s","b","m",248,50,"l",252,50,"fil","0,0,0,0.0","r","s","b","m",250,48,"l",250,52,"fil","0,0,0,0.0","r","r"]'
			});
			/* jshint maxlen:120, quotmark:double */
		},
		"rtl: hello shalom": function () {
			t1.shape = { text: "rtl: Hello! \u05e9\u05dc\u05d5\u05dd!", textDir: "rtl" };
			/* jshint maxlen:100000, quotmark:single */
			tu.compare(surface, {
				svg: '<defs></defs><text fill="rgb(0, 0, 0)" fill-opacity="1" stroke="rgb(255, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="250" y="50" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" font-style="normal" font-variant="normal" font-weight="normal" font-size="24pt" font-family="Times" fill-rule="evenodd" stroke-dasharray="none">‎‫rtl: Hello! שלום!‬</text><line fill="none" fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="248" y1="50" x2="252" y2="50"></line><line fill="none" fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="250" y1="48" x2="250" y2="52"></line>',
				canvas: '["s","s","fil","0,0,0,1","stro","255,0,0,1","li",1,"lin","butt","line","miter","mi",4,"te","start","fo","normal normal normal 24pt Times","fi","‫rtl: Hello! שלום!‬",250,50,"b","str","‫rtl: Hello! שלום!‬",250,50,"c","r","s","b","m",248,50,"l",252,50,"fil","0,0,0,0.0","r","s","b","m",250,48,"l",250,52,"fil","0,0,0,0.0","r","r"]'
			});
			/* jshint maxlen:120, quotmark:double */
		},
		"rtl: shalom hello": function () {
			t1.shape = { text: "rtl:  \u05e9\u05dc\u05d5\u05dd! Hello!", textDir: "rtl" };
			/* jshint maxlen:100000, quotmark:single */
			tu.compare(surface, {
				svg: '<defs></defs><text fill="rgb(0, 0, 0)" fill-opacity="1" stroke="rgb(255, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="250" y="50" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" font-style="normal" font-variant="normal" font-weight="normal" font-size="24pt" font-family="Times" fill-rule="evenodd" stroke-dasharray="none">‎‫rtl:  שלום! Hello!‬</text><line fill="none" fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="248" y1="50" x2="252" y2="50"></line><line fill="none" fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="250" y1="48" x2="250" y2="52"></line>',
				canvas: '["s","s","fil","0,0,0,1","stro","255,0,0,1","li",1,"lin","butt","line","miter","mi",4,"te","start","fo","normal normal normal 24pt Times","fi","‫rtl:  שלום! Hello!‬",250,50,"b","str","‫rtl:  שלום! Hello!‬",250,50,"c","r","s","b","m",248,50,"l",252,50,"fil","0,0,0,0.0","r","s","b","m",250,48,"l",250,52,"fil","0,0,0,0.0","r","r"]'
			});
			/* jshint maxlen:120, quotmark:double */
		},
		"auto: hello shalom": function () {
			t1.shape = { text: "auto: Hello! \u05e9\u05dc\u05d5\u05dd!", textDir: "auto" };
			/* jshint maxlen:100000, quotmark:single */
			tu.compare(surface, {
				svg: '<defs></defs><text fill="rgb(0, 0, 0)" fill-opacity="1" stroke="rgb(255, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="250" y="50" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" font-style="normal" font-variant="normal" font-weight="normal" font-size="24pt" font-family="Times" fill-rule="evenodd" stroke-dasharray="none">‎‪auto: Hello! שלום!‬</text><line fill="none" fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="248" y1="50" x2="252" y2="50"></line><line fill="none" fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="250" y1="48" x2="250" y2="52"></line>',
				canvas: '["s","s","fil","0,0,0,1","stro","255,0,0,1","li",1,"lin","butt","line","miter","mi",4,"te","start","fo","normal normal normal 24pt Times","fi","‪auto: Hello! שלום!‬",250,50,"b","str","‪auto: Hello! שלום!‬",250,50,"c","r","s","b","m",248,50,"l",252,50,"fil","0,0,0,0.0","r","s","b","m",250,48,"l",250,52,"fil","0,0,0,0.0","r","r"]'
			});
			/* jshint maxlen:120, quotmark:double */
		},
		"auto: shalom hello": function () {
			t1.shape = { text: "auto:  \u05e9\u05dc\u05d5\u05dd! Hello!", textDir: "auto" };
			/* jshint maxlen:100000, quotmark:single */
			tu.compare(surface, {
				svg: '<defs></defs><text fill="rgb(0, 0, 0)" fill-opacity="1" stroke="rgb(255, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="250" y="50" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" font-style="normal" font-variant="normal" font-weight="normal" font-size="24pt" font-family="Times" fill-rule="evenodd" stroke-dasharray="none">‎‪auto:  שלום! Hello!‬</text><line fill="none" fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="248" y1="50" x2="252" y2="50"></line><line fill="none" fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="250" y1="48" x2="250" y2="52"></line>',
				canvas: '["s","s","fil","0,0,0,1","stro","255,0,0,1","li",1,"lin","butt","line","miter","mi",4,"te","start","fo","normal normal normal 24pt Times","fi","‪auto:  שלום! Hello!‬",250,50,"b","str","‪auto:  שלום! Hello!‬",250,50,"c","r","s","b","m",248,50,"l",252,50,"fil","0,0,0,0.0","r","s","b","m",250,48,"l",250,52,"fil","0,0,0,0.0","r","r"]'
			});
			/* jshint maxlen:120, quotmark:double */
		},
	});
});
