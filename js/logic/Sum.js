define([], function () {
	function Sum(v) {
    this.value = v;
	}
  Sum.prototype.getValue = function () {
    return this.value;
  };
	return Sum;
});
