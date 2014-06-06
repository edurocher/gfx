define([
	"dcl/dcl", "./Shape", "../shape/_TextPathBase", "dojo/has", "dojo/has!bidi?./bidi/TextPath"
], function (dcl, CanvasShape, TextPathBase, has, CanvasBidiTextPath) {
	var TextPath = dcl([CanvasShape, TextPathBase], {
		// summary:
		//		a text shape (Canvas) - NOT YET IMPLEMENTED
		_renderShape: function () {
			// nothing for the moment
		},
		_setTextPath: function () {
			// not implemented
		},
		_setText: function () {
			// not implemented
		},
		_setFont: function () {
			// not implemented
		}
	});
	return has("bidi") ? dcl([TextPath, CanvasBidiTextPath], {}) : TextPath;
});
