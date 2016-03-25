define(['../others/inheritFrom', './BoolExpression'], function (inheritFrom, BoolExpression) {
	inheritFrom.call(BoolVariable, BoolExpression);
	function BoolVariable(name) {
    this.name = name;
		this.type = "BoolVariable";
	}
	BoolVariable.prototype.getValue = function(input) {
		return input[this.name];
	};
  BoolVariable.prototype.toString = function() {
    return this.name;
  };
	BoolVariable.prototype.toLatexString = function() {
		var str = "";
		var bottomIndex = false;
		for(var i = 0; i < this.name.length; i++) {
			if(!isNaN(this.name[i]) && !bottomIndex) {
				bottomIndex = true;
				str += "_";
			}
			str += this.name[i];
		}
    return str;
  };
	return BoolVariable;
});
