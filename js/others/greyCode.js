define([], function () {
  function getGreyCode(n) {
  	function extend(arr) {
  		var ret = [];
  		for(var i = 0; i < arr.length; i++) {
  				ret.push("0" + arr[i]);
  		}
  		for(var i = arr.length-1; i >= 0; i--) {
  				ret.push("1" + arr[i]);
  		}
  		return ret;
  	}
  	var code = [""];
  	for(var i = 0; i < n; i++) {
  		code = extend(code);
  	}
  	return code;
  }
	return getGreyCode;
});
