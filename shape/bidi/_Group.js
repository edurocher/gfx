define(["dcl/dcl"], function (dcl) {
	return dcl(null, {

		shape: { textDir: "" },

		constructor: function () {
			this.textDir =  this._get("shape").textDir || this._get("textDir");
		},

		_setParent: dcl.superCall(function (sup) {
			return function (parent) {
				sup.apply(this, arguments);
				if (!this._get("textDir")) {
					this.textDir = parent.textDir;
				}
			};
		})
	});
});
