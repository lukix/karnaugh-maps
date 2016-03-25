define(['../others/inheritFrom', './BoolExpression'], function (inheritFrom, BoolExpression) {
	inheritFrom.call(BoolConst, BoolExpression);
	function BoolConst(value) {
    this.value = !!value;
		this.type = "BoolConst";
	}
	BoolConst.prototype.getValue = function(input) {
		return this.value;
	};
  BoolConst.prototype.toString = function() {
    return +this.value;
  };
	return BoolConst;
});
