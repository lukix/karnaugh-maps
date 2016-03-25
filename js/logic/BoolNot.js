define(['../others/inheritFrom', './BoolExpression'], function (inheritFrom, BoolExpression) {
	inheritFrom.call(BoolNot, BoolExpression);
	function BoolNot(expression) {
    this.expression = expression;
		this.type = "BoolNot";
	}
	BoolNot.prototype.getValue = function(input) {
			return !this.expression.getValue(input);
	};
  BoolNot.prototype.toString = function() {
    return "~" + this.expression.toString();
  };
	BoolNot.prototype.simplify = function () {
		this.expession.simplify();
		return this;
	};
	BoolNot.prototype.toLatexString = function () {
		return "\\overline{" + this.expression.toLatexString() + "}";
	};
	return BoolNot;
});
