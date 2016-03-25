define([
	 '../others/inheritFrom'
	,'../others/deduplicateArr'
	,'./BoolExpression'
	,'./BoolSum'
	,'./BoolConst'
	,'./BoolNot'
], function (inheritFrom, deduplicateArr, BoolExpression, BoolSum, BoolConst, BoolNot) {
	inheritFrom.call(BoolProduct, BoolExpression);
	function BoolProduct() {
    this.components = Array.from(arguments);
		this.type = "BoolProduct";
	}
	BoolProduct.prototype.addComponent = function(comp) {
		this.components.push(comp);
	};
	BoolProduct.prototype.getValue = function(input) {
		return this.components.every(function (item) {
			return item.getValue(input);
		});
	};
  BoolProduct.prototype.toString = function() {
    var strArr = this.components.map(function (item) {
      return item.toString();
    });
    var str = strArr.join("*");
    if(this.components.length > 1)
      str = "(" + str + ")";
    return str;
  };
	BoolProduct.prototype.toLatexString = function () {
		var strArr = this.components.map(function (item) {
      return item.toLatexString();
    });
    var str = strArr.join(" ");
    if(this.components.length > 1)
      str = "(" + str + ")";
    return str;
	};
	BoolProduct.prototype.createSumOfProducts = function () {
		var sumOfProducts;
		if(this.components.length === 0) {
			sumOfProducts = new BoolSum(new BoolProduct(new BoolConst(0)));
		} else if(this.components.length === 1) {
			sumOfProducts = this.components[0];
			sumOfProducts.components = sumOfProducts.components.map(function (item) {
				return new BoolProduct(item);
			});
		} else {
			var t1 = 0;
			var t2 = 0;
			sumOfProducts = this.components.reduce(function (prev, curr, index) {
				//console.log(prev+"");
				console.time("Multiply2Sums");
				var mult = Multiply2Sums(prev, curr);
				console.timeEnd("Multiply2Sums");

				//console.time("Simplify");
				mult.simplify();
				//console.timeEnd("Simplify");
				mult.s3();

				return mult;
			});
			//console.log();
		}

		function Multiply2Sums(sum1, sum2) {
			var retSum = new BoolSum();
			for(var i = 0; i < sum1.components.length; i++) {
				for(var j = 0; j < sum2.components.length; j++) {
					retSum.addComponent(
						new BoolProduct(sum1.components[i], sum2.components[j])
					);
				}
			}
			return retSum;
		}
		var ex = sumOfProducts.simplify();
		return ex;
	};
	BoolProduct.prototype.simplify = function () {
		var THIS = this;

		//Simplify all components
		//Product of product of items = product of items
		this.components.forEach(function (item, index) {
			item.simplify();
			if(item.type === THIS.type) {
				item.components.forEach(function (item) {
					THIS.addComponent(item);
				});
				THIS.components.splice(index, 1);
			}
		});

		//Get rid of duplicates
		this.components = deduplicateArr(this.components, function (a, b) {
			return a === b;
		});
		return this;
	};
	BoolProduct.prototype.equals = function (product) {	//This function assumes that products are sorted
		if(product.type !== "BoolProduct" || this.components.length !== product.components.length)
			return false;
		for(var i = 0; i < this.components.length; i++) {	//Try to use every instead of for loop
			if(this.components[i] !== product.components[i])
				return false;
		}
		return true;
	};
	BoolProduct.prototype.sortComponents = function () {
		this.components.sort(function (a, b) {
			return a.toString() > b.toString();
		});
		return this;
	};
	BoolProduct.prototype.getDeMorganTransformation = function () {
		var sum = new BoolSum();
		this.components.forEach(function (item) {
			sum.addComponent(new BoolNot(item));
		});
		return new BoolNot(sum);
	};
	BoolProduct.prototype.consistsOf = function (product) {
		if(product.components.length >= this.components.length)
			return false;

		var arr = [];
		for(var i = 0; i < product.components.length; i++) {
			arr.push({variable: product.components[i], found: false});
		}
		for(var i = 0; i < this.components.length; i++) {
			for(var j = 0; j < arr.length; j++) {
				if(this.components[i] === arr[j].variable)
					arr[j].found = true;
			}
		}
		var ret = arr.every(function (item) {
			return item.found;
		});
		return ret;
	};
	BoolProduct.getSmallerProduct = function (p1, p2) {
		if(p1.length >= p2.length)
			return p2;
		else
			return p1;
	}

	return BoolProduct;
});
