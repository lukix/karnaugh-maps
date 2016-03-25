define([
	 '../others/inheritFrom'
	,'../others/deduplicateArr'
	,'./BoolExpression'
	,'./BoolProduct'
	,'./BoolNot'
], function (inheritFrom, deduplicateArr, BoolExpression, BoolProduct, BoolNot) {
	inheritFrom.call(BoolSum, BoolExpression);
	function BoolSum() {
    this.components = Array.from(arguments);
		this.type = "BoolSum";
	}
	BoolSum.prototype.addComponent = function(comp) {
		this.components.push(comp);
	};
	BoolSum.prototype.getValue = function(input) {
		return this.components.some(function (item) {
			return item.getValue(input);
		});
	};
  BoolSum.prototype.toString = function() {
    var strArr = this.components.map(function (item) {
      return item.toString();
    });
    var str = strArr.join("+");
    if(this.components.length > 1)
      str = "(" + str + ")";
    return str;
  };
	BoolSum.prototype.toLatexString = function() {
    var strArr = this.components.map(function (item) {
      return item.toLatexString();
    });
    var str = strArr.join("+");
    if(this.components.length > 1)
      str = "(" + str + ")";
    return str;
  };
	BoolSum.prototype.simplify = function () {
		console.time("s1");
		this.components.forEach(function (item) {
			item.simplify();
			item.sortComponents();
		});
		console.timeEnd("s1");
		console.time("s2");
		this.deduplicate();
		console.timeEnd("s2");

		//this.s3();

		return this;
	};
	BoolSum.prototype.s3 = function () {
		console.time("s3");
		for(var i = this.components.length-1; i >= 0; i--) {
			var r = this.components.slice(0).some(function (item2, index, arr) {
				return arr[i].consistsOf(item2);
			});
			if(r)
				this.components.splice(i, 1);
		}
		console.timeEnd("s3");
	};
	BoolSum.prototype.getSmallestTerms = function () {
		var min = this.components.reduce(function (prev, curr) {
			if(curr.components.length < prev.components.length)
				return curr;
			else
				return prev;
		}).components.length;

		var terms = this.components.filter(function (item) {
			return item.components.length === min;
		});
		return terms;
	};
	BoolSum.prototype.deduplicate = function () {
		this.components = deduplicateArr(this.components, function (a, b) {
			return a.equals(b);
		});
		return this;
	};
	BoolSum.prototype.sortComponents = function () {
		this.components.forEach(function (item) {
				item.sortComponents();
		});
		return this;
	};
	BoolSum.prototype.getDeMorganTransformation = function () {
		var product = new BoolProduct();
		this.components.forEach(function (item) {
			product.addComponent(new BoolNot(item));
		});
		return new BoolNot(product);
	};

	return BoolSum;
});
