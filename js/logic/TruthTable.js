define([
	 './boolSum'
	,'./boolProduct'
	,'./boolNot'
	,'./boolConst'
	,'./BoolVariable'
	,'./quineMcCluskeyMethod'
], function (BoolSum, BoolProduct, BoolNot, BoolConst, BoolVariable, MinimalResults) {
	function TruthTable(argumentVarsArr) {	//From LSB to MSB (most/least significant bit)
    this.args = argumentVarsArr;
		this.values = new Array(Math.pow(2, this.args.length));
		this.values.fill(null);
	}
	TruthTable.prototype.getIndex = function(input) {
		var index = 0;
		for(var i= 0; i < this.args.length; i++) {
			index = index << 1;
			index += input[this.args[i].toString()];
		}
		return index;
	};
	TruthTable.prototype.fillFromExpression = function(expression) {
		for(var i= 0; i < this.values.length; i++) {
			var input = {};
			for(var j = 0; j < this.args.length; j++) {
				input[this.args[j].toString()] = !!((i >> j) & 1);
			}
			this.setValue(i, +expression.getValue(input));
		}
		return this;
	};
	TruthTable.prototype.setValue = function(index, value) {
		var validValues = [0, 1, null];
		if(validValues.indexOf(value) === -1)
			throw new Error("Truthtable.prototype.setValue: Invalid value");
		this.values[index] = value;
		return this;
	};
  TruthTable.prototype.toString = function() {
    var str = "";
		for(var i = this.args.length-1; i >= 0; i--) {
			str += this.args[i].toString();
		}
		str += "\n";
		for(var i = 0; i < this.values.length; i++) {
			str += i + ": " + this.values[i] + "\n";
		}
    return "<TruthTable>:\n" + str;
  };
	TruthTable.prototype.getMinimalExpressionFromOnes = function () {
		var minitermsWithNulls = this.getMiniterms(true, 1);
		var minitermsNoNulls = this.getMiniterms(false, 1);
		if(minitermsNoNulls.length !== 0) {
			var results = MinimalResults(minitermsNoNulls, minitermsWithNulls);
			var minimalExpression = this.createExpressionFromMinitermsOfOnes(results[0]);
			return minimalExpression;
		}
		else {
			return new BoolConst(0);
		}
	};
	TruthTable.prototype.getMinimalExpressionFromZeroes = function () {
		var minitermsWithNulls = this.getMiniterms(true, 0);
		var minitermsNoNulls = this.getMiniterms(false, 0);
		if(minitermsNoNulls.length !== 0) {
			var results = MinimalResults(minitermsNoNulls, minitermsWithNulls);
			var minimalExpression = this.createExpressionFromMinitermsOfZeroes(results[0]);
			return minimalExpression;
		}
		else {
			return new BoolConst(1);
		}
	};

	//Miniterm is a string representation of a binary number
	//withNulls
	//value - 0 or 1
	TruthTable.prototype.getMiniterms = function (withNulls, value) {
		if(typeof(withNulls) === "undefined")
			throw new Error("TruthTable.prototype.getMiniterms has an obligatory argument withNulls");
		if(typeof(value) === "undefined")
			throw new Error("TruthTable.prototype.getMiniterms has an obligatory argument value");
		var miniterms = [];
		for(var i = 0; i < this.values.length; i++) {		//HERE
			if((this.values[i] === value) || (withNulls && this.values[i] === null))
				miniterms.push(dec2bin(i, this.args.length));		//HERE
		}
		return miniterms;

		function dec2bin(dec, length) {
				var bin = Number(dec).toString(2);
				while(bin.length < length)
					bin = "0" + bin;
				return bin;
		}
	};
	TruthTable.prototype.createExpressionFromMinitermsOfOnes = function (imps) {
		var minimalExpression = new BoolSum();
		for(var i = 0; i < imps.length; i++) {
			var product = new BoolProduct();
			for(var j = 0; j < imps[i].length; j++) {
				if(imps[i][j] === '0')
					product.addComponent(new BoolNot(this.args[this.args.length-1-j]));	//HERE
				else if(imps[i][j] === '1')
					product.addComponent(this.args[this.args.length-1-j]);	//HERE
			}
			if(product.components.length === 0)
				return new BoolSum(new BoolProduct(new BoolConst(1)));
			minimalExpression.addComponent(product);
		}
		if(minimalExpression.components.length === 0)
				return new BoolSum(new BoolProduct(new BoolConst(0)));
		return minimalExpression;
	};

	TruthTable.prototype.createExpressionFromMinitermsOfZeroes = function (imps) {
		var minimalExpression = new BoolProduct();
		for(var i = 0; i < imps.length; i++) {
			var sum = new BoolSum();
			for(var j = 0; j < imps[i].length; j++) {
				if(imps[i][j] === '0')
					sum.addComponent(this.args[this.args.length-1-j]);	//HERE
				else if(imps[i][j] === '1')
					sum.addComponent(new BoolNot(this.args[this.args.length-1-j]));	//HERE
			}
			if(sum.components.length !== 0)
				minimalExpression.addComponent(sum);
		}
		if(minimalExpression.components.length === 0)
				return new BoolSum(new BoolProduct(new BoolConst(0)));
		return minimalExpression;
	};

	return TruthTable;
});
