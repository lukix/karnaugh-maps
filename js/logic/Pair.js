define(['./Sum'], function (Sum) {
	function Pair() {
    this.firstN;
    this.secondN;
	}
  Pair.prototype.setFirst = function (n) {
    this.firstN = n;
  };
  Pair.prototype.setSecond = function (n) {
    this.secondN = n;
  };
  Pair.prototype.getSum = function () {
    return new Sum(this.firstN+this.secondN);
  };
	return Pair;
});
