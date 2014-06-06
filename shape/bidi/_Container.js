define(["require", "dcl/dcl", "../../utils", "../../_bidi"], function (require, dcl, gfxUtils, bidi) {

	function setTextDir(/*Object*/ obj, /*String*/ newTextDir) {
		var tDir = bidi.validateTextDir(newTextDir);
		if (tDir) {
			gfxUtils.forEach(obj, function (e) {
				if (e._setTextDir) {
					e._setTextDir(tDir);
				}
			}, obj);
		}
		return obj;
	}

	return dcl(null, {
		// textDir: String
		//		Will be used as default for Text/TextPath/Group objects that created by this surface
		//		and textDir wasn't directly specified for them, though the bidi support was loaded.
		//		Can be set in two ways:
		//
		//		1. When the surface is created and textDir value passed to it as fourth
		//		parameter.
		//		2. Using the setTextDir(String) function, when this function is used the value
		//		of textDir propagates to all of it's children and the children of children (for Groups) etc.
		textDir: "",

		_setTextDirAttr: function (/*String*/newTextDir) {
			// summary:
			//		Used for propagation and change of textDir.
			//		newTextDir will be forced as textDir for all of it's children (Group/Text/TextPath).
			setTextDir(this, newTextDir);
		},

		_setTextDir: function (tDir) {
			// summary: Called by _Container to propagate textDir to children.
			this._set("textDir", tDir);
		}
	});
});
