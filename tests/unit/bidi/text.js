define([
	"intern!object", "intern/chai!assert", "../../utils/testUtils"
], function (registerSuite, assert, tu) {

	var surface = null, t1, t2, t3, t4, t5, t6;

	var placeAnchor = function (surface, x, y) {
		surface.add(new tu.Line({x1: x - 2, y1: y, x2: x + 2, y2: y}));
		surface.add(new tu.Line({x1: x, y1: y - 2, x2: x, y2: y + 2}));
	};

	var makeText = function (surface, text, font, fill, stroke) {
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
	};

	var makeShapes = function () {
		surface = tu.createSurface(700, 500);
		//new Line({x1: 250, y1: 0, x2: 250, y2: 500}, surface).stroke = "green";
		t1 = makeText(surface,
			{id: "t1", x: 250, y: 50, text: "1.) \u05e9\u05dc\u05d5\u05dd world LTR!", textDir: "ltr"},
			{family: "Times", size: "24pt"}, "black", "red");

		t2 = makeText(surface, {x: 250, y: 100, text: "1.) Hello \u05e2\u05d5\u05dc\u05dd LTR!", textDir: "ltr"},
			{family: "Times", size: "24pt"}, "black", "red");

		t3 = makeText(surface, {x: 250, y: 150, text: "1.) \u05e9\u05dc\u05d5\u05dd world RTL!", textDir: "rtl"},
			{family: "Times", size: "24pt"}, "red", "black");
		t4 = makeText(surface,
			{x: 250, y: 200, text: "1.) Hello \u05e2\u05d5\u05dc\u05dd RTL!", kerning: true, textDir: "rtl"},
			{family: "Times", size: "24pt"}, "red", "black");
		t5 = makeText(surface,
			{x: 250, y: 250, text: "1.) \u05e9\u05dc\u05d5\u05dd world AUTO!", kerning: false, textDir: "auto"},
			{family: "Times", size: "24pt"}, "red", "black");
		t6 = makeText(surface,
			{x: 250, y: 300, text: "1.) Hello \u05e2\u05d5\u05dc\u05dd AUTO!", kerning: false, textDir: "auto"},
			{family: "Times", size: "24pt"}, "black", "red");

	};

	tu.registerSuite({
		name: "Bidi text",
		setup: function () {
			makeShapes();
		},
		"Bidi text": function () {
			/* jshint maxlen:100000, quotmark:single */
			tu.compare(surface, {
				svg: '<defs></defs><text fill="rgb(0, 0, 0)" fill-opacity="1" stroke="rgb(255, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="250" y="50" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" font-style="normal" font-variant="normal" font-weight="normal" font-size="24pt" font-family="Times" fill-rule="evenodd" stroke-dasharray="none">‎‪‎‪1.) שלום world LTR!‬‬</text><line fill="none" fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="248" y1="50" x2="252" y2="50"></line><line fill="none" fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="250" y1="48" x2="250" y2="52"></line><text fill="rgb(0, 0, 0)" fill-opacity="1" stroke="rgb(255, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="250" y="100" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" font-style="normal" font-variant="normal" font-weight="normal" font-size="24pt" font-family="Times" fill-rule="evenodd" stroke-dasharray="none">‎‪‎‪1.) Hello עולם LTR!‬‬</text><line fill="none" fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="248" y1="100" x2="252" y2="100"></line><line fill="none" fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="250" y1="98" x2="250" y2="102"></line><text fill="rgb(255, 0, 0)" fill-opacity="1" stroke="rgb(0, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="250" y="150" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" font-style="normal" font-variant="normal" font-weight="normal" font-size="24pt" font-family="Times" fill-rule="evenodd" stroke-dasharray="none">‎‫‎‫1.) שלום world RTL!‬‬</text><line fill="none" fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="248" y1="150" x2="252" y2="150"></line><line fill="none" fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="250" y1="148" x2="250" y2="152"></line><text fill="rgb(255, 0, 0)" fill-opacity="1" stroke="rgb(0, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="250" y="200" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" font-style="normal" font-variant="normal" font-weight="normal" font-size="24pt" font-family="Times" fill-rule="evenodd" stroke-dasharray="none">‎‫‎‫1.) Hello עולם RTL!‬‬</text><line fill="none" fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="248" y1="200" x2="252" y2="200"></line><line fill="none" fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="250" y1="198" x2="250" y2="202"></line><text fill="rgb(255, 0, 0)" fill-opacity="1" stroke="rgb(0, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="250" y="250" text-anchor="start" text-decoration="none" rotate="0" kerning="0" text-rendering="auto" font-style="normal" font-variant="normal" font-weight="normal" font-size="24pt" font-family="Times" fill-rule="evenodd" stroke-dasharray="none">‎‪‎‫1.) שלום world AUTO!‬‬</text><line fill="none" fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="248" y1="250" x2="252" y2="250"></line><line fill="none" fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="250" y1="248" x2="250" y2="252"></line><text fill="rgb(0, 0, 0)" fill-opacity="1" stroke="rgb(255, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="250" y="300" text-anchor="start" text-decoration="none" rotate="0" kerning="0" text-rendering="auto" font-style="normal" font-variant="normal" font-weight="normal" font-size="24pt" font-family="Times" fill-rule="evenodd" stroke-dasharray="none">‎‪‎‪1.) Hello עולם AUTO!‬‬</text><line fill="none" fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="248" y1="300" x2="252" y2="300"></line><line fill="none" fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="250" y1="298" x2="250" y2="302"></line>',
				canvas: '["s","s","fil","0,0,0,1","stro","255,0,0,1","li",1,"lin","butt","line","miter","mi",4,"te","start","fo","normal normal normal 24pt Times","fi","‪‪1.) שלום world LTR!‬‬",250,50,"b","str","‪‪1.) שלום world LTR!‬‬",250,50,"c","r","s","b","m",248,50,"l",252,50,"fil","0,0,0,0.0","r","s","b","m",250,48,"l",250,52,"fil","0,0,0,0.0","r","s","fil","0,0,0,1","stro","255,0,0,1","li",1,"lin","butt","line","miter","mi",4,"te","start","fo","normal normal normal 24pt Times","fi","‪‪1.) Hello עולם LTR!‬‬",250,100,"b","str","‪‪1.) Hello עולם LTR!‬‬",250,100,"c","r","s","b","m",248,100,"l",252,100,"fil","0,0,0,0.0","r","s","b","m",250,98,"l",250,102,"fil","0,0,0,0.0","r","s","fil","255,0,0,1","stro","0,0,0,1","li",1,"lin","butt","line","miter","mi",4,"te","start","fo","normal normal normal 24pt Times","fi","‫‫1.) שלום world RTL!‬‬",250,150,"b","str","‫‫1.) שלום world RTL!‬‬",250,150,"c","r","s","b","m",248,150,"l",252,150,"fil","0,0,0,0.0","r","s","b","m",250,148,"l",250,152,"fil","0,0,0,0.0","r","s","fil","255,0,0,1","stro","0,0,0,1","li",1,"lin","butt","line","miter","mi",4,"te","start","fo","normal normal normal 24pt Times","fi","‫‫1.) Hello עולם RTL!‬‬",250,200,"b","str","‫‫1.) Hello עולם RTL!‬‬",250,200,"c","r","s","b","m",248,200,"l",252,200,"fil","0,0,0,0.0","r","s","b","m",250,198,"l",250,202,"fil","0,0,0,0.0","r","s","fil","255,0,0,1","stro","0,0,0,1","li",1,"lin","butt","line","miter","mi",4,"te","start","fo","normal normal normal 24pt Times","fi","‫‫1.) שלום world AUTO!‬‬",250,250,"b","str","‫‫1.) שלום world AUTO!‬‬",250,250,"c","r","s","b","m",248,250,"l",252,250,"fil","0,0,0,0.0","r","s","b","m",250,248,"l",250,252,"fil","0,0,0,0.0","r","s","fil","0,0,0,1","stro","255,0,0,1","li",1,"lin","butt","line","miter","mi",4,"te","start","fo","normal normal normal 24pt Times","fi","‪‪1.) Hello עולם AUTO!‬‬",250,300,"b","str","‪‪1.) Hello עולם AUTO!‬‬",250,300,"c","r","s","b","m",248,300,"l",252,300,"fil","0,0,0,0.0","r","s","b","m",250,298,"l",250,302,"fil","0,0,0,0.0","r","r"]'
			});
			/* jshint maxlen:120, quotmark:double */
		}
	});
});
