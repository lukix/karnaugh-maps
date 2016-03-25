define([], function () {
	function BoolExpression() {

	}
	BoolExpression.prototype.simplify = function () {
		return this;
	};
	BoolExpression.prototype.toLatexString = function () {
		return this.toString();
	};
	BoolExpression.prototype.getDeMorganTransformation = function () {
		return this;
	};
	return BoolExpression;
});
